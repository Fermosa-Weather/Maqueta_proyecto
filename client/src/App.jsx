import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './home';
import Mapa from './mapa';
import Modelo_predicion from './modelo_predicion';
import { Tiempo } from "./tiempo";
import Bienvenida from './components/Bienvenida_page/pag_welcome';
import Noticias from "./noticias";
import Pag_404 from './404';
import About from './about';
import Welcome from './components/Info_estaciones/bienvenida';
import Login from './components/Login/login.jsx';
import RegisterPage from './components/Register/register.jsx'; // Importa el componente de registro

function Rutas() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/Weather" element={<Tiempo />} />
        <Route path="/mapa" element={<Mapa />} />
        <Route path="/modelo_prediccion" element={<Modelo_predicion />} />
        <Route path="/noticias" element={<Noticias />} />
        <Route path="/cuenta" element={<Login />} /> {/* Ruta para Login */}
        <Route path="/registro" element={<RegisterPage />} /> {/* Ruta para Registro */}
        <Route path="*" element={<Pag_404 />} />
      </Routes>
    </Router>
  );
}

export default Rutas;
