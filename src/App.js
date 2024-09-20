import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Dashboard from './Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} /> {/* Ruta para la página de login */}
        <Route path="/dashboard" element={<Dashboard />} /> {/* Ruta para el dashboard */}
      </Routes>
    </Router>
  );
}

export default App;
