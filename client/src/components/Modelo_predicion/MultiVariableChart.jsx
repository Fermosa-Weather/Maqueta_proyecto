import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Tooltip, Legend } from 'chart.js';
import { Chart } from 'react-chartjs-2';
import axios from 'axios';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Tooltip, Legend);

const MultiVariableChart = () => {
  const [data, setData] = useState(null);
  const [isInfoVisible, setIsInfoVisible] = useState(false);

  useEffect(() => {
    axios.get('/predicciones.json')
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching the data:", error);
      });
  }, []);

  const toggleInfo = () => {
    setIsInfoVisible(!isInfoVisible);
  };

  if (!data) {
    return <div style={styles.loading}>Cargando datos...</div>;
  }

  const chartData = {
    labels: data.map(station => station.date),
    datasets: [
      {
        label: "Temperatura (°C)",
        data: data.map(station => station.data.temperature),
        type: 'line',
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.4,
        borderWidth: 2,
        fill: true,
      },
      {
        label: "Humedad (%)",
        data: data.map(station => station.data.humidity),
        type: 'bar',
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
        borderRadius: 5,
      },
      {
        label: "Precipitación (mm)",
        data: data.map(station => station.data.rain24h),
        type: 'bar',
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
        borderRadius: 5,
      }
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Fecha',
          font: {
            size: 14,
            weight: 'bold',
          },
        },
      },
      y: {
        title: {
          display: true,
          text: 'Valores',
          font: {
            size: 14,
            weight: 'bold',
          },
        },
        ticks: {
          beginAtZero: true,
        },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: (context) => {
            return `${context.dataset.label}: ${context.raw}`;
          },
        },
      },
      legend: {
        position: 'top',
        labels: {
          boxWidth: 20,
          padding: 10,
          font: {
            size: 14,
            weight: 'bold',
          },
        },
      },
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.chartSection}>
        <h2 style={styles.chartTitle}>Gráfico de las predicciones de CIFOR IA</h2>
        <div style={styles.chartWrapper}>
          <Chart type="bar" data={chartData} options={chartOptions} />
        </div>
      </div>

      {/* Botón para mostrar/ocultar el panel de información */}
      <div style={styles.toggleButtonContainer}>
        <button onClick={toggleInfo} style={styles.toggleButton}>
          {isInfoVisible ? 'Ocultar información' : 'Mostrar información'}
        </button>
      </div>

      {/* Panel de información */}
      <div style={{ ...styles.weatherPanel, display: isInfoVisible ? 'block' : 'none' }}>
        <WeatherDisplay weatherData={data} />
      </div>
    </div>
  );
};

const WeatherDisplay = ({ weatherData }) => {
  const weatherDisplayStyles = {
    fontFamily: 'Arial, sans-serif',
    padding: '20px',
  };

  return (
    <div style={weatherDisplayStyles}>
      <h1>Información sobre el pronostico del tiempo</h1>
      {weatherData.map((station) => (
        <StationInfo key={station.station_id} station={station} />
      ))}
    </div>
  );
};

const StationInfo = ({ station }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleInfo = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div style={stationStyles}>
      <p
        style={stationHeadingStyles}
        onClick={toggleInfo}
      >
        Fecha: {station.date}
      </p>
      {isOpen && (
        <div>
          <p style={stationTextStyles}>Temperatura: {station.data.temperature} °C</p>
          <p style={stationTextStyles}>Humedad: {station.data.humidity} %</p>
          <p style={stationTextStyles}>Lluvia en 24 horas: {station.data.rain24h} mm</p>
          <p style={stationTextStyles}>Velocidad del viento: {station.data.windSpeed ?? 'No disponible'} m/s</p>
          <p style={stationTextStyles}>Ubicación: {station.data.location.latitude}, {station.data.location.longitude}</p>
        </div>
      )}
    </div>
  );
};

// Estilos
const stationStyles = {
  backgroundColor: '#f4f4f4',
  margin: '10px 0',
  padding: '15px',
  borderRadius: '8px',
};

const stationHeadingStyles = {
  color: '#2c3e50',
  fontSize: '18px',
  fontWeight: 'bold',
  cursor: 'pointer',
};

const stationTextStyles = {
  margin: '5px 0',
  fontSize: '16px',
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '20px',
  },
  chartSection: {
    width: '70%',
    marginRight: '20px',
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  },
  chartTitle: {
    textAlign: 'center',
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '20px',
  },
  chartWrapper: {
    position: 'relative',
    height: '400px',
  },
  loading: {
    textAlign: 'center',
    fontSize: '18px',
    color: '#888',
    marginTop: '50px',
  },
  weatherPanel: {
    width: '28%',
    backgroundColor: '#f4f4f9',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    overflowY: 'auto',
    transition: 'transform 0.3s ease-in-out',
  },
  toggleButtonContainer: {
    marginBottom: '10px',
    textAlign: 'center',
  },
  toggleButton: {
    padding: '10px',
    backgroundColor: '#3498db',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
  },
};

export default MultiVariableChart;
