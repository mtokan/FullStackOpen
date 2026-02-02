import { useQuery } from '@apollo/client'
import { ALL_BOOKS, USER } from '../queries.js'

const Recommendations = (props) => {
  const { data: userData, loading: userLoading } = useQuery(USER)
  const genre = userData?.me?.favoriteGenre
  const { data: booksData, loading: booksLoading } = useQuery(ALL_BOOKS, {
    variables: { genre },
    skip: !genre,
  })

  if (!props.show) {
    return null
  }

  if (userLoading || (genre && booksLoading)) return <div>loading...</div>

  const books = booksData?.allBooks ?? []

  return (
    <div>
      <h2>Recommendations</h2>
      <p>books in your favorite genre {userData?.me?.favoriteGenre}</p>
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
    </div>
  )
}

export default Recommendations
