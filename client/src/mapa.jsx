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

function Mapa() {
  return (
    <div style={{ backgroundColor: "#34495e", height: "500vh" }}>
      <Nav></Nav>
      <MapWithCircles />
    </div>
  );
}
export default Mapa;
