# Deployment Guide

This document provides instructions for deploying the application using Docker and Kubernetes.

## Table of Contents

- [Docker Deployment](#docker-deployment)
  - [Development Environment](#development-environment)
  - [Production Environment](#production-environment)
  - [Environment Variables](#environment-variables)
- [Kubernetes Deployment](#kubernetes-deployment)
  - [Prerequisites](#prerequisites)
  - [Development Deployment](#development-deployment)
  - [Production Deployment](#production-deployment)
  - [Configuration](#configuration)
- [Continuous Integration and Deployment](#continuous-integration-and-deployment)

## Docker Deployment

### Development Environment

To run the application in a development environment:

```bash
# Build and start the development container
docker-compose up dev
```

This will:
- Mount your local code to the container
- Watch for changes and hot-reload
- Run on http://localhost:3000

### Production Environment

To build and run the production-optimized container:

```bash
# Build the production image
docker build -t react-app:latest .

# Run the production container
docker run -p 80:80 react-app:latest
```

Alternatively, use docker-compose:

```bash
# Build and run the production container
docker-compose up prod
```

This will:
- Create an optimized production build
- Serve the app through Nginx
- Run on http://localhost:80

### Environment Variables

Docker containers use environment variables from the `.env` files. You can override them at runtime:

```bash
# Run with custom environment variables
docker run -p 80:80 \
  -e VITE_ENABLE_ANALYTICS=true \
  -e VITE_SENTRY_DSN=your-sentry-dsn \
  react-app:latest
```

## Kubernetes Deployment

### Prerequisites

- Kubernetes cluster (local or cloud provider)
- kubectl CLI tool
- kustomize CLI tool (or kubectl with kustomize support)

### Development Deployment

Deploy to development environment:

```bash
kubectl apply -k kubernetes/overlays/dev
```

This creates:
- A deployment with 1 replica
- A ClusterIP service
- ConfigMap with development settings

### Production Deployment

Deploy to production environment:

```bash
kubectl apply -k kubernetes/overlays/prod
```

This creates:
- A deployment with 2 replicas
- A ClusterIP service
- An Ingress for external access
- ConfigMap with production settings
- TLS setup with cert-manager

### Configuration

The Kubernetes manifests are organized using Kustomize:

- `kubernetes/base/`: Base resources
  - `deployment.yaml`: Main application deployment
  - `service.yaml`: Service for pod access
  - `configmap.yaml`: Common configuration
  - `kustomization.yaml`: Base kustomization file

- `kubernetes/overlays/dev/`: Development environment
  - `configmap.yaml`: Development-specific config
  - `kustomization.yaml`: Development customizations

- `kubernetes/overlays/prod/`: Production environment
  - `configmap.yaml`: Production-specific config
  - `ingress.yaml`: Ingress for external access
  - `kustomization.yaml`: Production customizations

## Continuous Integration and Deployment

### CI Pipeline

The application is set up for continuous integration with:

1. Code linting and formatting checks
2. Unit and integration tests
3. Static code analysis with SonarQube
4. Container image building and scanning

### CD Pipeline

Continuous deployment to Kubernetes:

1. Development branch changes are automatically deployed to dev environment
2. Tagged releases are deployed to production after manual approval
3. Rollback mechanism available through Kubernetes deployment revisions

For details on setting up CI/CD pipelines, see the configuration files in your CI system (GitHub Actions, GitLab CI, Jenkins, etc.). 