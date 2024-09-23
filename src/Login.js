import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import backgroundImage from './assets/Fondo.jpg'; // Ajusta la ruta si es necesario
//import logo from '../assets/logo.png'; 

function Login() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault(); // Evita la recarga de página al enviar el formulario
    navigate('/dashboard'); // Navega al dashboard
  };

  return (
    <div className="login-container" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="login-box">
        <h1 className="login-title">Login</h1>
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label>Email or phone number</label>
            <input type="text" placeholder="Enter your email or phone" />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input type="password" placeholder="Enter your password" />
          </div>
          <button className="login-btn" type="submit">Sign in</button>
          <div className="login-options">
            <label>
              <input type="checkbox" /> Remember me
            </label>
            <a href="/" className="help-link">Need help?</a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;