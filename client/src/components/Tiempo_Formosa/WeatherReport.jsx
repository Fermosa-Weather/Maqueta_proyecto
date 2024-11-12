import React, { useEffect, useState } from 'react'
import { Sun, Cloud, CloudRain, CloudLightning, Snowflake, Wind, CloudFog, Droplet, CloudDrizzle, Thermometer, Umbrella, Sunrise, Sunset } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Line } from 'react-chartjs-2'
import 'chart.js/auto'


export default function WeatherPage() {
  const [weatherData, setWeatherData] = useState(null)

  useEffect(() => {
    const fetchWeatherData = async () => {
      const response = await fetch('https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/formosa%20argentina?unitGroup=metric&key=UMQ9KWF37S9T6WL8J4WLN5Q23&contentType=json')
      const data = await response.json()
      setWeatherData(data)
    }

    fetchWeatherData()
  }, [])

  if (!weatherData) {
    return null; // Devolver null para evitar mostrar la pantalla de carga
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
        font: {
          size: 16,
          weight: 'bold',
        },
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        ticks: {
          callback: function(value) {

            return value + '°C';
          }
        }
      }
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-8 text-center">Pronóstico del Tiempo - Formosa, Argentina</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="lg:col-span-2 bg-gradient-to-r from-blue-400 to-indigo-500 text-white shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold">Condiciones actuales</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="flex items-center mb-4 md:mb-0">
                  <div className="mr-4">{weatherIcons[current.conditions] || <Droplet className="w-16 h-16 text-blue-500" />}</div>
                  <div>
                    <p className="text-5xl font-bold">{current.temp}°C</p>
                    <p className="text-xl">{currentCondition}</p>
                  </div>
                </div>
                <div className="text-center md:text-right">
                  <p className="text-xl mb-2">Sensación térmica: {current.feelslike}°C</p>
                  <p className="text-xl mb-2">Humedad: {current.humidity}%</p>
                  <p className="text-xl">Viento: {current.windspeed} km/h</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">Detalles</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="flex items-center"><Sunrise className="mr-2 text-yellow-500" /> Amanecer</span>
                  <span>{current.sunrise}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center"><Sunset className="mr-2 text-orange-500" /> Atardecer</span>
                  <span>{current.sunset}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center"><Umbrella className="mr-2 text-blue-500" /> Precipitación</span>
                  <span>{current.precip} mm</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center"><Thermometer className="mr-2 text-red-500" /> Presión</span>
                  <span>{current.pressure} hPa</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold">Pronóstico por horas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex overflow-x-auto space-x-4 pb-4 bg-white rounded-lg p-4">
              {weatherData.days[0].hours.map((hour, index) => (
                <div key={index} className="flex flex-col items-center min-w-[100px] p-2 rounded-lg hover:bg-blue-50 transition-colors duration-200">
                  <p className="font-semibold text-gray-800">{hour.datetime.slice(0, 5)}</p>
                  {weatherIcons[hour.conditions] || <Droplet className="w-8 h-8 text-blue-500" />}
                  <p className="text-lg font-bold text-gray-800">{hour.temp}°C</p>
                  <p className="text-sm text-gray-600">{hour.conditions}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {weatherData.days.slice(1, 8).map((day, index) => (
            <Card key={index} className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-200">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">{new Date(day.datetime).toLocaleDateString('es-AR', { weekday: 'long', day: 'numeric', month: 'long' })}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-center">
                    {weatherIcons[day.conditions] || <Droplet className="w-12 h-12 text-blue-500" />}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold text-red-500">{day.tempmax}°C</span>
                    <span className="text-lg font-semibold text-blue-500">{day.tempmin}°C</span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>Precip: {day.precip} mm</span>
                    <span>Viento: {day.windspeed} km/h</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold">Gráfico de Temperaturas (15 Días)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[400px]">
              <Line data={data} options={options} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}