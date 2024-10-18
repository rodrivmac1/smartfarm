import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importar useNavigate para la navegación
import "./ProfileEdit.css"; // Estilos generales
import VentanaConfirmacion from './VentanaConfirmacion'; // Importamos el modal
import "./VentanaConfirmacion.css";
import { useTranslation } from 'react-i18next';

const ProfileEdit = () => {
  const navigate = useNavigate(); // Hook para navegar de regreso a ProfileView
  const { t } = useTranslation(); 

  // Definimos los valores de estado iniciales para cada campo
  const [name, setName] = useState("Edmundo Linares");
  const [email, setEmail] = useState("edmundo_zapatero10@gmail.com");
  const [mobile, setMobile] = useState("248 - 125 - 9698");
  const [username, setUsername] = useState("edmundo10"); // Nuevo campo de username
  const [userType, setUserType] = useState("User"); // Nuevo campo de tipo de usuario
  const [password, setPassword] = useState("mypassword123"); // Nueva contraseña
  const [showPassword, setShowPassword] = useState(false); // Estado para mostrar u ocultar la contraseña

  // Estado para controlar la visibilidad del modal
  const [isModalVisible, setModalVisible] = useState(false);

  // Función para manejar el guardado y redirigir a la vista de ProfileView
  const handleSave = () => {
    // Lógica para guardar los cambios (simulado con console.log)
    console.log("Saved Profile Info:", { name, email, mobile, username, userType, password });
    
    // Mostrar el mensaje de "Profile saved!" y redirigir a ProfileView
    alert(t('ProfileEdit.profileSaved'));
    navigate("/profile-view"); // Redirigir a la vista de ProfileView
  };

  // Función para alternar la visibilidad de la contraseña
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  // Función para manejar el clic en "Eliminar perfil"
  const handleDeleteClick = () => {
    setModalVisible(true);
  };

  // Función para confirmar la eliminación del perfil
  const handleConfirmDelete = () => {
    alert(t('ProfileEdit.profileDeleted')); 
    setModalVisible(false);
    // Aquí puedes agregar la lógica de eliminación del perfil
  };

  // Función para cancelar la eliminación
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
          <h2>{name}</h2>
          <p>{email}</p>
        </div>
      </div>

      <div className="profile-info">
        <div className="info-field">
          <label>{t('ProfileEdit.name')}</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="info-field">
          <label>{t('ProfileEdit.username')}</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="info-field">
          <label>{t('ProfileEdit.userType')}</label> 
          <select
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
            style={{
              width: '100%',
              maxWidth: '300px',
              padding: '10px',
              backgroundColor: '#2f2f2f',
              border: 'none',
              color: 'white',
              fontSize: '16px',
              marginLeft: '10px',
            }}
          >
            <option value="User">{t('ProfileEdit.user')}</option>
            <option value="Administrator">{t('ProfileEdit.administrator')}</option> 
            <option value="Super Administrator">{t('ProfileEdit.superAdministrator')}</option>
          </select>
        </div>

        <div className="info-field">
          <label>{t('ProfileEdit.emailAccount')}</label> 
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="info-field">
          <label>{t('ProfileEdit.mobileNumber')}</label> 
          <input
            type="text"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />
        </div>

        {/* Nuevo campo de contraseña */}
        <div className="info-field password-field">
          <label>{t('ProfileEdit.password')}</label>
          <input
            type={showPassword ? "text" : "password"} // Cambia el tipo de input según el estado
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="toggle-password" onClick={toggleShowPassword}>
            {showPassword ? t('ProfileEdit.hide') : t('ProfileEdit.show')}
          </button>
        </div>
      </div>

      <button className="save-button" onClick={handleSave}>
        <span className="save-button-text">{t('ProfileEdit.saveChanges')}</span> 
      </button>

      {/* Nuevo botón para eliminar el perfil */}
      <button className="delete-button" onClick={handleDeleteClick}>
        {t('ProfileEdit.deleteProfile')} 
      </button>

      {/* Modal de confirmación */}
      <VentanaConfirmacion
        show={isModalVisible}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </div>
  );
};

export default ProfileEdit;
