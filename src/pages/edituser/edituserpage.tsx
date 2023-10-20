import Sidebar from '@/components/navBar/navbar'
import Header from '@/components/header/header'
import EditUser from '@/components/edituser/edituser'

const editUserpage: React.FC = () => {
  return (
    <>
      <Header name="Usuário" email="email@exemplo.com" />
      <Sidebar imgSrc={''} />
      <EditUser />
    </>
  )
}

export default editUserpage
