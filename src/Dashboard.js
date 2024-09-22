import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import Vector from './images/Vector.png';
import boton from './images/boton.png'; // Importa la imagen para "Add Sensor"
import usuario from './images/usuario.png'; // Importa la imagen para "Profile"

function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <h2>SmartFarm</h2>
        <button className="summary-btn" onClick={() => navigate('/dashboard')}>
          <div className="button-content">
            <img src={Vector} alt="Icon" className="icon" />
            Summary
          </div>
        </button>
        <button className="add-sensor-btn" onClick={() => navigate('/add-sensor')}>
          <div className="button-content">
            <img src={boton} alt="Add Sensor" className="icon" />
            Add Sensor
          </div>
        </button>
        <button className="profile-btn" onClick={() => navigate('/profile')}>
          <div className="button-content">
            <img src={usuario} alt="Profile" className="icon" />
            Profile
          </div>
        </button>
      </div>
      <div className="content">
        <h1>Content</h1>
      </div>
    </div>
  );
}

export default Dashboard;
