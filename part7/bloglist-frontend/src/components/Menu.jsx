import { Link } from 'react-router'
import { logout } from '../reducers/userReducer.js'
import { useDispatch, useSelector } from 'react-redux'

const Menu = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  const padding = {
    paddingRight: 5,
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    dispatch(logout())
  }

  return (
    <div style={{ backgroundColor: 'lightgrey', padding: '5px' }}>
      <Link style={padding} to="/">
        blogs
      </Link>
      <Link style={padding} to="/">
        users
      </Link>
      <span style={padding}>{user?.name} logged in</span>
      <button onClick={handleLogout}>logout</button>
    </div>
  )
}

export default Menu
