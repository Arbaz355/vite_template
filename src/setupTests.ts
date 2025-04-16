// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
import '@testing-library/jest-dom';

// Mock environment variables
window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () {},
      removeListener: function () {},
      addEventListener: function () {},
      removeEventListener: function () {},
      dispatchEvent: function () {
        return true;
      },
    };
  };

// Mock i18n
jest.mock('react-i18next', () => ({
  useTranslation: () => {
    return {
      t: (key: string) => key,
      i18n: {
        changeLanguage: () => new Promise(() => {}),
        language: 'en',
      },
    };
  },
  initReactI18next: {
    type: '3rdParty',
    init: () => {},
  },
  Trans: ({ children }: { children: React.ReactNode }) => children,
}));

// Mock analytics services
Object.defineProperty(window, 'Sentry', {
  value: {
    init: jest.fn(),
    configureScope: jest.fn(),
    withScope: jest.fn(),
    captureException: jest.fn(),
  },
  writable: true,
});

Object.defineProperty(window, 'LogRocket', {
  value: {
    init: jest.fn(),
    track: jest.fn(),
    getSessionURL: jest.fn(),
    captureException: jest.fn(),
  },
  writable: true,
});
