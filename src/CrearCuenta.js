import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importar useNavigate para redirigir
import { useTranslation } from "react-i18next";
import "./CrearCuenta.css"; // Estilos generales
import defaultUserImage from "./images/user.png"; // Importa la imagen por defecto

const CrearCuenta = () => {
  const { t } = useTranslation(); // Inicializar i18n hook para traducciones
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");

  const navigate = useNavigate();

  const handleSave = async (e) => {
    e.preventDefault(); // Evita el envío por defecto del formulario

    console.log("Saved Profile Info:", { name, username, password, email, mobile });
    alert("Profile created successfully!"); // Mensaje de confirmación sin traducción

    try {
      const response = await fetch("http://54.193.209.249:8080/api/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          username: username,
          credential: password,
          contact: mobile,
          email: email,
        }),
      });

      if (response.ok) {
        alert("Profile created successfully!");
        navigate("./Login");
      } else {
        const errorData = await response.json();
        alert(`Error creating profile: ${errorData.message || "Unexpected error"}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again later.");
    }
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

      <form className="crearcuenta-profile-info" onSubmit={handleSave}>
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
            required // Campo obligatorio
          />
        </div>

        <div className="crearcuenta-info-field">
          <label>{t('CrearCuenta.Password')}</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={t('CrearCuenta.PasswordPlaceholder')}
            minLength="8"
            required // Campo obligatorio
          />
        </div>

        <div className="crearcuenta-info-field">
          <label>{t('CrearCuenta.Email')}</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t('CrearCuenta.EmailPlaceholder')}
            required // Campo obligatorio
          />
        </div>

        <div className="crearcuenta-info-field">
          <label>{t('CrearCuenta.Mobile')}</label>
          <input
            type="text"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            placeholder={t('CrearCuenta.MobilePlaceholder')}
            maxLength="12"
            required // Campo obligatorio
          />
        </div>

      <button className="crearcuenta-save-button" onClick={handleSave}>
        <span className="crearcuenta-save-button-text">{t('CrearCuenta.Save')}</span>
      </button>
      </form>
    </div>
  );
};

export default CrearCuenta;
