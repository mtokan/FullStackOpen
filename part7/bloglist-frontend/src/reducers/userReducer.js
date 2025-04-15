import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login.js'
import { setNotification } from './notificationReducer.js'
import blogService from '../services/blogs.js'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload
    },
    removeUser(state, action) {
      return null
    },
  },
})

export const { setUser, removeUser } = userSlice.actions

export const login = (credentials) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login(credentials)
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch(setUser(user))
      dispatch(setNotification({ text: 'Logged in successfully.', color: 'green' }, 5))
      return true
    } catch (error) {
      dispatch(setNotification({ text: error.response.data.error, color: 'red' }, 5))
      return false
    }
  }
}

export const checkLoggedUser = () => {
  return (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }
}

export const logout = () => {
  return (dispatch) => {
    try {
      window.localStorage.removeItem('loggedUser')
      blogService.setToken(null)
      dispatch(removeUser())
      dispatch(setNotification({ text: 'logged out successfully.', color: 'green' }, 5))
    } catch (error) {
      dispatch(setNotification({ text: error.response.data.error, color: 'red' }, 5))
    }
  }
}

export default userSlice.reducer
