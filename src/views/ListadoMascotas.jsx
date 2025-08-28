import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import db from '../db/db';
import './ListadoMascotas.css';
import Loader from '../components/Loader'; // 🧩 Componente modular de carga

const ListadoMascotas = () => {
  const [mascotas, setMascotas] = useState([]);
  const [cargando, setCargando] = useState(true); // ⏳ Estado de carga
  const navigate = useNavigate();

  // 🔄 Recupera mascotas desde IndexedDB
  const cargarMascotas = async () => {
    setCargando(true);
    const todas = await db.mascotas.toArray();
    setMascotas(todas);
    setCargando(false);
  };

  // 📦 Carga inicial al montar la vista
  useEffect(() => {
    cargarMascotas();
  }, []);

  // 🗑️ Maneja borrado de mascota con confirmación
  const handleBorrar = async (id) => {
    const confirmar = window.confirm('¿Seguro que querés borrar los datos de esta mascota?');
    if (!confirmar) return;

    await db.mascotas.delete(id);
    await cargarMascotas(); // 🔁 Refresca listado
  };

  // ✏️ Navega a vista de edición con mascotaId
  const handleEditar = (mascotaId) => {
    navigate('/editar-mascota', { state: { mascotaId } });
  };

  return (
    <div className="listado-container">
      <h2>Listado de mascotas</h2>
      <p>Estas son tus mascotas registradas:</p>

      {/* ⏳ Loader modular mientras se cargan los datos */}
      {cargando ? (
        <Loader mensaje="Cargando mascotas..." />
      ) : mascotas.length === 0 ? (
        <p>No hay mascotas registradas aún.</p>
      ) : (
        <ul className="mascotas-lista">
          {mascotas.map((mascota) => (
            <li key={mascota.id} className="mascota-item">
              <img
                src={mascota.foto}
                alt={`Foto de ${mascota.nombre}`}
                className="mascota-foto"
              />
              <p><strong>{mascota.nombre}</strong></p>

              {/* 🗑️ Botón para borrar mascota */}
              <button
                className="boton-borrar"
                onClick={() => handleBorrar(mascota.id)}
              >
                Borrar
              </button>

              {/* ✏️ Botón para editar mascota */}
              <button
                className="boton-editar"
                onClick={() => handleEditar(mascota.id)}
              >
                Editar
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* 🔙 Botón para volver a vista de bienvenida */}
      <button className="boton-volver" onClick={() => navigate('/bienvenida')}>
        Volver
      </button>
    </div>
  );
};

export default ListadoMascotas;
