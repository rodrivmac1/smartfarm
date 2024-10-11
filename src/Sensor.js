import React, { useState } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group"; // Importamos CSSTransition y TransitionGroup
import "./Sensor.css";
import "./Dashboard.css"; // Importamos el estilo de los botones desde Dashboard.css

const Sensor = () => {
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
  const sensorTypes = ["Humidity", "Temperature", "Soil Moisture", "Solar Light", "pH Level"];

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
            <h2 className="sensor-title">Sensors Connected</h2>
            <table className="sensor-table">
              <thead>
                <tr>
                  <th>Sensor</th>
                  <th>Port</th>
                  <th>Working</th>
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
            <h2 className="sensor-title">Assign Sensor to Available Ports</h2>
            <table className="sensor-table">
              <thead>
                <tr>
                  <th>Port</th>
                  <th>Sensor Type</th>
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
                        <option value="" disabled>Select Sensor</option>
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
              Save Changes
            </button>
          </div>
        );
      case 'update':
        return (
          <div key="update">
            <h2 className="sensor-title">Update Sensor Status</h2>
            <table className="sensor-table">
              <thead>
                <tr>
                  <th>Sensor</th>
                  <th>Port</th>
                  <th>Status</th>
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
                          <option value="CONNECTED">CONNECTED</option>
                          <option value="DISCONNECTED">DISCONNECTED</option>
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
              Save Changes
            </button>
          </div>
        );
      case 'delete':
        return (
          <div key="delete">
            <h2 className="sensor-title">Delete Sensors</h2>
            <table className="sensor-table">
              <thead>
                <tr>
                  <th>Sensor</th>
                  <th>Port</th>
                  <th>Delete</th> {/* Cambia el encabezado a Delete */}
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
              Save Changes
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
          <div className="button-content">Add Sensor</div>
        </button>

        <button
          className={`summary-btn ${activeSection === 'summary' ? 'active' : ''}`}
          onClick={() => setActiveSection('summary')}
        >
          <div className="button-content">Sensors Summary</div>
        </button>

        <button
          className={`update-btn ${activeSection === 'update' ? 'active' : ''}`}
          onClick={() => setActiveSection('update')}
        >
          <div className="button-content">Modify Sensors Status</div>
        </button>

        <button
          className={`delete-btn ${activeSection === 'delete' ? 'active' : ''}`}
          onClick={() => setActiveSection('delete')}
        >
          <div className="button-content">Delete Sensors</div>
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
