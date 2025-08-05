import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Wallet, Shield, ArrowRight } from 'lucide-react'
import './ConnectWallet.css'

const ConnectWallet = () => {
  const [isConnected, setIsConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState('')
  const [selectedWallet, setSelectedWallet] = useState('')
  const navigate = useNavigate()

  const wallets = [
    { name: 'MetaMask', icon: '🦊' },
    { name: 'WalletConnect', icon: '🔗' },
    { name: 'Coinbase Wallet', icon: '🪙' }
  ]

  const handleConnect = () => {
    // Simulate wallet connection
    setIsConnected(true)
    setWalletAddress('0x1234...abcd')
    
    // Redirect to chatroom after 1.5 seconds
    setTimeout(() => {
      navigate('/chatroom')
    }, 1500)
  }

  const handleWalletSelect = (walletName) => {
    setSelectedWallet(walletName)
  }

  return (
    <div className="connect-page">
      <div className="connect-container">
        <div className="connect-header">
          <Wallet size={48} className="connect-icon" />
          <h1 className="connect-title">Connect Your Wallet</h1>
          <p className="connect-subtitle">
            Connect your Web3 wallet to access ShadowChat securely
          </p>
        </div>

        <div className="connect-status">
          <div className={`status-indicator ${isConnected ? 'connected' : 'disconnected'}`}>
            <Shield size={20} />
            <span>{isConnected ? 'Connected' : 'Not Connected'}</span>
          </div>
          {isConnected && (
            <div className="wallet-address">
              {walletAddress}
            </div>
          )}
        </div>

        {!isConnected ? (
          <>
            <div className="wallet-list">
              {wallets.map((wallet) => (
                <div
                  key={wallet.name}
                  className={`wallet-option ${selectedWallet === wallet.name ? 'selected' : ''}`}
                  onClick={() => handleWalletSelect(wallet.name)}
                  tabIndex={0}
                >
                  <span className="wallet-icon">{wallet.icon}</span>
                  <span className="wallet-name">{wallet.name}</span>
                </div>
              ))}
            </div>

            <button 
              className={`btn connect-btn ${selectedWallet ? 'active' : ''}`}
              onClick={handleConnect}
              disabled={!selectedWallet}
            >
              {selectedWallet ? `Connect ${selectedWallet}` : 'Select a Wallet'}
              <ArrowRight size={20} />
            </button>
          </>
        ) : (
          <div className="connected-state">
            <div className="success-message">
              <Shield size={32} />
              <p>Wallet connected successfully!</p>
              <p>Redirecting to chatroom...</p>
            </div>
          </div>
        )}

        <div className="connect-info">
          <h3>Why Connect a Wallet?</h3>
          <ul>
            <li>Secure authentication without passwords</li>
            <li>Decentralized identity verification</li>
            <li>Access to Web3 features and tokens</li>
            <li>Enhanced privacy and security</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default ConnectWallet 