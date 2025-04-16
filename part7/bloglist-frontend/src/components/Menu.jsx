import { Link } from 'react-router'
import { logout } from '../reducers/userReducer.js'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from 'react-bootstrap'

const Menu = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  if (!user) return null

  const padding = {
    paddingRight: 5,
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    dispatch(logout())
  }

  return (
    <div>
      <Link style={padding} to="/">
        blogs
      </Link>
      <Link style={padding} to="/users">
        users
      </Link>
      <span style={padding}>{user?.name} logged in</span>
      <Button onClick={handleLogout}>logout</Button>
    </div>
  )
}

export default Menu
