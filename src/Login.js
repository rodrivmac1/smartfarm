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
      const loginResponse = await fetch('http://3.14.69.183:8080/api/auth/login', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          credential: credential,
        }),
      });

      if (loginResponse.ok) {
        const token = loginResponse.headers.get('Authorization'); // Recuperar el token del encabezado 'Authorization'

        if (token) {
          localStorage.setItem('token', token); // Guardar el token en localStorage

          // Solicitud para obtener el userId usando el token
          const userResponse = await fetch('http://3.14.69.183:8080/api/users', {
            headers: {
              'Authorization': `Bearer ${token}`, // Usar el token para autenticar
              'Content-Type': 'application/json',
            },
          });

          if (userResponse.ok) {
            const usersData = await userResponse.json();
            const loggedInUser = usersData.find(user => user.username === username); // Encontrar el usuario correspondiente

            if (loggedInUser) {
              localStorage.setItem('userId', loggedInUser.id); // Guardar el userId en localStorage
              navigate('/dashboard');
            } else {
              alert('User ID no encontrado en la respuesta del servidor.');
            }
          } else {
            alert('Error al obtener el user ID.');
          }
        } else {
          alert(t('Login.tokenNotFound'));
        }
      } else {
        // Manejar diferentes estados de error según el código de respuesta
        if (loginResponse.status === 401) {
          alert(t('Login.incorrectCredentials'));
        } else if (loginResponse.status === 400) {
          alert(t('Login.invalidRequest'));
        } else {
          alert(t('Login.unexpectedError'));
        }
      }
    } catch (error) {
      console.error('Error:', error);
      alert(t('Login.unexpectedError'));
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