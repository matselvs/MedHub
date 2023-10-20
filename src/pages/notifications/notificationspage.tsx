import Sidebar from '@/components/navBar/navbar'
import Header from '@/components/header/header'
import NotificationTable from '@/components/notifications/notifications'

const notificationpage: React.FC = () => {
  return (
    <>
      <Header name="Usuário" email="email@exemplo.com" />
      <Sidebar imgSrc={''} />
      <NotificationTable />
    </>
  )
}

export default notificationpage
