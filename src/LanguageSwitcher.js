import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="footer-right">
      <a href="#" onClick={() => changeLanguage('en')}>English</a>
      <a href="#" onClick={() => changeLanguage('es')}>Español</a>
    </div>
  );
};

export default LanguageSwitcher;
