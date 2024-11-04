import React from 'react';
import { Route, BrowserRouter as Router, Routes, useLocation } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group'; // Importar componentes de transición
import './i18n';
import Dashboard from './Dashboard';
import Login from './Login';
import ProfileView from './ProfileView';
import ProfileEdit from './ProfileEdit';
import Sensor from './Sensor';
import Backup from './Backup'; // Importa el componente Backup
import Layout from './layout'; // Importamos el layout
import CrearCuenta from './CrearCuenta';
import './transitions.css'; // Importar el archivo de estilos para las transiciones

function AnimatedRoutes() {
  const location = useLocation(); // Hook para obtener la ubicación actual

  return (
    <TransitionGroup>
      <CSSTransition
        key={location.key} // Usar la ubicación como clave única para cada transición
        timeout={300} // Duración de la transición en milisegundos
        classNames="fade" // Clases CSS que aplican las transiciones
      >
        <Routes location={location}>
          {/* Ruta para la página de login */}
          <Route path="/" element={<Login />} />
          <Route path="/crearcuenta" element={<CrearCuenta />} />
          {/* Rutas que usan el layout con el menú */}
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile-view" element={<ProfileView />} />
            <Route path="/profile-edit" element={<ProfileEdit />} />
            <Route path="/add-sensor" element={<Sensor />} />
            <Route path="/backup" element={<Backup />} />
          </Route>
        </Routes>
      </CSSTransition>
    </TransitionGroup>
  );
}

function App() {
  return (
    <Router>
      <AnimatedRoutes />
    </Router>
  );
}

export default App;
