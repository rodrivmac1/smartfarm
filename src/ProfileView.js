import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import "./ProfileEdit.css"; 
import VentanaConfirmacion from './VentanaConfirmacion'; // Importar el modal de confirmación
import "./VentanaConfirmacion.css";

const Profile = () => {
  const navigate = useNavigate(); // Hook para la navegación
  const { t } = useTranslation();
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

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Obtén el token y userId del almacenamiento local
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  // Función para obtener los datos del perfil desde la API
  const fetchProfileData = async () => {
    if (!userId || !token) {
      setError("User ID o token no encontrado. Por favor, inicia sesión.");
      setLoading(false);
      return;
    }

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
          email: data.email || "",
          contact: data.contact || "",
        });
        setLoading(false);
      } else {
        setError("Error fetching profile data");
        setLoading(false);
      }
    } catch (err) {
      setError("Error fetching profile data");
      setLoading(false);
    }
  };

  const handleRoleChange = (e) => {
    setProfileData((prevState) => ({
      ...prevState,
      role: { ...prevState.role, name: e.target.value },
    }));
  };

  const handleSave = () => {
    alert(t('ProfileEdit.profileSaved'));
    console.log("Profile saved:", profileData);
    navigate("/profile-view");
  };

  const handleDeleteClick = () => {
    setModalVisible(true);
  };

  const handleConfirmDelete = () => {
    alert(t('ProfileEdit.profileDeleted'));
    setModalVisible(false);
    // Lógica de eliminación del perfil
  };

  const handleCancelDelete = () => {
    setModalVisible(false);
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
          <label>{t('ProfileEdit.name')}</label>
          <input
            type="text"
            name="name"
            value={profileData.name}
            onChange={handleInputChange}
          />
        </div>

        <div className="info-field">
          <label>{t('ProfileEdit.username')}</label>
          <input
            type="text"
            name="username"
            value={profileData.username}
            onChange={handleInputChange}
          />
        </div>

        <div className="info-field">
          <label>{t('ProfileEdit.credential')}</label>
          <input
            type={showCredential ? "text" : "password"}
            name="credential"
            value={profileData.credential}
            onChange={handleInputChange}
          />
          <button className="toggle-password" onClick={toggleShowCredential}>
            {showCredential ? t('ProfileEdit.hide') : t('ProfileEdit.show')}
          </button>
        </div>

        <div className="info-field">
          <label>{t('ProfileEdit.contact')}</label>
          <input
            type="text"
            name="contact"
            value={profileData.contact}
            onChange={handleInputChange}
          />
        </div>

        <div className="info-field">
          <label>{t('ProfileEdit.language')}</label>
          <select
            name="language"
            value={profileData.language}
            onChange={handleInputChange}
          >
            <option value="ENGLISH">{t('ProfileEdit.english')}</option>
            <option value="SPANISH">{t('ProfileEdit.spanish')}</option>
          </select>
        </div>

        <div className="info-field">
          <label>{t('ProfileEdit.system')}</label>
          <select
            name="system"
            value={profileData.system}
            onChange={handleInputChange}
          >
            <option value="dark">{t('ProfileEdit.dark')}</option>
            <option value="light">{t('ProfileEdit.light')}</option>
          </select>
        </div>

        <div className="info-field">
          <label>{t('ProfileEdit.role')}</label>
          <select
            name="role"
            value={profileData.role.name}
            onChange={handleRoleChange}
          >
            <option value="USER">{t('ProfileEdit.user')}</option>
            <option value="ADMIN">{t('ProfileEdit.administrator')}</option>
            <option value="SUPERADMIN">{t('ProfileEdit.superAdministrator')}</option>
          </select>
        </div>

        <div className="info-field">
          <label>{t('ProfileEdit.emailAccount')}</label>
          <input
            type="email"
            name="email"
            value={profileData.email}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <button className="save-button" onClick={handleSave}>
        {t('ProfileEdit.saveChanges')}
      </button>

      <button className="delete-button" onClick={handleDeleteClick}>
        {t('ProfileEdit.deleteProfile')}
      </button>

      <VentanaConfirmacion
        show={isModalVisible}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </div>
  );
};

export default Profile;
