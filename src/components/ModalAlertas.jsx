// src/components/ModalAlertas.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './modal-alertas.css'; // 🎨 Estilos específicos

const ModalAlertas = ({ alertasActivas, onClose }) => {
  const navigate = useNavigate();

  if (!alertasActivas || alertasActivas.length === 0) return null;

  const resumen = `Hay ${alertasActivas.length} alerta(s) activada(s)`;

  return (
    <div className="modal-alertas">
      <div className="modal-contenido">
        <h2>{resumen}</h2>
        <button onClick={() => navigate('/alertas')}>Ver detalles</button>
        <button onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
};

export default ModalAlertas;
