import { useState } from 'react'
import './Header.css'

interface User {
  name: string
  email: string
}

const Header: React.FC<User> = ({ name, email }) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleModal = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="header">
      <div className="user-info">
        <div className="userImg">
          <img src="/src/assets/img/User.png" alt="" />
        </div>
        <span>
          <b>{name}</b>
        </span>
        <span>{email}</span>
        <span className="chevron-down" onClick={toggleModal}>
          <i className="fa fa-chevron-down"></i>
        </span>
      </div>
      {isOpen && (
        <div className="modal">
          <button onClick={() => console.log('Configurações clicado')}>
            <i className="fa fa-user"></i> Usuário
          </button>
          <button onClick={() => console.log('Sair clicado')}>
            <i className="fa fa-arrow-right"></i> Sair
          </button>
        </div>
      )}
    </div>
  )
}

export default Header
