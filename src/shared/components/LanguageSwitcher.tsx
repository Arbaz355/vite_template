import React from 'react';
import { useI18n } from '../../core/i18n/I18nProvider';
import { useTranslation } from 'react-i18next';

interface LanguageSwitcherProps {
  className?: string;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ className = '' }) => {
  const { t } = useTranslation();
  const { currentLanguage, changeLanguage, availableLanguages } = useI18n();

  return (
    <div className={`language-switcher ${className}`}>
      <select
        value={currentLanguage}
        onChange={(e) => changeLanguage(e.target.value)}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2"
        aria-label={t('app.languageSelector')}
      >
        {availableLanguages.map((lang: { code: string; name: string }) => (
          <option key={lang.code} value={lang.code}>
            {lang.name}
          </option>
        ))}
      </select>
    </div>
  );
};
