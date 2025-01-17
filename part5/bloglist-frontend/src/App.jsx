import {useEffect, useRef, useState} from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm.jsx'
import BlogForm from './components/BlogForm.jsx'
import NotificationBanner from './components/NotificationBanner.jsx'
import Toggleable from './components/Toggleable.jsx'

const App = () => {
    const [notification, setNotification] = useState({text: '', color: '', displayStatus: false})
    const [blogs, setBlogs] = useState([])
    const [user, setUser] = useState(null)
    const blogFormRef = useRef()
    
    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])
    
    useEffect(() => {
        if (user)
            blogService.getAll().then(blogs => setBlogs(blogs))
    }, [user])
    
    const showNotification = (text, color) => {
        setNotification({text, color, displayStatus: true})
        setTimeout(() => {
            setNotification({text: '', color: '', displayStatus: false})
        }, 5000)
    }
    
    const login = async credentials => {
        try {
            const user = await loginService.login(credentials)
            window.localStorage.setItem('loggedUser', JSON.stringify(user))
            blogService.setToken(user.token)
            setUser(user)
            showNotification('logged in successfully.', 'green')
        } catch (error) {
            showNotification(error.response.data.error, 'red')
            console.log(error)
        }
    }
    
    const handleLogout = async (event) => {
        event.preventDefault()
        
        try {
            window.localStorage.removeItem('loggedUser')
            blogService.setToken(null)
            setUser(null)
            showNotification('logged out successfully.', 'green')
        } catch (error) {
            showNotification('logout error', 'red')
            console.log(error)
        }
    }
    
    const createBlog = async newBlog => {
        try {
            blogService.setToken(user.token)
            const createdBlog = await blogService.createBlog(newBlog)
            setBlogs([...blogs, {...createdBlog, user: user}])
            blogFormRef.current.toggleVisibility()
            showNotification('blog created successfully.', 'green')
        } catch (error) {
            showNotification(error.response.data.error, 'red')
            console.log(error)
        }
    }
    
    const updateBlog = async (effectedBlog, changedData) => {
        try {
            blogService.setToken(user.token)
            await blogService.updateBlog(effectedBlog.id, changedData)
            const updatedBlog = {...effectedBlog, ...changedData}
            setBlogs(blogs.map(blog => blog.id === effectedBlog.id ? updatedBlog : blog))
        } catch (error) {
            console.log(error)
        }
    }
    
    const deleteBlog = async id => {
        try {
            blogService.setToken(user.token)
            await blogService.deleteBlog(id)
            setBlogs(blogs.filter(blog => blog.id !== id))
        } catch (error) {
            console.log(error)
        }
    }
    
    return (
        <div>
            <NotificationBanner {...notification} />
            {user === null ? <LoginForm login={login}/>
                : (
                    <>
                        <div>
                            <h2>blogs</h2>
                            <div>
                                <p>
                                    {user.name} logged in
                                    <button type="button" onClick={handleLogout}>logout</button>
                                </p>
                            </div>
                            <Toggleable buttonLabel="new blog" ref={blogFormRef}>
                                <BlogForm createBlog={createBlog}/>
                            </Toggleable>
                            {
                                blogs
                                    .toSorted((firstBlog, secondBlog) => secondBlog.likes - firstBlog.likes)
                                    .map(blog => <Blog
                                        key={blog.id}
                                        blog={blog}
                                        updateBlog={updateBlog}
                                        deleteBlog={deleteBlog}
                                        user={user}/>)
                            }
                        </div>
                    </>
                )}
        </div>
    )
}

export default App