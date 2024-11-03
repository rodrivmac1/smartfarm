import React from "react";
import "./footer.css";
import LanguageSwitcher from './LanguageSwitcher';
import { useTranslation } from 'react-i18next'; 
const Footer = () => {
  const { t } = useTranslation(); 

  return (
    <footer className="footer">
      <div className="footer-left">
        © 2024 SmartFarm
        <LanguageSwitcher/>
      </div>
      <div className="footer-right">
        <a href="#about">{t('Footer.about')}</a>
        <a href="#support">{t('Footer.support')}</a>
        <a href="#contact">{t('Footer.contactUs')}</a>
      </div>
    </footer>
  );
};

export default Footer;
