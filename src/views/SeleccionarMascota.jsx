// src/views/SeleccionarMascota.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { obtenerMascotas } from '../db/db';
import './SeleccionarMascota.css'; // 🎨 Estilos específicos

const SeleccionarMascota = () => {
  const [mascotas, setMascotas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const cargar = async () => {
      const data = await obtenerMascotas();
      setMascotas(data);
    };
    cargar();
  }, []);

  const seleccionar = (id) => {
    navigate('/agendar-actividad', {
      state: { mascotaId: id }
    });
  };

  return (
    <div className="seleccionar-container">
      <h2>¿Para qué mascota querés agendar?</h2>

      {mascotas.length === 0 ? (
        <p>No hay mascotas registradas.</p>
      ) : (
        <ul className="mascota-lista">
          {mascotas.map((m) => (
            <li key={m.id} className="mascota-item">
              <p><strong>{m.nombre}</strong></p>
              <button className="seleccionar-button" onClick={() => seleccionar(m.id)}>
                Seleccionar
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SeleccionarMascota;
