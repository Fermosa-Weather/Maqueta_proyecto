// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Inicio from './components/Home/Inicio';
import Mapa from './mapa';
import Modelo_predicion from './modelo_predicion';
import {Tiempo} from "./tiempo"
import Bienvenida from './components/Bienvenida_page/pag_welcome';
import Noticias from "./noticias"
import Pag_404 from './404';

function Rutas() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Bienvenida />} />
      <Route path="/home" element={<Inicio />} />
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
