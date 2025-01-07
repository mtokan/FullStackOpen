import axios from 'axios'

const baseUrl = '/api/blogs'
let token = null

const setToken = newToken => {
    token = `Bearer ${newToken}`
}

const getAll = () => {
    const config = {headers: {Authorization: token}}
    const request = axios.get(baseUrl, config)
    return request.then(response => response.data)
}

const createBlog = async (newBlog) => {
    console.log(newBlog)
    const config = {headers: {Authorization: token}}
    const response = await axios.post(baseUrl, newBlog, config)
    return response.status
}

export default {getAll, createBlog, setToken}