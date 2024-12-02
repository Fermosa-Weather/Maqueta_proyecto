// src/components/WeatherChart.js
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Registro de los componentes necesarios de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const WeatherChart = ({ data }) => {

  // Crear un gráfico para cada variable (temperatura, humedad, precipitación, etc.)
  const createChartData = (label, color, dataKey) => ({
    labels: data.map(item => item.fecha), // Fechas en el eje X
    datasets: [
      {
        label: label,
        data: data.map(item => item[dataKey]), // Los valores de la variable
        borderColor: color,
        backgroundColor: color.replace('1)', '0.2)'), // Hacer el fondo transparente
        fill: false,
      }
    ]
  });

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Predicciones del tiempo'
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Fecha',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Valor',
        },
      },
    },
  };

  return (
    <div className="my-8">
      {/* Título adicional para indicar la visualización de gráficos */}
      <h2 className="text-3xl font-semibold text-center mb-6">
        Aquí se pueden visualizar los gráficos en base a las diferentes predicciones
      </h2>
      
      <h2 className="text-2xl font-semibold text-center mb-6">Gráficos del Clima</h2>
      
      {/* Gráfico para la Temperatura */}
      <div className="mb-6">
        <h3 className="text-xl font-medium">Temperatura (°C)</h3>
        <Line data={createChartData('Temperatura (°C)', 'rgba(255, 99, 132, 1)', 'temp')} options={options} />
      </div>
      
      {/* Gráfico para la Humedad */}
      <div className="mb-6">
        <h3 className="text-xl font-medium">Humedad (%)</h3>
        <Line data={createChartData('Humedad (%)', 'rgba(54, 162, 235, 1)', 'humedad')} options={options} />
      </div>
      
      {/* Gráfico para la Precipitación */}
      <div className="mb-6">
        <h3 className="text-xl font-medium">Precipitación (mm)</h3>
        <Line data={createChartData('Precipitación (mm)', 'rgba(75, 192, 192, 1)', 'precipitacion')} options={options} />
      </div>

      {/* Agregar más gráficos para otras variables como viento, presión, etc. */}
      
    </div>
  );
};

export default WeatherChart;
