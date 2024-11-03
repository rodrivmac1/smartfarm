import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import "./CrearCuenta.css"; 
import defaultUserImage from "./images/user.png"; 

const CrearCuenta = () => {
  const [name, setName] = useState(""); 
  const [username, setUsername] = useState(""); 
  const [password, setPassword] = useState(""); 
  const [email, setEmail] = useState(""); 
  const [mobile, setMobile] = useState(""); 

  const navigate = useNavigate(); 

  const handleSave = async (e) => {
    e.preventDefault(); // Evita el envío por defecto del formulario

    console.log("Saved Profile Info:", { name, username, password, email, mobile });

    try {
      const response = await fetch("http://3.14.69.183:8080/api/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          username: username,
          credential: password, 
          contact: mobile,
          email: email,
        }),
      });

      if (response.ok) {
        alert("Profile created successfully!");
        navigate("./Login"); 
      } else {
        const errorData = await response.json();
        alert(`Error creating profile: ${errorData.message || "Unexpected error"}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="crearcuenta-profile-container crearcuenta-content">
      <div className="crearcuenta-profile-header white-background">
        <img
          src={defaultUserImage} 
          alt="Profile"
          className="crearcuenta-profile-picture"
        />
        <div className="crearcuenta-profile-details">
          <h2>{name}</h2>
          <p>{email}</p>
        </div>
      </div>

      <form className="crearcuenta-profile-info" onSubmit={handleSave}>
        <div className="crearcuenta-info-field">
          <label>Full name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your full name"
            required 
          />
        </div>

        <div className="crearcuenta-info-field">
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            required
          />
        </div>

        <div className="crearcuenta-info-field">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            minLength="8" 
            required 
          />
        </div>

        <div className="crearcuenta-info-field">
          <label>Email account</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required 
          />
        </div>

        <div className="crearcuenta-info-field">
          <label>Mobile number</label>
          <input
            type="text"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            placeholder="Enter your mobile number"
            maxLength="12" 
            required 
          />
        </div>

        <button type="submit" className="crearcuenta-save-button">
          <span className="crearcuenta-save-button-text">Save</span>
        </button>
      </form>
    </div>
  );
};

export default CrearCuenta;
