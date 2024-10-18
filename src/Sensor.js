import React, { useState } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group"; // Importamos CSSTransition y TransitionGroup
import { useTranslation } from 'react-i18next';
import "./Sensor.css";
import "./Dashboard.css"; // Importamos el estilo de los botones desde Dashboard.css

const Sensor = () => {
  const { t } = useTranslation(); 

  // Datos de los sensores conectados
  const [sensors, setSensors] = useState([
    { port: "Port 1", sensor: "Humidity", status: "CONNECTED" },
    { port: "Port 2", sensor: "Temperature", status: "CONNECTED" },
    { port: "Port 3", sensor: "Soil Moisture", status: "DISCONNECTED" },
    { port: "Port 4", sensor: "Solar Light", status: "CONNECTED" },
    { port: "Port 5", sensor: "pH Level", status: "CONNECTED" },
    { port: "Port 6", sensor: "-", status: "NOT AVAILABLE" },
  ]);

  // Tipos de sensores para la lista desplegable en la vista CREATE
  const sensorTypes = [
    t('Sensor.humidity'),
    t('Sensor.temperature'),
    t('Sensor.soilMoisture'),
    t('Sensor.solarLight'),
    t('Sensor.phLevel')
  ];

  // Estado para controlar qué contenido se muestra al hacer clic en un botón
  const [activeSection, setActiveSection] = useState('summary');

  // Estado para almacenar los sensores seleccionados en CREATE
  const [selectedSensors, setSelectedSensors] = useState({});

  // Estado para almacenar los cambios de status en UPDATE
  const [sensorStatuses, setSensorStatuses] = useState(
    sensors.reduce((acc, sensor) => {
      acc[sensor.port] = sensor.status;
      return acc;
    }, {})
  );

  // Manejar cambio en la lista desplegable en CREATE
  const handleSensorChange = (port, sensorType) => {
    setSelectedSensors({
      ...selectedSensors,
      [port]: sensorType,
    });
  };

  // Manejar cambio de estado en UPDATE
  const handleStatusChange = (port, status) => {
    setSensorStatuses({
      ...sensorStatuses,
      [port]: status,
    });
  };

  // Manejar eliminación de sensores en DELETE
  const handleDeleteSensor = (port) => {
    const updatedSensors = sensors.map((sensor) =>
      sensor.port === port ? { ...sensor, sensor: "-", status: "NOT AVAILABLE" } : sensor
    );
    setSensors(updatedSensors);
  };

  // Renderiza las diferentes secciones CREATE, UPDATE, READ y DELETE
  const renderContent = () => {
    switch (activeSection) {
      case 'summary':
        return (
          <div key="summary">
            <h2 className="sensor-title">{t('Sensor.sensorsConnected')}</h2>
            <table className="sensor-table">
              <thead>
                <tr>
                  <th>{t('Sensor.sensor')}</th>
                  <th>{t('Sensor.port')}</th>
                  <th>{t('Sensor.working')}</th>
                </tr>
              </thead>
              <tbody>
                {sensors.map((sensor, index) => (
                  <tr key={index}>
                    <td>{sensor.sensor}</td>
                    <td>{sensor.port}</td>
                    <td
                      className={
                        sensor.status === "CONNECTED"
                          ? "status-ok"
                          : "status-not-available"
                      }
                    >
                      {sensor.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      case 'create':
        const availablePorts = sensors.filter(sensor => sensor.sensor === "-");
        return (
          <div key="create">
            <h2 className="sensor-title">{t('Sensor.assignSensor')}</h2>
            <table className="sensor-table">
              <thead>
                <tr>
                  <th>{t('Sensor.port')}</th>
                  <th>{t('Sensor.sensorType')}</th>
                </tr>
              </thead>
              <tbody>
                {availablePorts.map((sensor, index) => (
                  <tr key={index}>
                    <td>{sensor.port}</td>
                    <td>
                      <select
                        onChange={(e) => handleSensorChange(sensor.port, e.target.value)}
                        value={selectedSensors[sensor.port] || ""}
                      >
                        <option value="" disabled>{t('Sensor.selectSensor')}</option>
                        {sensorTypes.map((type, idx) => (
                          <option key={idx} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button className="save-button" onClick={() => console.log('Selected Sensors:', selectedSensors)}>
              {t('Sensor.saveChanges')}
            </button>
          </div>
        );
      case 'update':
        return (
          <div key="update">
            <h2 className="sensor-title">{t('Sensor.modifySensorStatus')}</h2>
            <table className="sensor-table">
              <thead>
                <tr>
                  <th>{t('Sensor.sensor')}</th>
                  <th>{t('Sensor.port')}</th>
                  <th>{t('Sensor.status')}</th>
                </tr>
              </thead>
              <tbody>
                {sensors.map((sensor, index) => (
                  <tr key={index}>
                    <td>{sensor.sensor}</td>
                    <td>{sensor.port}</td>
                    <td>
                      {sensor.status === "NOT AVAILABLE" ? (
                        sensor.status
                      ) : (
                        <select
                          value={sensorStatuses[sensor.port]}
                          onChange={(e) =>
                            handleStatusChange(sensor.port, e.target.value)
                          }
                        >
                          <option value="CONNECTED">{t('Sensor.connected')}</option>
                          <option value="DISCONNECTED">{t('Sensor.disconnected')}</option>
                        </select>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button
              className="save-button"
              onClick={() => console.log("Updated Sensor Statuses:", sensorStatuses)}
            >
              {t('Sensor.saveChanges')}
            </button>
          </div>
        );
      case 'delete':
        return (
          <div key="delete">
            <h2 className="sensor-title">{t('Sensor.deleteSensors')}</h2>
            <table className="sensor-table">
              <thead>
                <tr>
                  <th>{t('Sensor.sensor')}</th>
                  <th>{t('Sensor.port')}</th>
                  <th>{t('Sensor.delete')}</th> {/* Cambia el encabezado a Delete */}
                </tr>
              </thead>
              <tbody>
                {sensors.map((sensor, index) => (
                  <tr key={index}>
                    <td>{sensor.sensor}</td>
                    <td>{sensor.port}</td>
                    <td>
                      {sensor.status === "NOT AVAILABLE" ? (
                        sensor.status
                      ) : (
                        <button
                          className="delete-button1"
                          onClick={() => handleDeleteSensor(sensor.port)}
                        >
                          🗑
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button
              className="save-button"
              onClick={() => console.log("Sensors after delete:", sensors)}
            >
              {t('Sensor.saveChanges')}
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="sensor-content">
      <div className="button-row">
        <button
          className={`create-btn ${activeSection === 'create' ? 'active' : ''}`}
          onClick={() => setActiveSection('create')}
        >
          <div className="button-content">{t('Sensor.addSensor')}</div>
        </button>

        <button
          className={`summary-btn ${activeSection === 'summary' ? 'active' : ''}`}
          onClick={() => setActiveSection('summary')}
        >
          <div className="button-content">{t('Sensor.sensorsSummary')}</div>
        </button>

        <button
          className={`update-btn ${activeSection === 'update' ? 'active' : ''}`}
          onClick={() => setActiveSection('update')}
        >
          <div className="button-content">{t('Sensor.modifySensorStatus')}</div>
        </button>

        <button
          className={`delete-btn ${activeSection === 'delete' ? 'active' : ''}`}
          onClick={() => setActiveSection('delete')}
        >
          <div className="button-content">{t('Sensor.deleteSensors')}</div>
        </button>
      </div>

      <TransitionGroup className="content-section">
        <CSSTransition
          key={activeSection} // clave para identificar la sección
          timeout={300}
          classNames="fade"
        >
          {renderContent()}
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
};

export default Sensor;
