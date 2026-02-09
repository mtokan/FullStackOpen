import { useQuery } from '@apollo/client'
import { USER } from '../queries.js'

const Recommendations = (props) => {
  const { data: userData, loading: userLoading } = useQuery(USER)
  const genre = userData?.me?.favoriteGenre

  if (!props.show) {
    return null
  }
  if (userLoading || !genre) return <div>loading...</div>

  const books = props.books.filter((b) => b.genres.includes(genre))

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
