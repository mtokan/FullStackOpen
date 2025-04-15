import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../reducers/userReducer.js'
import { Navigate, useNavigate } from 'react-router'

const LoginForm = () => {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  if (user) return <Navigate to={'/'} replace />

  const handleLogin = async (event) => {
    event.preventDefault()
    const isSuccess = await dispatch(login({ username, password }))
    if (isSuccess) navigate('/')
    setUsername('')
    setPassword('')
  }

  return (
    <div>
      <h2>login to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            data-testid="username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            data-testid="password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm
