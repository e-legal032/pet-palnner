// src/views/ListadoContactos.jsx

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  obtenerContactos,
  borrarContacto
} from '../db/db'; // 📇 Persistencia curatorial
import Loader from '../components/Loader'; // ⏳ Feedback visual curatorially validado
import '../styles/FormularioActividad.css'; // 🎨 Estilos curatoriales compartidos

const ListadoContactos = () => {
  const [contactos, setContactos] = useState([]); // 📋 Estado local para listado
  const [cargando, setCargando] = useState(true); // ⏳ Estado de carga
  const navigate = useNavigate(); // 🧭 Navegación modular

  // 🧠 Carga inicial con trazabilidad curatorial
  useEffect(() => {
    const cargarContactos = async () => {
      const resultado = await obtenerContactos(); // 🔍 Consulta a base curatorial
      setContactos(resultado); // 📥 Actualiza estado con datos obtenidos
      setCargando(false); // ✅ Finaliza carga
    };
    cargarContactos();
  }, []);

  // ❌ Acción curatorial: borrar contacto y actualizar vista
  const manejarBorrado = async (id) => {
    await borrarContacto(id); // 🗑️ Elimina contacto por ID
    const actualizados = await obtenerContactos(); // 🔄 Refresca listado
    setContactos(actualizados); // 📥 Actualiza estado
  };

  return (
    <div className="formulario-container">
      <h2>Contactos registrados</h2>

      {cargando && <Loader />}

      {!cargando && contactos.length === 0 && (
        <div className="botonera">
          <p>No hay contactos registrados aún.</p>
          <button
            className="boton-primario"
            onClick={() => navigate('/registrar-contacto')}
          >
            Agregar contacto
          </button>
        </div>
      )}

      <ul className="lista-contactos">
        {contactos.map((contacto) => (
          <li key={contacto.id} className="contacto-item">
            <div className="info">
              <strong>{contacto.nombre}</strong>
              <p>📞 {contacto.telefono}</p>
              {contacto.direccion && <p>📍 {contacto.direccion}</p>}
              {contacto.notas && <p>📝 {contacto.notas}</p>}
            </div>

            <div className="botonera">
              <button
                className="boton-secundario"
                onClick={() =>
                  navigate(`/editar-contacto/${contacto.id}`, {
                    state: { contacto }
                  })
                }
              >
                Editar
              </button>

              <button
                className="boton-danger"
                onClick={() => manejarBorrado(contacto.id)}
              >
                Borrar
              </button>

              <a
                className="boton-wap"
                href={`https://wa.me/${contacto.telefono.replace(/\D/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="/src/assets/wap-icon.png"
                  alt="WhatsApp"
                  className="wap-icon"
                />
              </a>
            </div>
          </li>
        ))}
      </ul>

      <div className="botonera">
        <button
          className="boton-secundario"
          onClick={() => navigate('/bienvenida')}
        >
          Volver
        </button>
      </div>
    </div>
  );
};

export default ListadoContactos;
