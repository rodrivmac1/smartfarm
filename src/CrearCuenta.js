import React, { useState } from "react";
import "./CrearCuenta.css"; // Estilos generales
import defaultUserImage from "./images/user.png"; // Importa la imagen por defecto

const CrearCuenta = () => {
  const [name, setName] = useState(""); // Inicializa vacío
  const [username, setUsername] = useState(""); // Nuevo estado para usuario
  const [password, setPassword] = useState(""); // Nuevo estado para contraseña
  const [email, setEmail] = useState(""); // Inicializa vacío
  const [mobile, setMobile] = useState(""); // Inicializa vacío

  const handleSave = () => {
    console.log("Saved Profile Info:", { name, username, password, email, mobile });
    alert("Profile saved!");
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
          <label>Full name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your full name" // Placeholder en lugar de contenido
          />
        </div>

        <div className="crearcuenta-info-field">
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username" // Placeholder para el nombre de usuario
          />
        </div>

        <div className="crearcuenta-info-field">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password" // Placeholder para la contraseña
          />
        </div>

        <div className="crearcuenta-info-field">
          <label>Email account</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email" // Placeholder en lugar de contenido
          />
        </div>

        <div className="crearcuenta-info-field">
          <label>Mobile number</label>
          <input
            type="text"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            placeholder="Enter your mobile number" // Placeholder en lugar de contenido
          />
        </div>

      </div>

      <button className="crearcuenta-save-button" onClick={handleSave}>
        <span className="crearcuenta-save-button-text">Save</span>
      </button>
    </div>
  );
};

export default CrearCuenta;
