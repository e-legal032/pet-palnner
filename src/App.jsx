import { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import SplashScreen from './views/SplashScreen.jsx';
import WelcomeView from './views/WelcomeView.jsx';
import RegistrarMascota from './views/RegistrarMascota.jsx';
import ListadoMascotas from './views/ListadoMascotas.jsx';
import EditarMascota from './views/EditarMascota.jsx';
import MainLayout from './components/MainLayout.jsx';
import './App.css';
import AgendarActividad from './views/AgendarActividad.jsx';
import AgendarConsulta from './views/AgendarConsulta.jsx';
import AgendarVacuna from './views/AgendarVacuna.jsx';
import AgendarDesparasitacion from './views/AgendarDesparasitacion.jsx';
import AgendarOtra from './views/AgendarOtra.jsx';
import VerActividades from './views/VerActividades.jsx';
import SeleccionarMascota from './views/SeleccionarMascota.jsx';
import ActividadesPorMascota from './views/ActividadesPorMascota.jsx';
import Alertas from './views/Alertas.jsx';
import NotificadorActividades from './components/NotificadorActividades.jsx';
import Despedida from './views/Despedida.jsx';
import RegistrarContacto from './views/RegistrarContacto.jsx';
import ListadoContactos from './views/ListadoContactos';
import EditarContacto from './views/EditarContacto';


function App() {
  const [mostrarSplash, setMostrarSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMostrarSplash(false);
    }, 5000); // ⏱️ Duración del splash en milisegundos

    return () => clearTimeout(timer); // 🧹 Limpieza del timer
  }, []);

  if (mostrarSplash) {
    return <SplashScreen />;
  }

  return (
    <>
      
      <Routes>
        {/* 🧱 Rutas anidadas dentro del layout principal */}
        <Route element={<MainLayout />}>
          <Route path="/bienvenida" element={<WelcomeView />} />
          <Route path="/registrar-mascota" element={<RegistrarMascota />} />
          <Route path="/ver-mascotas" element={<ListadoMascotas />} />
          <Route path="/editar-mascota" element={<EditarMascota />} />
          <Route path="/agendar-actividad" element={<AgendarActividad />} />
          <Route path="/agendar-actividad/consulta" element={<AgendarConsulta />} />
          <Route path="/agendar-actividad/vacuna" element={<AgendarVacuna />} />
          <Route path="/agendar-actividad/desparasitacion" element={<AgendarDesparasitacion />} />
          <Route path="/agendar-actividad/otra" element={<AgendarOtra />} />
          <Route path="/ver-actividades" element={<VerActividades />} />
          <Route path="/seleccionar-mascota" element={<SeleccionarMascota />} />
          <Route path="/actividades-mascota" element={<ActividadesPorMascota />} />
          <Route path="/alertas" element={<Alertas />} />
          <Route path="/registrar-contacto" element={<RegistrarContacto />} />
          <Route path="/contactos" element={<ListadoContactos />} />
          <Route path="/editar-contacto/:id" element={<EditarContacto />} />
          <Route path="/despedida" element={<Despedida />} />

        </Route>

        {/* 🚪 Redirección desde raíz */}
        <Route path="/" element={<Navigate to="/bienvenida" />} />

        {/* ❓ Ruta no encontrada */}
        <Route
          path="*"
          element={
            <div className="ruta-no-encontrada">
              Ruta no encontrada.
            </div>
          }
        />
      </Routes>
    </>
  );
}

export default App;
