import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LandingPage from './components/LandingPage'
import Chatroom from './components/Chatroom'
import ConnectWallet from './components/ConnectWallet'
import SecurityFeatures from './components/SecurityFeatures'
import SecurityStatus from './components/SecurityStatus'
import './App.css'

function App() {
  return (
    <Router>
      <div className="App">
        <SecurityFeatures />
        <SecurityStatus />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/connect" element={<ConnectWallet />} />
          <Route path="/chatroom" element={<Chatroom />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App 