import Sidebar from '@/components/navBar/navbar'
import Header from '@/components/header/header'
import EspecialitiesTable from '@/components/especialities/especialities'

const Especialitiespage: React.FC = () => {
  return (
    <>
      <Header name="Usuário" email="email@exemplo.com" />
      <Sidebar imgSrc={''} />
      <EspecialitiesTable />
    </>
  )
}

export default Especialitiespage
