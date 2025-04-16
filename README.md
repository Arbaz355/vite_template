# Vite React TypeScript Template with Tailwind CSS

A modern frontend template using Vite, React, TypeScript, and Tailwind CSS.

## Features

- ⚡️ [Vite](https://vitejs.dev/) - Next Generation Frontend Tooling
- ⚛️ [React](https://reactjs.org/) - A JavaScript library for building user interfaces
- 🔒 [TypeScript](https://www.typescriptlang.org/) - JavaScript with syntax for types
- 🎨 [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework
- 📦 [@tailwindcss/vite](https://github.com/tailwindlabs/tailwindcss) - Official Tailwind CSS Vite plugin

## Getting Started

### Prerequisites

- Node.js (v18+)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/your-repo-name.git
cd your-repo-name

# Install dependencies
npm install
```

### Development

```bash
# Start the development server
npm run dev
```

### Build

```bash
# Build for production
npm run build
```

### Preview Production Build

```bash
# Preview the production build
npm run preview
```

## Project Structure

```
/
├── node_modules/       # Dependencies
├── public/             # Static assets
├── src/                # Application source code
│   ├── assets/         # Images, fonts, etc.
│   ├── index.css       # Global CSS and Tailwind imports
│   ├── App.tsx         # Main application component
│   └── main.tsx        # Application entry point
├── index.html          # HTML template
├── package.json        # Project metadata
├── tsconfig.json       # TypeScript configuration
└── vite.config.ts      # Vite configuration
```

## Customizing Tailwind CSS

This template uses Tailwind CSS v4 with the `@tailwindcss/vite` plugin for optimal performance. No PostCSS configuration is required.

## License

MIT
