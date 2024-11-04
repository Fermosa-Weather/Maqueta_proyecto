// client/src/components/Mapa/MapCircle.jsx
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
import axios from "axios"; // Importamos Axios
import { FormosaCityGeoJSON } from "./data/Departamentos.js";
import StationInfo from "./StationInfo.jsx";
import "../../stilos/wheater.css";

const { BaseLayer, Overlay } = LayersControl;

function MapWithCircles() {
  const [circles, setCircles] = useState([]);
  const [stations, setStations] = useState([]);
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

  // Obtener datos de las estaciones desde la API
  useEffect(() => {
    const fetchStations = async () => {
      try {
        const response = await axios.get(
          "https://ramf.formosa.gob.ar/api/station"
        );
        setStations(response.data); // Guardamos las estaciones en el estado
      } catch (error) {
        console.error("Error al obtener las estaciones:", error);
      }
    };
    fetchStations();
  }, []);

  // Calcular promedios
  useEffect(() => {
    if (stations.length > 0) {
      const totalStations = stations.length;
      const totalValues = stations.reduce(
        (totals, station) => {
          const { airTemp, rh, windSpeed, rain_last } = station.meta;
          totals.temperature += airTemp || 0;
          totals.humidity += rh || 0;
          totals.windSpeed += windSpeed || 0;
          totals.precipitation += rain_last || 0;
          return totals;
        },
        { temperature: 0, humidity: 0, windSpeed: 0, precipitation: 0 }
      );

      setAverages({
        temperature: (totalValues.temperature / totalStations).toFixed(2),
        humidity: (totalValues.humidity / totalStations).toFixed(2),
        windSpeed: (totalValues.windSpeed / totalStations).toFixed(2),
        precipitation: (totalValues.precipitation / totalStations).toFixed(2),
      });
    }
  }, [stations]);

  const handleMarkerClick = (station) => {
    const circleExists = circles.some(
      (circle) =>
        circle.coords[0] === station.position.geo.coordinates[1] &&
        circle.coords[1] === station.position.geo.coordinates[0]
    );
    if (circleExists) {
      setCircles((prevCircles) =>
        prevCircles.filter(
          (circle) =>
            circle.coords[0] !== station.position.geo.coordinates[1] ||
            circle.coords[1] !== station.position.geo.coordinates[0]
        )
      );
      setSelectedStation(null);
    } else {
      setCircles((prevCircles) => [
        ...prevCircles,
        {
          coords: [
            station.position.geo.coordinates[1],
            station.position.geo.coordinates[0],
          ],
          color: "blue",
        },
      ]);
      setSelectedStation(station);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row flex-column mapa">
        <div className="col-md-12 mb-3 pl-4">
          <MapContainer
            center={formosaCenter}
            zoom={zoomLevel}
            style={{ height: "calc(87vh)", width: "100%" }}
            zoomControl={true}
          >
            {/* Controles de capas */}
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

            {stations.map((station) => (
              <Marker
                key={station._id}
                position={[
                  station.position.geo.coordinates[1],
                  station.position.geo.coordinates[0],
                ]}
                eventHandlers={{
                  click: () => handleMarkerClick(station),
                }}
              >
                <Popup>
                  <div>
                    <h3>{station.name.custom}</h3>
                    <p>Temperatura: {station.meta.airTemp}°C</p>
                  </div>
                </Popup>
              </Marker>
            ))}

            {/* {circles.map((circle, index) => (
              <Circle
                key={index}
                center={circle.coords}
                pathOptions={{ color: circle.color, fillOpacity: 0.2 }}
                radius={150000}
              />
            ))} */}

            <GeoJSON
              data={FormosaCityGeoJSON}
              style={{ color: "green", weight: 2 }}
            />
          </MapContainer>
        </div>
      </div>

      <div className="col-md-12 contenedor-panel">
        <StationInfo
          stations={stations} // Pasar la lista de estaciones correctamente
          station={selectedStation}
          averages={averages}
        />
      </div>
    </div>
  );
}

export default MapWithCircles;
