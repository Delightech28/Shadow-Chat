import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, Shield, Users, MessageCircle, Zap } from 'lucide-react'
import './LandingPage.css'

const LandingPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const navigate = useNavigate()

  const features = [
    {
      icon: <Shield size={48} />,
      title: "Secure & Anonymous",
      description: "End-to-end encryption with zero-knowledge architecture"
    },
    {
      icon: <Users size={48} />,
      title: "Decentralized Chat",
      description: "No central servers, peer-to-peer communication"
    },
    {
      icon: <MessageCircle size={48} />,
      title: "Real-time Messaging",
      description: "Instant message delivery with blockchain verification"
    },
    {
      icon: <Zap size={48} />,
      title: "Web3 Integration",
      description: "Connect with your crypto wallet for seamless access"
    }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % features.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [features.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % features.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + features.length) % features.length)
  }

  const goToSlide = (index) => {
    setCurrentSlide(index)
  }

  return (
    <div className="landing-page">
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Shadow<span className="text-green">Chat</span>
          </h1>
          <p className="hero-subtitle">
            The next generation of secure, decentralized messaging
          </p>
          
          <div className="feature-carousel">
            <div className="carousel-container">
              <div 
                className="carousel-slides" 
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {features.map((feature, index) => (
                  <div key={index} className="carousel-slide">
                    <div className="feature-card">
                      <div className="feature-icon">
                        {feature.icon}
                      </div>
                      <h3 className="feature-title">{feature.title}</h3>
                      <p className="feature-description">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <button className="carousel-btn carousel-btn-prev" onClick={prevSlide}>
                ‹
              </button>
              <button className="carousel-btn carousel-btn-next" onClick={nextSlide}>
                ›
              </button>
            </div>
            
            <div className="carousel-dots">
              {features.map((_, index) => (
                <button
                  key={index}
                  className={`carousel-dot ${index === currentSlide ? 'active' : ''}`}
                  onClick={() => goToSlide(index)}
                />
              ))}
            </div>
          </div>
          
          <div className="hero-actions">
            <button 
              className="btn btn-primary"
              onClick={() => navigate('/connect')}
            >
              Get Started
              <ArrowRight size={20} />
            </button>
            <button 
              className="btn btn-secondary"
              onClick={() => navigate('/chatroom')}
            >
              Try Demo
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LandingPage 