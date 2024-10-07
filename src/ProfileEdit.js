import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importar useNavigate para la navegación
import "./ProfileEdit.css"; // Estilos generales
import VentanaConfirmacion from './VentanaConfirmacion'; // Importamos el modal
import "./VentanaConfirmacion.css";

const Profile = () => {
  const navigate = useNavigate(); // Hook para navegar de regreso a ProfileView

  // Definimos los valores de estado iniciales para cada campo
  const [name, setName] = useState("Edmundo Linares");
  const [email, setEmail] = useState("edmundo_zapatero10@gmail.com");
  const [mobile, setMobile] = useState("248 - 125 - 9698");
  const [location, setLocation] = useState("Puebla");
  const [password, setPassword] = useState("mypassword123"); // Nueva contraseña
  const [showPassword, setShowPassword] = useState(false); // Estado para mostrar u ocultar la contraseña

  // Estado para controlar la visibilidad del modal
  const [isModalVisible, setModalVisible] = useState(false);

  // Función para manejar el guardado y redirigir a la vista de ProfileView
  const handleSave = () => {
    // Lógica para guardar los cambios (simulado con console.log)
    console.log("Saved Profile Info:", { name, email, mobile, location, password });
    
    // Mostrar el mensaje de "Profile saved!" y redirigir a ProfileView
    alert("Profile saved!");
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
    alert("Profile deleted");
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

        {/* Nuevo campo de contraseña */}
        <div className="info-field password-field">
          <label>Password</label>
          <input
            type={showPassword ? "text" : "password"} // Cambia el tipo de input según el estado
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="toggle-password" onClick={toggleShowPassword}>
            {showPassword ? "HIDE" : "SHOW"} {/* Icono para alternar la visibilidad */}
          </button>
        </div>
      </div>

      <button className="save-button" onClick={handleSave}>
        <span className="save-button-text">Save Changes</span>
      </button>

      {/* Nuevo botón para eliminar el perfil */}
      <button className="delete-button" onClick={handleDeleteClick}>
        DELETE PROFILE
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

export default Profile;
