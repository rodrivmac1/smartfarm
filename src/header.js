import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./header.css";

const Header = () => {
  const location = useLocation();
  const [alerts, setAlerts] = useState([]); // Estado para almacenar las alertas
  const [hasNewAlerts, setHasNewAlerts] = useState(false); // Estado para determinar si hay nuevas alertas
  const [isNotificationOpen, setIsNotificationOpen] = useState(false); // Estado para manejar el despliegue del menú

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

  // Función para obtener las alertas desde el API
  const fetchAlerts = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/alerts", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Suponiendo que se necesita un token
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
        <span>Dashboards /</span> <strong>{getPageTitle()}</strong>
      </div>
      <div className="header-right">
        <i className="notification-icon" onClick={toggleNotifications}>
          🕭
          {hasNewAlerts && <span className="notification-badge">{alerts.length}</span>}
        </i>

        {/* Mostrar el menú de notificaciones si está abierto */}
        {isNotificationOpen && (
          <div className="notification-dropdown">
            <h4>Notifications</h4>
            {alerts.length > 0 ? (
              <ul>
                {alerts.map((alert, index) => (
                  <li key={index}>{alert.message}</li>
                ))}
              </ul>
            ) : (
              <p>No new alerts</p>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
