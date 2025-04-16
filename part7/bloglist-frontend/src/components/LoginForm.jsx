import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../reducers/userReducer.js'
import { Navigate, useNavigate } from 'react-router'
import { Button, Form } from 'react-bootstrap'

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
      <Form onSubmit={handleLogin}>
        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            name="username"
            onChange={({ target }) => setUsername(target.value)}
            value={username}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            onChange={({ target }) => setPassword(target.value)}
            value={password}
          />
        </Form.Group>
        <Button variant={'primary'} type={'submit'}>
          login
        </Button>
      </Form>
    </div>
  )
}

export default LoginForm
