import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault(); 
    navigate('/dashboard'); 
  };

  const handleCreateAccount = (e) => {
    e.preventDefault();
    navigate('/crearcuenta');
  };

  return (
    <div className="login-container">
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
          <div className="create-account">
            <a href="/crearcuenta" onClick={handleCreateAccount} className="create-account-link">Crear cuenta</a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
