import React, { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Circle,
  GeoJSON,
  LayersControl,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./stilos/mapa.css";
import MapWithCircles from "./components/Mapa/MapCircle.jsx";
import Nav from "./components/Navbar/Nav.jsx";
import Footer from './footer.jsx';

function Mapa() {
  return (
    <div className="mapa_principal">
      <Nav />
      <div className="map-container">
        <MapWithCircles />
      </div>
      <Footer />
    </div>
  );
}

export default Mapa;
