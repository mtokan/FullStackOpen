import { useSelector } from 'react-redux'
import { Link } from 'react-router'
import { Table } from 'react-bootstrap'

const ClientList = () => {
  const clients = useSelector((state) => state.clients)

  const style = {
    paddingRight: 20,
  }

  return (
    <div>
      <Table striped>
        <thead>
          <tr>
            <th>Users</th>
            <th>Blogs created</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr key={client.id}>
              <td style={style}>
                <Link to={`/users/${client.id}`}>{client.name}</Link>
              </td>
              <td style={style}>{client.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default ClientList
