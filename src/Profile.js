import React, { useState } from "react";
import "./Profile.css"; // Estilos generales
import Footer from "./footer";
import Header from "./header";

const Profile = () => {
  // Definimos los valores de estado iniciales para cada campo
  const [name, setName] = useState("Edmundo Linares");
  const [email, setEmail] = useState("edmundo_zapatero10@gmail.com");
  const [mobile, setMobile] = useState("248 - 125 - 9698");
  const [location, setLocation] = useState("Puebla");

  // Función para manejar el guardado (por ahora, solo un log de los valores)
  const handleSave = () => {
    console.log("Saved Profile Info:", { name, email, mobile, location });
    alert("Profile saved!");
  };

  return (
    <div className="app">
      {/* Header */}
      <Header />
      
      {/* Contenido del perfil editable */}
      <div className="profile-container content">
        <div className="profile-header">
          <img
            src="https://media.istockphoto.com/id/1200677760/es/foto/retrato-de-apuesto-joven-sonriente-con-los-brazos-cruzados.jpg?s=612x612&w=0&k=20&c=RhKR8pxX3y_YVe5CjrRnTcNFEGDryD2FVOcUT_w3m4w="
            alt="Profile"
            className="profile-picture"
          />
          <div className="profile-details">
            <h2>{name}</h2>
            <p>{email}</p>
          </div>
        </div>

        <div className="profile-info">
          <div className="info-field">
            <label>Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="info-field">
            <label>Email account</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="info-field">
            <label>Mobile number</label>
            <input
              type="text"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />
          </div>

          <div className="info-field">
            <label>Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
        </div>

        <button className="save-button" onClick={handleSave}>
          <span className="save-button-text">Save Change</span>
        </button>
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Profile;
