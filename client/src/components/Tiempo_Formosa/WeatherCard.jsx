import React, { useEffect, useState } from "react";

const WeatherWidget = () => {
  const [weather, setWeather] = useState(null);

  // Cambia 'YOUR_ENDPOINT_URL' por tu URL del endpoint
  const endpointUrl = "YOUR_ENDPOINT_URL";

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(endpointUrl);
        const data = await response.json();
        setWeather(data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchWeather();
  }, []);

  return (
    <div className="bg-blue-500 text-white p-5 rounded-lg shadow-lg max-w-sm mx-auto">
      {weather ? (
        <div>
          <h2 className="text-2xl font-bold">{weather.location}</h2>
          <h3 className="text-xl mt-2">Weather</h3>
          <div className="mt-4">
            <div className="flex justify-between items-center">
              <span className="text-lg">Temperature:</span>
              <span className="text-lg">{weather.temperature}°C</span>
            </div>
            <div className="flex justify-between items-center mt-2">
              <span className="text-lg">Humidity:</span>
              <span className="text-lg">{weather.humidity}%</span>
            </div>
            <div className="flex justify-between items-center mt-2">
              <span className="text-lg">Wind Speed:</span>
              <span className="text-lg">{weather.windSpeed} m/s</span>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-lg">Loading...</p>
      )}
    </div>
  );
};

export default WeatherWidget;
