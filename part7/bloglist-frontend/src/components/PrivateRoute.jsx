import { Navigate, Outlet } from 'react-router'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const PrivateRoute = () => {
  const [loading, setLoading] = useState(true)
  const user = useSelector((state) => state.user)

  useEffect(() => {
    if (user !== undefined) setLoading(false)
  }, [user])

  if (loading) {
    return <p>loading...</p>
  }

  if (user === null) {
    return <Navigate to={'/login'} />
  }

  return <Outlet />
}

export default PrivateRoute
