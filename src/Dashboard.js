import React from 'react';
import ChartComponent from './ChartComponent'; // Asegúrate de tener este import
import Widget from "./components/Widget";
import './Dashboard.css';
import Footer from "./footer";
import Header from "./header";

function Dashboard() {
  return (
    <div className="dashboard-content">
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

      {/* Dashboard Widgets */}
      <div className="widgets-container">
        <div className="widgets-row">
          <Widget title="Active Sensors" value="5" change="0" isPositive={true} unit="" color="#454545" />
          <Widget title="Temperature" value="19.3" change="0.7" isPositive={true} unit="°C" color="#2E8B57" />
          <Widget title="Air Humidity" value="43" change="4.7" isPositive={false} unit="%" color="#454545" />
        </div>
        <div className="widgets-row">
          <Widget title="Soil Moisture" value="63" change="7.9" isPositive={true} unit="%" color="#2E8B57" />
          <Widget title="Solar Light" value="LOW" change="0" isPositive={true} unit="" color="#454545" />
          <Widget title="PH Level" value="6.5" change="7.9" isPositive={true} unit="" color="#2E8B57" />
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Dashboard;
