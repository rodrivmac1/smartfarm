import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import "./ProfileEdit.css"; 
import VentanaConfirmacion from './VentanaConfirmacion';
import "./VentanaConfirmacion.css";

const Profile = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [profileData, setProfileData] = useState({
    name: "user",
    username: "user",
    credential: "user",
    contact: "2222222222",
    language: "ENGLISH",
    system: "dark",
    role: { id: 1, name: "SUPERADMIN" },
    email: "example@mail.com",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

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
          username: data.username || "",
          credential: data.credential || "",
          contact: data.contact || "",
          language: data.language || "ENGLISH",
          system: data.system || "dark",
          role: data.role || { id: 1, name: "SUPERADMIN" },
          email: data.email || "",
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

  useEffect(() => {
    fetchProfileData();
  }, []);

  const handleEditClick = () => {
    navigate("/profile-edit"); // Redirige al archivo ProfileEdit.js
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
          <label>{t('ProfileEdit.name')}</label>
          <p>{profileData.name}</p>
        </div>

        <div className="info-field">
          <label>{t('ProfileEdit.username')}</label>
          <p>{profileData.username}</p>
        </div>

        <div className="info-field">
          <label>{t('ProfileEdit.contact')}</label>
          <p>{profileData.contact}</p>
        </div>

        <div className="info-field">
          <label>{t('ProfileEdit.language')}</label>
          <p>{profileData.language}</p>
        </div>

        <div className="info-field">
          <label>{t('ProfileEdit.system')}</label>
          <p>{profileData.system}</p>
        </div>

        <div className="info-field">
          <label>{t('ProfileEdit.role')}</label>
          <p>{profileData.role.name}</p>
        </div>

        <div className="info-field">
          <label>{t('ProfileEdit.emailAccount')}</label>
          <p>{profileData.email}</p>
        </div>
      </div>

      <button className="edit-button" onClick={handleEditClick}>
        {t('ProfileEdit.edit')}
      </button>
    </div>
  );
};

export default Profile;
