#!/bin/bash
set -e

# Script to update canary deployment traffic weight
# Usage: ./update-canary-weight.sh [namespace] [canary-weight-percentage]

NAMESPACE=${1:-default}
CANARY_WEIGHT=${2:-10}
STABLE_WEIGHT=$((100 - $CANARY_WEIGHT))

# Validate input
if [[ ! "$CANARY_WEIGHT" =~ ^[0-9]+$ ]] || [ "$CANARY_WEIGHT" -gt 100 ]; then
  echo "Error: Canary weight must be a number between 0 and 100"
  exit 1
fi

echo "Updating canary weight to $CANARY_WEIGHT% in namespace $NAMESPACE"

# Create a temporary file with the updated VirtualService configuration
cat > /tmp/vs-update.yaml <<EOF
apiVersion: networking.istio.io/v1alpha3
kind: VirtualService
metadata:
  name: app-routes
  namespace: $NAMESPACE
spec:
  hosts:
  - app.example.com
  http:
  - route:
    - destination:
        host: app-stable-service
        port:
          number: 80
      weight: $STABLE_WEIGHT
    - destination:
        host: app-canary-service
        port:
          number: 80
      weight: $CANARY_WEIGHT
EOF

# Apply the updated configuration
kubectl apply -f /tmp/vs-update.yaml

# Check if the update was successful
APPLIED_WEIGHT=$(kubectl get virtualservice app-routes -n $NAMESPACE -o jsonpath='{.spec.http[0].route[1].weight}')
if [ "$APPLIED_WEIGHT" -eq "$CANARY_WEIGHT" ]; then
  echo "✅ Canary weight successfully updated to $CANARY_WEIGHT%"
else
  echo "❌ Failed to update canary weight. Current weight: $APPLIED_WEIGHT%"
  exit 1
fi

echo "Traffic split: $STABLE_WEIGHT% stable, $CANARY_WEIGHT% canary"

# Optional: Store the current canary weight in a ConfigMap for tracking
kubectl get configmap canary-status -n $NAMESPACE > /dev/null 2>&1 || kubectl create configmap canary-status -n $NAMESPACE
kubectl patch configmap canary-status -n $NAMESPACE --type=merge -p "{\"data\":{\"canary-weight\":\"$CANARY_WEIGHT\"}}" 