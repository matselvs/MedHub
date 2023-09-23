import { useState } from 'react'
import './index.css'

interface LoginProps {
  onLogin: (email: string, password: string) => void
}

const LoginForm: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [isEmailFilled, setIsEmailFilled] = useState(false)
  const [isPasswordFilled, setIsPasswordFilled] = useState(false)

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    onLogin(email, password)
  }

  return (
    <div className="container">
      <p>Seja bem-vindo(a)!</p>
      <h2>Realize seu Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={e => {
            setEmail(e.target.value)
            setIsEmailFilled(e.target.value !== '')
          }}
          placeholder="Email"
          className={`email-input ${isEmailFilled ? 'filled' : ''}`}
          required
        />
        <input
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={e => {
            setPassword(e.target.value)
            setIsPasswordFilled(e.target.value !== '')
          }}
          placeholder="Senha"
          className={`password-input ${isPasswordFilled ? 'filled' : ''}`}
          required
        />
        <div>
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={e => setRememberMe(e.target.checked)}
          />
          <label>Lembrar-me</label>
          <a href="/forgot-password">Esqueci minha senha</a>
        </div>
        <button className="Loginbutton" type="submit">
          Entrar
        </button>
      </form>
    </div>
  )
}

export default LoginForm
