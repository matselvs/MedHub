import { useState, useEffect } from 'react'
import axios from 'axios'
import './notifications.css'

interface Notification {
  id: number
  createdAt: string
  updatedAt: string
  createdBy: string
  updatedBy: string
  title: string
  sendingDate: string
  message: string
  type: string
}

const NotificationTable: React.FC = () => {
  const [apiData, setApiData] = useState<Notification[]>([])
  const [keyword, setKeyword] = useState<string>('')
  const [currentPage, setCurrentPage] = useState(0)
  const ITEMS_PER_PAGE = 10
  const [totalDoctors, setTotalDoctors] = useState(0)
  const [totalContractors, setTotalContractors] = useState(0)
  const [isContractorsSelected, setIsContractorsSelected] = useState(true)
  const [isDoctorsSelected, setIsDoctorsSelected] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')

    if (!token) {
      console.error(
        'Token de autorização não encontrado no armazenamento local.'
      )
      return
    }

    axios
      .get('https://api.buscarmedicos.izap.dev/notifications', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => {
        setApiData(response.data.content)
      })
      .catch(error => {
        console.error('Erro ao buscar dados de notificações:', error)
      })

    axios
      .get('https://api.buscarmedicos.izap.dev/users/count', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => {
        const { totalDoctors, totalContractor } = response.data
        setTotalDoctors(totalDoctors)
        setTotalContractors(totalContractor)
      })
      .catch(error => {
        console.error(
          'Erro ao buscar dados de contagem de médicos e contratantes:',
          error
        )
      })
  }, [])

  const renderPageNumbers = () => {
    const totalPages = Math.ceil(apiData.length / ITEMS_PER_PAGE)

    const handlePageClick = (page: number) => {
      setCurrentPage(page)
    }

    const generateVisiblePages = () => {
      const totalVisiblePages = 4
      const startPage =
        currentPage < totalVisiblePages
          ? 0
          : currentPage - (totalVisiblePages - 1)
      const endPage = Math.min(startPage + totalVisiblePages, totalPages)
      return Array.from(
        { length: endPage - startPage },
        (_, i) => startPage + i
      )
    }

    return (
      <div className="pagination">
        <button
          className={`pageNumber ${currentPage > 0 ? '' : 'disabled'}`}
          onClick={() => handlePageClick(currentPage - 1)}
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
        <button
          className={`pageNumber ${
            currentPage + 1 < totalPages ? '' : 'disabled'
          }`}
          onClick={() => handlePageClick(currentPage + 1)}
          disabled={currentPage + 1 >= totalPages}
        >
          {'>'}
        </button>
      </div>
    )
  }

  const startIndex = currentPage * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const displayedNotifications = apiData.slice(startIndex, endIndex)

  return (
    <div>
      <h2 className="notificationsh2">Notificações</h2>
      <div className="buttonContainer">
        <button
          className={isContractorsSelected ? 'selected' : ''}
          onClick={() => {
            setIsContractorsSelected(true)
            setIsDoctorsSelected(false)
          }}
        >
          Contratantes{' '}
          <span className="userCountContractors">{totalContractors}</span>
        </button>

        <button
          className={`${isDoctorsSelected ? 'selected' : ''}`}
          onClick={() => {
            setIsContractorsSelected(false)
            setIsDoctorsSelected(true)
          }}
        >
          Médicos <span className="userCountMedics">{totalDoctors}</span>
        </button>
      </div>
      <div className="notificationsTable">
        <div className="notificationsContainer">
          <div className="notifications">
            <input
              type="text"
              value={keyword}
              onChange={e => setKeyword(e.target.value)}
              placeholder="Pesquisar palavra-chave"
            />
            <button
              style={{
                border: 'none',
                borderRadius: '6px',
                boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.5)',
                height: '25px',
                width: '25px',
                backgroundColor: '#fff',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <img
                src="/src/assets/img/filter.png"
                alt=""
                style={{ height: '15px', width: '15px' }}
              />
            </button>
          </div>
          <div className="addnotifications">
            <button>+ Nova Notificação</button>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>Mensagem</th>
              <th>Data de envio</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {displayedNotifications.map((notification, index) => (
              <tr key={index}>
                <td>{notification.message}</td>
                <td>{notification.sendingDate}</td>
                <td>
                  <button className="action-button eye-button">
                    <i className="fas fa-eye"></i>
                  </button>
                  <button className="action-button pen-button">
                    <i className="fas fa-pen"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination-container">{renderPageNumbers()}</div>
      </div>
    </div>
  )
}

export default NotificationTable
