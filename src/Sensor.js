import React, { useState } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group"; // Importamos CSSTransition y TransitionGroup
import { useTranslation } from 'react-i18next';
import "./Sensor.css";
import "./Dashboard.css"; 

const Sensor = () => {
  const { t } = useTranslation(); 

  
  const [sensors, setSensors] = useState([
    { port: 'Sensor.port1', sensor: 'Sensor.humidity', status: 'Sensor.connected' },
    { port: 'Sensor.port2', sensor: 'Sensor.temperature', status: 'Sensor.connected' },
    { port: 'Sensor.port3', sensor: 'Sensor.soilMoisture', status: 'Sensor.disconnected' },
    { port: 'Sensor.port4', sensor: 'Sensor.solarLight', status: 'Sensor.connected' },
    { port: 'Sensor.port5', sensor: 'Sensor.phLevel', status: 'Sensor.connected' },
    { port: 'Sensor.port6', sensor: '-', status: 'Sensor.notAvailable' }
  ]);

  // Tipos de sensores para la lista desplegable en la vista CREATE
  const sensorTypes = [
    'Sensor.humidity',
    'Sensor.temperature',
    'Sensor.soilMoisture',
    'Sensor.solarLight',
    'Sensor.phLevel'
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
      sensor.port === port ? { ...sensor, sensor: "-", status: "Sensor.notAvailable" } : sensor
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
                    <td>{sensor.sensor !== '-' ? t(sensor.sensor) : '-'}</td>
                    <td>{t(sensor.port)}</td>
                    <td
                      className={
                        sensor.status === 'Sensor.connected'
                          ? 'status-ok'
                          : 'status-not-available'
                      }
                    >
                      {t(sensor.status)}
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
                    <td>{t(sensor.port)}</td>
                    <td>
                      <select
                        onChange={(e) => handleSensorChange(sensor.port, e.target.value)}
                        value={selectedSensors[sensor.port] || ""}
                      >
                        <option value="" disabled>{t('Sensor.selectSensor')}</option>
                        {sensorTypes.map((type, idx) => (
                          <option key={idx} value={type}>
                            {t(type)}
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
                    <td>{sensor.sensor !== '-' ? t(sensor.sensor) : '-'}</td>
                    <td>{t(sensor.port)}</td>
                    <td>
                      {sensor.status === "Sensor.notAvailable" ? (
                        t(sensor.status)
                      ) : (
                        <select
                          value={sensorStatuses[sensor.port]}
                          onChange={(e) =>
                            handleStatusChange(sensor.port, e.target.value)
                          }
                        >
                          <option value="Sensor.connected">{t('Sensor.connected')}</option>
                          <option value="Sensor.disconnected">{t('Sensor.disconnected')}</option>
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
                    <td>{sensor.sensor !== '-' ? t(sensor.sensor) : '-'}</td>
                    <td>{t(sensor.port)}</td>
                    <td>
                      {sensor.status === "Sensor.notAvailable" ? (
                        t(sensor.status)
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
