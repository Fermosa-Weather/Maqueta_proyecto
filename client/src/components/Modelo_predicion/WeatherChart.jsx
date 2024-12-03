import React from 'react';

const ChartsSection = () => {
  const containerStyle = {
    backgroundColor: '#e0f7fa',  // Color de fondo suave
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    marginTop: '20px'
  };

  const titleStyle = {
    fontSize: '24px',
    color: '#00796b',  // Un verde azulado
    fontWeight: 'bold',
    marginBottom: '10px'
  };

  const descriptionStyle = {
    fontSize: '16px',
    color: '#004d40',  // Un verde más oscuro
    marginTop: '0'
  };

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>Aquí se podrán ver gráficos con las variables de las predicciones</h2>
      <p style={descriptionStyle}>Pronto podrás visualizar gráficos interactivos que muestran las predicciones de temperatura, precipitación, humedad y más.</p>
    </div>
  );
}

export default ChartsSection;
