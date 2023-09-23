import { Link } from 'react-router-dom'
import './navBar.css'
import myImage from '/src/assets/img/Frame.png'

interface SidebarProps {
  imgSrc: string
}

const Sidebar: React.FC<SidebarProps> = ({}) => {
  const pages = [
    { name: 'Dashboard', icon: 'fa fa-chart-pie' },
    { name: 'Usuarios Cadastrados', icon: 'fa fa-users' },
    { name: 'Planos', icon: 'fa fa-credit-card' },
    { name: 'Pagamentos', icon: 'fa fa-money' },
    { name: 'Especialidades', icon: 'fa fa-stethoscope' },
    { name: 'Notificações', icon: 'fa fa-bell' },
    { name: 'FAQ', icon: 'fa fa-question-circle' }
  ]

  return (
    <div className="sidebar">
      <img src={myImage} alt="Top Image" />
      {pages.map((page, i) => (
        <Link key={i} to={`/${page.name.toLowerCase()}`}>
          <button>
            <i className={page.icon} style={{ marginRight: '8px' }}></i>{' '}
            {page.name}
          </button>
        </Link>
      ))}
    </div>
  )
}

export default Sidebar
