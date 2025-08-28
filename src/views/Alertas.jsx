// src/views/Alertas.jsx

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 🧭 Navegación curatorial
import { obtenerAlertas, borrarAlerta } from '../db/alertas'; // 📦 Acceso curatorial
import { formatearFechaDDMMYYYY } from '../utils/fechaUtils'; // 📆 Formato visual curatorial
import db from '../db/db.js'; // Para actualizar estado
import './Alertas.css'; // 🎨 Estilos específicos

const Alertas = () => {
  const [alertas, setAlertas] = useState([]);
  const navigate = useNavigate(); // 🧭 Hook de navegación

  // 🔄 Cargar alertas al montar
  useEffect(() => {
    const cargarAlertas = async () => {
      const todas = await obtenerAlertas();
      setAlertas(todas);
    };
    cargarAlertas();
  }, []);

  // ✅ Marcar como atendida
  const marcarComoMostrada = async (alerta) => {
    const actualizada = { ...alerta, estado: 'mostrada' };
    await db.alertas.put(actualizada);
    setAlertas((prev) =>
      prev.map((a) => (a.id === alerta.id ? actualizada : a))
    );
    console.log(`🧾 Alerta marcada como mostrada: ${alerta.id}`);
  };

  // 🗑️ Eliminar con confirmación
  const eliminarAlerta = async (id) => {
    const confirmar = window.confirm('¿Eliminar esta alerta? Esta acción no se puede deshacer.');
    if (!confirmar) return;

    await borrarAlerta(id);
    setAlertas((prev) => prev.filter((a) => a.id !== id));
    console.log(`🧾 Alerta eliminada: ${id}`);
  };

  // 🧠 Formatear fecha dentro del mensaje curatorial
  const formatearFechaDesdeMensaje = (mensaje) => {
    const match = mensaje.match(/para (\d{4}-\d{2}-\d{2})/);
    if (!match) return mensaje;
    const fechaISO = match[1];
    const fechaFormateada = formatearFechaDDMMYYYY(fechaISO);
    return mensaje.replace(fechaISO, fechaFormateada);
  };

  return (
    <div className="alertas-container">
      <h2>Alertas activas</h2>

      {alertas.length === 0 ? (
        <p>No hay alertas registradas.</p>
      ) : (
        <ul className="alertas-lista">
          {alertas.map((alerta) => {
            const claseVisual = alerta.estado === 'pendiente'
              ? 'alerta-item activa'
              : 'alerta-item mostrada';

            return (
              <li key={alerta.id} className={claseVisual}>
                <div>
                  <strong>{alerta.tipo}</strong> — {formatearFechaDesdeMensaje(alerta.mensaje)}
                </div>

                <div className="alerta-botones">
                  {alerta.estado === 'pendiente' && (
                    <button onClick={() => marcarComoMostrada(alerta)}>✅ Atendida</button>
                  )}
                  <button onClick={() => eliminarAlerta(alerta.id)}>🗑️ Eliminar</button>
                </div>
              </li>
            );
          })}
        </ul>
      )}

      {/* 🔙 Botón para volver a vista de bienvenida */}
      <button className="boton-volver" onClick={() => navigate('/bienvenida')}>
        Volver
      </button>
    </div>
  );
};

export default Alertas;
