import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ProfileEdit.css";

const ProfileView = () => {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    contact: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Función para obtener los datos del perfil desde la API
  const fetchProfileData = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/users/profile", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.ok) {
        const data = await response.json();

        // Asegúrate de que los campos necesarios están presentes en la respuesta
        setProfileData({
          name: data.name || "User",
          email: data.email || "example@mail.com",
          contact: data.contact || "2222222222",
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
    navigate("/profile-edit");
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
          <p>{profileData.name}</p>
        </div>

        <div className="info-field">
          <label>Email account</label>
          <p>{profileData.email}</p>
        </div>

        <div className="info-field">
          <label>Mobile number</label>
          <p>{profileData.contact}</p>
        </div>
      </div>

      <button className="edit-button" onClick={handleEditClick}>
        Edit
      </button>
    </div>
  );
};

export default ProfileView;
