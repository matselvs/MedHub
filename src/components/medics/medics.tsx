import { useState, useEffect } from 'react'
import axios from 'axios'
import './medics.css'

type MedicsData = {
  total: number
  available: number
  unavailable: number
}

const MedicsContainer: React.FC = () => {
  const [medicsData, setMedicsData] = useState<MedicsData>({
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
          const { doctor } = response.data
          setMedicsData({
            total: doctor.total,
            available: doctor.available,
            unavailable: doctor.unavailable
          })
        })
        .catch(error => {
          console.error('There was an error!', error)
        })
    }
  }, [])

  return (
    <div id="medics-container">
      <h5>Médicos</h5>
      <div className="medics-container2">
        <div className="inner-medics-container1">
          <div className="color-ball">
            <img src="/src/assets/img/every-user.png" alt="" />
          </div>
          <div className="medics-info">
            <div className="medics-text">Total</div>
            <div className="medics-number">{medicsData.total}</div>
          </div>
        </div>
        <div className="inner-medics-container2">
          <div className="color-ball-2">
            <img src="/src/assets/img/every-user.png" alt="" />
          </div>
          <div className="medics-info">
            <div className="medics-text">Disponiveis</div>
            <div className="medics-number">{medicsData.available}</div>
          </div>
        </div>
        <div className="inner-medics-container3">
          <div className="color-ball-3">
            <img src="/src/assets/img/every-user.png" alt="" />
          </div>
          <div className="medics-info">
            <div className="medics-text">Indisponiveis</div>
            <div className="medics-number">{medicsData.unavailable}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MedicsContainer
