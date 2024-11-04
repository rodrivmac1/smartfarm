import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './Login.css';
import Loading from './Loading';

function Login() {
  const { t } = useTranslation(); 
  const [username, setUsername] = useState(''); 
  const [credential, setCredential] = useState('');  
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

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
    
      console.log('Response Headers:', response.headers);
      
      if (response.ok) {
        const token = response.headers.get('Authorization');
        if (token) {
          localStorage.setItem('token', token);
          navigate('/dashboard');
        } else {
          alert('Token no encontrado en la respuesta del servidor.');
        }
      } else {
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
      setLoading(false);
    }
    };

  const handleCreateAccount = (e) => {
    e.preventDefault();
    navigate('/crearcuenta');
  };

  return (
    <div className="login-container">
      {loading ? (
        <Loading />
      ) : (
        <div className="login-box">
          <h1 className="login-title">{t('Login.login')}</h1>
          <form onSubmit={handleLogin}>
            <div className="input-group">
              <label>{t('Login.usernameLabel')}</label>
              <input
                type="text"
                placeholder={t('Login.usernamePlaceholder')}
                value={username}
                onChange={(e) => setUsername(e.target.value)} 
                required
              />
            </div>
            <div className="input-group">
              <label>{t('Login.passwordLabel')}</label>
              <input
                type="password"
                placeholder={t('Login.passwordPlaceholder')}
                value={credential}
                onChange={(e) => setCredential(e.target.value)}  
                required
              />
            </div>
            <button className="login-btn" type="submit">{t('Login.loginButton')}</button>
            <div className="login-options">
              <label>
                <input type="checkbox" /> {t('Login.rememberMe')}
              </label>
              <a href="/" className="help-link">{t('Login.needHelp')}</a>
            </div>
            <div className="create-account">
              <a href="/crearcuenta" onClick={handleCreateAccount} className="create-account-link">
                {t('Login.createAccount')}
              </a>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default Login;