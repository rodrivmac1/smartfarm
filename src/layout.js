import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import './Dashboard.css';
import Vector from './images/Vector.png';
import boton from './images/boton.png';
import usuario from './images/usuario.png';

const Layout = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Obtener la ruta actual

  // Función para verificar si la ruta actual coincide
  const isActive = (path) => location.pathname === path;

  return (
    <div className="dashboard-container">
      {/* Sidebar común */}
      <div className="sidebar">
        <h2>SmartFarm</h2>

        {/* Botón de resumen, cambia de color si la ruta actual es /dashboard */}
        <button
          className={`summary-btn ${isActive('/dashboard') ? 'active' : ''}`}
          onClick={() => navigate('/dashboard')}
        >
          <div className="button-content">
            <img src={Vector} alt="Icon" className="icon" />
            Summary
          </div>
        </button>

        {/* Botón de agregar sensor, cambia de color si la ruta actual es /add-sensor */}
        <button
          className={`add-sensor-btn ${isActive('/add-sensor') ? 'active' : ''}`}
          onClick={() => navigate('/add-sensor')}
        >
          <div className="button-content">
            <img src={boton} alt="Add Sensor" className="icon" />
            Add Sensor
          </div>
        </button>

        {/* Botón de perfil, cambia de color si la ruta actual es /profile */}
        <button
          className={`profile-btn ${isActive('/profile') ? 'active' : ''}`}
          onClick={() => navigate('/profile')}
        >
          <div className="button-content">
            <img src={usuario} alt="Profile" className="icon" />
            Profile
          </div>
        </button>
      </div>

      {/* Outlet renderiza la página actual */}
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
