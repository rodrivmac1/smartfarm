import React, { useState, useEffect } from 'react';
import ChartComponent from './ChartComponent';
import Widget from "./components/Widget";
import './Dashboard.css';
import { useTranslation } from 'react-i18next';

function Dashboard() {
  const { t } = useTranslation(); // Para traducción
  const [dailyStatsData, setDailyStatsData] = useState([]);
  const [sensorStatsData, setSensorStatsData] = useState([]);
  const [error, setError] = useState(null);

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchDailyStatsData = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/stats/daily-stats', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.ok) {
          const data = await response.json();
          setDailyStatsData(data);
        } else {
          setError('Error fetching daily stats data');
        }
      } catch (error) {
        console.error('Error fetching daily stats:', error);
        setError('Error fetching daily stats');
      }
    };

    const fetchSensorStatsData = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/stats', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.ok) {
          const data = await response.json();
          const filteredData = data.filter(item =>
            item.date === "2024-09-28T06:00:00.000+00:00" || item.date === "2024-09-29T06:00:00.000+00:00"
          );

          if (filteredData.length > 0) {
            setSensorStatsData(filteredData);
          } else {
            setError('No data found for the specified date range');
          }
        } else {
          setError('Error fetching sensor stats data');
        }
      } catch (error) {
        console.error('Error fetching sensor stats:', error);
        setError('Error fetching sensor stats');
      }
    };

    fetchDailyStatsData();
    fetchSensorStatsData();
  }, [token]);

  const getStatByType = (type) => {
    const sensor = sensorStatsData.find(item => item.type === type);
    return sensor ? sensor.stats : "N/A";
  };

  const prepareChartData = (type) => {
    return sensorStatsData
      .filter(item => item.type === type)
      .map(item => item.stats);
  };

  const dateLabels = [...new Set(sensorStatsData.map(item => 
    new Date(item.date).toLocaleDateString()))];

  return (
    <div className="main-content">
      {error && <p>{error}</p>}

      {/* Fila de 3 Widgets con datos dinámicos */}
      <div className="dashboard-grid">
        <Widget title={t('Dashboard.activeSensors')} value="5" change="0" isPositive={true} unit="" color="#454545" />
        <Widget title={t('Dashboard.temperature')} value={getStatByType("Temperature")} change="0" isPositive={true} unit="°C" color="#2E8B57" />
        <Widget title={t('Dashboard.airHumidity')} value={getStatByType("Air Humidity")} change="0" isPositive={true} unit="%" color="#454545" />
      </div>

      {/* Fila de 2 Gráficos */}
      <div className="dashboard-grid-large">
        <div className="chart-container">
          <ChartComponent 
            data={prepareChartData("Soil Moisture")} 
            labels={dateLabels} 
            label={t('Dashboard.soilMoisture')}
          />
        </div>
        <div className="chart-container">
          <ChartComponent 
            data={prepareChartData("Air Humidity")} 
            labels={dateLabels} 
            label={t('Dashboard.airHumidity')}
          />
        </div>
      </div>

      {/* Otra Fila de 3 Widgets con datos dinámicos */}
      <div className="dashboard-grid">
        <Widget title={t('Dashboard.phLevel')} value={getStatByType("PH Sensor")} change="0" isPositive={true} unit="" color="#2E8B57" />
        <Widget title={t('Dashboard.soilMoisture')} value={getStatByType("Soil Moisture")} change="0" isPositive={true} unit="%" color="#2E8B57" />
        <Widget title={t('Dashboard.solarLight')} value={getStatByType("Sunlight")} change="0" isPositive={true} unit="" color="#454545" />
      </div>

      {/* Segunda Fila de 2 Gráficos */}
      <div className="dashboard-grid-large">
        <div className="chart-container">
          <ChartComponent 
            data={prepareChartData("Sunlight")} 
            labels={dateLabels} 
            label={t('Dashboard.solarLight')}
          />
        </div>
        <div className="chart-container">
          <ChartComponent 
            data={prepareChartData("PH Sensor")} 
            labels={dateLabels} 
            label={t('Dashboard.phLevel')}
          />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
