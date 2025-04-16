#!/bin/bash
set -e

# Script to switch between blue and green deployments
# Usage: ./switch-blue-green.sh [namespace] [blue|green]

NAMESPACE=${1:-default}
TARGET_ENV=${2:-blue}

# Validate input
if [[ "$TARGET_ENV" != "blue" && "$TARGET_ENV" != "green" ]]; then
  echo "Error: Target environment must be 'blue' or 'green'"
  exit 1
fi

echo "Switching to $TARGET_ENV environment in namespace $NAMESPACE"

# Update the service selector to point to the target environment
kubectl patch service app-service -n $NAMESPACE -p "{\"spec\":{\"selector\":{\"environment\":\"$TARGET_ENV\"}}}"

# Check if the service was updated successfully
if kubectl get service app-service -n $NAMESPACE -o jsonpath='{.spec.selector.environment}' | grep -q "$TARGET_ENV"; then
  echo "✅ Service successfully switched to $TARGET_ENV environment"
else
  echo "❌ Failed to switch service to $TARGET_ENV environment"
  exit 1
fi

# Store the current active environment in a ConfigMap for tracking
kubectl get configmap deployment-status -n $NAMESPACE > /dev/null 2>&1 || kubectl create configmap deployment-status -n $NAMESPACE
kubectl patch configmap deployment-status -n $NAMESPACE --type=merge -p "{\"data\":{\"active-environment\":\"$TARGET_ENV\"}}"

echo "Current active environment: $TARGET_ENV"
echo "Inactive environment: $([ "$TARGET_ENV" == "blue" ] && echo "green" || echo "blue")" 