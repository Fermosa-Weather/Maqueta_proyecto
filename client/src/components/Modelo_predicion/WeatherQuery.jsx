import React, { useState, useRef, useEffect } from 'react';
import { Send, Sun, Cloud, CloudRain, Wind, Loader, User, Bot, ChevronRight, Cpu } from 'lucide-react';

const FormoWeatherAI = () => {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const scrollAreaRef = useRef(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const loadResponse = async (query) => {
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

        setMessages((prev) => {
          const updatedMessages = [...prev];
          const streamingMessage = updatedMessages.find(
            (msg) => msg.type === 'bot' && msg.isStreaming
          );
          if (streamingMessage) {
            streamingMessage.content = botMessage;
          } else {
            updatedMessages.push({ type: 'bot', content: text, isStreaming: true });
          }
          return updatedMessages;
        });
      }

      setMessages((prev) =>
        prev.map((msg) =>
          msg.type === 'bot' && msg.isStreaming ? { ...msg, isStreaming: false } : msg
        )
      );
    } catch (error) {
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

  const ChatMessage = ({ message }) => {
    const isUser = message.type === 'user';

    return (
      <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} items-center`}>
        <div className={`flex items-center ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              isUser ? 'bg-blue-200' : 'bg-gray-200'
            }`}
          >
            {isUser ? (
              <User className="w-5 h-5 text-blue-600" />
            ) : (
              <Bot className="w-5 h-5 text-gray-600" />
            )}
          </div>
          <div
            className={`p-3 rounded-lg ${
              isUser ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
            } text-lg`}
          >
            <p className="text-lg text-justify">{message.content}</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex h-screen">
      {/* Sección lateral izquierda */}
      <div className="w-1/4 p-4 flex flex-col">
        <div className="sticky top-0 z-10 py-4">
          <div className="flex items-center">
            <Bot className="text-blue-500 w-10 h-10 mr-2" />
            <p className="text-blue-600 font-bold">
              Hola, soy CIFOR IA. ¡Estoy aquí para ayudarte!
            </p>
          </div>
        </div>
      </div>

      {/* Sección principal */}
      <div className="flex flex-col w-3/4">
        <header className="p-4">
          <div className="container mx-auto flex items-center justify-between"></div>
        </header>

        <main className="flex-grow overflow-hidden">
          <div className="container mx-auto h-full max-w-4xl px-4 py-6">
            <div
              ref={scrollAreaRef}
              className="h-full pr-4 rounded-lg overflow-auto"
            >
              <div className="p-4 space-y-4">
                {messages.map((message, index) => (
                  <ChatMessage key={index} message={message} />
                ))}
                {loading && (
                  <div className="flex justify-center p-4">
                    <Loader className="w-12 h-12 text-blue-500 animate-spin" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>

        <footer className="p-4 fixed bottom-0 w-full">
          <div className="container mx-auto max-w-4xl">
            <div className="flex items-center w-full">
              {/* Cuadro de consulta movido a la izquierda y con bordes redondeados */}
              <input
                type="text"
                placeholder="Consulta el tiempo en Formosa..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                className="bg-gray-100 text-gray-800 p-4 w-full rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleSend}
                disabled={loading}
                className="bg-blue-500 text-white hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 p-3 rounded-r-lg"
              >
                {loading ? (
                  <Loader className="w-4 h-4 animate-spin" />
                ) : (
                  <ChevronRight className="w-8 h-8 text-black rotate-90" />
                )}
              </button>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default FormoWeatherAI;
