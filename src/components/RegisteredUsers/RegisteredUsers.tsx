import axios from 'axios'
import { useState, useEffect } from 'react'
import './RegisteredUsers.css'
import { Link } from 'react-router-dom'

interface User {
  firstName: string
  lastName: string
  email: string
  phone: string
  profiles: { name: string }[]
}

const ITEMS_PER_PAGE = 10

const UserTable: React.FC = () => {
  const [users, setUsers] = useState<User[]>([])
  const [currentPage] = useState(0)

  useEffect(() => {
    const token = localStorage.getItem('token')
    axios
      .get(`https://api.buscarmedicos.izap.dev/users`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => {
        if (response.status !== 200) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        setUsers(response.data.content)
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation: ', error)
      })
  }, [])

  const startIndex = currentPage * ITEMS_PER_PAGE
  const selectedUsers = users.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  return (
    <div className="userTable">
      <h4>
        Ultimos usuários cadastrados
        <Link to="/userspage" className="verTodosLink">
          Ver tudo <i className="fa fa-arrow-right"></i>
        </Link>
      </h4>
      <table>
        <thead>
          <tr>
            <th>Usuário</th>
            <th>E-mail</th>
            <th>WhattsApp</th>
            <th>Tipo de Usuário</th>
          </tr>
        </thead>
        <tbody>
          {selectedUsers.map((user, index) => (
            <tr key={index}>
              <td>
                {user.firstName} {user.lastName}
              </td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>
                {user.profiles && user.profiles.length > 0
                  ? user.profiles[0].name
                  : 'N/A'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UserTable
