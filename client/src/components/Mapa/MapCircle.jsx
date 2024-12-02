import React, { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  GeoJSON,
  LayersControl,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { FormosaCityGeoJSON } from "./data/Departamentos.js";
import StationInfo from "./stationInfo.jsx";

const { BaseLayer, Overlay } = LayersControl;

function MapWithCircles() {
  const [stations, setStations] = useState([]);
  const [selectedStation, setSelectedStation] = useState(null);
  const [stationData, setStationData] = useState([]);
  const [token, setToken] = useState(null);
  const [averages, setAverages] = useState({
    temperature: 0,
    humidity: 0,
    windSpeed: 0,
    precipitation: 0,
  });

  const formosaCenter = [-24.786927, -60.182694];
  const zoomLevel = 7;

  // Obtener token al cargar
  useEffect(() => {
    const loginAndGetToken = async () => {
      try {
        const { data } = await axios.post(
          "https://ramf.formosa.gob.ar/api/auth/login",
          {
            email: "maximilianopietkiewicz04@gmail.com",
            password: "Maxi45745",
          }
        );
        setToken(data.token);
      } catch (error) {
        console.error("Error al obtener el token:", error);
      }
    };
    loginAndGetToken();
  }, []);

  // Cargar estaciones al obtener token
  useEffect(() => {
    if (!token) return;

    const fetchStations = async () => {
      try {
        const { data } = await axios.get(
          "https://ramf.formosa.gob.ar/api/station",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setStations(data);
      } catch (error) {
        console.error("Error al cargar estaciones:", error);
      }
    };
    fetchStations();
  }, [token]);

  // Cargar datos de la estación seleccionada
  useEffect(() => {
    if (!selectedStation || !token) return;

    const fetchStationData = async () => {
      try {
        const { data } = await axios.get(
          `https://ramf.formosa.gob.ar/api/station-data/${station._id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setStationData(data);
      } catch (error) {
        console.error("Error al obtener los datos de la estación:", error);
      }
    };
    fetchStationData();
  }, [selectedStation, token]);

  // Calcular promedios de estaciones
  useEffect(() => {
    if (stations.length > 0) {
      const total = stations.length;
      const totals = stations.reduce(
        (acc, station) => ({
          temperature: acc.temperature + (station.meta?.airTemp || 0),
          humidity: acc.humidity + (station.meta?.rh || 0),
          windSpeed: acc.windSpeed + (station.meta?.windSpeed || 0),
          precipitation: acc.precipitation + (station.meta?.rain_last || 0),
        }),
        { temperature: 0, humidity: 0, windSpeed: 0, precipitation: 0 }
      );

      setAverages({
        temperature: (totals.temperature / total).toFixed(2),
        humidity: (totals.humidity / total).toFixed(2),
        windSpeed: (totals.windSpeed / total).toFixed(2),
        precipitation: (totals.precipitation / total).toFixed(2),
      });
    }
  }, [stations]);

  return (
    <div className="container-fluid">
      <div className="row flex-column">
        <MapContainer
          center={formosaCenter}
          zoom={zoomLevel}
          style={{
            height: "80vh",
            width: "98%",
            marginLeft: "17px",
          }}
          zoomControl={true}
        >
          <LayersControl position="topright">
            <BaseLayer checked name="Mapa de Calle">
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
            </BaseLayer>
            {[
              "temp_new",
              "precipitation_new",
              "pressure_new",
              "wind_new",
              "clouds_new",
            ].map((layer, idx) => (
              <Overlay key={idx} name={`Capa ${layer}`} checked={idx === 0}>
                <TileLayer
                  attribution="&copy; OpenWeatherMap"
                  url={`https://tile.openweathermap.org/map/${layer}/{z}/{x}/{y}.png?appid=e3dadbc788d4e55d0bc120577741bc69`}
                />
              </Overlay>
            ))}
          </LayersControl>
          {stations.map((station) => (
            <Marker
              key={station._id}
              position={[
                station.position.geo.coordinates[1],
                station.position.geo.coordinates[0],
              ]}
              eventHandlers={{
                click: () => setSelectedStation(station),
              }}
            >
              <Popup>
                <div>
                  <h4>{station.name?.custom || "Estación sin nombre"}</h4>
                  <p>Temperatura: {station.meta?.airTemp || "N/A"} °C</p>
                </div>
              </Popup>
            </Marker>
          ))}
          <GeoJSON
            data={FormosaCityGeoJSON}
            style={{ color: "green", weight: 2 }}
          />
        </MapContainer>
      </div>
      <StationInfo
        stations={stations}
        station={selectedStation}
        stationData={stationData}
        averages={averages}
      />
    </div>
  );
}

export default MapWithCircles;
