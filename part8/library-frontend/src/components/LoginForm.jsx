import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../queries.js'

const LoginForm = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [login] = useMutation(LOGIN, {
    onCompleted: (data) => {
      const token = data.login.value
      props.setToken(token)
      localStorage.setItem('user-token', token)
      props.client.resetStore()
      props.setPage('authors')
    },
    onError: (error) => {
      console.error('login mutation error', error)
    },
  })

  if (!props.show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()
    await login({ variables: { username, password } })
  }

  return (
    <form onSubmit={submit}>
      <div>
        name
        <input
          type="text"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
          placeholder="Username"
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          placeholder="Password"
        />
      </div>
      <button type="submit">Login</button>
    </form>
  )
}

export default LoginForm
