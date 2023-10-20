import '/src/pages/home/home.css'
import { useEffect, useState } from 'react'
import Sidebar from '@/components/navBar/navbar'
import Header from '@/components/header/header'
import WelcomeBox from '@/components/welcome/welcome'
import MedicsContainer from '@/components/medics/medics'
import ContractorsContainer from '@/components/contractors/contractors'
import UserTable from '@/components/RegisteredUsers/RegisteredUsers'

const Home: React.FC = () => {
  const [user, setUser] = useState({ name: '', email: '' })

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])
  return (
    <>
      <MedicsContainer />
      <ContractorsContainer />
      <Header name={user.name} email={user.email} />
      <Sidebar imgSrc={''} />
      <WelcomeBox />
      <UserTable />
    </>
  )
}

export default Home
