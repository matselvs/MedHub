import { useState, useEffect } from 'react'
import axios from 'axios'
import './contractors.css'

type ContractorsData = {
  total: number
  available: number
  unavailable: number
}

const ContractorsContainer: React.FC = () => {
  const [contractorsData, setContractorsData] = useState<ContractorsData>({
    total: 0,
    available: 0,
    unavailable: 0
  })

  useEffect(() => {
    const token = localStorage.getItem('token')

    if (token) {
      axios
        .get('https://api.buscarmedicos.izap.dev/users/dashboard', {
          headers: { Authorization: `Bearer ${token}` }
        })
        .then(response => {
          const { contractor } = response.data
          setContractorsData({
            total: contractor.total,
            available: contractor.available,
            unavailable: contractor.unavailable
          })
        })
        .catch(error => {
          console.error('There was an error!', error)
        })
    }
  }, [])

  return (
    <div id="contractors-container">
      <h5>Contrantes</h5>
      <div className="contractors-container2">
        <div className="inner-contractors-container1">
          <div className="contractors-color-ball">
            <img src="/static/images/people-search-one.png" alt="" />
          </div>
          <div className="contractors-info">
            <div className="contractors-text">Total</div>
            <div className="contractors-number">{contractorsData.total}</div>
          </div>
        </div>
        <div className="inner-contractors-container2">
          <div className="contractors-color-ball-2">
            <img src="/static/images/people-search-one.png" alt="" />
          </div>
          <div className="contractors-info">
            <div className="contractors-text">Disponiveis</div>
            <div className="contractors-number">
              {contractorsData.available}
            </div>
          </div>
        </div>
        <div className="inner-contractors-container3">
          <div className="contractors-color-ball-3">
            <img src="/static/images/people-search-one.png" alt="" />
          </div>
          <div className="contractors-info">
            <div className="contractors-text">Indisponiveis</div>
            <div className="contractors-number">
              {contractorsData.unavailable}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContractorsContainer
