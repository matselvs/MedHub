import '/src/pages/home/home.css'
import Sidebar from '@/components/navBar/navbar'
import Header from '@/components/header/header'

const Home: React.FC = () => {
  return (
    <>
      <Header name="Usuário" email="email@exemplo.com" />
      <Sidebar imgSrc={''} />
    </>
  )
}

export default Home
