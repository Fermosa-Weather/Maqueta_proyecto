// WeatherTrendsChart.js
import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// Registra los componentes necesarios de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const WeatherTrendsChart = ({ data }) => {
  // Aquí definimos los datos que serán pasados a Chart.js
  const chartData = {
    labels: data.dates, // Fechas en el eje X
    datasets: [
      {
        label: 'Precipitación (mm)',
        data: data.precipitation, // Datos de precipitación
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
        tension: 0.4
      },
      {
        label: 'Temperatura (°C)',
        data: data.temperature, // Datos de temperatura
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        fill: true,
        tension: 0.4
      },
      {
        label: 'Humedad (%)',
        data: data.humidity, // Datos de humedad
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        fill: true,
        tension: 0.4
      }
    ]
  };

  // Opciones del gráfico
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Tendencias Meteorológicas'
      },
      tooltip: {
        mode: 'index',
        intersect: false
      },
      legend: {
        position: 'top'
      }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  return (
    <div>
      <h2>Gráfico de Tendencias Meteorológicas</h2>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default WeatherTrendsChart;
