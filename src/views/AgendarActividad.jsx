// src/views/AgendarActividad.jsx
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './AgendarActividad.css'; // 🎨 Estilos específicos

const AgendarActividad = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const mascotaId = location.state?.mascotaId; // 📌 Recibir id desde WelcomeView

  // 🧭 Navegación con validación curatorial
  const navegarConMascota = (tipo) => {
    if (!mascotaId) return; // 🛡️ Evita navegación sin contexto
    navigate(`/agendar-actividad/${tipo}`, {
      state: { mascotaId }
    });
  };

  return (
    <div className="agendar-container">
      <h2>¿Qué agendamos?</h2>

      <button className="agendar-button" onClick={() => navegarConMascota('consulta')}>
        Consulta
      </button>

      <button className="agendar-button" onClick={() => navegarConMascota('vacuna')}>
        Vacuna
      </button>

      <button className="agendar-button" onClick={() => navegarConMascota('desparasitacion')}>
        Desparasitación
      </button>

      <button className="agendar-button" onClick={() => navegarConMascota('otra')}>
        Otra
      </button>
    </div>
  );
};

export default AgendarActividad;
