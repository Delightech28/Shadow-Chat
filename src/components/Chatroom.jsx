import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Send, Menu, Settings, LogOut, Users } from 'lucide-react'
import ChatNav from './ChatNav'
import './Chatroom.css'

const Chatroom = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: 'Welcome to ShadowChat!', sender: 'system', timestamp: new Date() }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isNavOpen, setIsNavOpen] = useState(false)
  const messagesEndRef = useRef(null)
  const navigate = useNavigate()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!inputMessage.trim()) return

    const newMessage = {
      id: Date.now(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, newMessage])
    setInputMessage('')

    // Simulate bot response
    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        text: `Echo: ${inputMessage}`,
        sender: 'bot',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, botResponse])
    }, 1000)
  }

  const handleDisconnect = () => {
    navigate('/')
  }

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen)
  }

  return (
    <div className="chatroom-layout">
      <ChatNav isOpen={isNavOpen} onDisconnect={handleDisconnect} />
      
      <div className="chatroom-container">
        <div className="chatroom-header">
          <button className="hamburger" onClick={toggleNav}>
            <Menu size={24} />
          </button>
          <h1 className="chatroom-title">ShadowChat Chatroom</h1>
        </div>
        
        <div className="chat-messages" id="chat-messages">
          {messages.map((message) => (
            <div 
              key={message.id} 
              className={`message ${message.sender}`}
            >
              <div className="message-content">
                <span className="message-sender">
                  {message.sender === 'user' ? 'You' : 
                   message.sender === 'bot' ? 'Bot' : 'System'}
                </span>
                <span className="message-text">{message.text}</span>
                <span className="message-time">
                  {message.timestamp.toLocaleTimeString()}
                </span>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        
        <form className="chat-input-row" onSubmit={handleSubmit}>
          <input
            type="text"
            className="chat-input"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type a message..."
            required
          />
          <button type="submit" className="send-btn">
            <Send size={20} />
          </button>
        </form>
      </div>
    </div>
  )
}

export default Chatroom 