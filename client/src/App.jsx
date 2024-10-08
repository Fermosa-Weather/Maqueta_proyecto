// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './home';
import Mapa from './mapa';
import Modelo_predicion from './modelo_predicion';
import {Tiempo} from "./tiempo"
import Noticias from "./noticias"
import Pag_404 from './404';
import About from './about';
import Welcome from './components/Bienvenida_page/bienvenida';
import Perfil from './components/perfil/perfil_visibilidad';
import Cambiar_cuenta from './components/cuenta/Cambiar_cuenta';
import Editar_perfi from './components/perfil/Editar-perfil';
import Soporte from './components/soporte/soporte';
import Estaciones from './components/Info_estaciones/info_estaciones';
import Login from './components/Login/login';
import RegisterPage from './components/Register/register';
import { News } from './components/Noticias/Noticias';

function Rutas() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/home" element={<Home />} />
      <Route path="/cuenta" element={<Login />} /> {/* Ruta para Login */}
      <Route path="/registro" element={<RegisterPage />} /> {/* Ruta para Registro */}
      <Route path="/configuracion_cuenta" element={<Perfil />} />
      <Route path="/cambiar_cuenta" element={<Cambiar_cuenta />} />
      <Route path="/editar-perfil" element={<Editar_perfi />} />
      <Route path="/about" element={<About />} />
      <Route path="/contacto" element={<Soporte />} />
      <Route path="/Weather" element={<Tiempo />} />
      <Route path="/mapa" element={<Mapa />} />
      <Route path="/modelo_prediccion" element={<Modelo_predicion />} />   
      <Route path="/noticias" element={<Noticias />} /> 
      <Route path="/n" element={<News />} /> 
      <Route path="/estaciones" element={<Estaciones />} />
      <Route path="*" element={<Pag_404/ >} />   
      </Routes>
    </Router>
  );
}

export default Rutas;
