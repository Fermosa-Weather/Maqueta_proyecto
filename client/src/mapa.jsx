import React from "react";
import Nav from "./components/Navbar/Nav.jsx";
import Footer from './footer.jsx';
import MapWithCircles from "./components/Mapa/MapCircle.jsx";

function Mapa() {
  return (
    <div 
      className="mapa_principal" 
      style={{ 
        background: "linear-gradient(to bottom right, #1e3a8a, #4f46e5, #6d28d9)", // Gradiente azul a violeta para el fondo
        color: "#ffffff", // Texto blanco
        minHeight: "100vh" 
      }}
    >
      <Nav />
      <div 
        className="map-container" 
        style={{
          background: "linear-gradient(to bottom right, #1e3a8a, #4f46e5, #6d28d9)", // Gradiente azul a violeta para el contenedor del mapa
          padding: "10px", // Padding ajustado
          width: "calc(100% + 40px)", // Aumento el ancho un poco más
          marginLeft: "-30px", // Desplazamiento a la izquierda para ajustar el aumento de ancho
          marginTop: "-30px", // Desplazamiento hacia arriba
        }} 
      >
        <MapWithCircles />
      </div>
      {/* Renderizar el footer solo en esta página */}
      <Footer />
    </div>
  );
}

export default Mapa;
