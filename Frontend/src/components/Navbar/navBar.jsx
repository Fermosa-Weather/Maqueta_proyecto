import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from 'react-router-dom';

export const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark text-white p-3">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          Logo
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item mx-2">
              <Link className="nav-link" to="/home">Home</Link>
            </li>
            <li className="nav-item mx-2">
              <Link className="nav-link" to="/mapa">Mapa</Link>
            </li>
            <li className="nav-item mx-2">
              <Link className="nav-link" to="/modelo_prediccion">Modelo de Predicción</Link>
            </li>
            <li className="nav-item mx-2">
              <Link className="nav-link" to="/iniciar_sesion">Iniciar Sesión</Link>
            </li>
            <li className="nav-item mx-2">
              <Link className="nav-link" to="/registrarse">Registrarse</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
