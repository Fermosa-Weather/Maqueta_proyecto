import React from "react";
import Nav from "./components/Navbar/Nav.jsx";
import Footer from './footer.jsx';
import MapWithCircles from "./components/Mapa/MapCircle.jsx";

function Mapa() {
  return (
    <div 
      className="mapa_principal" 
      style={{ backgroundColor: "rgb(52, 73, 94)", minHeight: "100vh" }} // Estilo de fondo azul
    >
      <Nav />
      <div className="map-container">
        <MapWithCircles />
      </div>
      {/* Renderizar el footer solo en esta página */}
      <Footer />
    </div>
  );
}

export default Mapa;
