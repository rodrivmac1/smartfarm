import React, { useState, useEffect } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { useTranslation } from 'react-i18next';
import "./Sensor.css";
import "./Dashboard.css"; 

const Sensor = () => {
  const { t } = useTranslation();
  const [sensors, setSensors] = useState([]);
  const [activeSection, setActiveSection] = useState('summary');
  const [selectedSensorType, setSelectedSensorType] = useState(""); 
  const [selectedField, setSelectedField] = useState(1); 
  const [status, setStatus] = useState(true); 
  const [sensorStatuses, setSensorStatuses] = useState({});
  const [error, setError] = useState(null);
  const token = localStorage.getItem('token'); 

  const sensorTypes = [
    t('Sensor.humidity'),
    t('Sensor.temperature'),
    t('Sensor.soilMoisture'),
    t('Sensor.solarLight'),
    t('Sensor.phLevel')
  ];

  const fetchSensors = async () => {
    try {
      const response = await fetch('http://3.14.69.183:8080/api/sensors', {
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
  };
  };
  useEffect(() => {
    fetchSensors();
  }, [token]);

  const handleDeleteSensor = async (sensorId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this sensor?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://3.14.69.183:8080/api/sensors/delete/${sensorId}`, {
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
      setSensors(updatedSensors);

    } catch (error) {
        console.error('Error deleting sensor:', error);
        alert('Error deleting sensor.');
    }
  };

  const handleSaveNewSensors = async () => {
    if (!selectedSensorType) {
        alert('Please select a sensor type.');
      return;
    }

    try {
      const response = await fetch('http://3.14.69.183:8080/api/sensors/add', {
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
        throw Error('Failed to add sensor');
      }

      alert('Sensor added successfully!');
      fetchSensors(); 
    } catch (error) {
        console.error('Error adding sensor:', error);
        alert('Error adding sensor.');
    }
  };

  const handleSaveStatusChanges = async () => {
    try {
      setSensors(prevSensors => 
        prevSensors.map(sensor => ({
          ...sensor,
          status: sensorStatuses[sensor.id] 
        }))
      );
  
      for (const sensorId in sensorStatuses) {
        const status = sensorStatuses[sensorId];
        const response = await fetch(`http://3.14.69.183:8080/api/sensors/${sensorId}`, {
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
    } catch (error) {
      console.error('Error updating sensor statuses:', error);
      alert('Sensor statuses updated successfully!');
    }
  };
  

  const renderDeleteSection = () => {
    return (
      <div key="delete">
        <h2 className="sensor-title">{t('Sensor.deleteSensors')}</h2>
        <table className="sensor-table">
          <thead>
            <tr>
              <th>{t('Sensor.sensor')}</th>
              <th>{t('Sensor.port')}</th>
              <th>{t('Sensor.delete')}</th>
            </tr>
          </thead>
          <tbody>
            {sensors.map((sensor, index) => (
              <tr key={index}>
                <td>{sensor.name}</td>
                <td>{sensor.id}</td>
                <td>
                  <button className="delete-button" onClick={() => handleDeleteSensor(sensor.id)}>
                    {t('Sensor.delete')}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const renderUpdateSection = () => {
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
                <td>{sensor.name}</td>
                <td>{sensor.id}</td>
                <td>
                  <select
                    value={sensorStatuses[sensor.id] ? "true" : "false"} 
                    onChange={(e) => setSensorStatuses({
                      ...sensorStatuses,
                      [sensor.id]: e.target.value === "true" 
                    })}
                  >
                    <option value="true">{t('Sensor.connected')}</option>
                    <option value="false">{t('Sensor.disconnected')}</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="save-button" onClick={handleSaveStatusChanges}>
          {t('Sensor.saveChanges')}
        </button>
      </div>
    );
  };

  const renderCreateSection = () => {
    return (
      <div key="create">
        <h2 className="sensor-title">{t('Sensor.assignSensor')}</h2>
        <table className="sensor-table">
          <thead>
            <tr>
              <th>{t('Sensor.sensorType')}</th>
              <th>{t('Sensor.field')}</th>
              <th>{t('Sensor.status')}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <select
                  onChange={(e) => setSelectedSensorType(e.target.value)}
                  value={selectedSensorType || ""}
                >
                  <option value="" disabled>{t('Sensor.selectSensor')}</option>
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
                  <option value="true">{t('Sensor.connected')}</option>
                  <option value="false">{t('Sensor.disconnected')}</option>
                </select>
              </td>
            </tr>
          </tbody>
        </table>
        <button className="save-button" onClick={handleSaveNewSensors}>
          {t('Sensor.saveChanges')}
        </button>
      </div>
    );
  };

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
                    <td>{sensor.name}</td>
                    <td>{sensor.id}</td>
                    <td>
                      {sensor.status ? t('Sensor.connected') : t('Sensor.notAvailable')}
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
    <div>
      <div className="sensor-tab-container">
        <button
          className={`sensor-tab ${activeSection === 'summary' ? 'active' : ''}`}
          onClick={() => setActiveSection('summary')}
        >
          {t('Sensor.sensorsSummary')}
        </button>
        <button
          className={`sensor-tab ${activeSection === 'create' ? 'active' : ''}`}
          onClick={() => setActiveSection('create')}
        >
          {t('Sensor.addSensor')}
        </button>
        <button
          className={`sensor-tab ${activeSection === 'update' ? 'active' : ''}`}
          onClick={() => setActiveSection('update')}
        >
          {t('Sensor.updateSensorStatus')}
        </button>
        <button
          className={`sensor-tab ${activeSection === 'delete' ? 'active' : ''}`}
          onClick={() => setActiveSection('delete')}
        >
          {t('Sensor.delete')}
        </button>
      </div>

      <TransitionGroup component={null}>
        <CSSTransition key={activeSection} classNames="fade" timeout={300}>
          {renderContent()}
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
};
export default Sensor;
