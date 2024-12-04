import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Registrar los componentes de Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const WeatherPromedios = () => {
  const [data, setData] = useState(null);
  const [selectedDate, setSelectedDate] = useState('2024-12-04'); // Fecha inicial por defecto

  // Función para obtener los datos de la API
  const fetchData = async (date) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/model/promedios?date=${date}`);
      
      // Verificar la respuesta de la API
      if (response.data && response.data.promedios) {
        const formattedData = {
          rango: {
            inicio: response.data.inicio,
            fin: response.data.fin,
          },
          promedios: {
            temperatura: parseFloat(response.data.promedios.temperatura),
            humedad: parseFloat(response.data.promedios.humedad),
            lluvia: parseFloat(response.data.promedios.lluvia),
            velocidadViento: parseFloat(response.data.promedios.velocidadViento),
            totalRegistros: response.data.promedios.totalRegistros,
          },
        };

        setData(formattedData);  // Guardar los datos formateados
      } else {
        console.error('Datos no encontrados en la respuesta de la API');
      }
    } catch (error) {
      console.error('Error al obtener los datos', error);
    }
  };

  // Cargar los datos iniciales
  useEffect(() => {
    fetchData(selectedDate);
  }, [selectedDate]);

  // Si no hay datos, mostrar mensaje
  if (!data) {
    return <p className="loading">Cargando los datos...</p>;
  }

  // Datos para el gráfico
  const chartData = {
    labels: ['Promedio'],
    datasets: [
      {
        label: 'Temperatura (°C)',
        data: [data.promedios.temperatura],
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        label: 'Humedad (%)',
        data: [data.promedios.humedad],
        backgroundColor: 'rgba(153, 102, 255, 0.5)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
      },
      {
        label: 'Lluvia (mm)',
        data: [data.promedios.lluvia],
        backgroundColor: 'rgba(255, 159, 64, 0.5)',
        borderColor: 'rgba(255, 159, 64, 1)',
        borderWidth: 1,
      },
      {
        label: 'Velocidad del Viento (km/h)',
        data: [data.promedios.velocidadViento],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,  // Asegura que el gráfico sea responsivo sin perder proporciones
    plugins: {
      title: {
        display: true,
        text: `Promedios Meteorológicos: ${data.rango.inicio} - ${data.rango.fin}`,
      },
      legend: {
        position: 'top',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  // Manejar el cambio de fecha
  const handleDateChange = (event) => {
    setSelectedDate(event.target.value); // Actualizar la fecha seleccionada
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Promedios Meteorológicos</h2>
      <div style={styles.dateInputWrapper}>
        <input
          type="date"
          value={selectedDate}
          onChange={handleDateChange}
          max={new Date().toISOString().split('T')[0]} // Solo fechas hasta hoy
          style={styles.dateInput}
        />
      </div>
      <div style={styles.chartContainer}>
        <Bar data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '40px', // Aumentado el padding para más espacio interno
    backgroundColor: '#f4f4f4',
    borderRadius: '8px',
    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)', // Aumentada la sombra para hacerla más prominente
    width: '90%', // Aumentado el ancho para que ocupe el 90% de la pantalla
    height: '90vh', // El contenedor ocupa el 90% de la altura de la pantalla
    margin: '20px auto', // Centrado el contenedor y añadido un margen superior e inferior
  },
  title: {
    fontSize: '2rem',
    color: '#333',
    marginBottom: '30px', // Aumentado el margen inferior
  },
  dateInputWrapper: {
    marginBottom: '30px', // Aumentado el margen inferior
    display: 'flex',
    justifyContent: 'center',
  },
  dateInput: {
    padding: '12px', // Aumentado el padding
    fontSize: '1.2rem', // Aumentado el tamaño de la fuente
    borderRadius: '5px',
    border: '1px solid #ddd',
    width: '100%',
    maxWidth: '350px', // Aumentado el tamaño máximo del input
  },
  loading: {
    textAlign: 'center',
    fontSize: '1.2rem',
    color: '#666',
  },
  chartContainer: {
    width: '100%',  // Asegura que el gráfico ocupe todo el ancho disponible
    height: '400px', // Define una altura fija, pero puede ajustarse según sea necesario
    maxWidth: '800px', // Máxima anchura del gráfico
    marginTop: '20px',
  },
};

export default WeatherPromedios;
