import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Sun, Cloud, CloudRain, CloudLightning, Snowflake, Wind, CloudFog, Droplet, CloudDrizzle } from 'lucide-react'

type WeatherData = {
  currentConditions: {
    temp: number
    humidity: number
    conditions: string
    icon: string
  }
  days: Array<{
    datetime: string
    tempmax: number
    tempmin: number
    description: string
    icon: string
  }>
}

const translationMap: { [key: string]: string } = {
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
}

const weatherIcons: { [key: string]: React.ReactNode } = {
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

export default function Weather() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)

  useEffect(() => {
    const fetchWeatherData = async () => {
      const response = await fetch('https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/formosa%20argentina?unitGroup=us&key=UMQ9KWF37S9T6WL8J4WLN5Q23&contentType=json')
      const data = await response.json()
      setWeatherData(data)
    }

    fetchWeatherData()
  }, [])

  if (!weatherData) {
    return (
      <div className="container mx-auto p-4">
        <Card className="bg-blue-100">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-blue-800">Clima en Formosa, Argentina</CardTitle>
          </CardHeader>
          <CardContent>
            <Skeleton className="h-[200px] w-full bg-blue-200" />
          </CardContent>
        </Card>
      </div>
    )
  }

  const current = weatherData.currentConditions
  const currentTempC = ((current.temp - 32) * 5 / 9).toFixed(1)
  const currentCondition = translationMap[current.conditions] || current.conditions
  const currentIcon = weatherIcons[current.conditions] || <Droplet className="w-16 h-16 text-blue-500" />

  return (
    <div className="container mx-auto p-4 bg-gradient-to-br from-blue-100 to-violet-100 min-h-screen">
      <h1 className="text-3xl font-bold text-blue-800 mb-6 text-center">Clima en Formosa, Argentina</h1>
      
      <Card className="mb-6 bg-blue-200 shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-blue-800">Condiciones actuales</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-between">
          <div>
            <p className="text-lg text-blue-700">Temperatura: <span className="font-bold">{currentTempC} °C</span></p>
            <p className="text-lg text-blue-700">Humedad: <span className="font-bold">{current.humidity}%</span></p>
            <p className="text-lg text-blue-700">Descripción: <span className="font-bold">{currentCondition}</span></p>
          </div>
          {currentIcon}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {weatherData.days.map((day) => {
          const tempMaxC = ((day.tempmax - 32) * 5 / 9).toFixed(1)
          const tempMinC = ((day.tempmin - 32) * 5 / 9).toFixed(1)
          const dailyCondition = translationMap[day.description] || day.description
          const dailyIcon = weatherIcons[day.description] || <Droplet className="w-12 h-12 text-blue-500" />

          return (
            <Card key={day.datetime} className="bg-violet-200 shadow-md transition-all duration-300 hover:shadow-xl hover:scale-105">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-violet-800">{day.datetime}</CardTitle>
              </CardHeader>
              <CardContent className="flex items-center justify-between">
                <div>
                  <p className="text-violet-700">Máxima: <span className="font-bold">{tempMaxC} °C</span></p>
                  <p className="text-violet-700">Mínima: <span className="font-bold">{tempMinC} °C</span></p>
                  <p className="text-violet-700">Descripción: <span className="font-bold">{dailyCondition}</span></p>
                </div>
                {dailyIcon}
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}