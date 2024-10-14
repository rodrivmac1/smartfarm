import React from "react";
import { useLocation } from "react-router-dom";
import "./header.css";

const Header = () => {
  const location = useLocation();

  // Función para obtener el nombre de la pantalla según la ruta actual
  const getPageTitle = () => {
    switch (location.pathname) {
      case "/dashboard":
        return "Dashboard";
      case "/add-sensor":
        return "Sensors";
      case "/profile-view": // Ruta para ProfileView
      case "/profile-edit": // Ruta para ProfileEdit
        return "Profile";
      default:
        return "Unknown Page"; // En caso de que la ruta no coincida
    }
  };

  return (
    <header className="header">
      <div className="header-left">
        <span>Dashboards /</span> <strong>{getPageTitle()}</strong>
      </div>
      <div className="header-right">
        <i className="notification-icon">🕭</i>
      </div>
    </header>
  );
};

export default Header;
