import React, { useState, useEffect } from 'react';
import ChartComponent from './ChartComponent';
import Widget from "./components/Widget";
import './Dashboard.css';
import { useTranslation } from 'react-i18next';

function Dashboard() {
  const { t } = useTranslation(); // Para traducción
  const [dailyStatsData, setDailyStatsData] = useState([]);
  const [sensorStatsData, setSensorStatsData] = useState([]);
  const [availableDates, setAvailableDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [error, setError] = useState(null);

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchDailyStatsData = async () => {
      try {

        const response = await fetch('http://3.14.69.183:8080/api/stats/daily-stats', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
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
        const response = await fetch('http://3.14.69.183:8080/api/stats', {
          headers: {
            Authorization: `Bearer ${token}`,
          },

        });

        if (response.ok) {
          const data = await response.json();
          setSensorStatsData(data);

          // Extraer y establecer las fechas únicas disponibles
          const dates = [...new Set(data.map(item => item.date.split("T")[0]))];
          setAvailableDates(dates);

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


  // Filtrar los datos para los widgets según la fecha seleccionada
  const filteredData = selectedDate 
    ? sensorStatsData.filter(item => item.date.startsWith(selectedDate))
    : sensorStatsData;

  // Calcular el promedio para cada tipo de sensor solo cuando hay datos
  const calculateAverageByType = (type) => {
    if (!sensorStatsData.length) return "N/A"; // Retorna N/A si no hay datos

    const data = sensorStatsData.filter(item => item.type === type);
    const sum = data.reduce((acc, item) => acc + item.stats, 0);
    return data.length > 0 ? (sum / data.length).toFixed(2) : "N/A";
  };

  // Obtener el valor de un tipo de sensor, o el promedio si no hay fecha seleccionada
  const getStatByType = (type) => {
    if (selectedDate) {
      const sensor = filteredData.find(item => item.type === type);
      return sensor ? sensor.stats : "N/A";
    } else {
      return calculateAverageByType(type);
    }
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

      {/* Selector de fecha */}
      <div className="date-filter">
        <label htmlFor="dateSelect">Selecciona una fecha:</label>
        <select 
          id="dateSelect" 
          value={selectedDate} 
          onChange={(e) => setSelectedDate(e.target.value)}
        >
          <option value="">Todas las fechas</option>
          {availableDates.map(date => (
            <option key={date} value={date}>{date}</option>
          ))}
        </select>
      </div>

      {/* Fila de 3 Widgets con datos dinámicos */}
      <div className="dashboard-grid">
        <Widget title={t('Dashboard.activeSensors')} value="5" change="0" isPositive={true} unit="" color="#454545" />
        <Widget title={t('Dashboard.temperature')} value={getStatByType("Temperature")} change="0" isPositive={true} unit="°C" color="#2E8B57" />
        <Widget title={t('Dashboard.airHumidity')} value={getStatByType("Air Humidity")} change="0" isPositive={true} unit="%" color="#454545" />
      </div>

      {/* Fila de 2 Gráficos (sin filtrar) */}
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

      {/* Segunda Fila de 2 Gráficos (sin filtrar) */}
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
