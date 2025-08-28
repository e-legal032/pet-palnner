// src/views/EditarContacto.jsx

import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { actualizarContacto } from '../db/db'; // 📇 Persistencia curatorial
import Loader from '../components/Loader'; // ⏳ Feedback visual curatorially validado

const EditarContacto = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const contactoOriginal = location.state?.contacto; // 🧩 Recuperación curatorial del contacto

  // 🧠 Restauración curatorial del estado previo
  const [nombre, setNombre] = useState(contactoOriginal?.nombre || '');
  const [telefono, setTelefono] = useState(contactoOriginal?.telefono || '');
  const [direccion, setDireccion] = useState(contactoOriginal?.direccion || '');
  const [notas, setNotas] = useState(contactoOriginal?.notas || '');
  const [cargando, setCargando] = useState(false);

  // ✅ Validación curatorial antes de guardar
  const validarFormulario = () => {
    return nombre.trim() !== '' && telefono.trim() !== '';
  };

  // 💾 Actualización con trazabilidad
  const manejarEdicion = async () => {
    if (!validarFormulario()) return;

    setCargando(true);

    const datosActualizados = {
      nombre,
      telefono,
      direccion,
      notas,
    };

    await actualizarContacto(contactoOriginal.id, datosActualizados); // 🛠️ Persistencia modular

    setCargando(false);
    navigate('/contactos'); // 🔁 Reversibilidad: redirige al listado
  };

  // 🛑 Fallback curatorial si no hay datos
  if (!contactoOriginal) {
    return <p>No se encontró el contacto a editar.</p>;
  }

  return (
    <div className="view editar-contacto">
      <h2>Editar contacto</h2>

      <form className="formulario" onSubmit={(e) => e.preventDefault()}>
        {/* 📝 Campo obligatorio: nombre */}
        <label>Nombre *</label>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />

        {/* 📞 Campo obligatorio: teléfono */}
        <label>Teléfono *</label>
        <input
          type="tel"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
        />

        {/* 📍 Campo opcional: dirección */}
        <label>Dirección</label>
        <input
          type="text"
          value={direccion}
          onChange={(e) => setDireccion(e.target.value)}
        />

        {/* 📝 Campo opcional: notas */}
        <label>Notas</label>
        <textarea
          value={notas}
          onChange={(e) => setNotas(e.target.value)}
        />

        {/* ✅ Botón para guardar cambios */}
        <button
          className="btn-guardar"
          onClick={manejarEdicion}
          disabled={!validarFormulario()}
        >
          Guardar cambios
        </button>
      </form>

      {/* 🔙 Botón para volver sin guardar */}
      <button
        className="btn-volver"
        onClick={() => navigate('/contactos')}
      >
        Volver
      </button>

      {/* ⏳ Loader visual mientras se guarda */}
      {cargando && <Loader />}
    </div>
  );
};

export default EditarContacto;
