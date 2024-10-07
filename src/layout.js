import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import './Dashboard.css'; // Mantén la referencia a Dashboard.css
import Footer from './footer';
import Header from './header';
import Vector from './images/Vector.png';
import boton from './images/boton.png';
import usuario from './images/usuario.png';

const Layout = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Obtener la ruta actual

  // Función para verificar si la ruta actual coincide
  const isActive = (path) => location.pathname === path;

  return (
    <div className="dashboard-container" style={{ display: 'flex', height: '100vh' }}>
      {/* Sidebar común */}
      <div className="sidebar">
        <h2>SmartFarm</h2>

        {/* Botón de resumen */}
        <button
          className={`summary-btn ${isActive('/dashboard') ? 'active' : ''}`} // Añadir clase "active" cuando sea la ruta activa
          onClick={() => navigate('/dashboard')}
        >
          <div className="button-content">
            <img src={Vector} alt="Icon" className="icon" />
            Summary
          </div>
        </button>

        {/* Botón de agregar sensor */}
        <button
          className={`add-sensor-btn ${isActive('/add-sensor') ? 'active' : ''}`} // Añadir clase "active" cuando sea la ruta activa
          onClick={() => navigate('/add-sensor')}
        >
          <div className="button-content">
            <img src={boton} alt="Add Sensor" className="icon" />
            Sensors
          </div>
        </button>

        {/* Botón de perfil */}
        <button
          className={`profile-btn ${isActive('/profile-view') ? 'active' : ''}`} // Añadir clase "active" cuando sea la ruta activa
          onClick={() => navigate('/profile-view')}  // Navegar a la vista ProfileView
        >
          <div className="button-content">
            <img src={usuario} alt="Profile" className="icon" />
            Profile
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
