import React, { useState } from 'react';
import ProfileView from './ProfileView';
import ProfileEdit from './ProfileEdit';

function Profile() {
  // Estado para alternar entre la vista de edición y vista de solo lectura
  const [isEditing, setIsEditing] = useState(false);

  // Estado para almacenar los datos del usuario
  const [userData, setUserData] = useState({
    name: 'John Doe',  // Aquí puedes establecer los valores iniciales reales
    email: 'johndoe@example.com',
    // Agrega más campos si es necesario
  });

  // Función que maneja cuando el usuario hace clic en el botón "Edit"
  const handleEditClick = () => {
    setIsEditing(true);  // Cambiar a la vista editable
  };

  // Función que maneja cuando el usuario hace clic en "Save Changes"
  const handleSaveClick = (updatedData) => {
    setUserData(updatedData);  // Actualizar los datos con los cambios realizados en ProfileEdit
    setIsEditing(false);  // Cambiar de vuelta a la vista de solo lectura
  };

  return (
    <div>
      {isEditing ? (
        // Si está en modo edición, mostrar la vista de edición
        <ProfileEdit userData={userData} onSaveClick={handleSaveClick} />
      ) : (
        // Si no está en modo edición, mostrar la vista de solo lectura
        <ProfileView userData={userData} onEditClick={handleEditClick} />
      )}
    </div>
  );
}

export default Profile;
