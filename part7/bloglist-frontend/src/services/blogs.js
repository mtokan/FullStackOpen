import axios from 'axios'

const baseUrl = '/api/blogs'
let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const config = { headers: { Authorization: token } }
  const request = axios.get(baseUrl, config)
  return request.then((response) => response.data)
}

const createBlog = async (newBlog) => {
  const config = { headers: { Authorization: token } }
  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const updateBlog = async (id, changedData) => {
  const config = { headers: { Authorization: token } }
  const response = await axios.put(`${baseUrl}/${id}`, changedData, config)
  return response.status
}

const deleteBlog = async (id) => {
  const config = { headers: { Authorization: token } }
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.status
}

const createComment = async (id, comment) => {
  const config = { headers: { Authorization: token } }
  const response = await axios.post(`${baseUrl}/${id}/comments`, comment, config)
  return response.data
}

export default { getAll, createBlog, setToken, updateBlog, deleteBlog, createComment }
