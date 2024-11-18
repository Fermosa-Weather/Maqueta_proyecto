import React from 'react';
import PredictionForm from './components/Modelo_predicion/WeatherQuery'; // Importa sin llaves
import Nav from './components/Navbar/Nav';
import Footer from './footer.jsx'; 

function Modelo_predicion() {
  return (
    <div>
        <Nav />
        <PredictionForm />
        <Footer /> {/* Asegúrate de agregar el Footer aquí */}
    </div>
  );
}

export default Modelo_predicion;
