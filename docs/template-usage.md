# Using as a Project Template

This React Enterprise Application is designed to be used as a template for new projects. This guide explains different ways to use it as a foundation for your own applications.

## Available Methods

### 1. GitHub Template Repository

This project can be set up as a GitHub template repository, allowing you to create new repositories with the same directory structure and files.

#### Setup as template:

1. Push your project to GitHub
2. Go to repository settings
3. Check "Template repository" option under "Repository details"

#### Using the template:

```bash
# Create a new repository from the template through GitHub UI
# Then clone your new repository
git clone https://github.com/yourusername/new-project-name.git
cd new-project-name
npm install
```

### 2. Create-React-App Template

You can convert this project into a custom Create-React-App template for easy reuse.

#### Creating the template:

1. Create a new repository named `cra-template-enterprise-react`
2. Restructure following [CRA template guidelines](https://create-react-app.dev/docs/custom-templates/)
   - Move core files to `template/` directory
   - Create a `template.json` with dependencies
3. Publish to npm:
   ```bash
   npm publish
   ```

#### Using the template:

```bash
npx create-react-app my-app --template enterprise-react
```

### 3. Vite Template

For projects using Vite, you can create a custom template.

#### Creating the template:

1. Structure your template in a dedicated directory (e.g., `vite-template/`)
2. Include a base `package.json`, configuration files, and source structure
3. Push to GitHub

#### Using the template:

```bash
# Create a new project directly from the GitHub repo
npm create vite@latest my-app -- --template github:yourusername/react-enterprise-app/vite-template

# Or if published to npm
npm create vite@latest my-app -- --template enterprise-react
```

### 4. Degit (Lightweight Cloning)

Degit provides a quick way to clone the repository without git history.

```bash
# Install degit if you haven't already
npm install -g degit

# Create a new project from your template
degit yourusername/react-enterprise-app my-new-project
cd my-new-project
npm install
```

### 5. Custom CLI Tool

For the most flexibility, you can create a custom CLI that sets up the project with configurable options.

#### Example implementation:

1. Create a CLI tool using a framework like Commander.js
2. Add options to include/exclude features (auth, API, SEO, etc.)
3. Publish to npm

#### Using the CLI:

```bash
# Install the CLI
npm install -g react-enterprise-cli

# Create a new project with selected features
react-enterprise-cli create my-app --features auth,api,seo --skip storage,pageMeta
```

## Customization Guide

When using this template, consider customizing the following:

### 1. Project Configuration

- Update `package.json` with your project details
- Configure environment variables in `.env` files
- Adjust build configuration in `vite.config.ts`

### 2. Feature Selection

You may not need all features for every project. Consider removing:

- Authentication if building a public site without user accounts
- Role-based guards if not dealing with different permission levels
- SEO components for internal applications

### 3. API Configuration

- Update API base URL in environment variables
- Adjust interceptors based on your backend requirements
- Modify API response types to match your backend structure

### 4. Design System Integration

This template is UI-framework agnostic. To integrate with UI libraries:

- For Tailwind CSS: Keep the existing configuration
- For Material UI: Add MUI dependencies and set up theming
- For Chakra UI: Install Chakra and set up the provider

## Examples

### Minimal Setup (Public Website)

```bash
degit yourusername/react-enterprise-app my-public-site
cd my-public-site

# Remove authentication and guards
rm -rf src/core/auth
rm -rf src/core/router/guards
rm -rf src/features/auth

# Keep SEO and responsive images
# Update dependencies
npm install
```

### Full-Featured Application

```bash
degit yourusername/react-enterprise-app my-saas-app
cd my-saas-app

# Keep all features
# Add additional dependencies as needed
npm install @tanstack/react-query axios react-hook-form zod
```

## Best Practices

- Start with the minimal setup and add features as needed
- Keep the core architecture for consistency
- Document any significant changes from the template
- Maintain the separation of concerns between core and features
- Update dependencies regularly to keep the project secure 