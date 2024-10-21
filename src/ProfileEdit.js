import React, { useState } from "react";
import "./ProfileEdit.css"; // Asegúrate de tener los estilos necesarios

const Profile = () => {
  // Estado inicial con los valores del perfil
  const [profileData, setProfileData] = useState({
    name: "user",
    username: "user",
    credential: "user",
    contact: "2222222222",
    language: "ENGLISH",
    system: "dark", // Inicialmente dark
    role: {
      id: 1,
      name: "SUPERADMIN",
    },
    email: "example@mail.com",
  });

  // Estado para mostrar u ocultar la contraseña
  const [showCredential, setShowCredential] = useState(false);

  // Función para alternar la visibilidad de la contraseña
  const toggleShowCredential = () => {
    setShowCredential(!showCredential);
  };

  // Función para manejar cambios en los inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Función para manejar cambios en el campo del rol (User/Admin/Superadmin)
  const handleRoleChange = (e) => {
    setProfileData((prevState) => ({
      ...prevState,
      role: { ...prevState.role, name: e.target.value },
    }));
  };

  // Función para manejar el guardado de los datos
  const handleSave = () => {
    alert("Profile saved successfully!");
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
          <h2>{profileData.name}</h2>
          <p>{profileData.email}</p>
        </div>
      </div>

      <div className="profile-info">
        <div className="info-field">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={profileData.name}
            onChange={handleInputChange}
          />
        </div>

        <div className="info-field">
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={profileData.username}
            onChange={handleInputChange}
          />
        </div>

        <div className="info-field">
          <label>Credential</label>
          <input
            type={showCredential ? "text" : "password"}
            name="credential"
            value={profileData.credential}
            onChange={handleInputChange}
          />
          <button className="toggle-password" onClick={toggleShowCredential}>
            {showCredential ? "HIDE" : "SHOW"}
          </button>
        </div>

        <div className="info-field">
          <label>Contact</label>
          <input
            type="text"
            name="contact"
            value={profileData.contact}
            onChange={handleInputChange}
          />
        </div>

        <div className="info-field">
          <label>Language</label>
          <select
            name="language"
            value={profileData.language}
            onChange={handleInputChange}
          >
            <option value="ENGLISH">English</option>
            <option value="SPANISH">Spanish</option>
          </select>
        </div>

        <div className="info-field">
          <label>System</label>
          <select
            name="system"
            value={profileData.system}
            onChange={handleInputChange}
          >
            <option value="dark">Dark</option>
            <option value="light">Light</option>
          </select>
        </div>

        <div className="info-field">
          <label>Role</label>
          <select
            name="role"
            value={profileData.role.name}
            onChange={handleRoleChange}
          >
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
            <option value="SUPERADMIN">Super Admin</option>
          </select>
        </div>

        <div className="info-field">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={profileData.email}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <button className="save-button" onClick={handleSave}>
        Save Changes
      </button>
    </div>
  );
};

export default Profile;
