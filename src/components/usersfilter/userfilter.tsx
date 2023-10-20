import { useState, useEffect } from 'react'
import axios from 'axios'
import './userfilter.css'

const ITEMS_PER_PAGE = 10
const MAX_VISIBLE_PAGES = 4

const FilterTable: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(0)
  const [keyword, setKeyword] = useState('')
  const [state, setState] = useState('')
  const [specialties, setSpecialties] = useState('')
  const [userType, setUserType] = useState('')
  const [selectedButton, setSelectedButton] = useState('Todos')
  const [loading, setLoading] = useState(true)
  const [users, setUsers] = useState([] as any[])
  const [countData, setCountData] = useState({
    total: 0,
    totalDoctors: 0,
    totalContractor: 0
  })

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
        setLoading(false)
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation: ', error)
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    const token = localStorage.getItem('token')

    axios
      .get(`https://api.buscarmedicos.izap.dev/users/count`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => {
        if (response.status !== 200) {
          throw Error(`HTTP error! status: ${response.status}`)
        }

        setCountData(response.data)
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation: ', error)
      })
  }, [])

  // Filter users based on selectedButton
  const filteredUsers = users.filter(user => {
    if (
      selectedButton === 'Contratantes' &&
      user.profiles[0]?.name === 'Contratante'
    ) {
      return true
    }
    if (selectedButton === 'Medicos' && user.profiles[0]?.name === 'Médico') {
      return true
    }
    if (selectedButton === 'Todos') {
      return true
    }
    return false
  })

  // Pagination logic
  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE)
  const totalVisiblePages = Math.min(MAX_VISIBLE_PAGES, totalPages)
  const startIndex = currentPage * ITEMS_PER_PAGE
  const displayedUsers = filteredUsers.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  )

  const handlePageClick = (page: number) => {
    setCurrentPage(page)
  }

  const handleButton1Click = () => {
    setSelectedButton('Todos')
    setCurrentPage(0)
  }

  const handleButton2Click = () => {
    setSelectedButton('Contratantes')
    setCurrentPage(0)
  }

  const handleButton3Click = () => {
    setSelectedButton('Medicos')
    setCurrentPage(0)
  }

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      if (currentPage >= MAX_VISIBLE_PAGES - 1) {
        setCurrentPage(currentPage + 1)
      } else {
        setCurrentPage(page => Math.min(page + 1, totalPages - 1))
      }
    }
  }

  const handlePrevious = () => {
    if (currentPage > 0) {
      if (currentPage >= MAX_VISIBLE_PAGES) {
        setCurrentPage(currentPage - 1)
      } else {
        setCurrentPage(page => Math.max(page - 1, 0))
      }
    }
  }

  const generateVisiblePages = () => {
    const startPage =
      currentPage < MAX_VISIBLE_PAGES
        ? 0
        : currentPage - (MAX_VISIBLE_PAGES - 1)
    const endPage = Math.min(startPage + MAX_VISIBLE_PAGES, totalPages)
    return Array.from({ length: endPage - startPage }, (_, i) => startPage + i)
  }

  return (
    <>
      <h2 className="filterh2">Usuarios Cadastrados | {selectedButton}</h2>
      <div className="buttonContainer">
        {['Todos', 'Contratantes', 'Medicos'].map(buttonText => (
          <button
            key={buttonText}
            onClick={() => {
              if (buttonText === 'Todos') handleButton1Click()
              else if (buttonText === 'Contratantes') handleButton2Click()
              else if (buttonText === 'Medicos') handleButton3Click()
            }}
            className={selectedButton === buttonText ? 'selected' : ''}
          >
            {buttonText}{' '}
            <span className="userCount">
              {buttonText === 'Todos'
                ? countData.total
                : buttonText === 'Contratantes'
                ? countData.totalContractor
                : countData.totalDoctors}
            </span>
          </button>
        ))}
      </div>
      <div className="filterTable">
        <div className="filterContainer">
          <div className="filters">
            <input
              type="text"
              value={keyword}
              onChange={e => setKeyword(e.target.value)}
              placeholder="Pesquisar palavra-chave"
            />
            <select value={state} onChange={e => setState(e.target.value)}>
              <option value="">Estado (UF)</option>
              {/* outras opções aqui sei la como */}
            </select>
            <select
              value={userType}
              onChange={e => setUserType(e.target.value)}
            >
              <option value="">Cidade</option>
              <option value="cidade">Floriano</option>
              <option value="cidade">Barão de Grajaú</option>
            </select>
            <select
              value={specialties}
              onChange={e => setSpecialties(e.target.value)}
            >
              <option value="">Especialidade</option>
              <option value="clinico geral">Clínico Geral</option>
              <option value="pediatra">Pediatra</option>
              <option value="oftamologista">Oftamologista</option>
              <option value="patologista">Patologista</option>
              <option value="psicologo">Psicólogo</option>
            </select>
          </div>
          <div className="totalUsers">
            <p>Total de usuários</p>
            <h4>{filteredUsers.length}</h4>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>Usuário</th>
              <th>E-mail</th>
              <th>WhattsApp</th>
              <th>Especialidade</th>
              <th>Cidade</th>
              <th>Estado</th>
              <th>Tipo de Usuário</th>
            </tr>
          </thead>
          <tbody>
            {displayedUsers.map((user, index) => (
              <tr key={index}>
                <td>
                  {user.firstName} {} {user.lastName}
                </td>
                <td>{user.email || '--'}</td>
                <td>{user.phone || '--'}</td>
                <td>
                  {user.specialties && user.specialties.length > 0
                    ? user.specialties.join(', ')
                    : '--'}
                </td>
                <td>{user.city || '--'}</td>
                <td>{user.state || '--'}</td>
                <td>{user.tipoDeUsuario || '--'}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="tablepages">
          <button
            className={`pageNumber ${currentPage > 0 ? '' : 'disabled'}`}
            onClick={handlePrevious}
            disabled={currentPage === 0}
          >
            {'<'}
          </button>
          {generateVisiblePages().map(page => (
            <button
              key={page}
              className={`pageNumber ${page === currentPage ? 'active' : ''}`}
              onClick={() => handlePageClick(page)}
            >
              {page + 1}
            </button>
          ))}
          {currentPage + 1 < totalPages && (
            <button className="pageNumber" onClick={handleNext}>
              {'>'}
            </button>
          )}
        </div>
      </div>
    </>
  )
}

export default FilterTable
