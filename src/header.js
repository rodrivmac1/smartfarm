import React from "react";
import { useLocation } from "react-router-dom";
import "./header.css";
import { useTranslation } from 'react-i18next';

const Header = () => {
  const location = useLocation();
  const { t } = useTranslation();

  // Función para obtener el nombre de la pantalla según la ruta actual
  const getPageTitle = () => {
    switch (location.pathname) {
      case "/dashboard":
        return t('Header.dashboardRoute');
      case "/add-sensor":
        return t('Header.addSensorRoute');
      case "/profile-view": // Ruta para ProfileView
      case "/profile-edit": // Ruta para ProfileEdit
        return t('Header.profileRoute'); 
      default:
        return t('Header.unknownPageRoute');
    }
  };

  return (
    <header className="header">
      <div className="header-left">
        <span>{t('Header.dashboardRoute')} /</span> <strong>{getPageTitle()}</strong>
      </div>
      <div className="header-right">
        <i className="notification-icon">🕭</i>
      </div>
    </header>
  );
};

export default Header;
