import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import Loading from './Loading'; // Importar el componente de pantalla de carga

function Login() {
  const [loading, setLoading] = useState(false); // Estado para controlar la pantalla de carga
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true); // Activar el estado de carga

    // Simular un proceso de carga (por ejemplo, validación del login)
    setTimeout(() => {
      setLoading(false); // Desactivar el estado de carga
      navigate('/dashboard'); // Redirigir al dashboard después de la carga
    }, 2000); // Simulación de 2 segundos de carga
  };

  const handleCreateAccount = (e) => {
    e.preventDefault();
    navigate('/crearcuenta');
  };

  return (
    <div className="login-container">
      {loading ? (
        <Loading /> // Mostrar pantalla de carga si está en estado de carga
      ) : (
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
              <a href="/crearcuenta" onClick={handleCreateAccount} className="create-account-link">Create account</a>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default Login;
