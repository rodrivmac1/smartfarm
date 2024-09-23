import React from "react";
import "./Sensor.css"; // Estilos generales

const Sensor = () => {
  // Datos de los sensores conectados
  const sensors = [
    { port: "Port 1", sensor: "Humidity", status: "OK" },
    { port: "Port 2", sensor: "Temperature", status: "OK" },
    { port: "Port 3", sensor: "Soil Moisture", status: "OK" },
    { port: "Port 4", sensor: "Solar Light", status: "OK" },
    { port: "Port 5", sensor: "pH Level", status: "OK" },
    { port: "Port 6", sensor: "-", status: "NO AVAILABLE" },
  ];

  return (
    <div className="sensor-content">
      <h2 className="sensor-title">Sensors Connected</h2>
      <table className="sensor-table">
        <thead>
          <tr>
            <th>Port</th>
            <th>Sensor</th>
            <th>Working</th>
          </tr>
        </thead>
        <tbody>
          {sensors.map((sensor, index) => (
            <tr key={index}>
              <td>{sensor.port}</td>
              <td>{sensor.sensor}</td>
              <td
                className={
                  sensor.status === "OK"
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
};

export default Sensor;
