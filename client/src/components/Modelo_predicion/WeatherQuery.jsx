// src/components/WeatherQuery.jsx

import React, { useState } from 'react';
//import '../../stilos/WeatherQuery.css';

const WeatherQuery = () => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');

  const loadResponse = async (query) => {
    setResponse(''); // Clear previous response

    try {
      console.log('Sending request to the server');
      const res = await fetch('http://localhost:4000/api/model/consulta-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ consulta: query }),
      });

      if (!res.body) {
        throw new Error('Could not read response from server');
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
      console.error('Error loading response:', error);
      setResponse('Error retrieving response from server.');
    }
  };

  const handleSend = () => {
    if (query) {
      loadResponse(query);
    } else {
      alert('Please enter a query.');
    }
  };

  return (
    <div className="container">
      <h1>Consulta el Tiempo en Formosa</h1>
      <input
        type="text"
        id="query"
        placeholder="Type your query here..."
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          console.log('Input value:', e.target.value); // Log to check input
        }}
      />
      <button onClick={handleSend}>Consultar</button>
      <pre id="response">{response}</pre>
    </div>
  );
};

export default WeatherQuery;