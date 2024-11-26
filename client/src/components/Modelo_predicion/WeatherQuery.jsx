import React, { useState, useRef, useEffect } from 'react';

export default function WeatherChatbot() {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const loadResponse = async (query) => {
    console.log('Enviando consulta al servidor...');
    setLoading(true);

    try {
      const res = await fetch('http://localhost:3000/api/model/consulta-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ consulta: query }),
      });

      if (!res.body) throw new Error('No se pudo leer la respuesta del servidor');

      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      let botMessage = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const text = decoder.decode(value, { stream: true });
        botMessage += text;

        console.log(text);

        setMessages((prev) => {
          const updatedMessages = [...prev];
          if (!updatedMessages.some((msg) => msg.type === 'bot' && msg.isStreaming)) {
            updatedMessages.push({ type: 'bot', content: text, isStreaming: true });
          } else {
            const streamingMessage = updatedMessages.find(
              (msg) => msg.type === 'bot' && msg.isStreaming
            );
            if (streamingMessage) streamingMessage.content = botMessage;
          }
          return updatedMessages;
        });
      }

      setMessages((prev) =>
        prev.map((msg) =>
          msg.type === 'bot' && msg.isStreaming
            ? { ...msg, isStreaming: false }
            : msg
        )
      );
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

  const formatBotMessage = (message) => {
    const items = message.split('\n');
    return (
      <ul>
        {items.map((item, index) => (
          <li key={index} className="list-disc ml-4">{item}</li>
        ))}
      </ul>
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-blue-900 text-black">
      <h1 className="text-3xl font-bold mb-4 text-center p-4">
        Consulta el Tiempo en Formosa
      </h1>

      <h2 className="text-xl mb-4 text-center font-semibold">
        Hola, haz tus predicciones sobre el tiempo en Formosa!
      </h2>

      <div
        className="flex-grow bg-white/10 rounded-lg p-4 overflow-auto"
        style={{ height: 'calc(100vh - 72px)', paddingBottom: '72px' }}
      >
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-4 ${message.type === 'user' ? 'text-right' : 'text-left'}`}
          >
            <div
              className={`inline-block p-3 rounded-lg ${
                message.type === 'user' ? 'bg-blue-600' : 'bg-violet-600 text-justify'
              }`}
              style={{
                display: 'inline-block',
                backgroundColor: message.type === 'user' ? '#1E3A8A' : '#6D28D9',
                color: 'white',
                borderRadius: '20px',
              }}
            >
              {message.type === 'bot' ? formatBotMessage(message.content) : message.content}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div
        className="fixed bottom-0 left-0 w-full p-4 bg-blue-800 flex items-center space-x-2"
        style={{ zIndex: 10 }}
      >
        <input
          type="text"
          placeholder="Escribe tu consulta aquí..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-grow bg-white/20 text-black placeholder-gray-500 p-3 rounded-lg"
          style={{
            border: '2px solid',
            borderImageSource: 'linear-gradient(to right, #1E3A8A, #6D28D9)',
            borderImageSlice: 1,
            minWidth: '0',
            flex: '1 1 auto',
            color: 'black',
          }}
        />

        <button
          onClick={handleSend}
          disabled={loading}
          className="p-3 rounded-lg flex items-center justify-center border-2"
          style={{
            borderImageSource: 'linear-gradient(to right, #1E3A8A, #6D28D9)',
            borderImageSlice: 1,
            background: 'linear-gradient(to right, #4C51BF, #6B46C1)',
            color: 'white',
          }}
        >
          {loading ? (
            <div className="w-6 h-6 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <span>Consultar</span>
          )}
        </button>
      </div>
    </div>
  );
}
