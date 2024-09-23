import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import './Dashboard.css'; // Ya que no tienes un archivo layout.css
import Header from './header';
import Footer from './footer';
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
      <div
        className="sidebar"
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          padding: '16px',
          width: '240px',
          backgroundColor: '#454545',
          borderRadius: '16px',
          color: 'white',
        }}
      >
        <h2 style={{ marginBottom: '20px', textAlign: 'left' }}>SmartFarm</h2>

        {/* Botón de resumen */}
        <button
          className={`summary-btn ${isActive('/dashboard') ? 'active' : ''}`}
          onClick={() => navigate('/dashboard')}
          style={{
            width: '100%',
            padding: '15px 0',
            backgroundColor: 'transparent',
            border: 'none',
            color: 'white',
            fontSize: '16px',
            cursor: 'pointer',
            borderRadius: '20px',
            marginBottom: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}
        >
          <div className="button-content" style={{ display: 'flex', alignItems: 'center', paddingLeft: '10px' }}>
            <img src={Vector} alt="Icon" className="icon" style={{ width: '35px', marginRight: '15px', backgroundColor: 'white', borderRadius: '12px', padding: '5px' }} />
            Summary
          </div>
        </button>

        {/* Botón de agregar sensor */}
        <button
          className={`add-sensor-btn ${isActive('/add-sensor') ? 'active' : ''}`}
          onClick={() => navigate('/add-sensor')}
          style={{
            width: '100%',
            padding: '15px 0',
            backgroundColor: 'transparent',
            border: 'none',
            color: 'white',
            fontSize: '16px',
            cursor: 'pointer',
            borderRadius: '20px',
            marginBottom: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}
        >
          <div className="button-content" style={{ display: 'flex', alignItems: 'center', paddingLeft: '10px' }}>
            <img src={boton} alt="Add Sensor" className="icon" style={{ width: '35px', marginRight: '15px', backgroundColor: 'white', borderRadius: '12px', padding: '5px' }} />
            Add Sensor
          </div>
        </button>

        {/* Botón de perfil */}
        <button
          className={`profile-btn ${isActive('/profile') ? 'active' : ''}`}
          onClick={() => navigate('/profile')}
          style={{
            width: '100%',
            padding: '15px 0',
            backgroundColor: 'transparent',
            border: 'none',
            color: 'white',
            fontSize: '16px',
            cursor: 'pointer',
            borderRadius: '20px',
            marginBottom: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}
        >
          <div className="button-content" style={{ display: 'flex', alignItems: 'center', paddingLeft: '10px' }}>
            <img src={usuario} alt="Profile" className="icon" style={{ width: '35px', marginRight: '15px', backgroundColor: 'white', borderRadius: '12px', padding: '5px' }} />
            Profile
          </div>
        </button>
      </div>

      {/* Main content */}
      <div className="main-content" style={{ flexGrow: 1, padding: '20px', marginLeft: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <Header />
        <Outlet />
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
