import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { useApolloClient, useQuery, useSubscription } from '@apollo/client'
import LoginForm from './components/LoginForm.jsx'
import Recommendations from './components/Recommendations.jsx'
import { ALL_BOOKS, BOOK_ADDED } from './queries.js'
import { addBooktoCache } from './utils/apolloCache.js'

const App = () => {
  const { data: booksData, loading: booksLoading } = useQuery(ALL_BOOKS)
  const [token, setToken] = useState(localStorage.getItem('user-token'))
  const [page, setPage] = useState('authors')
  const client = useApolloClient()
  const onLogout = () => {
    localStorage.removeItem('user-token')
    setToken(null)
    client.resetStore()
    setPage('authors')
  }

  useSubscription(BOOK_ADDED, {
    onData: ({ data: { data } }) => {
      addBooktoCache(client.cache, data.bookAdded)
      window.alert(`New book ${data.bookAdded.title} added!`)
    },
  })

  if (!booksData || booksLoading) return <div>loading...</div>

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
      <Books show={page === 'books'} books={booksData.allBooks} />
      <NewBook show={page === 'add'} />
      <Recommendations show={page === 'recommendations'} books={booksData.allBooks} />
      <LoginForm show={page === 'login'} setToken={setToken} setPage={setPage} client={client} />
    </div>
  )
}

export default App
