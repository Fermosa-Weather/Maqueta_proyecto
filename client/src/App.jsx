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
import Welcome from './components/Info_estaciones/bienvenida';
import Perfil from './components/Info_estaciones/perfil_visibilidad';
import Cambiar_cuenta from './components/Info_estaciones/Cambiar_cuenta';
import Usuario from './components/Info_estaciones/usuario';
import Soporte from './components/Info_estaciones/soporte';

function Rutas() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/home" element={<Home />} />
      <Route path="/configuracion_cuenta" element={<Perfil />} />
      <Route path="/cambiar_cuenta" element={<Cambiar_cuenta />} />
      <Route path="/editar-perfil" element={<Usuario />} />
      <Route path="/contacto" element={<Soporte />} />
      <Route path="/about" element={<About />} />
      <Route path="/Weather" element={<Tiempo />} />
      <Route path="/mapa" element={<Mapa />} />
      <Route path="/modelo_prediccion" element={<Modelo_predicion />} />   
      <Route path="/noticias" element={<Noticias />} /> 
      <Route path="*" element={<Pag_404/ >} />   
      </Routes>
    </Router>
  );
}

export default Rutas;
