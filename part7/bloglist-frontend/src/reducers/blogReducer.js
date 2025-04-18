import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs.js'
import { setNotification } from './notificationReducer.js'
import { removeClientBlog } from './clientReducer.js'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    addBlog(state, action) {
      state.push(action.payload)
    },
    changeBlog(state, action) {
      return state.map((blog) => (blog.id === action.payload.id ? { ...blog, ...action.payload.data } : blog))
    },
    removeBlog(state, action) {
      return state.filter((blog) => blog.id !== action.payload)
    },
    addComment(state, action) {
      return state.map((blog) =>
        blog.id === action.payload.id
          ? {
              ...blog,
              comments: [...blog.comments, action.payload.comment],
            }
          : blog,
      )
    },
  },
})

export const { setBlogs, addBlog, changeBlog, removeBlog, addComment } = blogSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createComment = (id, comment, user) => {
  return async (dispatch) => {
    try {
      blogService.setToken(user.token)
      const newComment = await blogService.createComment(id, comment)
      dispatch(addComment({ id: id, comment: newComment }))
    } catch (error) {
      dispatch(setNotification({ text: error.response.data.error, color: 'red' }, 5))
    }
  }
}

export const createBlog = (blog, user) => {
  return async (dispatch) => {
    try {
      blogService.setToken(user.token)
      const createdBlog = await blogService.createBlog(blog)
      dispatch(addBlog(createdBlog))
      dispatch(setNotification({ text: 'blog created successfully.', color: 'green' }, 5))
    } catch (error) {
      dispatch(setNotification({ text: error.response.data.error, color: 'red' }, 5))
    }
  }
}

export const updateBlog = (id, changedData, user) => {
  return async (dispatch) => {
    try {
      blogService.setToken(user.token)
      await blogService.updateBlog(id, changedData)
      dispatch(changeBlog({ data: changedData, id: id }))
      dispatch(setNotification({ text: 'blog updated successfully.', color: 'green' }, 5))
    } catch (error) {
      dispatch(setNotification({ text: error.response.data.error, color: 'red' }, 5))
    }
  }
}

export const deleteBlog = (blog, user) => {
  return async (dispatch) => {
    try {
      blogService.setToken(user.token)
      await blogService.deleteBlog(blog.id)
      dispatch(removeBlog(blog.id))
      dispatch(removeClientBlog({ clientId: blog.user.id, blogId: blog.id }))
      dispatch(setNotification({ text: 'blog deleted successfully.', color: 'green' }, 5))
    } catch (error) {
      dispatch(setNotification({ text: error.response.data.error, color: 'red' }, 5))
    }
  }
}

export default blogSlice.reducer
