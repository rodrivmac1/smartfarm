import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Dashboard from './Dashboard';
import Login from './Login';
import Profile from './Profile';
import Sensor from './Sensor';
import Layout from './layout'; // Importamos el layout

function App() {
  return (
    <Router>
      <Routes>
        {/* Ruta para la página de login */}
        <Route path="/" element={<Login />} />

        {/* Rutas que usan el layout con el menú */}
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/add-sensor" element={<Sensor />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
