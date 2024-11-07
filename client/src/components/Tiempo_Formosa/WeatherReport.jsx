import React, { useEffect, useState } from 'react'
import { Sun, Cloud, CloudRain, CloudLightning, Snowflake, Wind, CloudFog, Droplet, CloudDrizzle, Thermometer, Umbrella, Sunrise, Sunset } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend, Title } from 'chart.js'

// Registrar los componentes de Chart.js
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend, Title)

export default function WeatherPage() {
  const [weatherData, setWeatherData] = useState(null)

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch('https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/formosa%20argentina?unitGroup=metric&key=UMQ9KWF37S9T6WL8J4WLN5Q23&contentType=json')
        
        // Verificar si la respuesta fue exitosa
        if (!response.ok) {
          throw new Error('Error al obtener los datos meteorológicos')
        }
        
        const data = await response.json()
        setWeatherData(data)
      } catch (error) {
        console.error('Error fetching weather data:', error)
      }
    }

    fetchWeatherData()
  }, [])

  if (!weatherData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 flex items-center justify-center">
        <Card className="w-full max-w-4xl">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-blue-800">Cargando datos meteorológicos...</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[400px] w-full bg-blue-200 animate-pulse rounded-lg"></div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const current = weatherData.currentConditions
  const currentCondition = {
    'Clear': 'Despejado',
    'Partly Cloudy': 'Parcialmente Nublado',
    'Cloudy': 'Nublado',
    'Rain': 'Lluvia',
    'Thunderstorms': 'Tormentas',
    'Snow': 'Nieve',
    'Fog': 'Niebla',
    'Windy': 'Ventoso',
    'Overcast': 'Cubierto',
    'Drizzle': 'Llovizna',
    'Showers': 'Aguaceros',
    'Freezing Rain': 'Lluvia Helada',
    'Sleet': 'Aguacero de Hielo',
  }[current.conditions] || current.conditions

  const weatherIcons = {
    'Clear': <Sun className="w-16 h-16 text-yellow-500" />,
    'Partly Cloudy': <Cloud className="w-16 h-16 text-gray-400" />,
    'Cloudy': <Cloud className="w-16 h-16 text-gray-600" />,
    'Rain': <CloudRain className="w-16 h-16 text-blue-500" />,
    'Thunderstorms': <CloudLightning className="w-16 h-16 text-yellow-400" />,
    'Snow': <Snowflake className="w-16 h-16 text-blue-200" />,
    'Fog': <CloudFog className="w-16 h-16 text-gray-400" />,
    'Windy': <Wind className="w-16 h-16 text-blue-300" />,
    'Overcast': <Cloud className="w-16 h-16 text-gray-500" />,
    'Drizzle': <CloudDrizzle className="w-16 h-16 text-blue-400" />,
    'Showers': <CloudRain className="w-16 h-16 text-blue-600" />,
    'Freezing Rain': <CloudRain className="w-16 h-16 text-blue-700" />,
    'Sleet': <CloudRain className="w-16 h-16 text-blue-800" />,
  }

  // Datos para el gráfico (hasta 15 días)
  const labels = weatherData.days.slice(1, 16).map(day => new Date(day.datetime).toLocaleDateString('es-AR', { weekday: 'short' }));
  const maxTemps = weatherData.days.slice(1, 16).map(day => day.tempmax);
  const minTemps = weatherData.days.slice(1, 16).map(day => day.tempmin);

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Temperatura Máxima (°C)',
        data: maxTemps,
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        fill: true,
      },
      {
        label: 'Temperatura Mínima (°C)',
        data: minTemps,
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Perspectivas de Temperatura a Largo Plazo (15 Días)',
      },
    },
  };

  // Pronóstico por horas: Verificar que weatherData.hours existe
  const hourlyLabels = weatherData.hours ? weatherData.hours.map(hour => new Date(hour.datetime).toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' })) : [];
  const hourlyTemps = weatherData.hours ? weatherData.hours.map(hour => hour.temp) : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-blue-900 mb-8 text-center">Pronóstico del Tiempo - Formosa, Argentina</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="lg:col-span-2 bg-gradient-to-r from-blue-400 to-indigo-500 text-white">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold">Condiciones actuales</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="mr-4">{weatherIcons[current.conditions] || <Droplet className="w-16 h-16 text-blue-500" />}</div>
                  <div>
                    <p className="text-5xl font-bold">{current.temp}°C</p>
                    <p className="text-xl">{currentCondition}</p>
                  </div>
                </div>
                <div>
                  <p className="text-xl">Sensación térmica: {current.feelslike}°C</p>3   
                  <p className="text-xl">Humedad: {current.humidity}%</p>
                  <p className="text-xl">Viento: {current.windspeed} km/h</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-semibold">Detalles</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="flex items-center"><Sunrise className="mr-2" /> Amanecer</span>
                  <span>{current.sunrise}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center"><Sunset className="mr-2" /> Atardecer</span>
                  <span>{current.sunset}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center"><Umbrella className="mr-2" /> Precipitación</span>
                  <span>{current.precip} mm</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-semibold">Pronóstico por Hora</CardTitle>
          </CardHeader>
          <CardContent>
            {hourlyTemps.length > 0 ? (
              <Line data={{
                labels: hourlyLabels,
                datasets: [{
                  label: 'Temperatura (°C)',
                  data: hourlyTemps,
                  borderColor: 'rgba(255, 99, 132, 1)',
                  backgroundColor: 'rgba(255, 99, 132, 0.2)',
                  fill: true,
                }],
              }} options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'top',
                  },
                  title: {
                    display: true,
                    text: 'Pronóstico por Hora',
                  },
                },
              }} />
            ) : (
              <div className="h-64 flex items-center justify-center">
                <p>No hay datos de pronóstico por hora disponibles.</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-semibold">Temperaturas a Largo Plazo</CardTitle>
          </CardHeader>
          <CardContent>
            <Line data={data} options={options} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
