import React from "react";
import Nav from "./components/Navbar/Nav.jsx";
import Footer from './footer.jsx';
import MapWithCircles from "./components/Mapa/MapCircle.jsx";

function Mapa() {
  return (
    <div 
      className="mapa_principal bg-gradient-to-br from-blue-800 via-indigo-800 to-violet-800 text-white min-h-screen"
    >
      <Nav />
      <div 
        className="map-container bg-blue-700 p-5 rounded-lg"
      >
        <MapWithCircles />
      </div>
      {/* Renderizar el footer solo en esta página */}
      <Footer />
    </div>
  );
}

export default Mapa;



