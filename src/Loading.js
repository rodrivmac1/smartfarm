import React from 'react';
import { useTranslation } from 'react-i18next';
import './Loading.css'; // Crear un archivo CSS para estilizar la pantalla de carga

const Loading = () => {
  const { t } = useTranslation(); 
  return (
    <div className="loading-container">
      <div className="spinner"></div>
      <p>{t('Loading.loading')}</p>
    </div>
  );
};

export default Loading;