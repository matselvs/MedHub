import { useState, useEffect } from 'react'
import './edituser.css'
import axios from 'axios'

const EditUser: React.FC = () => {
  const [activeButton, setActiveButton] = useState<string>('Dados')
  const [user, setUser] = useState<{ name: string; email: string }>({
    name: '',
    email: ''
  })
  const [isEditingName, setIsEditingName] = useState(false)
  const [isEditingEmail, setIsEditingEmail] = useState(false)
  const [profiles, setProfiles] = useState<any[]>([]) // Para armazenar os perfis fictícios

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      axios
        .get('https://api.buscarmedicos.izap.dev/me', {
          headers: { Authorization: token }
        })
        .then(response => {
          const fullName =
            response.data.firstName + ' ' + response.data.lastName
          setUser({ name: fullName, email: response.data.email })
        })
        .catch(error => {
          console.error('There was an error!', error)
        })
    }
  }, [])

  const handleSalvar = (buttonName: string) => {
    setActiveButton(buttonName)
  }

  const handleEditName = () => {
    setIsEditingName(true)
  }

  const handleEditEmail = () => {
    setIsEditingEmail(true)
  }

  const handleSaveName = () => {
    setIsEditingName(false)
  }

  const handleSaveEmail = () => {
    setIsEditingEmail(false)
  }

  const handleEditProfile = (index: number) => {}

  const handleDeleteProfile = (index: number) => {}

  const mockProfiles = [
    { name: <b>Usuário 1</b>, email: 'usuario1@email.com' },
    { name: <b>Usuário 2</b>, email: 'usuario2@email.com' },
    { name: <b>Usuário 3</b>, email: 'usuario3@email.com' }
  ]

  return (
    <div>
      <div className="editUserContainer">
        <h2 className="editUserTitle">Edição de perfil</h2>
        <button
          className={`editUserButton ${
            activeButton === 'Dados' ? 'activeButton' : ''
          }`}
          onClick={() => handleSalvar('Dados')}
        >
          Dados <span className="chevron">&gt;</span>
        </button>
        <button
          className={`editUserButton ${
            activeButton === 'Senha' ? 'activeButton' : ''
          }`}
          onClick={() => handleSalvar('Senha')}
        >
          Alterar senha <span className="chevron">&gt;</span>
        </button>
        <button
          className={`editUserButton ${
            activeButton === 'Admin' ? 'activeButton' : ''
          }`}
          onClick={() => handleSalvar('Admin')}
        >
          Administrar perfis <span className="chevron">&gt;</span>
        </button>
      </div>

      {activeButton === 'Admin' && (
        <div className="userInfoContainer">
          <h2 className="userInfoTitle">Administrar Perfis</h2>
          <table className="userInfoTable">
            <thead></thead>
            <tbody>
              {mockProfiles.map((profile, index) => (
                <tr key={index}>
                  <td>{profile.name}</td>
                  <td>{profile.email}</td>
                  <td>
                    <button
                      className="editButton"
                      onClick={() => handleEditProfile(index)}
                    >
                      <i className="fas fa-pen"></i>
                    </button>
                    <button
                      className="deleteButton"
                      onClick={() => handleDeleteProfile(index)}
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className="addnewprofile">+ Novo Perfil</button>
        </div>
      )}

      {activeButton !== 'Admin' && (
        <div className="userInfoContainer">
          <h2 className="userInfoTitle">Dados</h2>
          <table className="userInfoTable">
            <tbody>
              <tr>
                <td>
                  <b>Nome:</b>
                </td>
                <td>
                  {isEditingName ? (
                    <div>
                      <input
                        type="text"
                        value={user.name}
                        onChange={e =>
                          setUser({ ...user, name: e.target.value })
                        }
                      />
                      <button onClick={handleSaveName}>OK</button>
                    </div>
                  ) : (
                    user.name
                  )}
                </td>
                <td>
                  {!isEditingName && (
                    <button className="editButton" onClick={handleEditName}>
                      <i className="fas fa-pen"></i>
                    </button>
                  )}
                </td>
              </tr>
              <tr>
                <td>
                  <b>Email:</b>
                </td>
                <td>
                  {isEditingEmail ? (
                    <div>
                      <input
                        type="text"
                        value={user.email}
                        onChange={e =>
                          setUser({ ...user, email: e.target.value })
                        }
                      />
                      <button onClick={handleSaveEmail}>OK</button>
                    </div>
                  ) : (
                    user.email
                  )}
                </td>
                <td>
                  {!isEditingEmail && (
                    <button className="editButton" onClick={handleEditEmail}>
                      <i className="fas fa-pen"></i>
                    </button>
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default EditUser
