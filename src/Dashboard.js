import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <h2>SmartFarm</h2>
        <button className="summary-btn" onClick={() => navigate('/dashboard')}>
          Summary
        </button>
        <button onClick={() => navigate('/add-sensor')}>Add Sensor</button>
        <button onClick={() => navigate('/profile')}>Profile</button>
      </div>
      <div className="content">
        <h1>Content</h1>
      </div>
    </div>
  );
}

export default Dashboard;
