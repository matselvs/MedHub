import { useState, useEffect } from 'react'
import axios from 'axios'
import './faq.css'

interface Faq {
  id: number
  title: string
  message: string
  type: string
}

const ITEMS_PER_PAGE = 8

const FaqTable: React.FC = () => {
  const [faq, setFaq] = useState<Faq[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(ITEMS_PER_PAGE)
  const [totalPages, setTotalPages] = useState(0)
  const [keyword, setKeyword] = useState('')
  const [selectedButton, setSelectedButton] = useState('Todos')
  const [totalDoctors, setTotalDoctors] = useState(0) // Novo estado para total de médicos
  const [totalContractors, setTotalContractors] = useState(0) // Novo estado para total de contratantes
  const [isContractorsSelected, setIsContractorsSelected] = useState(true)
  const [isDoctorsSelected, setIsDoctorsSelected] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    const axiosInstance = axios.create({
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    axiosInstance
      .get('https://api.buscarmedicos.izap.dev/questions')
      .then(response => {
        setFaq(response.data.content)
        setTotalPages(Math.ceil(response.data.totalElements / itemsPerPage))
      })
      .catch(error => {
        console.error('Erro ao buscar os dados:', error)
      })

    axiosInstance
      .get('https://api.buscarmedicos.izap.dev/users/count')
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
  }, [itemsPerPage])

  const handlePageChange = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber)
    }
  }

  const renderPageNumbers = () => {
    const pageNumbers = []

    for (let i = 1; i <= totalPages; i++) {
      const buttonClass =
        i === currentPage ? 'active-page-button' : 'page-button'

      pageNumbers.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={buttonClass}
          style={{
            backgroundColor: i === currentPage ? '#046639' : 'transparent',
            color: i === currentPage ? '#fff' : 'gray',
            border: 'none',
            width: '20px',
            cursor: 'pointer'
          }}
        >
          {i}
        </button>
      )
    }

    return pageNumbers
  }

  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const displayedFaq = faq.slice(startIndex, endIndex)

  return (
    <div>
      <h2 className="faqh2">FAQ (Perguntas Frequentes)</h2>
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
      <div className="faqTable">
        <div className="faqContainer">
          <div className="faq">
            <input
              type="text"
              value={keyword}
              onChange={e => setKeyword(e.target.value)}
              placeholder="Pesquisar palavra-chave"
            />
            <button className="filterButton">
              <img
                src="/static/images/filter.png"
                alt=""
                style={{
                  height: '20px',
                  width: '20px'
                }}
              />
            </button>
          </div>
          <div className="addfaq">
            <button>+ Nova FAQ</button>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>Título</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {displayedFaq.map((faqItem, index) => (
              <tr key={index}>
                <td>{faqItem.title}</td>
                <td>
                  <button className="action-button eye-button">
                    <i className="fas fa-eye"></i>
                  </button>
                  <button className="action-button pen-button">
                    <i className="fas fa-pen"></i>
                  </button>
                  <button className="action-button trash-button">
                    <i className="fas fa-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="especpagi">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            style={{
              backgroundColor: 'transparent',
              color: 'gray',
              border: 'none',
              width: '20px',
              cursor: 'pointer'
            }}
          >
            {'<'}
          </button>
          {renderPageNumbers()}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            style={{
              backgroundColor: 'transparent',
              color: 'gray',
              border: 'none',
              width: '20px',
              cursor: 'pointer'
            }}
          >
            {'>'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default FaqTable
