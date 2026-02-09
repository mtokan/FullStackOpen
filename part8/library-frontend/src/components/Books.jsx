import { useQuery } from '@apollo/client'
import { ALL_GENRES } from '../queries.js'
import { useState } from 'react'

const Books = (props) => {
  const [genre, setGenre] = useState('')
  const { data: genresData, loading: genresLoading } = useQuery(ALL_GENRES)

  if (!props.show) {
    return null
  }

  if (!genresData || genresLoading) return <div>loading...</div>

  let books = props.books
  const genres = genresData.allGenres

  if (genre) books = books.filter((b) => b.genres.includes(genre))

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
