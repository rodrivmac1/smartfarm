import React, { useState, useEffect } from 'react';
import { useTranslation } from "react-i18next"; // Importar useTranslation
import ChartComponent from './ChartComponent';
import Widget from "./components/Widget";
import './Dashboard.css';

function Dashboard() {
  const { t } = useTranslation(); // Usar useTranslation
  const [dailyStatsData, setDailyStatsData] = useState([]);
  const [sensorStatsData, setSensorStatsData] = useState([]);
  const [error, setError] = useState(null);

  // Obtener el token del localStorage
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchDailyStatsData = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/stats/daily-stats', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setDailyStatsData(data);
        } else {
          setError(t('Dashboard.errorFetchingDailyStatsData')); // Usar traducción
        }
      } catch (error) {
        console.error('Error fetching daily stats:', error);
        setError(t('Dashboard.errorFetchingDailyStats')); // Usar traducción
      }
    };

    const fetchSensorStatsData = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/stats', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log("Data received from API:", data);  // Verificar los datos en la consola

          // Filtrar los datos para obtener solo las fechas específicas "2024-09-28" y "2024-09-29"
          const filteredData = data.filter(item => 
            item.date === "2024-09-28T06:00:00.000+00:00" || item.date === "2024-09-29T06:00:00.000+00:00"
          );
          
          if (filteredData.length > 0) {
            setSensorStatsData(filteredData);
          } else {
            setError(t('Dashboard.noDataFoundForSpecifiedDateRange')); // Usar traducción
          }
        } else {
          setError(t('Dashboard.errorFetchingSensorStatsData')); // Usar traducción
        }
      } catch (error) {
        console.error('Error fetching sensor stats:', error);
        setError(t('Dashboard.errorFetchingSensorStats')); // Usar traducción
      }
    };

    fetchDailyStatsData();
    fetchSensorStatsData();
  }, [token, t]);

  // Función para obtener el valor 'stats' de un tipo específico de sensor
  const getStatByType = (type) => {
    const sensor = sensorStatsData.find(item => item.type === type);
    return sensor ? sensor.stats : t('Dashboard.n/a'); // Usar traducción
  };

  // Preparar los datos para cada tipo de gráfico
  const prepareChartData = (type) => {
    return sensorStatsData
      .filter(item => item.type === type)
      .map(item => item.stats);
  };

  // Fechas (etiquetas) para los gráficos
  const dateLabels = [...new Set(sensorStatsData.map(item => 
    new Date(item.date).toLocaleDateString()))];  // Usar Set para evitar duplicados

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
            label={t('Dashboard.soilMoisture')} // Usar traducción
          />
        </div>
        <div className="chart-container">
          <ChartComponent 
            data={prepareChartData("Air Humidity")} 
            labels={dateLabels} 
            label={t('Dashboard.airHumidity')} // Usar traducción
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
            label={t('Dashboard.sunlight')} // Usar traducción
          />
        </div>
        <div className="chart-container">
          <ChartComponent 
            data={prepareChartData("PH Sensor")} 
            labels={dateLabels} 
            label={t('Dashboard.phLevel')} // Usar traducción
          />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
