import React, { useState } from "react";
import "./Profile.css"; // Estilos generales

const Profile = () => {
  const [name, setName] = useState("Edmundo Linares");
  const [username, setUsername] = useState("EdmundoLZ"); // Nuevo estado para el usuario
  const [password, setPassword] = useState("1234567"); // Nuevo estado para la contraseña
  const [userType, setUserType] = useState("User"); // Nuevo estado para el tipo de usuario
  const [email, setEmail] = useState("edmundo_zapatero10@gmail.com");
  const [mobile, setMobile] = useState("248 - 125 - 9698");

  const handleSave = () => {
    console.log("Saved Profile Info:", { name, username, password, userType, email, mobile });
    alert("Profile saved!");
  };

  return (
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
        {/* Campo de nombre */}
        <div className="info-field">
          <label>Full name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Campo de usuario */}
        <div className="info-field">
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
          />
        </div>

        {/* Campo de contraseña */}
        <div className="info-field">
        <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password" // Placeholder para contraseña
          />
        </div>

        {/* Lista desplegable de tipo de usuario */}
        <div className="info-field">
          <label>User Type</label>
          <select
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
            className="dropdown" // Clase añadida para estilo del select
          >
            <option value="User">User</option>
            <option value="Super Administrator">Super Administrator</option>
            <option value="Administrator">Administrator</option>
          </select>
        </div>

        {/* Campo de correo electrónico */}
        <div className="info-field">
          <label>Email account</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Campo de número de móvil */}
        <div className="info-field">
          <label>Mobile number</label>
          <input
            type="text"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />
        </div>
      </div>

      <button className="save-button" onClick={handleSave}>
        <span className="save-button-text">Save Change</span>
      </button>
    </div>
  );
};

export default Profile;
