import React, { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';

export default function WeatherChatbot() {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentResponse, setCurrentResponse] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const loadResponse = async (query) => {
    console.log('Enviando consulta al servidor...');
    setLoading(true);
    setCurrentResponse('');

    try {
      const res = await fetch('http://localhost:4000/api/model/consulta-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ consulta: query }),
      });

      if (!res.body) throw new Error('No se pudo leer la respuesta del servidor');

      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      let chunk = await reader.read();
      let fullResponse = '';

      // Mientras haya datos para leer, los procesamos
      while (!chunk.done) {
        const text = decoder.decode(chunk.value, { stream: true });
        console.log(text); // Console log del texto que llega en cada chunk
        fullResponse += text; // Acumulamos la respuesta completa
        setCurrentResponse(fullResponse); // Actualizamos la respuesta acumulada
        chunk = await reader.read();
      }

      // Una vez que se haya completado la respuesta, la agregamos a los mensajes
      setMessages((prev) => [
        ...prev,
        { type: 'bot', content: fullResponse },
      ]);
      setCurrentResponse(''); // Limpiar currentResponse después de agregar el mensaje
    } catch (error) {
      console.error('Error al cargar la respuesta:', error);
      setMessages((prev) => [
        ...prev,
        { type: 'bot', content: 'Error al recuperar la respuesta del servidor.' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSend = () => {
    if (query.trim()) {
      setMessages((prev) => [...prev, { type: 'user', content: query }]);
      loadResponse(query);
      setQuery('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-violet-900 text-white p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">
        Consulta el Tiempo en Formosa
      </h1>

      <h2 className="text-xl mb-4 text-center font-semibold">
        Hola, haz tus predicciones sobre el tiempo en Formosa!
      </h2>

      <div className="flex-grow mb-4 bg-white/10 rounded-lg p-4 overflow-auto">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-4 ${
              message.type === 'user' ? 'text-right' : 'text-left'
            }`}
          >
            <div
              className={`inline-block p-3 rounded-lg ${
                message.type === 'user' ? 'bg-blue-600' : 'bg-violet-600 text-justify'
              }`}
              style={{
                display: 'inline-block',
                backgroundColor:
                  message.type === 'user' ? '#1E3A8A' : '#6D28D9',
                color: 'white',
                borderRadius: '20px',
              }}
            >
              {message.content}
            </div>
          </div>
        ))}

        {/* Mostrar la respuesta acumulada mientras se carga */}
        {currentResponse && (
          <div className="mb-4 text-left">
            <div
              className="inline-block p-3 rounded-lg bg-violet-600 text-justify"
              style={{
                display: 'inline-block',
                color: 'white',
                borderRadius: '20px',
              }}
            >
              {currentResponse}
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="text"
          placeholder="Escribe tu consulta aquí..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-grow bg-white/20 text-black placeholder-white/50 border-none p-3 rounded-lg"
        />
        <button
          onClick={handleSend}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 p-3 rounded-lg flex items-center justify-center"
        >
          {loading ? (
            <div className="w-6 h-6 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <Send className="w-4 h-4" />
          )}
        </button>
      </div>
    </div>
  );
}
