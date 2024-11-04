import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import "./header.css";

const Header = () => {
  const location = useLocation();
  const { t } = useTranslation();
  const [alerts, setAlerts] = useState([]); // Estado para almacenar las alertas
  const [hasNewAlerts, setHasNewAlerts] = useState(false); // Estado para determinar si hay nuevas alertas
  const [isNotificationOpen, setIsNotificationOpen] = useState(false); // Estado para manejar el despliegue del menú

  // Función para obtener el nombre de la pantalla según la ruta actual
  const getPageTitle = () => {
    switch (location.pathname) {
      case "/dashboard":
        return t('Header.dashboardRoute');
      case "/add-sensor":
        return t('Header.addSensorRoute');
      case "/profile-view":
      case "/profile-edit":
        return t('Header.profileRoute');
      case "/Backup":
        return t('Header.backupRoute'); // Traducción para Backup
      default:
        return t('Header.unknownPageRoute');
    }
  };

  // Función para obtener las alertas desde el API
  const fetchAlerts = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/alerts", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setAlerts(data); // Guardar las alertas en el estado
        setHasNewAlerts(data.length > 0); // Si hay alertas, establecer hasNewAlerts en true
      } else {
        console.error("Error fetching alerts");
      }
    } catch (error) {
      console.error("Error fetching alerts:", error);
    }
  };

  useEffect(() => {
    fetchAlerts(); // Llamar a fetchAlerts cuando el componente se monte
  }, []);

  // Función para alternar el menú de notificaciones
  const toggleNotifications = () => {
    setIsNotificationOpen(!isNotificationOpen);
  };

  return (
    <header className="header">
      <div className="header-left">
        <span>{t('Header.dashboardRoute')} /</span> <strong>{getPageTitle()}</strong>
      </div>
      <div className="header-right">
        <i className="notification-icon" onClick={toggleNotifications}>
          🕭
          {hasNewAlerts && <span className="notification-badge">{alerts.length}</span>}
        </i>

        {/* Mostrar el menú de notificaciones si está abierto */}
        {isNotificationOpen && (
          <div className="notification-dropdown">
            <h4>{t('Header.notifications')}</h4>
            {alerts.length > 0 ? (
              <ul>
                {alerts.map((alert, index) => (
                  <li key={index}>{alert.message}</li>
                ))}
              </ul>
            ) : (
              <p>{t('Header.noNewAlerts')}</p>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
