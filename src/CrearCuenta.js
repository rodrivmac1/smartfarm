import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importar useNavigate para redirigir
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

  const navigate = useNavigate();

  const handleSave = async (e) => {
    e.preventDefault(); // Evita el envío por defecto del formulario

    console.log("Saved Profile Info:", { name, username, password, email, mobile });
    alert("Profile created successfully!"); // Mensaje de confirmación sin traducción

    try {
      const response = await fetch("http://3.14.69.183:8080/api/users/signup", {
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
          <label>{t('Crearcuenta.fullName')}</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={t('Crearcuenta.enterFullName')}
            required // Campo obligatorio
          />
        </div>

        <div className="crearcuenta-info-field">
          <label>{t('Crearcuenta.username')}</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder={t('Crearcuenta.enterUsername')}
            required // Campo obligatorio
          />
        </div>

        <div className="crearcuenta-info-field">
          <label>{t('Crearcuenta.password')}</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={t('Crearcuenta.enterPassword')}
            minLength="8"
            required // Campo obligatorio
          />
        </div>

        <div className="crearcuenta-info-field">
          <label>{t('Crearcuenta.emailAccount')}</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t('Crearcuenta.enterEmail')}
            required // Campo obligatorio
          />
        </div>

        <div className="crearcuenta-info-field">
          <label>{t('Crearcuenta.mobileNumber')}</label>
          <input
            type="text"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            placeholder={t('Crearcuenta.enterMobileNumber')}
            maxLength="12"
            required // Campo obligatorio
          />
        </div>

        <button type="submit" className="crearcuenta-save-button">
          <span className="crearcuenta-save-button-text">{t('Crearcuenta.save')}</span>
        </button>
      </form>
    </div>
  );
};

export default CrearCuenta;
