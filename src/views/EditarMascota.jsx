// src/views/EditarMascota.jsx

// 🧩 Importaciones necesarias
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import db from '../db/db'; // ↔️ Acceso a IndexedDB vía Dexie
import { toBase64 } from '../utils/toBase64'; // 📸 Conversión de imagen
import './RegistrarMascota.css'; // 🎨 Reutiliza estilos existentes

const EditarMascota = () => {
  const location = useLocation(); // 📦 Accede al estado propagado
  const navigate = useNavigate(); // 🧭 Para redirigir después de guardar

  const mascotaId = location.state?.mascotaId; // 🐾 ID recibido por navegación interna

  // 🎯 Estados locales
  const [nombre, setNombre] = useState('');
  const [foto, setFoto] = useState(null); // 🖼️ Archivo seleccionado
  const [fotoPreview, setFotoPreview] = useState(''); // 🔍 Preview visual inmediato

  // 🔄 Carga inicial de datos de la mascota
  useEffect(() => {
    if (!mascotaId) {
      alert('Seleccioná una mascota para editar sus datos.');
      navigate('/ver-mascotas');
      return;
    }

    db.mascotas.get(Number(mascotaId)).then((mascota) => {
      if (mascota) {
        setNombre(mascota.nombre);
        setFotoPreview(mascota.foto); // 🖼️ Inicializa preview con foto actual
      } else {
        alert('Mascota no encontrada.');
        navigate('/ver-mascotas');
      }
    });
  }, [mascotaId, navigate]);

  // 📸 Maneja selección de nueva foto y actualiza preview
  const handleFotoChange = (e) => {
    const archivo = e.target.files[0];
    if (archivo) {
      setFoto(archivo); // 🗂️ Guarda archivo para persistencia
      const reader = new FileReader();
      reader.onloadend = () => {
        setFotoPreview(reader.result); // 🔄 Actualiza preview inmediato
      };
      reader.readAsDataURL(archivo);
    }
  };

  // 💾 Guardar cambios
  const handleSubmit = async (e) => {
    e.preventDefault();
    const nombreLimpio = nombre.trim();

    // 📸 Si se cargó nueva foto, convertirla; si no, usar la actual
    const fotoBase64 = foto ? await toBase64(foto) : fotoPreview;

    // 🧱 Actualizar en la base de datos
    await db.mascotas.update(Number(mascotaId), {
      nombre: nombreLimpio,
      foto: fotoBase64,
    });

    alert('Mascota actualizada con éxito.');
    navigate('/ver-mascotas'); // 🔁 Redirigir a listado
  };

  // 🖼️ Render del formulario con preview
  return (
    <form onSubmit={handleSubmit} className="formulario-mascota">
      <h2>Editar mascota</h2>

      {/* 📝 Campo de texto para nombre */}
      <input
        type="text"
        placeholder="Nombre de la mascota"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        required
        className="input-texto"
      />
      <br /><br />

      {/* 📷 Botón estilizado para subir nueva foto */}
      <label htmlFor="foto" className="boton-subir">
        📷 Cambiar foto
      </label>
      <input
        type="file"
        id="foto"
        accept="image/*"
        onChange={handleFotoChange}
        className="input-file-oculto"
      />
      <br /><br />

      {/* 🖼️ Preview visual inmediato de la foto */}
      {fotoPreview && (
        <img
          src={fotoPreview}
          alt="Preview de la mascota"
          className="preview-foto"
          style={{ maxWidth: '200px', borderRadius: '8px' }}
        />
      )}
      <br /><br />

      {/* ✅ Botón para guardar cambios */}
      <button type="submit" className="boton-guardar">Guardar cambios</button>
    </form>
  );
};

export default EditarMascota;
