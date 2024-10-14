import React from 'react';

// Definimos el componente `ConfirmationModal`
const VentanaConfirmacion = ({ show, onConfirm, onCancel }) => {
  // Si `show` es `false`, no renderizamos nada.
  if (!show) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Are you sure you want to delete this profile?</h2>
        <div className="modal-actions">
          {/* Botón que llama a `onConfirm` cuando el usuario confirma */}
          <button onClick={onConfirm}>Yes</button>
          {/* Botón que llama a `onCancel` cuando el usuario cancela */}
          <button onClick={onCancel}>No</button>
        </div>
      </div>
    </div>
  );
};

export default VentanaConfirmacion;