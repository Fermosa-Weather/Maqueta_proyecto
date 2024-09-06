import { useState } from 'react';
import axios from 'axios';
import '../../../src/stilos/PredictionForm.css';

export default function PredictionForm() {
  const [futureDate, setFutureDate] = useState('');
  const [predictions, setPredictions] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setPredictions(null);

    try {
      const response = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ future_date: futureDate }),
      });

      if (!response.ok) {
        throw new Error('No se pudo realizar la predicción. Verifica la fecha ingresada.');
      }

      const data = await response.json();
      setPredictions(data);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Ocurrió un error inesperado');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="form-container">
      <div className="form-card">
        <div className="card-header">
          <h2 className="card-title">Consulte el Tiempo a Futuro</h2>
          <p className="card-description">Ingrese una fecha para obtener predicciones del clima</p>
        </div>
        <div className="card-content">
          <form onSubmit={handleSubmit} className="form">
            <div className="form-group">
              <label htmlFor="futureDate" className="form-label">Fecha futura (DD-MM-YYYY)</label>
              <input
                type="text"
                id="futureDate"
                value={futureDate}
                onChange={(e) => setFutureDate(e.target.value)}
                placeholder="DD-MM-YYYY"
                required
                pattern="\d{2}-\d{2}-\d{4}"
                className="form-input"
              />
            </div>
            <button type="submit" disabled={isLoading} className="submit-button">
              {isLoading ? 'Cargando...' : 'Hacer Predicciones a Futuro'}
            </button>
          </form>

          {error && (
            <div className="alert">
              <div className="alert-icon">!</div>
              <div className="alert-content">
                <h3 className="alert-title">Error</h3>
                <p className="alert-description">{error}</p>
              </div>
            </div>
          )}

          {predictions && (
            <div className="predictions">
              <h3 className="predictions-title">Predicciones para {futureDate}:</h3>
              <p>Temperatura Máxima: {predictions.temperatura_max.toFixed(2)} °C</p>
              <p>Temperatura Mínima: {predictions.temperatura_min.toFixed(2)} °C</p>
              <p>Precipitación: {predictions.precipitacion.toFixed(2)} mm</p>
              <p>Humedad: {predictions.humedad.toFixed(2)} %</p>
              <p>Dirección del Viento: {predictions.direccion_viento.toFixed(2)} grados</p>
              <p>Descripción del Clima: {predictions.descripcion_clima}</p>
              <p>Calidad del Aire: {predictions.calidad_aire.toFixed(2)}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
