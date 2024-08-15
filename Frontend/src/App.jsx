// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Mapa from './mapa';
import Modelo_predicion from './modelo_predicion';
import {Home} from "./home"
import Bienvenida from './components/Bienvenida_page/pag_welcome';
import Estadistica_tiempo_real from './components/Estadistica/estadistica_tiempo_real';
import Inicio from './components/Home/Inicio';

function Rutas() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Bienvenida />} />
      <Route path="/home" element={<Inicio />} />
      <Route path="/Weather" element={<Home />} />
      <Route path="/mapa" element={<Mapa />} />
      <Route path="/modelo_prediccion" element={<Modelo_predicion />} />    
      <Route path="/estadistica_tiempo_real" element={<Estadistica_tiempo_real />} />        
      </Routes>
    </Router>
  );
}

export default Rutas;
