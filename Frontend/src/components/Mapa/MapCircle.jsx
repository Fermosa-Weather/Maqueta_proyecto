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
import { FormosaCityGeoJSON } from "./data/Departamentos.js";
import StationInfo from "./stationInfo.jsx";
import { Stations } from "./data/estaciones.js";

const { BaseLayer, Overlay } = LayersControl;

function MapWithCircles() {
  const [circles, setCircles] = useState([]);
  const [selectedStation, setSelectedStation] = useState(null);
  const [averages, setAverages] = useState({
    temperature: 0,
    humidity: 0,
    pressure: 0,
    windSpeed: 0,
    precipitation: 0,
  });

  const formosaCenter = [-24.786927, -60.182694];
  const zoomLevel = 7;

  useEffect(() => {
    const calculateAverages = () => {
      const totalStations = Stations.length;
      const totalValues = Stations.reduce(
        (totals, station) => {
          totals.temperature += station.temperature;
          totals.humidity += station.humidity;
          totals.pressure += station.pressure;
          totals.windSpeed += station.windSpeed;
          totals.precipitation += station.precipitation;
          return totals;
        },
        {
          temperature: 0,
          humidity: 0,
          pressure: 0,
          windSpeed: 0,
          precipitation: 0,
        }
      );

      setAverages({
        temperature: (totalValues.temperature / totalStations).toFixed(2),
        humidity: (totalValues.humidity / totalStations).toFixed(2),
        pressure: (totalValues.pressure / totalStations).toFixed(2),
        windSpeed: (totalValues.windSpeed / totalStations).toFixed(2),
        precipitation: (totalValues.precipitation / totalStations).toFixed(2),
      });
    };

    calculateAverages();
  }, []);

  const handleMarkerClick = (station) => {
    const circleExists = circles.find(
      (circle) =>
        circle.coords[0] === station.coords[0] &&
        circle.coords[1] === station.coords[1]
    );
    if (circleExists) {
      setCircles((prevCircles) =>
        prevCircles.filter(
          (circle) =>
            circle.coords[0] !== station.coords[0] ||
            circle.coords[1] !== station.coords[1]
        )
      );
      setSelectedStation(null);
    } else {
      setCircles((prevCircles) => [
        ...prevCircles,
        { coords: station.coords, color: station.color },
      ]);
      setSelectedStation(station);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-9 mt-3">
          <MapContainer
            center={formosaCenter}
            zoom={zoomLevel}
            style={{ height: "calc(87vh)", width: "100%" }}
            zoomControl={true}
          >
            <LayersControl position="topright">
              <BaseLayer checked name="Mapa de Calle">
                <TileLayer
                  zIndex={1}
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
              </BaseLayer>
              <Overlay name="Mapa de Temperatura" checked>
                <TileLayer
                  zIndex={2}
                  attribution='&copy; <a href="https://openweathermap.org/">OpenWeatherMap</a> contributors'
                  url="https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=e3dadbc788d4e55d0bc120577741bc69"
                />
              </Overlay>
              <Overlay name="Precipitación Global" checked>
                <TileLayer
                  zIndex={2}
                  attribution='&copy; <a href="https://openweathermap.org/">OpenWeatherMap</a> contributors'
                  url="https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=e3dadbc788d4e55d0bc120577741bc69"
                />
              </Overlay>
              <Overlay name="Presión">
                <TileLayer
                  zIndex={2}
                  attribution='&copy; <a href="https://openweathermap.org/">OpenWeatherMap</a> contributors'
                  url="https://tile.openweathermap.org/map/pressure_new/{z}/{x}/{y}.png?appid=e3dadbc788d4e55d0bc120577741bc69"
                />
              </Overlay>
              <Overlay name="Velocidad del Viento">
                <TileLayer
                  zIndex={2}
                  attribution='&copy; <a href="https://openweathermap.org/">OpenWeatherMap</a> contributors'
                  url="https://tile.openweathermap.org/map/wind_new/{z}/{x}/{y}.png?appid=e3dadbc788d4e55d0bc120577741bc69"
                />
              </Overlay>
              <Overlay name="Nubes">
                <TileLayer
                  zIndex={2}
                  attribution='&copy; <a href="https://openweathermap.org/">OpenWeatherMap</a> contributors'
                  url="https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=e3dadbc788d4e55d0bc120577741bc69"
                />
              </Overlay>
            </LayersControl>

            {Stations.map((station) => (
              <Marker
                key={station.id}
                position={station.coords}
                eventHandlers={{
                  click: () => handleMarkerClick(station),
                }}
              >
                <Popup>
                  <div>
                    <h3>{station.name}</h3>
                    <p>Temperatura: {station.temperature}°C</p>
                    <p>Humedad: {station.humidity}%</p>
                    <p>Presión: {station.pressure} hPa</p>
                    <p>Velocidad del Viento: {station.windSpeed} m/s</p>
                    <p>Precipitación: {station.precipitation} mm</p>
                  </div>
                  <button className="btn btn-success">Ver más</button>
                </Popup>
              </Marker>
            ))}

            {circles.map((circle, index) => (
              <Circle
                key={index}
                center={circle.coords}
                pathOptions={{
                  color: circle.color,
                  fillColor: circle.color,
                  fillOpacity: 0.2,
                }}
                radius={150000} // Radio en metros (150 km)
              />
            ))}

            <GeoJSON
              data={FormosaCityGeoJSON}
              style={(feature) => ({
                color: "green", // Color del borde del polígono
                weight: 2, // Grosor del borde del polígono
                fillColor: "lightblue", // Color de relleno del polígono
                fillOpacity: 0.2, // Opacidad del relleno del polígono
                // Estilos para las etiquetas de texto
                pane: "overlayPane",
                renderer: L.canvas(),
                interactive: false,
                style: {
                  color: "white",
                  fillColor: "lightblue",
                  weight: 2,
                  opacity: 1,
                  fillOpacity: 0.5,
                  className: "map-labels",
                },
                onEachFeature: function (feature, layer) {
                  if (feature.properties && feature.properties.label) {
                    layer.bindTooltip(feature.properties.label, {
                      permanent: true,
                      direction: "center",
                      className: "map-labels",
                    });
                  }
                },
              })}
            />
          </MapContainer>
        </div>
        <StationInfo className="estaciones_info" averages={averages} />
      </div>
    </div>
  );
}

export default MapWithCircles