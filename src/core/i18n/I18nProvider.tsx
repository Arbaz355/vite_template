import React, { ReactNode, useEffect } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n, { initialize, supportedLanguages } from './index';
import { createContext, useContext, useState } from 'react';

// Create a context for language management
interface I18nContextType {
  currentLanguage: string;
  changeLanguage: (lang: string) => Promise<void>;
  availableLanguages: typeof supportedLanguages;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

// Hook to use the i18n context
export const useI18n = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
};

interface I18nProviderProps {
  children: ReactNode;
}

export const I18nProvider: React.FC<I18nProviderProps> = ({ children }) => {
  // Initialize i18n if it hasn't been initialized yet
  useEffect(() => {
    if (!i18n.isInitialized) {
      initialize();
    }
  }, []);

  // State to track the current language
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language || 'en');

  // Function to change language
  const changeLanguage = async (lang: string) => {
    await i18n.changeLanguage(lang);
    setCurrentLanguage(lang);
    // Store the language preference
    localStorage.setItem('i18nextLng', lang);
    // Update document attributes for accessibility
    document.documentElement.lang = lang;
    document.documentElement.dir = ['ar', 'he'].includes(lang) ? 'rtl' : 'ltr';
  };

  // Context value
  const value = {
    currentLanguage,
    changeLanguage,
    availableLanguages: supportedLanguages,
  };

  // Only render children when i18n is initialized
  if (!i18n.isInitialized) {
    return null; // Or a loading indicator
  }

  return (
    <I18nContext.Provider value={value}>
      <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
    </I18nContext.Provider>
  );
};
