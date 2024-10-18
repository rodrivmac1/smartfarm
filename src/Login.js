import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './Login.css';
import Loading from './Loading';

function Login() {
  const { t } = useTranslation(); 
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
          <h1 className="login-title">{t('Login.login')}</h1>
          <form onSubmit={handleLogin}>
            <div className="input-group">
              <label>{t('Login.emailPhoneNumber')}</label>
              <input type="text" placeholder={t('Login.enterEmailPhone')} />
            </div>
            <div className="input-group">
              <label>{t('Login.password')}</label>
              <input type="password" placeholder={t('Login.enterPassword')} />
            </div>
            <button className="login-btn" type="submit">
              {t('Login.signIn')}
            </button>
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
