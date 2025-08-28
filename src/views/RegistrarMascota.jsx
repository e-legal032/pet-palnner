// pet-planner/src/views/RegistrarMascota.jsx

import React, { useState } from 'react';
import db, { mascotaExiste } from '../db/db';
import { useNavigate } from 'react-router-dom';
import { toBase64 } from '../utils/toBase64'; // ✅ Importamos función base64
import './RegistrarMascota.css';

const RegistrarMascota = () => {
  const [nombre, setNombre] = useState('');
  const [foto, setFoto] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nombreLimpio = nombre.trim();

    if (!nombreLimpio) {
      alert('El nombre de la mascota es obligatorio.');
      return;
    }

    const yaExiste = await mascotaExiste(nombreLimpio);
    if (yaExiste) {
      alert('Ya existe una mascota con ese nombre.');
      navigate('/bienvenida');
      return;
    }

    // ✅ Convertimos foto a base64 si existe
    const fotoBase64 = foto ? await toBase64(foto) : '/default-pet.png';

    const nuevaMascota = {
      nombre: nombreLimpio,
      foto: fotoBase64,
    };

    await db.mascotas.add(nuevaMascota);

    alert('Mascota registrada con éxito.');
    navigate('/bienvenida');
  };

  return (
    <form onSubmit={handleSubmit} className="formulario-mascota">
      <h2>Registrar mascota</h2>

      <input
        type="text"
        placeholder="Nombre de la mascota"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        required
        className="input-texto"
      />
      <br /><br />
      <label htmlFor="foto" className="boton-subir">
        📷 Subir foto
      </label>
      <input
        type="file"
        id="foto"
        accept="image/*"
        onChange={(e) => setFoto(e.target.files[0])}
        className="input-file-oculto"
      />
      <br /><br />

      <button type="submit" className="boton-guardar">Guardar</button>
    </form>
  );
};

export default RegistrarMascota;
