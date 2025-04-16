# Deployment Strategies

This document describes the advanced deployment strategies supported by this project, including Blue-Green Deployment and Canary Deployment.

## Table of Contents

- [Overview](#overview)
- [Blue-Green Deployment](#blue-green-deployment)
  - [How It Works](#how-it-works)
  - [Configuration](#blue-green-configuration)
  - [Implementation](#blue-green-implementation)
- [Canary Deployment](#canary-deployment)
  - [How It Works](#how-it-works-1)
  - [Configuration](#canary-configuration)
  - [Implementation](#canary-implementation)
- [Choosing a Strategy](#choosing-a-strategy)
- [Troubleshooting](#troubleshooting)

## Overview

Advanced deployment strategies help minimize downtime, reduce deployment risk, and enable testing in production environments with minimal impact. This project supports:

1. **Standard Deployment** - Direct replacement of the existing version with a new one
2. **Blue-Green Deployment** - Maintaining two identical environments, only one active at a time
3. **Canary Deployment** - Gradually releasing a new version to a subset of users

## Blue-Green Deployment

### How It Works

Blue-Green deployment involves maintaining two identical production environments:

1. **Blue Environment** - One production environment (could be the current live one)
2. **Green Environment** - A parallel production environment (could be the new version)

Only one environment is live at a time, serving all production traffic. When deploying a new version:

1. The new version is deployed to the inactive environment
2. Testing is performed on the inactive environment
3. Traffic is switched from the active to the inactive environment
4. The previously active environment becomes inactive

This approach allows for:
- Immediate rollback capability by switching back to the previous environment
- Zero-downtime deployments
- Complete testing in a production-identical environment before going live

### Blue-Green Configuration

To enable Blue-Green deployments, set the following in GitLab CI/CD variables:

```
DEPLOYMENT_STRATEGY: "blue-green"
```

### Blue-Green Implementation

Our implementation uses Firebase hosting environments:

1. Two separate Firebase hosting targets are configured: `staging-blue` and `staging-green`
2. The CI/CD pipeline:
   - Determines which environment is currently inactive
   - Deploys the new version to the inactive environment
   - Verifies the deployment
   - Switches traffic to the newly deployed environment

Key CI/CD jobs:
- `deploy:staging:blue-green:prepare`: Determines active/inactive environments and deploys to inactive
- `deploy:staging:blue-green:switch`: Switches traffic to the newly deployed environment

Similar jobs exist for production deployments.

## Canary Deployment

### How It Works

Canary deployment involves gradually rolling out changes to a small subset of users before rolling it out to the entire infrastructure:

1. The new version is deployed alongside the existing version
2. A small percentage of traffic is routed to the new version
3. The new version is monitored for any issues
4. If successful, traffic is gradually increased to the new version
5. Eventually, all traffic is routed to the new version

This approach allows for:
- Testing in production with reduced risk
- Early detection of issues that might not appear in testing environments
- Gradual rollout that can be paused or reversed at any point

### Canary Configuration

To enable Canary deployments, set the following in GitLab CI/CD variables:

```
DEPLOYMENT_STRATEGY: "canary"
CANARY_WEIGHT: "10"  # Percentage of traffic (default is 10%)
```

### Canary Implementation

Our implementation uses Firebase hosting for canary deployments:

1. A separate Firebase hosting target is configured for the canary version
2. The CI/CD pipeline:
   - Deploys the new version to the canary environment
   - Routes a percentage of traffic (defined by `CANARY_WEIGHT`) to the new version
   - Monitors the canary version
   - When ready, promotes the canary to 100% of traffic

Key CI/CD jobs:
- `deploy:staging:canary`: Deploys to canary environment and configures traffic routing
- `deploy:staging:canary:promote`: Promotes canary to receive 100% of traffic

Similar jobs exist for production deployments.

## Choosing a Strategy

Select a deployment strategy based on your requirements:

| Strategy | Use When | Benefits | Considerations |
|----------|----------|----------|----------------|
| Standard | Simple applications, low-traffic services | Simplicity | Potential downtime |
| Blue-Green | Zero-downtime critical applications | Immediate rollback, zero downtime | Requires double the resources |
| Canary | New features with uncertain impact | Risk reduction, real-world testing | More complex setup, longer deployment |

## Troubleshooting

### Common Blue-Green Issues

- **Environment Discrepancies**: Ensure both environments have identical configurations
- **Database Migrations**: Consider backward compatibility for database schemas
- **Traffic Switching Failures**: Check Firebase configuration and permissions

### Common Canary Issues

- **Inconsistent User Experience**: Be mindful of session persistence when users might see different versions
- **Monitoring Challenges**: Set up proper metrics to compare performance between versions
- **Slow Rollouts**: Adjust `CANARY_WEIGHT` based on your confidence and traffic volume 