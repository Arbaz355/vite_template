import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import { env } from '../config/env';

// Import translations directly for bundling with application
import enCommon from './locales/en/common.json';
import enErrors from './locales/en/errors.json';
import esCommon from './locales/es/common.json';
import esErrors from './locales/es/errors.json';

export const defaultNS = 'common';
export const resources = {
  en: {
    common: enCommon,
    errors: enErrors,
  },
  es: {
    common: esCommon,
    errors: esErrors,
  },
} as const;

export const supportedLanguages = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' },
];

/**
 * Initialize i18n for the application
 */
export const initialize = () => {
  i18n
    // Load translations from backend in development
    .use(env.isDevelopment ? Backend : null)
    // Detect user language
    .use(LanguageDetector)
    // Pass the i18n instance to react-i18next
    .use(initReactI18next)
    // Initialize i18next
    .init({
      supportedLngs: supportedLanguages.map((lang) => lang.code),
      fallbackLng: 'en',
      debug: env.isDevelopment,
      ns: ['common', 'errors'],
      defaultNS,
      interpolation: {
        escapeValue: false, // React already escapes by default
      },
      // Preloaded resources (for production)
      resources: !env.isDevelopment ? resources : {},
      // Backend options (for development)
      backend: {
        loadPath: '/locales/{{lng}}/{{ns}}.json',
      },
      detection: {
        order: ['localStorage', 'navigator'],
        caches: ['localStorage'],
      },
    });

  return i18n;
};

// Export the initialized i18n instance
export default i18n;
