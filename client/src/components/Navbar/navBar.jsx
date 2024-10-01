import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { Visibilidad_nav } from './visibilidad_nav';
import "bootstrap/dist/css/bootstrap.min.css";
import "../../stilos/Plantilla_slider/css/responsive.css";
import "../../stilos/Plantilla_slider/css/style.css";
import "../../stilos/Plantilla_slider/css/bootstrap.css";
import { Search } from "../Serch/Search";

export const NavBar = ({ onSearch }) => {
  const { isVisible, handleToggle } = Visibilidad_nav();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    onSearch(term);
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

                {isVisible && (
                  <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <div className="d-flex flex-column flex-lg-row align-items-center">
                      <ul className="navbar-nav">
                        <li className="nav-item active">
                          <Link className="nav-link" to="/home">
                            <i className="bi bi-house"></i> Home
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link className="nav-link" to="/about">
                            <i className="bi bi-person"></i> About
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link className="nav-link" to="/contacto">
                            <i className="bi bi-envelope"></i> Contacto
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link className="nav-link" to="/Weather">
                            <i className="bi bi-cloud-sun"></i> Weather
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link className="nav-link" to="/mapa">
                            <i className="bi bi-geo-alt"></i> Mapa
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link className="nav-link" to="/modelo_prediccion">
                            <i className="bi bi-cpu"></i> Modelo
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link className="nav-link" to="/noticias">
                            <i className="bi bi-newspaper"></i> Noticias
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link className="nav-link" to="/cuenta">
                            <i className="bi bi-person"></i> Cuenta
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link className="nav-link" to="/info_estacion">
                            <i className="bi bi-thermometer"></i> Info Estación {/* Ícono de termómetro */}
                          </Link>
                        </li>
                        <Search onSearch={handleSearch} />
                      </ul>
                    </div>
                  </div>
                )}
              </nav>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};
