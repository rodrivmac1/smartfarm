import React from 'react';
import './Loading.css'; // Crear un archivo CSS para estilizar la pantalla de carga

const Loading = () => {
  return (
    <div className="loading-container">
      <div className="spinner"></div>
      <p>Loading...</p>
    </div>
  );
};

export default Loading;
