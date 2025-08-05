import { Settings, LogOut, Users } from 'lucide-react'
import './ChatNav.css'

const ChatNav = ({ isOpen, onDisconnect }) => {
  const users = [
    { id: 1, name: 'You (0x1234...abcd)', active: true },
    { id: 2, name: 'Anonymous 1', active: false },
    { id: 3, name: 'Anonymous 2', active: false }
  ]

  const actions = [
    { id: 1, name: 'Settings', icon: <Settings size={16} /> },
    { id: 2, name: 'Disconnect', icon: <LogOut size={16} />, onClick: onDisconnect }
  ]

  return (
    <>
      <nav className={`chat-nav chat-nav-left ${isOpen ? 'show' : ''}`} id="nav-left">
        <div className="nav-title">
          <Users size={16} />
          USERS
        </div>
        <ul className="nav-list">
          {users.map((user) => (
            <li 
              key={user.id} 
              className={`nav-user ${user.active ? 'active' : ''}`}
            >
              {user.name}
            </li>
          ))}
        </ul>
      </nav>
      
      <nav className={`chat-nav chat-nav-right ${isOpen ? 'show' : ''}`} id="nav-right">
        <div className="nav-title">ACTIONS</div>
        <ul className="nav-list">
          {actions.map((action) => (
            <li 
              key={action.id} 
              className="nav-action"
              onClick={action.onClick}
            >
              {action.icon}
              {action.name}
            </li>
          ))}
        </ul>
      </nav>
    </>
  )
}

export default ChatNav 