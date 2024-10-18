import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import "./CrearCuenta.css"; // Estilos generales
import defaultUserImage from "./images/user.png"; // Importa la imagen por defecto

const CrearCuenta = () => {
  const { t } = useTranslation();
  const [name, setName] = useState(""); // Inicializa vacío
  const [username, setUsername] = useState(""); // Nuevo estado para usuario
  const [password, setPassword] = useState(""); // Nuevo estado para contraseña
  const [email, setEmail] = useState(""); // Inicializa vacío
  const [mobile, setMobile] = useState(""); // Inicializa vacío

  const handleSave = () => {
    console.log("Saved Profile Info:", { name, username, password, email, mobile });
    alert(t('Crearcuenta.profileSaved')); // Mensaje de confirmación traducido
  };

  return (
    <div className="crearcuenta-profile-container crearcuenta-content">
      <div className="crearcuenta-profile-header white-background">
        <img
          src={defaultUserImage} // Usa la imagen por defecto
          alt="Profile"
          className="crearcuenta-profile-picture"
        />
        <div className="crearcuenta-profile-details">
          <h2>{name}</h2>
          <p>{email}</p>
        </div>
      </div>

      <div className="crearcuenta-profile-info">
        <div className="crearcuenta-info-field">
          <label>{t('Crearcuenta.fullName')}</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={t('Crearcuenta.enterFullName')} 
          />
        </div>

        <div className="crearcuenta-info-field">
          <label>{t('Crearcuenta.username')}</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder={t('Crearcuenta.enterUsername')} 
          />
        </div>

        <div className="crearcuenta-info-field">
          <label>{t('Crearcuenta.password')}</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={t('Crearcuenta.enterPassword')} 
          />
        </div>

        <div className="crearcuenta-info-field">
          <label>{t('Crearcuenta.emailAccount')}</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t('Crearcuenta.enterEmail')}
          />
        </div>

        <div className="crearcuenta-info-field">
          <label>{t('Crearcuenta.mobileNumber')}</label>
          <input
            type="text"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            placeholder={t('Crearcuenta.enterMobileNumber')} 
          />
        </div>
      </div>

      <button className="crearcuenta-save-button" onClick={handleSave}>
        <span className="crearcuenta-save-button-text">{t('Crearcuenta.save')}</span>
      </button>
    </div>
  );
};

export default CrearCuenta;
