// src/views/AgendarVacuna.jsx

import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { agregarActividad } from '../db/db';
import { generarAlertaDesdeActividad } from '../db/alertas';
import { formatearFechaDDMMYYYY } from '../utils/fechaUtils'; // 📆 Formato visual curatorial
import '../styles/FormularioActividad.css'; // 🎨 Estilos curatoriales compartidos

const AgendarVacuna = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const mascotaId = location.state?.mascotaId;

  const [tipo, setTipo] = useState('');
  const [fecha, setFecha] = useState('');
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
      tipo: 'Vacuna',
      subtipo: tipo,
      fecha,
    };

    const idGenerado = await agregarActividad(actividad);
    const actividadConId = { ...actividad, id: idGenerado };

    await generarAlertaDesdeActividad(actividadConId);

    alert('Vacuna registrada con éxito.');
    navigate('/bienvenida');
  };

  return (
    <div className="formulario-container">
      {!confirmar ? (
        <>
          <h2>Registrar vacuna</h2>

          <label>Tipo de vacuna:</label>
          <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
            <option value="">Seleccionar</option>
            <option value="Rabia">Rabia</option>
            <option value="Triple">Triple</option>
            <option value="Parvovirus">Parvovirus</option>
            <option value="Otra">Otra</option>
          </select>

          <label>Fecha de aplicación:</label>
          <input
            type="date"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
          />

          <div className="botonera">
            <button className="boton-primario" onClick={() => setConfirmar(true)}>
              Confirmar datos
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
          <h2>¿Confirmás los datos?</h2>
          <p><strong>Vacuna:</strong> {tipo}</p>
          <p><strong>Fecha:</strong> {formatearFechaDDMMYYYY(fecha)}</p> {/* ✅ Formato visual corregido */}

          <div className="botonera">
            <button className="boton-primario" onClick={handleGuardar}>
              Sí, registrar
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

export default AgendarVacuna;
