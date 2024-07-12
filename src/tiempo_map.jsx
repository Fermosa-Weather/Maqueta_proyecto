import React from 'react';
import WeatherCard from './components/WeatherCard';
import MiniMap from './components/MiniMap';

const weatherInfo = {
    location: "Formosa, Argentina",
    temperature: "13°C",
    feelsLike: "Sensación térmica: 11°C",
    windSpeed: "Viento: 15 km/h",
    humidity: "Humedad: 58%",
    visibility: "Visibilidad: 20 km",
    pressure: "Presión: 1024 mbar",
    dewPoint: "Punto de rocío: 5°C",
};

function Tiempo_map() {
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-8">
                    <WeatherCard data={weatherInfo} />
                </div>
                <div className="col-md-4">
                    <MiniMap />
                </div>
            </div>
        </div>
    );
}

export default Tiempo_map;
