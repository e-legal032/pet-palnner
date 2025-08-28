//src/db/alertas.js
import db from './db.js'; // 🧱 Acceso a la instancia Dexie

//
// 🧠 Generación curatorial de alertas desde actividad
//

export const generarAlertaDesdeActividad = async (actividad) => {
  if (!actividad || !actividad.id || !actividad.fecha || !actividad.tipo) {
    console.warn('⚠️ Actividad inválida para generar alerta:', actividad);
    return;
  }

  // 🕒 Evita desfase por zona horaria: interpreta fecha como local
  const [año, mes, día] = actividad.fecha.split('-');
  const fechaActividad = new Date(Number(año), Number(mes) - 1, Number(día));

  const fechaAlerta = new Date(fechaActividad);
  fechaAlerta.setDate(fechaActividad.getDate() - 1);

  const fechaAlertaStr = fechaAlerta.toISOString().split('T')[0];

  const alerta = {
    actividadId: actividad.id,
    tipo: 'recordatorio',
    estado: 'pendiente',
    fechaAlerta: fechaAlertaStr,
    mensaje: `Recordá la actividad "${actividad.tipo}" para ${actividad.fecha}`,
    creadaEn: new Date().toISOString()
  };

  const existente = await db.alertas
    .where('actividadId')
    .equals(alerta.actividadId)
    .first();

  if (!existente) {
    await db.alertas.add(alerta);
    console.log('✅ Alerta generada:', alerta);
  } else {
    console.log('⚠️ Alerta ya existente, no se duplica');
  }
};

//
// 🔄 Revisión curatorial de alertas pendientes según la fecha actual
//

export const revisarAlertasPendientes = async () => {
  const fechaHoy = new Date().toISOString().split('T')[0];

  const alertas = await db.alertas.toArray();
  const activadas = [];

  for (const alerta of alertas) {
    if (alerta.estado !== 'pendiente') continue;

    const fechaAlertaStr = typeof alerta.fechaAlerta === 'string'
      ? alerta.fechaAlerta.trim()
      : new Date(alerta.fechaAlerta).toISOString().split('T')[0];

    if (fechaAlertaStr === fechaHoy) {
      alerta.estado = 'mostrada';
      await db.alertas.put(alerta);
      activadas.push(alerta);
    }
  }

  console.log(`📣 Alertas activadas hoy: ${activadas.length}`);
  return activadas;
};

//
// 🧹 Etapa 6: Purga curatorial de alertas vencidas
//

export const obtenerAlertasVencidas = async () => {
  const fechaHoy = new Date().toISOString().split('T')[0];
  const todas = await db.alertas.toArray();
  return todas.filter((alerta) => {
    return alerta.estado === 'mostrada' && alerta.fechaAlerta < fechaHoy;
  });
};

export const purgarAlertasVencidas = async () => {
  const vencidas = await obtenerAlertasVencidas();

  for (const alerta of vencidas) {
    await db.alertas.delete(alerta.id);
    console.log(`🧹 Alerta purgada: ${alerta.id} — ${alerta.mensaje}`);
  }

  console.log(`✅ Total de alertas purgadas: ${vencidas.length}`);
};

//
// 📦 Funciones auxiliares para acceso directo
//

export const agregarAlerta = async (alerta) => {
  return await db.alertas.add(alerta);
};

export const obtenerAlertas = async () => {
  return await db.alertas.toArray();
};

export const borrarAlerta = async (id) => {
  await db.alertas.delete(id);
};

export const obtenerAlertasPorActividad = async (actividadId) => {
  return await db.alertas
    .where('actividadId')
    .equals(actividadId)
    .toArray();
};

//
// 🧹 Sincronización curatorial al eliminar actividad
//

export const eliminarAlertasPorActividad = async (actividadId) => {
  const asociadas = await obtenerAlertasPorActividad(actividadId);
  for (const alerta of asociadas) {
    await db.alertas.delete(alerta.id);
    console.log(`🧹 Alerta eliminada por actividad: ${alerta.id}`);
  }
};
