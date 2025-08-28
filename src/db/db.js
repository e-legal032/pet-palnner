// src/db/db.js
import Dexie from 'dexie';

//
// 🧱 Inicialización de la base de datos
//
const db = new Dexie('PetPlannerDB');

//
// 🧠 Versión 3: se agrega la store 'contactos' sin romper las existentes
//
db.version(3).stores({
  mascotas: '++id, nombre, foto', // 🐶 Datos de mascotas
  actividades: '++id, mascotaId, tipo, fecha, notas, hora', // 📅 Actividades con hora incluida
  alertas: '++id, actividadId, tipo, estado, fechaAlerta, mensaje, creadaEn', // 🚨 Alertas curatoriales
  contactos: '++id, nombre, telefono, direccion, notas' // 📇 Contactos con trazabilidad curatorial
});

export default db;

//
// 🐶 Mascotas
//

export const agregarMascota = async (mascota) => {
  return await db.mascotas.add(mascota);
};

export const obtenerMascotas = async () => {
  return await db.mascotas.toArray();
};

export const mascotaExiste = async (nombre) => {
  const mascotas = await db.mascotas.toArray();
  return mascotas.some((m) => m.nombre === nombre);
};

export const borrarMascota = async (id) => {
  await db.mascotas.delete(id);
};

//
// 📅 Actividades
//

export const agregarActividad = async (actividad) => {
  return await db.actividades.add(actividad);
};

export const obtenerActividades = async () => {
  return await db.actividades.toArray();
};

export const borrarActividad = async (id) => {
  await db.actividades.delete(id);
};

//
// 📇 Contactos
//

export const agregarContacto = async (contacto) => {
  return await db.contactos.add(contacto); // ➕ Alta de contacto con validación previa
};

export const obtenerContactos = async () => {
  return await db.contactos.toArray(); // 📋 Listado completo para vista curatorial
};

export const borrarContacto = async (id) => {
  await db.contactos.delete(id); // ❌ Eliminación reversible desde listado
};

export const actualizarContacto = async (id, datosActualizados) => {
  await db.contactos.update(id, datosActualizados); // 🔄 Edición con trazabilidad
};
