import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import './Dashboard.css'; // Mantén la referencia a Dashboard.css
import Footer from './footer';
import Header from './header';
import Vector from './images/Vector.png';
import boton from './images/boton.png';
import usuario from './images/usuario.png';
import { useTranslation } from 'react-i18next';

const Layout = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Obtener la ruta actual
  const { t } = useTranslation(); 

  // Función para verificar si la ruta actual coincide
  const isActive = (path) => location.pathname === path;

  return (
    <div className="dashboard-container" style={{ display: 'flex', height: '100vh' }}>
      {/* Sidebar común */}
      <div className="sidebar">
        <h2>{t('Layout.smartFarm')}</h2>

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
