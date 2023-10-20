import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import './header.css'

interface User {
  name: string
  email: string
}

const Header: React.FC<User> = ({ name, email }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [user, setUser] = useState({ name: '', email: '' })

  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/')
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      axios
        .get('https://api.buscarmedicos.izap.dev/me', {
          headers: { Authorization: token }
        })
        .then(response => {
          const fullName =
            response.data.firstName + ' ' + response.data.lastName
          setUser({ name: fullName, email: response.data.email })
        })
        .catch(error => {
          console.error('There was an error!', error)
        })
    }
  }, [])

  const toggleModal = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="header">
      <div className="user-info">
        <div className="userImg">
          <img src="/static/images/User.png" alt="" />
        </div>
        <div className="userInfoText">
          <span>
            <b>{user.name}</b>
          </span>
          <span>{user.email}</span>
        </div>
        <span className="chevron-down" onClick={toggleModal}>
          <i className="fa fa-chevron-down"></i>
        </span>
      </div>
      {isOpen && (
        <div className="modal">
          <button onClick={() => navigate('/editUserPage')}>
            <i className="fa fa-user"></i> Usuário
          </button>
          <button onClick={handleLogout}>
            <i className="fa fa-arrow-right"></i> Sair
          </button>
        </div>
      )}
    </div>
  )
}

export default Header
