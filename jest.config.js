/** @type {import('jest').Config} */
const config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    // Handle module aliases
    '^@/(.*)$': '<rootDir>/src/$1',
    // Handle CSS imports (with CSS modules)
    '\\.module\\.(css|scss|sass)$': 'identity-obj-proxy',
    // Handle CSS imports (without CSS modules)
    '\\.(css|scss|sass)$': '<rootDir>/__mocks__/styleMock.js',
    // Handle static assets
    '\\.(jpg|jpeg|png|gif|webp|svg|ttf|woff|woff2)$': '<rootDir>/__mocks__/fileMock.js',
  },
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  transform: {
    '^.+\\.(ts|tsx)$': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.json',
      },
    ],
  },
  coveragePathIgnorePatterns: ['/node_modules/', '/__mocks__/', '/dist/'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}', '!src/**/*.d.ts', '!src/main.tsx'],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
};

export default config;
