import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { useApolloClient, useQuery } from '@apollo/client'
import { ALL_AUTHORS } from './queries.js'
import LoginForm from './components/LoginForm.jsx'
import Recommendations from './components/Recommendations.jsx'

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('user-token'))
  const [page, setPage] = useState('authors')
  const client = useApolloClient()
  const onLogout = () => {
    localStorage.removeItem('user-token')
    setToken(null)
    client.resetStore()
    setPage('authors')
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token && <button onClick={() => setPage('add')}>add book</button>}
        {token && <button onClick={() => setPage('recommendations')}>recommendations</button>}
        {token && <button onClick={onLogout}>logout</button>}
        {!token && <button onClick={() => setPage('login')}>login</button>}
      </div>
      <Authors show={page === 'authors'} token={token} />
      <Books show={page === 'books'} />
      <NewBook show={page === 'add'} />
      <Recommendations show={page === 'recommendations'} />
      <LoginForm show={page === 'login'} setToken={setToken} setPage={setPage} client={client} />
    </div>
  )
}

export default App
