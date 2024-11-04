import React, { useEffect, useState } from 'react'
import { Sun, Cloud, CloudRain, CloudLightning, Snowflake, Wind, CloudFog, Droplet, CloudDrizzle, Thermometer, Umbrella, Sunrise, Sunset } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

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
                  <p className="text-xl">Sensación térmica: {current.feelslike}°C</p>
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
                <div className="flex items-center justify-between">
                  <span className="flex items-center"><Thermometer className="mr-2" /> Presión</span>
                  <span>{current.pressure} hPa</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold">Pronóstico por horas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex overflow-x-auto space-x-4 pb-4">
              {weatherData.days[0].hours.map((hour, index) => (
                <div key={index} className="flex flex-col items-center min-w-[100px]">
                  <p className="font-semibold">{hour.datetime.slice(0, 5)}</p>
                  {weatherIcons[hour.conditions] || <Droplet className="w-8 h-8 text-blue-500" />}
                  <p className="text-lg font-bold">{hour.temp}°C</p>
                  <p className="text-sm">{hour.conditions}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {weatherData.days.slice(1, 8).map((day, index) => {
            const dailyCondition = {
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
            }[day.conditions] || day.conditions

            const dailyIcon = weatherIcons[day.conditions] || <Droplet className="w-12 h-12 text-blue-500" />

            return (
              <Card key={day.datetime} className="bg-white transition-all duration-300 hover:shadow-xl">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold">{new Date(day.datetime).toLocaleDateString('es-AR', { weekday: 'long', month: 'long', day: 'numeric' })}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      {dailyIcon}
                      <div className="ml-4">
                        <p className="text-2xl font-bold">{day.temp}°C</p>
                        <Badge variant="secondary">{dailyCondition}</Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm">Máx: {day.tempmax}°C</p>
                      <p className="text-sm">Mín: {day.tempmin}°C</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Probabilidad de lluvia</span>
                      <span>{day.precipprob}%</span>
                    </div>
                    <Progress value={day.precipprob} className="h-2" />
                    <div className="flex justify-between text-sm">
                      <span>Humedad</span>
                      <span>{day.humidity}%</span>
                    </div>
                    <Progress value={day.humidity} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}