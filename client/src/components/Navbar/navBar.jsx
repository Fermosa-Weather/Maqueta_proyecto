import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import Perfil_modal from "../perfil/modal_perfil";
import { Visibilidad_nav } from './visibilidad_nav';
import "bootstrap/dist/css/bootstrap.min.css";
import "../../stilos/Plantilla_slider/css/responsive.css";
import "../../stilos/Plantilla_slider/css/style.css";
import "../../stilos/Plantilla_slider/css/bootstrap.css";
import "../../stilos/search.css";
import { Search } from "../Serch/Search";
import { fetchUserInfo } from "../Function/infoToken.tsx";

export const NavBar = ({ onSearch }) => {
  const { isVisible, handleToggle } = Visibilidad_nav();
  const [searchTerm, setSearchTerm] = useState('');
  const [userData, setUserData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchUserInfo(token)
        .then(data => setUserData(data))
        .catch(error => console.error(error.message));
    } else {
      setUserData(null); // Set default state if no token
    }
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    onSearch(term);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleLogout = () => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Quieres cerrar sesión?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, cerrar sesión',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        // Elimina el token, cierra sesión y recarga la página
        localStorage.removeItem('token');
        setUserData(null);
        Swal.fire('Se ha cerrado sesión correctamente', '', 'success').then(() => {
          window.location.reload(); // Recarga la página después de cerrar sesión
        });
      }
    });
  };

  return (
    <div id="heroArea" className="hero_area">
      <header className="header_section">
        <div className="container-fluid">
          <div className="row">
            <div className="col-xl-8">
              <nav className="navbar navbar-expand-xl custom_nav-container">
                <a className="navbar-brand" href="index.html">
                  <img src="../../../src/images/logo.png" alt="logo" className="logo"/>
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
                    <div className="d-flex flex-column flex-xl-row align-items-center">
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
                          <Link className="nav-link" to="/estaciones">
                            <i className="bi bi-thermometer"></i> Info Estación 
                          </Link>
                        </li>
                        <li className="nav-item">
                          <a className="navbar-brand" href="javascript:void(0)" onClick={openModal}>
                            <img
                              src={userData?.fotoUser || "../../../src/images/usuario.jpg"}
                              alt="perfil"
                              className="foto_perfil"
                            />
                          </a>
                        </li>
                        {isModalOpen && <Perfil_modal onClose={closeModal} />}
                        <Search onSearch={handleSearch} />

                        {userData ? (
                          <li className="nav-item">
                            <button className="nav-link logout-button" onClick={handleLogout}>
                              <i className="bi bi-box-arrow-right"></i>
                              <div className="logout-text">
                                <span>Cerrar</span>
                                <span>Sesión</span>
                              </div>
                            </button>
                          </li>
                        ) : (
                          <li className="nav-item">
                            <Link className="nav-link" to="/cuenta">
                              <i className="bi bi-person"></i> Cuenta
                            </Link>
                          </li>
                        )}
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