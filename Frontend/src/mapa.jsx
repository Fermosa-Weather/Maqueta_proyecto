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
import { NavBar } from "./components/Navbar/navBar.jsx";
import MapWithCircles from "./components/Mapa/MapCircle.jsx"

function Mapa() {
  return (
    <div style={{ backgroundColor: '#34495e' }} className="mapa_principal">
      <NavBar />
      <MapWithCircles />
    </div>
  );
}
export default Mapa;
