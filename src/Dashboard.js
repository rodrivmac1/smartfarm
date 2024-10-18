import React from 'react';
import ChartComponent from './ChartComponent';
import Widget from "./components/Widget";
import './Dashboard.css';
import { useTranslation } from 'react-i18next'; 

function Dashboard() {
  const { t } = useTranslation(); 

  return (
    <div className="dashboard-content">
      {/* Fila de Widgets */}
      <div className="widgets-container">
        <div className="widgets-row">
          <Widget title={t('Dashboard.activeSensors')} value="5" change="0" isPositive={true} unit="" color="#454545" />
          <Widget title={t('Dashboard.temperature')} value="19.3" change="0.7" isPositive={true} unit="°C" color="#2E8B57" />
          <Widget title={t('Dashboard.airHumidity')} value="43" change="4.7" isPositive={false} unit="%" color="#454545" />
        </div>
      </div>

      {/* Fila de Gráficos */}
      <div className="dashboard-container grid-2x2">
        <div className="chart-container">
          <ChartComponent />
        </div>
        <div className="chart-container">
          <ChartComponent />
        </div>
      </div>

      {/* Otra fila de Widgets */}
      <div className="widgets-container">
        <div className="widgets-row">
          <Widget title={t('Dashboard.soilMoisture')} value="63" change="7.9" isPositive={true} unit="%" color="#2E8B57" />
          <Widget title={t('Dashboard.solarLight')} value="LOW" change="0" isPositive={true} unit="" color="#454545" />
          <Widget title={t('Dashboard.phLevel')} value="6.5" change="7.9" isPositive={true} unit="" color="#2E8B57" />
        </div>
      </div>

      {/* Segunda Fila de Gráficos */}
      <div className="dashboard-container grid-2x2">
        <div className="chart-container">
          <ChartComponent />
        </div>
        <div className="chart-container">
          <ChartComponent />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
