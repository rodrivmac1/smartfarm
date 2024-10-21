import React, { useState, useEffect } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./Sensor.css";
import "./Dashboard.css"; 

const Sensor = () => {
  const [sensors, setSensors] = useState([]);
  const [activeSection, setActiveSection] = useState('summary');
  const [selectedSensorType, setSelectedSensorType] = useState(""); 
  const [selectedField, setSelectedField] = useState(1); 
  const [status, setStatus] = useState(true); 
  const [sensorStatuses, setSensorStatuses] = useState({});
  const [error, setError] = useState(null);
  const token = localStorage.getItem('token'); 

  const sensorTypes = ["Humidity", "Temperature", "Soil Moisture", "Solar Light", "pH Level"];

  const fetchSensors = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/sensors', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        setSensors(data);
        const initialStatuses = data.reduce((acc, sensor) => {
          acc[sensor.id] = sensor.status;
          return acc;
        }, {});
        setSensorStatuses(initialStatuses);
      } else {
        setError('Error fetching sensors');
      }
    } catch (error) {
      console.error('Error fetching sensors:', error);
      setError('Error fetching sensors');
    }
  };

  useEffect(() => {
    fetchSensors();
  }, [token]);

  // Eliminar sensor (DELETE) con confirmación
  const handleDeleteSensor = async (sensorId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this sensor?");
    if (!confirmDelete) return; // Si el usuario cancela, no hacemos nada

    try {
      const response = await fetch(`http://localhost:8080/api/sensors/delete/${sensorId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete sensor');
      }

      alert('Sensor deleted successfully!');
      const updatedSensors = sensors.filter(sensor => sensor.id !== sensorId);
      setSensors(updatedSensors); // Actualizar la lista de sensores sin el que fue eliminado

    } catch (error) {
      console.error('Error deleting sensor:', error);
      alert('Error deleting sensor.');
    }
  };

  // Guardar nuevos sensores (CREATE)
  const handleSaveNewSensors = async () => {
    if (!selectedSensorType) {
      alert('Please select a sensor type.');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/api/sensors/add', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: selectedSensorType, 
          field: {
            id: selectedField,
            name: "CAMPO SAN ANDRES",
            location: "E6100000001..."
          },
          status: status,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to add sensor');
      }

      alert('Sensor added successfully!');
      fetchSensors(); 
    } catch (error) {
      console.error('Error adding sensor:', error);
      alert('Error adding sensor.');
    }
  };

  // Modificar el estado de los sensores (UPDATE)
  const handleSaveStatusChanges = async () => {
    try {
      // Actualiza el estado local de los sensores inmediatamente en la interfaz
      setSensors(prevSensors => 
        prevSensors.map(sensor => ({
          ...sensor,
          status: sensorStatuses[sensor.id] // Aplica el nuevo estado seleccionado
        }))
      );
  
      // Actualiza el estado en el servidor
      for (const sensorId in sensorStatuses) {
        const status = sensorStatuses[sensorId];
        const response = await fetch(`http://localhost:8080/api/sensors/${sensorId}`, {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            status: status,
          }),
        });
  
        if (!response.ok) {
          throw new Error('Failed to update sensor status');
        }
      }
      
      alert('Sensor statuses updated successfully!');
      // No es necesario hacer fetchSensors() a menos que quieras sincronizar cambios del servidor
    } catch (error) {
      console.error('Error updating sensor statuses:', error);
      alert('Sensor statuses updated successfully!');
    }
  };
  

  // Sección para eliminar sensores
  const renderDeleteSection = () => {
    return (
      <div key="delete">
        <h2 className="sensor-title">Delete Sensors</h2>
        <table className="sensor-table">
          <thead>
            <tr>
              <th>Sensor</th>
              <th>Port</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {sensors.map((sensor, index) => (
              <tr key={index}>
                <td>{sensor.name}</td>
                <td>{sensor.id}</td>
                <td>
                  <button className="delete-button" onClick={() => handleDeleteSensor(sensor.id)}>
                    Delete Sensor
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  // Renderizar la sección para modificar el estado de los sensores
  const renderUpdateSection = () => {
    return (
      <div key="update">
        <h2 className="sensor-title">Modify Sensor Status</h2>
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
                <td>{sensor.name}</td>
                <td>{sensor.id}</td>
                <td>
                <select
                  value={sensorStatuses[sensor.id] ? "true" : "false"} // Asegura que se manejen los valores como cadenas "true"/"false"
                  onChange={(e) => setSensorStatuses({
                    ...sensorStatuses,
                    [sensor.id]: e.target.value === "true" // Convierte el valor a booleano
                  })}
                >
                  <option value="true">CONNECTED</option>
                  <option value="false">DISCONNECTED</option>
                </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="save-button" onClick={handleSaveStatusChanges}>
          Save Changes
        </button>
      </div>
    );
  };

  // Renderizar la sección para añadir un nuevo sensor
  const renderCreateSection = () => {
    return (
      <div key="create">
        <h2 className="sensor-title">Assign a New Sensor</h2>
        <table className="sensor-table">
          <thead>
            <tr>
              <th>Sensor Type</th>
              <th>Field</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <select
                  onChange={(e) => setSelectedSensorType(e.target.value)}
                  value={selectedSensorType || ""}
                >
                  <option value="" disabled>Select Sensor</option>
                  {sensorTypes.map((type, idx) => (
                    <option key={idx} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </td>
              <td>
                <select
                  onChange={(e) => setSelectedField(e.target.value)}
                  value={selectedField || ""}
                >
                  <option value={1}>CAMPO SAN ANDRES</option>
                  <option value={2}>CAMPO 2</option>
                </select>
              </td>
              <td>
                <select
                  onChange={(e) => setStatus(e.target.value === "true")}
                  value={status ? "true" : "false"}
                >
                  <option value="true">CONNECTED</option>
                  <option value="false">DISCONNECTED</option>
                </select>
              </td>
            </tr>
          </tbody>
        </table>
        <button className="save-button" onClick={handleSaveNewSensors}>
          Save Changes
        </button>
      </div>
    );
  };

  // Renderizar contenido
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
                    <td>{sensor.name}</td>
                    <td>{sensor.id}</td>
                    <td
                      className={
                        sensor.status === true
                          ? "status-ok"
                          : "status-not-available"
                      }
                    >
                      {sensor.status ? 'CONNECTED' : 'DISCONNECTED'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      case 'create':
        return renderCreateSection();
      case 'update':
        return renderUpdateSection();
      case 'delete':
        return renderDeleteSection();
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
          key={activeSection} 
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
