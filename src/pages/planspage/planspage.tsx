import Sidebar from '@/components/navBar/navbar'
import Header from '@/components/header/header'
import PlansTable from '@/components/plans/plans'

const Planspage: React.FC = () => {
  return (
    <>
      <Header name="Usuário" email="email@exemplo.com" />
      <Sidebar imgSrc={''} />
      <PlansTable />
    </>
  )
}

export default Planspage
