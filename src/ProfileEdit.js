import React, { useState, useEffect } from "react";
import "./ProfileEdit.css"; // Asegúrate de tener los estilos necesarios

const ProfileEdit = () => {
  const [profileData, setProfileData] = useState({
    name: "",
    username: "",
    credential: "",
    contact: "",
    language: "ENGLISH",
    system: "dark",
    role: {
      id: 1,
      name: "USER",
    },
    email: "",
  });

  const [showCredential, setShowCredential] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  // Función para obtener los datos actuales del usuario
  const fetchUserData = async () => {
    try {
      const response = await fetch(`http://3.14.69.183:8080/api/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setProfileData({
          name: data.name || "",
          username: data.username || "",
          credential: data.credential || "",
          contact: data.contact || "",
          language: data.language || "ENGLISH",
          system: data.system || "dark",
          role: data.role || { id: 1, name: "USER" },
          email: data.email || "",
        });
        setLoading(false);
      } else {
        setError("Error al obtener los datos del perfil.");
        setLoading(false);
      }
    } catch (error) {
      setError("Error al obtener los datos del perfil.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

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
  const handleSave = async () => {
    try {
      const response = await fetch("http://3.14.69.183:8080/api/users/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          id: userId,
          name: profileData.name,
          username: profileData.username,
          credential: profileData.credential,
          contact: profileData.contact,
          email: profileData.email,
        }),
      });

      if (response.ok) {
        alert("Profile saved successfully!");
      } else {
        alert("Error al guardar los cambios.");
      }
    } catch (error) {
      alert("Error al guardar los cambios.");
    }
  };

  if (loading) {
    return <div>Loading profile...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

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

export default ProfileEdit;
