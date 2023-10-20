import { useState } from 'react'
import { AxiosResponse, AxiosError } from 'axios'
import './index.css'
import api from '@/services/api'

interface LoginApi {
  token: string
}

const isAxiosError = (error: any): error is AxiosError => {
  return error.isAxiosError
}

export const LoginPost = async (
  email: string,
  password: string
): Promise<string | undefined> => {
  try {
    const userData: AxiosResponse<LoginApi> = await api.post(
      `public/register/login?email=${email}&password=${password}`,
      { email, password }
    )
    const token = userData.data.token
    localStorage.setItem('token', token)
    return token
  } catch (error) {
    if (isAxiosError(error)) {
      if (error.response?.status === 404) {
        return 'usuario não encontrado'
      }
      if (error.response?.status === 401) {
        return 'senha incorreta'
      }
    }
  }
}

interface LoginProps {
  onLogin: (email: string, password: string) => void
}

const LoginForm: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [showPassword] = useState(false)
  const [invalidInput, setInvalidInput] = useState(false)
  const [emailFilled, setEmailFilled] = useState(false)
  const [passwordFilled, setPasswordFilled] = useState(false)

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    try {
      const response = await LoginPost(email, password)

      if (response) {
        localStorage.setItem('token', response)
        window.location.href = '/home'
      } else {
        // Exibe um alerta quando os dados de login são inválidos
        window.alert('Dados inválidos')
        // Define o estado para indicar que a entrada é inválida
        setInvalidInput(true)
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="background-image">
      <div className="login-container">
        <p>Seja bem-vindo(a)!</p>
        <h2>Realize seu Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className={`email-label ${emailFilled ? 'filled' : ''}`}>
              E-mail
            </label>
            <input
              type="email"
              value={email}
              onChange={e => {
                setEmail(e.target.value)
                setEmailFilled(!!e.target.value)
              }}
              placeholder="Email"
              required
              className={emailFilled ? 'filled' : ''}
            />
          </div>
          <div className="form-group">
            <label
              className={`password-label ${passwordFilled ? 'filled' : ''}`}
            >
              Senha
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={e => {
                setPassword(e.target.value)
                setPasswordFilled(!!e.target.value)
              }}
              placeholder="Insira sua Senha"
              required
              className={passwordFilled ? 'filled' : ''}
            />
          </div>

          <div>
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={e => setRememberMe(e.target.checked)}
            />
            <label>Lembrar-me</label>
            <a href="/forgot-password" className="forgotPassword">
              Esqueci minha senha
            </a>
          </div>
          <button className="Loginbutton" type="submit">
            Entrar
          </button>
        </form>
      </div>
    </div>
  )
}

export default LoginForm
