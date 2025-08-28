//src/components/MainLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import './MainLayout.css';
import NotificadorActividades from './NotificadorActividades.jsx';
import NavbarHamburguesa from './NavbarHamburguesa.jsx';


const MainLayout = () => {
  return (
    <div className="layout-container">
      <header className="layout-header">
        <img
        src="/splash-logo.png"
        alt="PetCare Planner Logo"
        className="splash-logo"
      />
      <NavbarHamburguesa />
      </header>

      <main className="layout-main">
        <NotificadorActividades /> {/* 🔍 Escaneo silencioso al iniciar */}
        {/* Punto de inserción para las rutas hijas */}
        <Outlet />
      </main>

      <footer className="layout-footer">
        <p>
          © 2025 Pet Planner by{' '}
          <a
            href="https://ana-site.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
          >
            anaSposito
          </a>
        </p>
      </footer>

    </div>
  );
};

export default MainLayout;

