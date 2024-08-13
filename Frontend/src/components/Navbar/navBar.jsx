import React, {useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from 'react-router-dom';
import "../../stilos/navBar.css"
import "../../stilos/Plantilla_slider/css/bootstrap.css"
import "../../stilos/Plantilla_slider/css/style.css"
import "../../stilos/Plantilla_slider/css/responsive.css"

export const NavBar = () => {
  const handleToggle = () => {
    const heroArea = document.getElementById('heroArea');
    if (heroArea) {
      heroArea.classList.toggle('min-height-78vh');
    }
  };

  return (
    <div id="heroArea" className="hero_area">
      <header className="header_section">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-8">
              <nav className="navbar navbar-expand-lg custom_nav-container">
                <a className="navbar-brand" href="index.html">
                  <img src="../../../src/images/logo.png" alt="logo" className="logo" />
                </a>
                <button
                  className="navbar-toggler"
                  type="button"
                  data-toggle="collapse"
                  data-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                  onClick={handleToggle}
                >
                  <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                  <div className="d-flex flex-column flex-lg-row align-items-center">
                    <ul className="navbar-nav">
                      <li className="nav-item active">
                        <Link className="nav-link" to="/home">Home</Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link" to="/about">About</Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link" to="/contacto">Contacto</Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link" to="/Weather">Weather</Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link" to="/mapa">Mapa</Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link" to="/modelo_prediccion">Modelo</Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link" to="/noticias">Noticias</Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link" to="/cuenta">Cuenta</Link>
                      </li>
                    </ul>
                    <form className="form-inline my-2 my-lg-0 ml-0 ml-lg-4 mb-3 mb-lg-0">
                      <button className="btn my-2 my-sm-0 nav_search-btn" type="submit"></button>
                    </form>
                  </div>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};