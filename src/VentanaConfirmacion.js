import React from 'react';
import { useTranslation } from 'react-i18next'; 

// Definimos el componente `ConfirmationModal`
const VentanaConfirmacion = ({ show, onConfirm, onCancel }) => {
  const { t } = useTranslation(); 
  // Si `show` es `false`, no renderizamos nada.
  if (!show) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>{t('VentanaConfirmacion.confirmDeleteProfile')}</h2>
        <div className="modal-actions">
          {/* Botón que llama a `onConfirm` cuando el usuario confirma */}
          <button onClick={onConfirm}>{t('VentanaConfirmacion.yes')}</button>
          {/* Botón que llama a `onCancel` cuando el usuario cancela */}
          <button onClick={onCancel}>{t('VentanaConfirmacion.no')}</button>
        </div>
      </div>
    </div>
  );
};

export default VentanaConfirmacion;