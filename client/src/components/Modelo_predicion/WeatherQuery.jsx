import React, { useState, useRef, useEffect } from 'react';
import { ArrowUpCircle, Sun, Cloud, CloudRain, Wind, Loader, User, Bot, Trash, Download } from 'lucide-react';
import { FaRobot } from 'react-icons/fa';
import { Link } from 'react-router-dom'; // Import Link for navigation

const FormoWeatherAIModerno = () => {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState('light');
  const scrollAreaRef = useRef(null);
  const lastMessageRef = useRef(null); // Ref para el último mensaje

  // Cargar mensajes desde localStorage al montar el componente
  useEffect(() => {
    const storedMessages = JSON.parse(localStorage.getItem('chatMessages'));
    if (storedMessages) {
      setMessages(storedMessages);
    }
  }, []);

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [messages]);

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  // Guardar mensajes en localStorage cada vez que se actualizan
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('chatMessages', JSON.stringify(messages));
    }
  }, [messages]);

  const loadResponse = async (query) => {
    setLoading(true);
    console.log("Enviando consulta al servidor...");  // Agregado aquí
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

  const clearChat = () => {
    setMessages([]);
    localStorage.removeItem('chatMessages'); // Limpiar los mensajes de localStorage
  };

  const downloadChat = () => {
    const chatContent = messages.map((msg) => `${msg.type}: ${msg.content}`).join('\n\n');
    const blob = new Blob([chatContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'chat_history.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const ChatMessage = ({ message }) => {
    const isUser = message.type === 'user';

    return (
      <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
        <div className={`flex items-start max-w-[75%] ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center ${
              isUser ? 'bg-blue-500 ml-2' : 'bg-gray-300 mr-2'
            }`}
          >
            {isUser ? (
              <User className="w-6 h-6 text-black" />
            ) : (
              <Bot className="w-6 h-6 text-gray-700" />
            )}
          </div>
          <div
            className={`p-4 rounded-lg shadow-lg ${
              isUser
                ? 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100'
                : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100'
            }`}
          >
            <p className="text-lg text-justify">{message.content}</p>
          </div>
        </div>
      </div>
    );
  };

  const WeatherIcon = ({ condition }) => {
    switch (condition) {
      case 'sunny':
        return <Sun className="w-6 h-6 text-yellow-500" />;
      case 'cloudy':
        return <Cloud className="w-6 h-6 text-gray-500" />;
      case 'rainy':
        return <CloudRain className="w-6 h-6 text-blue-500" />;
      case 'windy':
        return <Wind className="w-6 h-6 text-teal-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
      <header className="bg-blue-600 dark:bg-blue-800 text-white p-5 shadow-xl rounded-b-xl">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <FaRobot className="w-8 h-8 mr-3 text-yellow-500" />
            <h1 className="text-2xl font-semibold text-black">
              Hola, soy CIFOR IA, estoy aquí para ayudarte
            </h1>
          </div>
          <div className="space-x-3 flex items-center">
            <button onClick={clearChat} className="p-2 bg-gray-200 rounded-md hover:bg-gray-300 transition">
              <Trash className="w-5 h-5 text-gray-600" />
            </button>
            <button onClick={downloadChat} className="p-2 bg-gray-200 rounded-md hover:bg-gray-300 transition">
              <Download className="w-5 h-5 text-gray-600" />
            </button>

            {/* Ver gráficos button with enhanced styles */}
            <Link to="/chart">
              <button className="flex items-center p-2 px-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-lg shadow-lg hover:bg-gradient-to-l transform transition duration-300 hover:scale-105">
                <span className="mr-2">Ver gráficos</span>
                <ArrowUpCircle className="w-5 h-5 text-white" />
              </button>
            </Link>

            <button onClick={toggleTheme} className="p-2 bg-gray-200 rounded-md hover:bg-gray-300 transition">
              {theme === 'light' ? 'Modo oscuro' : 'Modo claro'}
            </button>
          </div>
        </div>
      </header>

      <main className="flex-grow overflow-hidden">
        <div className="container mx-auto max-w-3xl px-5 py-6">
          <div
            className="overflow-y-auto relative mb-24"
            ref={scrollAreaRef}
            style={{
              maxHeight: 'calc(100vh - 180px)',
              paddingBottom: '200px',
            }}
          >
            {messages.map((message, index) => (
              <ChatMessage key={index} message={message} />
            ))}
            <div ref={lastMessageRef} className="h-2" />
          </div>
        </div>
      </main>

      {loading && (
        <div className="flex justify-center p-4 absolute inset-x-0 bottom-20 z-10">
          <Loader className="w-8 h-8 text-blue-500 animate-spin" />
        </div>
      )}

      <footer className="bg-white dark:bg-gray-800 p-5 shadow-lg border-t fixed bottom-0 w-full">
        <div className="container mx-auto max-w-3xl flex items-center justify-between">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Escribe tu consulta..."
            className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
          />
          <button
            onClick={handleSend}
            className="ml-2 p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            <ArrowUpCircle className="w-6 h-6 text-black" />
          </button>
        </div>
      </footer>
    </div>
  );
};

export default FormoWeatherAIModerno;
