// src/components/NotificadorActividades.jsx
import { useEffect, useState } from 'react';
import {
  revisarAlertasPendientes,
  obtenerAlertas,
  purgarAlertasVencidas
} from '../db/alertas.js'; // 🧠 Funciones curatoriales
import ModalAlertas from './ModalAlertas.jsx'; // 🧩 Componente visual modular

/**
 * 🧭 Componente curatorial que escanea alertas activadas al iniciar.
 * Se monta una vez y ejecuta revisión sin saturar la vista.
 * Integra purga de alertas vencidas (Etapa 6) para mantener limpieza.
 * A partir de Etapa 7, muestra modal si hay alertas activadas o pendientes.
 */

const NotificadorActividades = () => {
  const [alertasActivas, setAlertasActivas] = useState([]); // 🧮 Estado local para alertas activadas
  const [mostrarModal, setMostrarModal] = useState(false); // 🎛️ Control de visibilidad del modal

  useEffect(() => {
    const escanearYLimpiarAlertas = async () => {
      // 🧭 Esperar 500ms para asegurar que Dexie esté listo
      await new Promise((r) => setTimeout(r, 500));

      // 🔍 Revisión de alertas pendientes o activadas
      const todas = await obtenerAlertas();
      const activas = todas.filter((a) => a.estado === 'pendiente');

      if (activas.length > 0) {
        console.log('📣 Alertas activas detectadas:', activas);
        setAlertasActivas(activas); // 🧾 Registro curatorial
        setMostrarModal(true); // 🎬 Activación visual
      } else {
        console.log('🟢 Sin alertas activas');
      }

      // 🧹 Etapa 6: purga curatorial de alertas vencidas
      await purgarAlertasVencidas();
      console.log('🧼 Limpieza de alertas vencidas completada');
    };

    escanearYLimpiarAlertas(); // 🚀 Se ejecuta al montar
  }, []);

  // 🧩 Renderiza modal solo si hay alertas activas
  return (
    <>
      {mostrarModal && (
        <ModalAlertas
          alertasActivas={alertasActivas}
          onClose={() => setMostrarModal(false)} // 🧼 Cierre controlado
        />
      )}
    </>
  );
};

export default NotificadorActividades;

