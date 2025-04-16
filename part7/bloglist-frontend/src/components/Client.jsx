import { Link, useParams } from 'react-router'
import { useSelector } from 'react-redux'

const Client = () => {
  const id = useParams().id
  const clients = useSelector((state) => state.clients)
  const client = clients.find((client) => client.id === id)

  if (!clients) return <p>loading...</p>

  if (!client) return <p>client not found</p>

  return (
    <div>
      <h2>{client.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {client.blogs.map((blog) => (
          <li key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Client
