import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next"; // Importar useTranslation
import ChartComponent from "./ChartComponent";
import Widget from "./components/Widget";
import "./Dashboard.css";

function Dashboard() {
  const { t } = useTranslation(); // Para traducción
  const [sensorStatsData, setSensorStatsData] = useState([]);
  const [availableDates, setAvailableDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [sensorTypes, setSensorTypes] = useState([]);
  const [error, setError] = useState(null);
  const [activeSensorCount, setActiveSensorCount] = useState(0); // Estado para contar los sensores activos

  const token = localStorage.getItem("token");

  useEffect(() => {
   
    const fetchSensorStatsData = async () => {
      try {
        const response = await fetch("http://3.14.69.183:8080/api/stats", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setSensorStatsData(data);

          // Actualizar tipos de sensores y fechas disponibles
          const types = [...new Set(data.map((item) => item.type))];
          setSensorTypes(types);

          const dates = [...new Set(data.map((item) => item.date.split("T")[0]))];
          setAvailableDates(dates);
        } else {
          setError(t("Dashboard.errorFetchingSensorStatsData"));
        }
      } catch (error) {
        console.error("Error fetching sensor stats:", error);
        setError(t("Dashboard.errorFetchingSensorStats"));
      }
    };

    const fetchActiveSensors = async () => {
      try {
        const response = await fetch("http://3.14.69.183:8080/api/sensors", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          // Filtrar sensores con status: true
          const activeSensors = data.filter((sensor) => sensor.status === true);
          setActiveSensorCount(activeSensors.length); // Actualizar el conteo de sensores activos
        } else {
          setError(t("Dashboard.errorFetchingSensorStats"));
        }
      } catch (error) {
        console.error("Error fetching sensors:", error);
        setError(t("Dashboard.errorFetchingSensorStats"));
      }
    };

    fetchSensorStatsData();
    fetchActiveSensors();
  }, [token]);

 

  const filteredData = selectedDate
    ? sensorStatsData.filter((item) => item.date.startsWith(selectedDate))
    : sensorStatsData;

  const calculateAverageByType = (type) => {
    if (!sensorStatsData.length) return t("Dashboard.n/a");
    const data = sensorStatsData.filter((item) => item.type === type);
    const sum = data.reduce((acc, item) => acc + item.stats, 0);
    return data.length > 0 ? (sum / data.length).toFixed(2) : t("Dashboard.n/a");
  };

  const getStatByType = (type) => {
    if (selectedDate) {
      const sensor = filteredData.find((item) => item.type === type);
      return sensor ? sensor.stats : t("Dashboard.n/a");
    } else {
      return calculateAverageByType(type);
    }
  };

  const prepareChartData = (type) => {
    return sensorStatsData
      .filter((item) => item.type === type)
      .map((item) => item.stats);
  };

  const dateLabels = [...new Set(sensorStatsData.map((item) =>
    new Date(item.date).toLocaleDateString()
  ))];

  return (
    <div className="main-content">
      {error && <p>{error}</p>}

      {/* Selector de fecha */}
      <div className="date-filter">
        <label htmlFor="dateSelect">{t("Dashboard.selectDate")}</label>
        <select
          id="dateSelect"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        >
          <option value="">{t("Dashboard.allDates")}</option>
          {availableDates.map((date) => (
            <option key={date} value={date}>
              {date}
            </option>
          ))}
        </select>
      </div>

      {/* Widget de sensores activos */}
      <div className="dashboard-grid-sensor">
        <Widget
          title={t("Dashboard.activeSensors")}
          value={activeSensorCount}
          change="0"
          isPositive={true}
          unit=""
          color="#454545"
        />
      </div>

      {/* Filas de widgets y gráficos */}
      {sensorTypes.reduce((rows, type, index) => {
        if (index % 3 === 0) {
          rows.push({ widgets: [], charts: [] });
        }

        const currentRow = rows[rows.length - 1];
        currentRow.widgets.push(
          <Widget
            key={type}
            title={t(`Dashboard.${type.toLowerCase()}`)}
            value={getStatByType(type)}
            change="0"
            isPositive={true}
            unit={type === "Temperature" ? "°C" : "%"}
            color={index % 2 === 0 ? "#454545" : "#2E8B57"}
          />
        );

        currentRow.charts.push(
          <div className="chart-container" key={`chart-${type}`}>
            <ChartComponent
              data={prepareChartData(type)}
              labels={dateLabels}
              label={t(`Dashboard.${type.toLowerCase()}`)}
            />
          </div>
        );

        return rows;
      }, []).map((row, index) => (
        <React.Fragment key={index}>
          <div className="dashboard-grid">{row.widgets}</div>
          <div className="dashboard-grid-large">{row.charts}</div>
        </React.Fragment>
      ))}
    </div>
  );
}

export default Dashboard;