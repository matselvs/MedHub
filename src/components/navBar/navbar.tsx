import { Link, useLocation } from 'react-router-dom'
import './navBar.css'
import myImage from '/src/assets/img/Frame.png'

interface SidebarProps {
  imgSrc: string
}

const Sidebar: React.FC<SidebarProps> = ({ imgSrc }) => {
  const location = useLocation()

  const pages = [
    { name: 'Dashboard', icon: 'fa fa-chart-pie', route: '/home' },
    { name: 'Usuarios Cadastrados', icon: 'fa fa-users', route: '/userspage' },
    { name: 'Planos', icon: 'fa fa-credit-card', route: '/planspage' },
    { name: 'Pagamentos', icon: 'fa fa-money' },
    {
      name: 'Especialidades',
      icon: 'fa fa-stethoscope',
      route: '/especialitiespage'
    },
    { name: 'Notificações', icon: 'fa fa-bell', route: '/notificationspage' },
    { name: 'FAQ', icon: 'fa fa-question-circle', route: '/faqpage' }
  ]

  return (
    <div className="sidebar">
      <img src={myImage} alt="Top Image" />
      {pages.map((page, i) => (
        <Link key={i} to={page.route || '/default'}>
          <button className={location.pathname === page.route ? 'active' : ''}>
            <i className={page.icon} style={{ marginRight: '8px' }}></i>{' '}
            {page.name}
          </button>
        </Link>
      ))}
    </div>
  )
}

export default Sidebar
