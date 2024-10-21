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
import "../../stilos/wheater.css";

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
      <div className="row flex-column mapa d-flex justify-content-center align-items-center">
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
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
              </BaseLayer>
              <Overlay name="Mapa de Temperatura" checked>
                <TileLayer url="https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=e3dadbc788d4e55d0bc120577741bc69" />
              </Overlay>
              {/* Más capas... */}
            </LayersControl>

            {/* Marcadores de estaciones */}
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
                    <button className="btn btn-success">Ver más</button>
                  </div>
                </Popup>
              </Marker>
            ))}

            {/* Círculos */}
            {circles.map((circle, index) => (
              <Circle
                key={index}
                center={circle.coords}
                pathOptions={{ color: circle.color, fillOpacity: 0.2 }}
                radius={150000}
              />
            ))}

            {/* GeoJSON */}
            <GeoJSON data={FormosaCityGeoJSON} />
          </MapContainer>
        </div>

        {/* Panel de información */}
        <div className="col-md-12 panel">
          <StationInfo averages={averages} stations={Stations} />
        </div>
      </div>
    </div>
  );
}

export default MapWithCircles;
