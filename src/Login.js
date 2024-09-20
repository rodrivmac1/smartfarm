import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Asegúrate de que la ruta sea correcta

function Login() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/dashboard');
  };

  return (
    <div>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;



