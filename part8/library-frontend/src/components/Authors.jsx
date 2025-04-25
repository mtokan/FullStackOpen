import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ALL_AUTHORS, UPDATE_AUTHOR } from '../queries.js'

const Authors = (props) => {
  const [name, setName] = useState('')
  const [birthyear, setBirthyear] = useState('')
  const [updateAuthor] = useMutation(UPDATE_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  })

  if (!props.show) {
    return null
  }
  const authors = props.authors

  const handleSubmit = async (event) => {
    event.preventDefault()
    await updateAuthor({ variables: { name, born: parseInt(birthyear) } })
    setBirthyear('')
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <h3>set birthyear</h3>
        <form onSubmit={handleSubmit}>
          <div>
            name
            <select value={name} onChange={({ target }) => setName(target.value)}>
              {authors.map((a) => (
                <option key={a.name} value={a.name}>
                  {a.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            born
            <input value={birthyear} onChange={({ target }) => setBirthyear(target.value)} />
          </div>
          <button type="submit">set birthyear</button>
        </form>
      </div>
    </div>
  )
}

export default Authors
