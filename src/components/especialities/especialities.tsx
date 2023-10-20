import { useState } from 'react'
import Switch from 'react-switch'
import './especialities.css'

interface Especialitiestipe {
  tipoDeUsuario: string
  Especialities: string
  situation: boolean
  actions: string
}

const ITEMS_PER_PAGE = 8

const EspecialitiesTable: React.FC = () => {
  const [especialities, setEspecialities] = useState<Especialitiestipe[]>([
    {
      Especialities: 'Odontologia',
      situation: true,
      actions: '***',
      tipoDeUsuario: 'Médico'
    },
    {
      Especialities: 'Psicologia',
      situation: true,
      actions: '***',
      tipoDeUsuario: 'Médico'
    },
    {
      Especialities: 'Pediatra',
      situation: true,
      actions: '***',
      tipoDeUsuario: 'Contratante'
    },
    {
      Especialities: 'Pediatra',
      situation: true,
      actions: '***',
      tipoDeUsuario: 'Contratante'
    },
    {
      Especialities: 'Pediatra',
      situation: true,
      actions: '***',
      tipoDeUsuario: 'Contratante'
    },
    {
      Especialities: 'Pediatra',
      situation: true,
      actions: '***',
      tipoDeUsuario: 'Contratante'
    },
    {
      Especialities: 'Pediatra',
      situation: true,
      actions: '***',
      tipoDeUsuario: 'Contratante'
    },
    {
      Especialities: 'Pediatra',
      situation: true,
      actions: '***',
      tipoDeUsuario: 'Contratante'
    },
    {
      Especialities: 'Pediatra',
      situation: true,
      actions: '***',
      tipoDeUsuario: 'Contratante'
    }
  ])

  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(8)
  const [totalPages, setTotalPages] = useState(
    Math.ceil(especialities.length / itemsPerPage)
  )
  const [keyword, setKeyword] = useState('')
  const [selectedButton, setSelectedButton] = useState('Todos')

  const handleButton2Click = () => {
    setSelectedButton('Contratantes')
  }

  const handleButton3Click = () => {
    setSelectedButton('Medicos')
  }

  let displayedespecialities = especialities.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )
  if (selectedButton === 'Contratantes') {
    displayedespecialities = especialities.filter(
      user => user.tipoDeUsuario === 'Contratante'
    )
  } else if (selectedButton === 'Medicos') {
    displayedespecialities = especialities.filter(
      user => user.tipoDeUsuario === 'Médico'
    )
  }

  const totalMedicos = especialities.filter(
    user => user.tipoDeUsuario === 'Médico'
  ).length
  const totalContratantes = especialities.filter(
    user => user.tipoDeUsuario === 'Contratante'
  ).length

  const handleSituationChange = (index: number) => {
    const newespecialities = [...especialities]
    newespecialities[index].situation = !newespecialities[index].situation
    setEspecialities(newespecialities)
  }

  const handlePageChange = (event: React.MouseEvent, pageNumber: number) => {
    event.preventDefault()
    setCurrentPage(pageNumber)
  }

  const renderPageNumbers = () => {
    const pageNumbers = []
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button key={i} onClick={event => handlePageChange(event, i)}>
          {i}
        </button>
      )
    }
    return pageNumbers
  }

  return (
    <>
      <h2 className="especialitiesh2">Especialidades</h2>

      <div className="especialitiesTable">
        <div className="especialitiesContainer">
          <div className="especialities">
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
                src="/static/images/filter.png"
                alt=""
                style={{ height: '15px', width: '15px' }}
              />
            </button>
          </div>
          <div className="addespecialities">
            <button>+ Nova Especialidade</button>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>Nome da Especialidade</th>
              <th>Situação</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {displayedespecialities.map((user, index) => (
              <tr key={index}>
                <td>{user.Especialities}</td>
                <td>
                  <div style={{ margin: '10px' }}>
                    <Switch
                      checked={user.situation}
                      onChange={() => handleSituationChange(index)}
                      offColor="#808080"
                      onColor="#00C247"
                      height={20}
                      width={48}
                      handleDiameter={18}
                      uncheckedIcon={false}
                      checkedIcon={true}
                    />
                  </div>
                </td>
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
        <div className="especpagi">{renderPageNumbers()}</div>
      </div>
    </>
  )
}

export default EspecialitiesTable
