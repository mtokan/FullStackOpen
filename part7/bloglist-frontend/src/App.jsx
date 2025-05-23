import { useEffect } from 'react'
import LoginForm from './components/LoginForm.jsx'
import NotificationBanner from './components/NotificationBanner.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer.js'
import { checkLoggedUser } from './reducers/userReducer.js'
import BlogList from './components/BlogList.jsx'
import Menu from './components/Menu.jsx'
import { Route, Routes } from 'react-router'
import Blog from './components/Blog.jsx'
import PrivateRoute from './components/PrivateRoute.jsx'
import { initializeClients } from './reducers/clientReducer.js'
import ClientList from './components/ClientList.jsx'
import Client from './components/Client.jsx'

const App = () => {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(checkLoggedUser())
  }, [dispatch])

  useEffect(() => {
    if (user) {
      dispatch(initializeBlogs())
      dispatch(initializeClients())
    }
  }, [dispatch, user])

  if (user === undefined) return <div>Loading...</div>

  return (
    <div className="container">
      <NotificationBanner />
      <Menu />
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<BlogList />} />
          <Route path="/blogs/:id" element={<Blog />} />
          <Route path="/users" element={<ClientList />} />
          <Route path="/users/:id" element={<Client />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
