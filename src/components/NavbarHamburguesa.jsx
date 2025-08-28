// src/components/NavbarHamburguesa.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './NavbarHamburguesa.css'; // 🎨 Estilos curatoriales

const NavbarHamburguesa = () => {
  const [abierto, setAbierto] = useState(false);
  const navigate = useNavigate();

  const opciones = [
    { label: 'Registrar mascota', ruta: '/registrar-mascota' },
    { label: 'Mascotas', ruta: '/ver-mascotas' },
    { label: 'Editar mascota', ruta: '/editar-mascota' },
    { label: 'Agendar actividad', ruta: '/agendar-actividad' },
    { label: 'Ver actividades', ruta: '/ver-actividades' },
    { label: 'Contactos', ruta: '/contactos' },
    { label: 'Salir', ruta: '/despedida' }
  ];

  return (
    <div className="navbar-hamburguesa">
      <button className="hamburguesa" onClick={() => setAbierto(!abierto)}>
        ☰
      </button>

      {abierto && (
        <ul className="menu-opciones">
          {opciones.map((opcion, index) => (
            <li key={index}>
              <button
                className="opcion"
                onClick={() => {
                  navigate(opcion.ruta);
                  setAbierto(false); // 🔁 Cierra menú al navegar
                }}
              >
                {opcion.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NavbarHamburguesa;
