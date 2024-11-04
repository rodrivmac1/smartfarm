import React, { useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import './Dashboard.css'; // Mantén la referencia a Dashboard.css
import Footer from './footer';
import Header from './header';
import Vector from './images/dashboard.svg';
import boton from './images/add.svg';
import usuario from './images/profile.svg';
import logOut from './images/out.svg';
import backup from './images/backup.svg';
import { useTranslation } from 'react-i18next';

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Estado para controlar la visibilidad de la barra lateral
  const navigate = useNavigate();
  const location = useLocation(); // Obtener la ruta actual
  const { t } = useTranslation(); 

  // Función para verificar si la ruta actual coincide
  const isActive = (path) => location.pathname === path;

  // Función para alternar la visibilidad de la barra lateral
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Función para manejar el logout
  const handleLogout = () => {
    // Aquí puedes agregar la lógica para limpiar el estado de autenticación, eliminar tokens, etc.
    localStorage.removeItem('token'); // Por ejemplo, eliminamos el token de autenticación
    navigate('/login'); // Redirigir a la página de inicio de sesión
  };

  return (
    <div className="dashboard-container" style={{ display: 'flex', height: '100vh' }}>
      {/* Sidebar común */}
      <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <h2>SmartFarm</h2>

        {/* Asa para abrir/cerrar la barra lateral */}
        <div className="sidebar-handle" onClick={toggleSidebar}></div>

        {/* Botón de resumen */}
        <button
          className={`summary-btn ${isActive('/dashboard') ? 'active' : ''}`} // Añadir clase "active" cuando sea la ruta activa
          onClick={() => navigate('/dashboard')}
        >
          <div className="button-content">
            <img src={Vector} alt="Icon" className="icon" />
            {t('Layout.summary')}
          </div>
        </button>

        {/* Botón de agregar sensor */}
        <button
          className={`add-sensor-btn ${isActive('/add-sensor') ? 'active' : ''}`} // Añadir clase "active" cuando sea la ruta activa
          onClick={() => navigate('/add-sensor')}
        >
          <div className="button-content">
            <img src={boton} alt="Add Sensor" className="icon" />
            {t('Layout.sensors')}
          </div>
        </button>

        {/* Botón de perfil */}
        <button
          className={`profile-btn ${isActive('/profile-view') ? 'active' : ''}`} // Añadir clase "active" cuando sea la ruta activa
          onClick={() => navigate('/profile-view')}  // Navegar a la vista ProfileView
        >
          <div className="button-content">
            <img src={usuario} alt="Profile" className="icon" />
            {t('Layout.profile')}
          </div>
        </button>

        {/* Botón de Backup */}
        <button
          className={`backup-btn ${isActive('/Backup') ? 'active' : ''}`} // Añadir clase "active" cuando sea la ruta activa
          onClick={() => navigate('/Backup')}  // Navegar a la vista BackupView
        >
          <div className="button-content">
            <img src={backup} alt="Backup" className="icon" />
            {t('Layout.backup')}
          </div>
        </button>

        {/* Botón de Logout */}
        <button
          className="logout-btn" // Clase específica para el botón de logout
          onClick={() => navigate('')}
        >
          <div className="button-content">
            <img src={logOut} alt="Logout" className="icon" />
            {t('Layout.logout')}
          </div>
        </button>
      </div>

      {/* Main content */}
      <div className="main-content">
        <Header />
        <Outlet />
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
