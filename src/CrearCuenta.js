import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next"; // Importar useTranslation para las traducciones
import "./CrearCuenta.css";
import defaultUserImage from "./images/user.png";

const CrearCuenta = () => {
  const { t } = useTranslation(); // Inicializar i18n hook para traducciones
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");

  const navigate = useNavigate();

  const handleSave = () => {
    console.log("Saved Profile Info:", { name, username, password, email, mobile });
    alert("Profile saved!"); // Mantener sin traducción

    // Redirigir al usuario a la página de login
    navigate("/"); // Cambia a la ruta de login ("/")
  };

  return (
    <div className="crearcuenta-profile-container crearcuenta-content">
      <div className="crearcuenta-profile-header white-background">
        <img
          src={defaultUserImage}
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
          <label>{t('CrearCuenta.FullName')}</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={t('CrearCuenta.FullNamePlaceholder')}
          />
        </div>

        <div className="crearcuenta-info-field">
          <label>{t('CrearCuenta.Username')}</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder={t('CrearCuenta.UsernamePlaceholder')}
          />
        </div>

        <div className="crearcuenta-info-field">
          <label>{t('CrearCuenta.Password')}</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={t('CrearCuenta.PasswordPlaceholder')}
          />
        </div>

        <div className="crearcuenta-info-field">
          <label>{t('CrearCuenta.Email')}</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t('CrearCuenta.EmailPlaceholder')}
          />
        </div>

        <div className="crearcuenta-info-field">
          <label>{t('CrearCuenta.Mobile')}</label>
          <input
            type="text"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            placeholder={t('CrearCuenta.MobilePlaceholder')}
          />
        </div>
      </div>

      <button className="crearcuenta-save-button" onClick={handleSave}>
        <span className="crearcuenta-save-button-text">{t('CrearCuenta.Save')}</span>
      </button>
    </div>
  );
};

export default CrearCuenta;
