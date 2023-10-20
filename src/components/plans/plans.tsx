import { useState } from 'react'
import Switch from 'react-switch'
import './plans.css'

interface PlansUser {
  tipoDeUsuario: string
  Plans: string
  prices: string
  promotional: string
  situation: boolean
  actions: string
}

const PlansTable: React.FC = () => {
  const [plans, setPlans] = useState<PlansUser[]>([
    {
      Plans: 'Mensal',
      prices: 'R$ 100.00',
      promotional: 'R$ 98,00',
      situation: true,
      actions: '***',
      tipoDeUsuario: 'Médico'
    },
    {
      Plans: 'Trimestral',
      prices: 'R$ 200.00',
      promotional: 'R$ 198.00',
      situation: true,
      actions: '***',
      tipoDeUsuario: 'Médico'
    },
    {
      Plans: 'Anual',
      prices: 'R$ 300.00',
      promotional: '--',
      situation: true,
      actions: '***',
      tipoDeUsuario: 'Contratante'
    }
  ])

  const [currentPage, setCurrentPage] = useState(0)
  const [keyword, setKeyword] = useState('')
  const [selectedButton, setSelectedButton] = useState('Todos')

  const handleButton2Click = () => {
    setSelectedButton('Contratantes')
  }

  const handleButton3Click = () => {
    setSelectedButton('Medicos')
  }

  let displayedplans = plans
  if (selectedButton === 'Contratantes') {
    displayedplans = plans.filter(user => user.tipoDeUsuario === 'Contratante')
  } else if (selectedButton === 'Medicos') {
    displayedplans = plans.filter(user => user.tipoDeUsuario === 'Médico')
  }

  const totalMedicos = plans.filter(
    user => user.tipoDeUsuario === 'Médico'
  ).length
  const totalContratantes = plans.filter(
    user => user.tipoDeUsuario === 'Contratante'
  ).length

  const handleSituationChange = (index: number) => {
    const newPlans = [...plans]
    newPlans[index].situation = !newPlans[index].situation
    setPlans(newPlans)
  }

  return (
    <>
      <h2 className="Plansh2">Planos</h2>
      <div className="buttonContainer">
        <button
          onClick={handleButton2Click}
          className={selectedButton === 'Contratantes' ? 'selected' : ''}
        >
          Contratantes <span className="userCount">{totalContratantes}</span>
        </button>
        <button
          onClick={handleButton3Click}
          className={selectedButton === 'Medicos' ? 'selected' : ''}
        >
          Médicos <span className="userCount">{totalMedicos}</span>
        </button>
      </div>
      <div className="PlansTable">
        <div className="PlansContainer">
          <div className="Plans">
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
          <div className="addplans">
            <button>+ Novo Plano</button>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Valor</th>
              <th>Preço promocional</th>
              <th>Situação</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {displayedplans.map((user, index) => (
              <tr key={index}>
                <td>{user.Plans}</td>
                <td>{user.prices}</td>
                <td>{user.promotional}</td>
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
      </div>
    </>
  )
}

export default PlansTable
