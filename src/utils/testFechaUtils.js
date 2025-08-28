import { parseActividadFechaHora } from './fechaUtils.js';

const actividadesSimuladas = [
  { fecha: '2025-08-20', hora: '11:00' }, // hoy
  { fecha: '2025-08-21', hora: '09:30' }, // mañana
  { fecha: '2025-08-27', hora: '15:00' }, // en 7 días
  { fecha: '2025-08-19', hora: '08:00' }, // ayer
  { fecha: '2025-08-20' }, // hoy sin hora
  { fecha: 'invalid-date', hora: '10:00' }, // inválida
  { fecha: null, hora: '10:00' }, // sin fecha
];

actividadesSimuladas.forEach((act, index) => {
  const resultado = parseActividadFechaHora(act);
  console.log(`Actividad ${index + 1}:`, resultado);
});
