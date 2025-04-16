#!/bin/bash
set -e

# Script to promote a canary deployment to stable
# Usage: ./promote-canary.sh [namespace]

NAMESPACE=${1:-default}

echo "Promoting canary deployment to stable in namespace $NAMESPACE"

# Get the current canary image
CANARY_IMAGE=$(kubectl get deployment app-canary -n $NAMESPACE -o jsonpath='{.spec.template.spec.containers[0].image}')

if [ -z "$CANARY_IMAGE" ]; then
  echo "❌ Failed to get canary image. Check if canary deployment exists."
  exit 1
fi

echo "Found canary image: $CANARY_IMAGE"

# Update the stable deployment with the canary image
kubectl set image deployment/app-stable -n $NAMESPACE react-app=$CANARY_IMAGE

# Wait for the rollout to complete
echo "Waiting for stable deployment to complete rollout..."
kubectl rollout status deployment/app-stable -n $NAMESPACE

# Set all traffic to stable by updating the VirtualService
echo "Redirecting all traffic to stable service..."
kubectl patch virtualservice app-routes -n $NAMESPACE --type=merge -p '{"spec":{"http":[{"route":[{"destination":{"host":"app-stable-service","port":{"number":80}},"weight":100}]}]}}'

# Update tracking ConfigMap
kubectl get configmap canary-status -n $NAMESPACE > /dev/null 2>&1 || kubectl create configmap canary-status -n $NAMESPACE
kubectl patch configmap canary-status -n $NAMESPACE --type=merge -p '{"data":{"canary-weight":"0","promotion-status":"completed"}}'

echo "✅ Canary deployment successfully promoted to stable"
echo "New stable image: $CANARY_IMAGE"
echo "All traffic (100%) now directed to stable service"