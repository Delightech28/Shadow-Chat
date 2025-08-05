import { useState, useEffect } from 'react'
import { Shield, Lock, Eye, MousePointer, Copy, Type } from 'lucide-react'
import './SecurityStatus.css'

const SecurityStatus = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Show security status briefly on page load
    setIsVisible(true)
    const timer = setTimeout(() => {
      setIsVisible(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  const securityFeatures = [
    { icon: <Lock size={16} />, text: 'PrintScreen key - Blocked' },
    { icon: <Copy size={16} />, text: 'Ctrl+P (Print) - Blocked' },
    { icon: <Eye size={16} />, text: 'F12 (Dev Tools) - Detected' },
    { icon: <MousePointer size={16} />, text: 'Right-click - Disabled' },
    { icon: <Copy size={16} />, text: 'Copy/Paste - Disabled' },
    { icon: <Eye size={16} />, text: 'Screen recording - Detected' },
    { icon: <Type size={16} />, text: 'Text selection - Disabled' }
  ]

  if (!isVisible) return null

  return (
    <div className="security-status">
      <div className="security-header">
        <Shield size={20} />
        <span>Security Features Active</span>
      </div>
      <div className="security-features">
        {securityFeatures.map((feature, index) => (
          <div key={index} className="security-feature">
            {feature.icon}
            <span>{feature.text}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SecurityStatus 