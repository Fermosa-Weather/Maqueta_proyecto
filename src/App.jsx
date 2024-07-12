// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Mapa from './mapa';
import {Modelo_predicion} from './modelo_predicion';
import Tiempo from './tiempo';
import Tiempo_por_hora from './tiempo_por_hora';
import {Home} from "./home"
import Estadistica_tiempo_real from './estadistica_tiempo_real';
import Estadistica_corto_plazo from './estadistica_Corto_plazo';
import Estadistica_mediano_plazo from './estadistica_mediano_plazo';
import Estadistica_largo_plazo from './estadistica_largo_plazo';

function Rutas() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mapa" element={<Mapa />} />
        <Route path="/prediction" element={<Tiempo />} />
        <Route path="/por_hora" element={<Tiempo_por_hora />} />  
        <Route path="/modelo_prediccion" element={<Modelo_predicion />} />    
        <Route path="/estadistica_tiempo_real" element={<Estadistica_tiempo_real />} />        
        <Route path="/estadistica_tiempo_real" element={<Estadistica_tiempo_real />} /> 
        <Route path="/estadistica_corto_plazo" element={<Estadistica_corto_plazo />} />
        <Route path="/estadistica_mediano_plazo" element={<Estadistica_mediano_plazo />} />
        <Route path="/estadistica_largo_plazo" element={<Estadistica_largo_plazo />} /> 
      </Routes>
    </Router>
  );
}

export default Rutas;
