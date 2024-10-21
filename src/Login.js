import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import Loading from './Loading'; // Importar el componente de pantalla de carga

function Login() {
  const [username, setUsername] = useState(''); 
  const [credential, setCredential] = useState('');  
  const [loading, setLoading] = useState(false); // Estado para controlar la pantalla de carga
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); // Activar el estado de carga

    try {
      const response = await fetch('http://localhost:8080/api/auth/login', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          credential: credential,
        }),
      });

      console.log('Response Headers:', response.headers); // Verificar todos los encabezados recibidos
      
      if (response.ok) {
        const token = response.headers.get('Authorization'); // Recuperar el token del encabezado 'Authorization'
        if (token) {
          localStorage.setItem('token', token); // Guardar el token en localStorage
          navigate('/dashboard'); // Redirigir al dashboard
        } else {
          alert('Token no encontrado en la respuesta del servidor.');
        }
      } else {
        // Manejar diferentes estados de error según el código de respuesta
        if (response.status === 401) {
          alert('Nombre de usuario o contraseña incorrectos.');
        } else if (response.status === 400) {
          alert('Solicitud inválida. Por favor, verifica tus datos.');
        } else {
          alert('Error inesperado. Por favor, intenta nuevamente más tarde.');
        }
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Ocurrió un error. Por favor, intenta nuevamente más tarde.');
    } finally {
      setLoading(false); // Desactivar la pantalla de carga
    }
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
              <label>Nombre de Usuario</label>
              <input
                type="text"
                placeholder="Ingresa tu nombre de usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)} 
                required
              />
            </div>
            <div className="input-group">
              <label>Contraseña</label>
              <input
                type="password"
                placeholder="Ingresa tu contraseña"
                value={credential}
                onChange={(e) => setCredential(e.target.value)}  
                required
              />
            </div>
            <button className="login-btn" type="submit">Iniciar Sesión</button>
            <div className="login-options">
              <label>
                <input type="checkbox" /> Recuérdame
              </label>
              <a href="/" className="help-link">¿Necesitas ayuda?</a>
            </div>
            <div className="create-account">
              <a href="/crearcuenta" onClick={handleCreateAccount} className="create-account-link">Crear cuenta</a>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default Login;
