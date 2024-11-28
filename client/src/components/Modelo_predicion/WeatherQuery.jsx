import React, { useState, useRef, useEffect } from 'react'
import { Send, Sun, Cloud, CloudRain, Wind, Loader, User, Bot, ArrowRight, Cpu } from 'lucide-react'

export default function WeatherChatbot() {
  const [query, setQuery] = useState('')
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)
  const scrollAreaRef = useRef(null)

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  const loadResponse = async (query) => {
    setLoading(true)
    console.log('Enviando consulta al servidor...', query)
    try {
      const res = await fetch('http://localhost:3000/api/model/consulta-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ consulta: query }),
      })

      if (!res.body) throw new Error('No se pudo leer la respuesta del servidor')

      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let botMessage = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const text = decoder.decode(value, { stream: true })
        botMessage += text

        setMessages((prev) => {
          const updatedMessages = [...prev]
          const streamingMessage = updatedMessages.find(
            (msg) => msg.type === 'bot' && msg.isStreaming
          )
          if (streamingMessage) {
            streamingMessage.content = botMessage
          } else {
            updatedMessages.push({ type: 'bot', content: text, isStreaming: true })
          }
          return updatedMessages
        })
      }

      setMessages((prev) =>
        prev.map((msg) =>
          msg.type === 'bot' && msg.isStreaming ? { ...msg, isStreaming: false } : msg
        )
      )
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { type: 'bot', content: 'Error al recuperar la respuesta del servidor.' },
      ])
    } finally {
      setLoading(false)
    }
  }

  const handleSend = () => {
    if (query.trim()) {
      setMessages((prev) => [...prev, { type: 'user', content: query }])
      loadResponse(query)
      setQuery('')
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const ChatMessage = ({ message }) => {
    const isUser = message.type === 'user'

    return (
      <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
        <div className={`flex items-start space-x-2 max-w-[80%] ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
          <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${isUser ? 'bg-blue-200' : 'bg-gray-200'}`}>
            {isUser ? <User className="w-5 h-5 text-blue-600" /> : <Bot className="w-5 h-5 text-gray-600" />}
          </div>
          <div className={`p-3 rounded-lg ${isUser ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'} text-lg`}>
            <p className="text-lg">{message.content}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-screen bg-white">
      <header className="bg-white p-4 shadow-sm">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Cpu className="text-blue-500 w-8 h-8" />
            <h1 className="text-2xl font-bold text-gray-800">FormoWeatherAI</h1>
          </div>
          <div className="flex items-center space-x-4 text-gray-600">
            <Cpu className="w-6 h-6" />
            <Cloud className="w-6 h-6" />
            <CloudRain className="w-6 h-6" />
            <Wind className="w-6 h-6" />
          </div>
        </div>
      </header>


      <main className="flex-grow overflow-hidden bg-gray-50">
        <div className="container mx-auto h-full max-w-4xl px-4 py-6">
          <div ref={scrollAreaRef} className="h-full pr-4 rounded-lg bg-white shadow-sm overflow-auto">
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

      <footer className="bg-white p-4 shadow-sm">
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              placeholder="Consulta el tiempo en Formosa..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-grow bg-white text-gray-800 placeholder-gray-400 border-none focus:ring-2 focus:ring-blue-400 focus:border-transparent p-4 rounded text-xl"
            />
            <button
              onClick={handleSend}
              disabled={loading}
              className="bg-blue-500 text-white hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-white p-3 rounded ml-2 flex items-center justify-center"
            >
              {loading ? (
                <Loader className="w-4 h-4 animate-spin" />
              ) : (
                <ArrowRight className="w-6 h-6" />
              )}
              <span className="sr-only">Enviar consulta</span>
            </button>
          </div>
        </div>
      </footer>
    </div>
  )
}
