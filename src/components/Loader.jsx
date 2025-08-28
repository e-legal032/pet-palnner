//src/components/Loader.jsx
import React from 'react';
import './Loader.css';

const Loader = ({ mensaje = 'Cargando...' }) => {
  return (
    <div className="loader-container">
      <div className="spinner" aria-label="Cargando contenido"></div>
      <p className="loader-mensaje">{mensaje}</p>
    </div>
  );
};

export default Loader;
