// StationInfo.jsx
import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import { Stations } from "./data/estaciones.js";
import { Widget } from "./Widget.jsx";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../../../src/stilos/stacion_info.css";

// Datos generales de Formosa
const defaultStation = {
  id: 0,
  coords: [-25.2637, -58.5973],
  name: "Información General de Formosa",
  color: "blue",
  info: "Esta vista muestra información climática general de la provincia de Formosa.",
  temperature: 29,
  humidity: 70,
  pressure: 1010,
  windSpeed: 12,
  precipitation: 1,
};

const StationInfo = () => {
  const [selectedStation, setSelectedStation] = useState(defaultStation);

  const handleSelectChange = (event) => {
    const station = Stations.find(
      (station) => station.id === parseInt(event.target.value)
    );
    setSelectedStation(station || defaultStation);
  };

  const renderChart = (station) => ({
    labels: [
      "Temperature",
      "Humidity",
      "Pressure",
      "Wind Speed",
      "Precipitation",
    ],
    datasets: [
      {
        label: station.name,
        data: [
          station.temperature,
          station.humidity,
          station.pressure,
          station.windSpeed,
          station.precipitation,
        ],
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.4,
      },
    ],
  });

  return (
    <div className="panel">
      <div className="dropdown-container">
        <select onChange={handleSelectChange} defaultValue="0">
          <option value="0">Información General de Formosa</option>
          {Stations.map((station) => (
            <option key={station.id} value={station.id}>
              {station.name}
            </option>
          ))}
        </select>
      </div>

      <div className="content-container">
        <Widget selectedStation={selectedStation} />
        <div className="chart-container">
          <Line data={renderChart(selectedStation)} />
        </div>
      </div>

      <div className="table-container">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Temperatura (°C)</th>
              <th>Humedad (%)</th>
              <th>Presión (hPa)</th>
              <th>Vel. Viento (m/s)</th>
              <th>Precipitación (mm)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{selectedStation.temperature}</td>
              <td>{selectedStation.humidity}</td>
              <td>{selectedStation.pressure}</td>
              <td>{selectedStation.windSpeed}</td>
              <td>{selectedStation.precipitation}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StationInfo;
