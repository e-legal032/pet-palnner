// src/components/MascotaCard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './MascotaCard.css'; // 🎨 Estilos específicos

const MascotaCard = ({ mascota }) => {
  const navigate = useNavigate();

  // 🧭 Navegar a actividades por mascota con estado
  const handleClick = () => {
    navigate('/actividades-mascota', {
      state: {
        mascotaId: mascota.id,
        nombre: mascota.nombre
      }
    });
  };

  const imagen = mascota.foto || '/default-pet.png'; // 🖼️ Fallback si no hay foto

  return (
    <div className="mascota-card" onClick={handleClick}>
      <img src={imagen} alt={mascota.nombre} className="mascota-imagen" />
      <p className="mascota-nombre">{mascota.nombre}</p>
    </div>
  );
};

export default MascotaCard;
