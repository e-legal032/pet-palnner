import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { obtenerActividades } from '../db/db'; // 📅 Acceso a actividades
import ActividadCard from '../components/ActividadCard'; // 🧱 Componente modular
import './ActividadesPorMascota.css'; // 🎨 Estilos locales

const ActividadesPorMascota = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { mascotaId, nombre } = location.state || {};

  const [actividades, setActividades] = useState([]);

  // 🧠 Cargar actividades filtradas al montar
  useEffect(() => {
    const cargarActividades = async () => {
      const todas = await obtenerActividades();
      const filtradas = todas.filter((act) => act.mascotaId === mascotaId);
      setActividades(filtradas);
    };

    if (mascotaId !== undefined) {
      cargarActividades();
    }
  }, [mascotaId]);

  // 🧭 Navegar de vuelta
  const volver = () => {
    navigate('/bienvenida');
  };

  return (
    <div className="actividades-container">
      <h2>Actividades de {nombre}</h2>

      {actividades.length === 0 ? (
        <p className="mensaje-vacio">No hay actividades registradas para esta mascota.</p>
      ) : (
        <ul className="actividades-lista">
          {actividades.map((act) => (
            <li key={act.id} className="actividad-item">
              <ActividadCard actividad={act} nombreMascota={nombre} />
            </li>
          ))}
        </ul>
      )}

      <button onClick={volver} className="volver-button">
        Volver
      </button>
    </div>
  );
};

export default ActividadesPorMascota;
