import React from "react";
import Nav from "./components/Navbar/Nav.jsx";
import Footer from "./footer.jsx";
import MapWithCircles from "./components/Mapa/MapCircle.jsx";

function Mapa() {
  return (
    <div
      className="mapa_principal"
      style={{
        background:
          "linear-gradient(to bottom right, #1e3a8a, #4f46e5, #6d28d9)",
        color: "#ffffff",
        minHeight: "100vh",
      }}
    >
      <Nav />
      <div className="map-container">
        <MapWithCircles />
      </div>
      <Footer />
    </div>
  );
}

export default Mapa;
