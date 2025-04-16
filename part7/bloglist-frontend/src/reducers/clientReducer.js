import { createSlice } from '@reduxjs/toolkit'
import clientService from '../services/user.js'

const clientSlice = createSlice({
  name: 'client',
  initialState: [],
  reducers: {
    setClients(state, action) {
      return action.payload
    },
    removeClientBlog(state, action) {
      return state.map((client) =>
        client.id === action.payload.clientId
          ? { ...client, blogs: client.blogs.filter((blog) => blog.id !== action.payload.blogId) }
          : client,
      )
    },
  },
})

export const { setClients, removeClientBlog } = clientSlice.actions

export const initializeClients = () => {
  return async (dispatch) => {
    const clients = await clientService.getAll()
    dispatch(setClients(clients))
  }
}

export default clientSlice.reducer
