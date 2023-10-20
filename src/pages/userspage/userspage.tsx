import Sidebar from '@/components/navBar/navbar'
import Header from '@/components/header/header'
import FilterTable from '@/components/usersfilter/userfilter'

const UsersPage: React.FC = () => {
  return (
    <>
      <Header name="Usuário" email="email@exemplo.com" />
      <Sidebar imgSrc={''} />
      <FilterTable />
    </>
  )
}

export default UsersPage
