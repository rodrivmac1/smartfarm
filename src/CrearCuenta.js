import React, { useState } from "react";
import "./CrearCuenta.css"; // Estilos generales
import defaultUserImage from "./images/user.png"; // Importa la imagen por defecto

const CrearCuenta = () => {
  const [name, setName] = useState(""); // Inicializa vacío
  const [email, setEmail] = useState(""); // Inicializa vacío
  const [mobile, setMobile] = useState(""); // Inicializa vacío
  const [location, setLocation] = useState(""); // Inicializa vacío
  const [profileImage, setProfileImage] = useState(defaultUserImage); // Imagen por defecto

  const handleSave = () => {
    console.log("Saved Profile Info:", { name, email, mobile, location });
    alert("Profile saved!");
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result); // Carga la nueva imagen
      };
      reader.readAsDataURL(file); // Convierte la imagen a URL
    }
  };

  return (
    <div className="crearcuenta-profile-container crearcuenta-content">
      <div className="crearcuenta-profile-header white-background">
        <label htmlFor="upload-image" className="profile-image-label">
          <img
            src={profileImage} // Usa la imagen importada aquí
            alt="Profile"
            className="crearcuenta-profile-picture"
          />
        </label>
        <input
          type="file"
          id="upload-image"
          accept="image/*"
          onChange={handleImageChange}
          style={{ display: "none" }} // Oculta el input de tipo file
        />
        <div className="crearcuenta-profile-details">
          <h2>{name}</h2>
          <p>{email}</p>
        </div>
      </div>

      <div className="crearcuenta-profile-info">
        <div className="crearcuenta-info-field">
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name" // Placeholder en lugar de contenido
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

        <div className="crearcuenta-info-field">
          <label>Location</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter your location" // Placeholder en lugar de contenido
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
