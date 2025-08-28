// src/views/RegistrarContacto.jsx

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { agregarContacto } from '../db/db'; // 📇 Persistencia curatorial
import Loader from '../components/Loader'; // ⏳ Feedback visual curatorially validado
import '../styles/FormularioActividad.css'; // 🎨 Estilos curatoriales compartidos

const RegistrarContacto = () => {
  const navigate = useNavigate();

  // 🧠 Estado local para campos curatoriales
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [direccion, setDireccion] = useState('');
  const [notas, setNotas] = useState('');
  const [cargando, setCargando] = useState(false);

  // ✅ Validación curatorial antes de guardar
  const validarFormulario = () => {
    return nombre.trim() !== '' && telefono.trim() !== '';
  };

  // 💾 Guardado con persistencia modular
  const manejarRegistro = async () => {
    if (!validarFormulario()) return;

    setCargando(true);

    const nuevoContacto = {
      nombre,
      telefono,
      direccion,
      notas,
    };

    await agregarContacto(nuevoContacto);

    setCargando(false);
    navigate('/contactos'); // 🔁 Reversibilidad: redirige al listado
  };

  return (
    <div className="formulario-container">
      <h2>Registrar nuevo contacto</h2>

      <form onSubmit={(e) => e.preventDefault()}>
        <label>Nombre *</label>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Ej. Veterinaria Central"
        />

        <label>Teléfono *</label>
        <input
          type="tel"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
          placeholder="Ej. +54 9 11 1234 5678"
        />

        <label>Dirección</label>
        <input
          type="text"
          value={direccion}
          onChange={(e) => setDireccion(e.target.value)}
          placeholder="Ej. Av. Siempreviva 742"
        />

        <label>Notas</label>
        <textarea
          value={notas}
          onChange={(e) => setNotas(e.target.value)}
          placeholder="Observaciones curatoriales"
        />

        <div className="botonera">
          <button
            className="boton-primario"
            onClick={manejarRegistro}
            disabled={!validarFormulario()}
          >
            Guardar contacto
          </button>

          <button
            className="boton-primario"
            onClick={() => navigate('/contactos')}
          >
            Ver contactos guardados
          </button>

          <button
            className="boton-secundario"
            onClick={() => navigate('/bienvenida')}
          >
            Volver
          </button>
        </div>
      </form>

      {cargando && <Loader />}
    </div>
  );
};

export default RegistrarContacto;
