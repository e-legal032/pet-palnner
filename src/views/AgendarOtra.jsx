// src/views/AgendarOtra.jsx

import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { agregarActividad } from '../db/db';
import { generarAlertaDesdeActividad } from '../db/alertas';
import { formatearFechaDDMMYYYY } from '../utils/fechaUtils'; // 📆 Formato visual curatorial
import '../styles/FormularioActividad.css'; // 🎨 Estilos curatoriales compartidos

const AgendarOtra = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const mascotaId = location.state?.mascotaId;

  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const [notas, setNotas] = useState('');
  const [confirmar, setConfirmar] = useState(false);

  // 💾 Guarda actividad y genera alerta asociada
  const handleGuardar = async () => {
    if (!mascotaId) {
      alert('Error: No se recibió el ID de mascota. Volvé a seleccionar una mascota.');
      navigate('/bienvenida');
      return;
    }

    const actividad = {
      mascotaId,
      tipo: 'Otra',
      fecha,
      hora,
      notas,
    };

    const idGenerado = await agregarActividad(actividad);
    const actividadConId = { ...actividad, id: idGenerado };

    await generarAlertaDesdeActividad(actividadConId);

    alert('La fecha fue agendada con éxito.');
    navigate('/bienvenida');
  };

  return (
    <div className="formulario-container">
      {!confirmar ? (
        <>
          <h2>Agendar otra actividad</h2>

          <label>Fecha:</label>
          <input
            type="date"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
          />

          <label>Hora:</label>
          <input
            type="time"
            value={hora}
            onChange={(e) => setHora(e.target.value)}
          />

          <label>Notas:</label>
          <textarea
            value={notas}
            onChange={(e) => setNotas(e.target.value)}
          />

          <div className="botonera">
            <button className="boton-primario" onClick={() => setConfirmar(true)}>
              Confirmar fecha y hora
            </button>
            <button
              className="boton-secundario"
              onClick={() => navigate('/agendar-actividad', { state: { mascotaId } })}
            >
              Volver
            </button>
          </div>
        </>
      ) : (
        <>
          <h2>¿La fecha y hora son correctas?</h2>
          <p><strong>Fecha:</strong> {formatearFechaDDMMYYYY(fecha)}</p> {/* ✅ Formato visual corregido */}
          <p><strong>Hora:</strong> {hora}</p>
          <p><strong>Notas:</strong> {notas}</p>

          <div className="botonera">
            <button className="boton-primario" onClick={handleGuardar}>
              Sí, agendar
            </button>
            <button className="boton-secundario" onClick={() => setConfirmar(false)}>
              No, volver a editar
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default AgendarOtra;
