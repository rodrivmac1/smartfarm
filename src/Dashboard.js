import React from 'react';
import './Dashboard.css';
import Footer from "./footer";
import Header from "./header";
import ChartComponent from './ChartComponent'; // Asegúrate de tener este import

function Dashboard() {
  return (
    <div className="content">
      {/* Header */}
      <Header />

      {/* Gráficos del sensor en una cuadrícula 2x2 */}
      <div className="dashboard-container grid-2x2">
        <div className="chart-container">
          <ChartComponent />
        </div>
        <div className="chart-container">
          <ChartComponent />
        </div>
        <div className="chart-container">
          <ChartComponent />
        </div>
        <div className="chart-container">
          <ChartComponent />
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Dashboard;