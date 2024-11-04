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
        setError(t('Sensor.error.fetch'));
      }
    } catch (error) {
      console.error(t('Sensor.error.fetch')+':', error);
      setError(t('Sensor.error.fetch'));
    }
  };
  useEffect(() => {
    fetchSensors();
  }, [token]);

  const handleDeleteSensor = async (sensorId) => {
    const confirmDelete = window.confirm(t('Sensor.confirmDelete'));
    if (!confirmDelete) return; // Si el usuario cancela, no hacemos nada

    try {
      const response = await fetch(`http://3.14.69.183:8080/api/sensors/delete/${sensorId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(t('Sensor.error.delete'));
      }

      alert(t('Sensor.success.delete'));
      const updatedSensors = sensors.filter(sensor => sensor.id !== sensorId);
      setSensors(updatedSensors);

    } catch (error) {
      console.error(t('Sensor.error.delete')+':', error);
      alert(t('Sensor.error.delete'));
    }
  };

  const handleSaveNewSensors = async () => {
    if (!selectedSensorType) {
      alert(t('Sensor.error.type'));
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
        throw new Error(t('Sensor.error.add'));
      }

      alert(t('Sensor.success.add'));
      fetchSensors(); 
    } catch (error) {
      console.error(t('Sensor.error.add')+':', error);
      alert(t('Sensor.error.delete'));
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
          throw new Error(t('Sensor.error.update'));
        }
      }
      
      alert(t('Sensor.success.update'));
      // No es necesario hacer fetchSensors() a menos que quieras sincronizar cambios del servidor
    } catch (error) {
      console.error(t('Sensor.error.update')+':', error);
      alert(t('Sensor.error.update'));
    }
  };
  

  const renderDeleteSection = () => {
    return (
      <div key="delete">
        <h2 className="sensor-title">{t('Sensor.delete.title')}</h2>
        <table className="sensor-table">
          <thead>
            <tr>
              <th>{t('Sensor.table.sensor')}</th>
              <th>{t('Sensor.table.port')}</th>
              <th>{t('Sensor.table.action')}</th>
            </tr>
          </thead>
          <tbody>
            {sensors.map((sensor, index) => (
              <tr key={index}>
                <td>{sensor.name}</td>
                <td>{sensor.id}</td>
                <td>
                  <button className="delete-button" onClick={() => handleDeleteSensor(sensor.id)}>
                    {t('Sensor.delete.button')}
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
        <h2 className="sensor-title">{t('Sensor.update.title')}</h2>
        <table className="sensor-table">
          <thead>
            <tr>
              <th>{t('Sensor.table.sensor')}</th>
              <th>{t('Sensor.table.port')}</th>
              <th>{t('Sensor.table.status')}</th>
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
                  <option value="true">{t('Sensor.status.connected')}</option>
                  <option value="false">{t('Sensor.status.disconnected')}</option>
                </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="save-button" onClick={handleSaveStatusChanges}>
        {t('Sensor.update.button')}
        </button>
      </div>
    );
  };

  const renderCreateSection = () => {
    return (
      <div key="create">
        <h2 className="sensor-title">{t('Sensor.summary1.title')}</h2>
        <table className="sensor-table">
          <thead>
            <tr>
              <th>{t('Sensor.summary1.sensorType')}</th>
              <th>{t('Sensor.summary1.field')}</th>
              <th>{t('Sensor.summary1.status')}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <select
                  onChange={(e) => setSelectedSensorType(e.target.value)}
                  value={selectedSensorType || ""}
                >
                  <option value="" disabled>{t('Sensor.summary1.selectSensor')}</option>
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
                  <option value="true">{t('Sensor.status.connected')}</option>
                  <option value="false">{t('Sensor.status.disconnected')}</option>
                </select>
              </td>
            </tr>
          </tbody>
        </table>
        <button className="save-button" onClick={handleSaveNewSensors}>
        {t('Sensor.summary1.button')}
        </button>
      </div>
    );
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'summary':
        return (
          <div key="summary">
            <h2 className="sensor-title"> {t('Sensor.sum')}</h2>
            <table className="sensor-table">
              <thead>
                <tr>
                  <th>{t('Sensor.table.sensor')}</th>
                  <th>{t('Sensor.table.port')}</th>
                  <th>{t('Sensor.table.working')}</th>
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
                      {sensor.status ? t('Sensor.status.connected') : t('Sensor.status.disconnected')}
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
      <div className="button-row">
        <button
          className={`sensor-tab ${activeSection === 'summary' ? 'active' : ''}`}
          onClick={() => setActiveSection('summary')}
        >
          <div className="button-content">{t('Sensor.btn.add')}</div>
        </button>
        <button
          className={`sensor-tab ${activeSection === 'create' ? 'active' : ''}`}
          onClick={() => setActiveSection('create')}
        >
          <div className="button-content">{t('Sensor.btn.sum')}</div>
        </button>
        <button
          className={`sensor-tab ${activeSection === 'update' ? 'active' : ''}`}
          onClick={() => setActiveSection('update')}
        >
          <div className="button-content">{t('Sensor.btn.modify')}</div>
        </button>
        <button
          className={`sensor-tab ${activeSection === 'delete' ? 'active' : ''}`}
          onClick={() => setActiveSection('delete')}
        >
          <div className="button-content">{t('Sensor.btn.delete')}</div>
        </button>
        </div>
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
