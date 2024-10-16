import React from "react";
import { useNavigate } from "react-router-dom"; // Importar useNavigate para la navegación
import "./ProfileEdit.css"; // Utiliza el mismo CSS de ProfileEdit para mantener el diseño

const ProfileView = () => {
  const navigate = useNavigate(); // Hook para la navegación

  // Valores de estado definidos directamente
  const name = "Edmundo Linares";
  const email = "edmundo_zapatero10@gmail.com";
  const mobile = "248 - 125 - 9698";
  const username = "edmundo10"; // Nuevo campo de username
  const userType = "User"; // Nuevo campo de tipo de usuario

  // Función para manejar el clic en el botón de "Edit"
  const handleEditClick = () => {
    navigate("/profile-edit"); // Redirige a la vista de edición
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
          <p>{name}</p>
        </div>

        <div className="info-field">
          <label>Username</label>
          <p>{username}</p> {/* Campo de username agregado */}
        </div>

        <div className="info-field">
          <label>User type</label>
          <p>{userType}</p> {/* Campo de tipo de usuario agregado */}
        </div>

        <div className="info-field">
          <label>Email account</label>
          <p>{email}</p>
        </div>

        <div className="info-field">
          <label>Mobile number</label>
          <p>{mobile}</p>
        </div>

        

        <div className="info-field password-field">
          <label>Password</label>
          <p>********</p> {/* Mostrar la contraseña oculta */}
        </div>
      </div>

      {/* Botón Edit para ir a la vista de edición */}
      <button className="edit-button" onClick={handleEditClick}>
        Edit
      </button>
    </div>
  );
};

export default ProfileView;
