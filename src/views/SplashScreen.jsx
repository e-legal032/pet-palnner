//src/views/SplashScree,jsx
import React from 'react';
import './SplashScreen.css'; // 🎨 Estilos separados para claridad

const SplashScreen = () => {
  return (
    <div className="splash-container">
      {/* 🐾 Logo animado con escala y giro */}
      <img
        src="/splash-logo.png"
        alt="PetCare Planner Logo"
        className="splash-logo"
      />

      {/* 📝 Subtítulo dividido en dos oraciones con animación secuencial */}
      <div className="splash-subtitle">
        <p className="linea uno">Organizá la salud de tus mascotas.</p>
        <p className="linea dos">Todas sus actividades <span className="naranja-animada">en un solo lugar</span>.</p>
      </div>
    </div>
  );
};

export default SplashScreen;
