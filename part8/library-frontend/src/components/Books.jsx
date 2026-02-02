import { useQuery } from '@apollo/client'
import { ALL_BOOKS, ALL_GENRES } from '../queries.js'
import { useState } from 'react'

const Books = (props) => {
  const [genre, setGenre] = useState('')
  const { data: genresData, loading: genresLoading } = useQuery(ALL_GENRES)
  const { data: booksData, loading: booksLoading } = useQuery(ALL_BOOKS, {
    variables: { genre },
    pollInterval: 5000,
    fetchPolicy: 'cache-and-network',
  })

  if (!props.show) {
    return null
  }
  if (!booksData || !genresData || booksLoading || genresLoading) return <div>loading...</div>
  const books = booksData.allBooks
  const genres = genresData.allGenres

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {genres.map((g) => (
          <button key={g} onClick={() => setGenre(g)}>
            {g}
          </button>
        ))}
        <button onClick={() => setGenre('')}>All genres</button>
      </div>
    </div>
  )
}

export default Books
