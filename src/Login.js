import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './Login.css';
import Loading from './Loading';

function Login() {
  const { t } = useTranslation(); 
  const [username, setUsername] = useState(''); 
  const [credential, setCredential] = useState('');  
  const [loading, setLoading] = useState(false); // Estado para controlar la pantalla de carga
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); // Activar el estado de carga

    try {
      const response = await fetch('http://3.14.69.183:8080/api/auth/login', { 
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
          alert(t('Login.tokenNotFound'));
        }
      } else {
        // Manejar diferentes estados de error según el código de respuesta
        if (response.status === 401) {
          alert(t('Login.incorrectCredentials'));
        } else if (response.status === 400) {
          alert(t('Login.invalidRequest'));
        } else {
          alert(t('Login.unexpectedError'));
        }
      }
    } catch (error) {
      console.error('Error:', error);
      alert(t('Login.unexpectedError'));
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
          <h1 className="login-title">{t('Login.login')}</h1>
          <form onSubmit={handleLogin}>
            <div className="input-group">
              <label>{t('Login.emailPhoneNumber')}</label>
              <input
                type="text"
                placeholder={t('Login.enterEmailPhone')}
                value={username}
                onChange={(e) => setUsername(e.target.value)} 
                required
              />
            </div>
            <div className="input-group">
              <label>{t('Login.password')}</label>
              <input
                type="password"
                placeholder={t('Login.enterPassword')}
                value={credential}
                onChange={(e) => setCredential(e.target.value)}  
                required
              />
            </div>
            <button className="login-btn" type="submit">{t('Login.signIn')}</button>
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
