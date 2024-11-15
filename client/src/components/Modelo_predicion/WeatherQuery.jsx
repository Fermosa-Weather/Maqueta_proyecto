import React, { useState } from 'react';
import '../../stilos/WeatherQuery.css'; // Asegúrate de que la ruta sea correcta

const WeatherQuery = () => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');

  const loadResponse = async (query) => {
    setResponse(''); // Limpiar la respuesta anterior

    try {
      console.log('Enviando solicitud al servidor');
      const res = await fetch('http://localhost:4000/api/model/consulta-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ consulta: query }),
      });

      if (!res.body) {
        throw new Error('No se pudo leer la respuesta del servidor');
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let chunk = await reader.read();

      while (!chunk.done) {
        const text = decoder.decode(chunk.value, { stream: true });
        setResponse((prevResponse) => prevResponse + text);
        console.log(text);
        chunk = await reader.read();
      }
    } catch (error) {
      console.error('Error al cargar la respuesta:', error);
      setResponse('Error al recuperar la respuesta del servidor.');
    }
  };

  const handleSend = () => {
    if (query) {
      loadResponse(query);
    } else {
      alert('Por favor, introduce una consulta.');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSend(); // Llama a handleSend si se presiona Enter
    }
  };

  return (
    <div className="weather-query-container">
      <h1>Consulta el Tiempo en Formosa</h1>
      <input
        type="text"
        id="query"
        placeholder="Escribe tu consulta aquí..."
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          console.log('Valor del input:', e.target.value);
        }}
        onKeyDown={handleKeyDown} 
      />
      <button onClick={handleSend}>Consultar</button>
      <pre id="response">{response}</pre>
    </div>
  );
};

export default WeatherQuery;