import Sidebar from '@/components/navBar/navbar'
import Header from '@/components/header/header'
import FaqTable from '@/components/faq/faq'

const Faqpage: React.FC = () => {
  return (
    <>
      <Header name="Usuário" email="email@exemplo.com" />
      <Sidebar imgSrc={''} />
      <FaqTable />
    </>
  )
}

export default Faqpage
