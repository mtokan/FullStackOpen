import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { useQuery } from '@apollo/client'
import { ALL_AUTHORS, ALL_BOOKS } from './queries.js'

const App = () => {
  const [page, setPage] = useState('authors')
  const { data: authorsData, loading: authorsLoading } = useQuery(ALL_AUTHORS)
  const { data: booksData, loading: booksLoading } = useQuery(ALL_BOOKS)

  if (authorsLoading || booksLoading) return <div>loading...</div>

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>

      <Authors show={page === 'authors'} authors={authorsData ? authorsData.allAuthors : []} />

      <Books show={page === 'books'} books={booksData ? booksData.allBooks : []} />

      <NewBook show={page === 'add'} />
    </div>
  )
}

export default App
