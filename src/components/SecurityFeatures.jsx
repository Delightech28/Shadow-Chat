import { useEffect } from 'react'

const SecurityFeatures = () => {
  useEffect(() => {
    // Block PrintScreen key
    const handleKeyDown = (e) => {
      // Block PrintScreen (44), F12 (123), Ctrl+P (80 with Ctrl), Ctrl+Shift+I (73), Ctrl+Shift+J (74), Ctrl+U (85)
      if (e.keyCode === 44 || e.keyCode === 123 || 
          (e.ctrlKey && e.keyCode === 80) || 
          (e.ctrlKey && e.shiftKey && e.keyCode === 73) ||
          (e.ctrlKey && e.shiftKey && e.keyCode === 74) ||
          (e.ctrlKey && e.keyCode === 85)) {
        e.preventDefault()
        e.stopPropagation()
        console.log('🔒 Key combination blocked')
        return false
      }
    }

    // Block right-click
    const handleContextMenu = (e) => {
      e.preventDefault()
      e.stopPropagation()
      console.log('🔒 Right-click - Disabled')
      return false
    }

    // Block copy/paste
    const handleCopy = (e) => {
      e.preventDefault()
      e.stopPropagation()
      console.log('🔒 Copy/Paste - Disabled')
      return false
    }

    // Block text selection
    const handleSelectStart = (e) => {
      // Allow selection only for input fields
      if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
        e.preventDefault()
        e.stopPropagation()
        console.log('🔒 Text selection - Disabled')
        return false
      }
    }

    // Block drag and drop
    const handleDragStart = (e) => {
      e.preventDefault()
      e.stopPropagation()
      console.log('🔒 Drag and drop - Disabled')
      return false
    }

    // Block screen recording detection (basic)
    const handleVisibilityChange = () => {
      if (document.hidden) {
        console.log('🔒 Screen recording - Detected')
        // You can add additional actions here
      }
    }

    // Enhanced dev tools detection
    const detectDevTools = () => {
      const threshold = 160
      const widthThreshold = window.outerWidth - window.innerWidth > threshold
      const heightThreshold = window.outerHeight - window.innerHeight > threshold
      
      if (widthThreshold || heightThreshold) {
        console.log('🔒 F12 (Dev Tools) - Detected')
        // You can add additional actions here like redirecting or showing warnings
      }
    }

    // Block view source
    const handleKeyUp = (e) => {
      if (e.ctrlKey && e.key === 'u') {
        e.preventDefault()
        e.stopPropagation()
        console.log('🔒 View source - Blocked')
        return false
      }
    }

    // Block save page
    const handleBeforeUnload = (e) => {
      // This is a basic protection, can be bypassed
      console.log('🔒 Page save attempt - Detected')
    }

    // Add event listeners
    document.addEventListener('keydown', handleKeyDown, true)
    document.addEventListener('keyup', handleKeyUp, true)
    document.addEventListener('contextmenu', handleContextMenu, true)
    document.addEventListener('copy', handleCopy, true)
    document.addEventListener('selectstart', handleSelectStart, true)
    document.addEventListener('dragstart', handleDragStart, true)
    document.addEventListener('visibilitychange', handleVisibilityChange, true)
    window.addEventListener('beforeunload', handleBeforeUnload, true)

    // Check for dev tools periodically
    const devToolsInterval = setInterval(detectDevTools, 1000)

    // Cleanup function
    return () => {
      document.removeEventListener('keydown', handleKeyDown, true)
      document.removeEventListener('keyup', handleKeyUp, true)
      document.removeEventListener('contextmenu', handleContextMenu, true)
      document.removeEventListener('copy', handleCopy, true)
      document.removeEventListener('selectstart', handleSelectStart, true)
      document.removeEventListener('dragstart', handleDragStart, true)
      document.removeEventListener('visibilitychange', handleVisibilityChange, true)
      window.removeEventListener('beforeunload', handleBeforeUnload, true)
      clearInterval(devToolsInterval)
    }
  }, [])

  // Add CSS to disable text selection globally
  useEffect(() => {
    const style = document.createElement('style')
    style.textContent = `
      * {
        -webkit-user-select: none !important;
        -moz-user-select: none !important;
        -ms-user-select: none !important;
        user-select: none !important;
        -webkit-touch-callout: none !important;
        -webkit-tap-highlight-color: transparent !important;
      }
      
      /* Allow selection for input fields */
      input, textarea {
        -webkit-user-select: text !important;
        -moz-user-select: text !important;
        -ms-user-select: text !important;
        user-select: text !important;
      }
      
      /* Disable image dragging */
      img {
        -webkit-user-drag: none !important;
        -khtml-user-drag: none !important;
        -moz-user-drag: none !important;
        -o-user-drag: none !important;
        user-drag: none !important;
      }
    `
    document.head.appendChild(style)

    return () => {
      document.head.removeChild(style)
    }
  }, [])

  return null // This component doesn't render anything visible
}

export default SecurityFeatures 