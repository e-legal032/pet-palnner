// src/utils/fechaUtils.js

/**
 * Convierte los campos fecha y hora de una actividad en un objeto Date válido.
 * Retorna null si la fecha es inválida o está ausente.
 * Este método sí usa Date porque necesita timestamp completo.
 */
export const parseActividadFechaHora = (actividad) => {
  const { fecha, hora } = actividad;
  if (!fecha) return null;

  const fechaCompleta = hora ? `${fecha}T${hora}` : `${fecha}T00:00`;
  const dateObj = new Date(fechaCompleta);

  return isNaN(dateObj.getTime()) ? null : dateObj;
};

/**
 * Formatea una fecha tipo 'aaaa-mm-dd' en 'dd-mm-aaaa' sin crear Date.
 * Evita desfase por zona horaria al trabajar directamente con el string.
 * Retorna string vacío si la fecha es inválida.
 */
export const formatearFechaDDMMYYYY = (fechaISO) => {
  if (!fechaISO || typeof fechaISO !== 'string') return '';
  const partes = fechaISO.split('-');
  if (partes.length !== 3) return '';

  const [año, mes, día] = partes;
  return `${día}-${mes}-${año}`;
};
