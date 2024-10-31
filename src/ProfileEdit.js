import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import "./ProfileEdit.css"; 
import VentanaConfirmacion from './VentanaConfirmacion'; // Importar el modal de confirmación
import "./VentanaConfirmacion.css";

const Profile = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  // Estado inicial del perfil
  const [profileData, setProfileData] = useState({
    name: "Edmundo Linares",
    username: "edmundo10",
    credential: "mypassword123",
    contact: "248 - 125 - 9698",
    language: "ENGLISH",
    system: "dark",
    role: {
      id: 1,
      name: "SUPERADMIN",
    },
    email: "edmundo_zapatero10@gmail.com",
  });

  const [showCredential, setShowCredential] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleShowCredential = () => {
    setShowCredential(!showCredential);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
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
