import { useEffect, useState } from 'react'
import './welcome.css'

const welcomeBox: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date())
    }, 1000)
    return () => {
      clearInterval(timer)
    }
  }, [])

  return (
    <>
      <div className="welcome-container">
        <h3 className="welcomeMessage">Seja bem vinda!</h3>
        <p className="small-font">
          Neste painel voce poderá administrar seu site de forma simples e
          pratica.
        </p>
        <p className="date-container">
          <i className="fa fa-calendar"></i>

          {currentDate.toLocaleDateString()}
        </p>
      </div>
      <div className="inner-container"></div>
      <div className="image-girl">
        <img src="/src/assets/img/Ã‘Ã«Ã®Ã©_1.png" alt="" />
      </div>
    </>
  )
}

export default welcomeBox
