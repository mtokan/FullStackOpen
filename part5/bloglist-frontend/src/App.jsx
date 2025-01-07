import {useEffect, useState} from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
    const [notification, setNotification] = useState(null)
    const [blogs, setBlogs] = useState([])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [blogTitle, setBlogTitle] = useState('')
    const [blogAuthor, setBlogAuthor] = useState('')
    const [blogUrl, setBlogUrl] = useState('')
    const [user, setUser] = useState(null)

    useEffect(() => {
        if (user) blogService.getAll().then(blogs => setBlogs(blogs))
    }, [user])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    const showNotification = (text, color) => {
        setNotification({text, color})
        setTimeout(() => {
            setNotification(null)
        }, 5000)
    }

    const handleLogin = async (event) => {
        event.preventDefault()

        try {
            const user = await loginService.login({username, password})
            window.localStorage.setItem('loggedUser', JSON.stringify(user))
            blogService.setToken(user.token)
            setUser(user)
            setUsername('')
            setPassword('')
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

    const handleCreateBlog = async (event) => {
        event.preventDefault()

        try {
            blogService.setToken(user.token)
            const response = await blogService.createBlog({title: blogTitle, author: blogAuthor, url: blogUrl})
            setBlogTitle('')
            setBlogAuthor('')
            setBlogUrl('')
            showNotification('blog created successfully.', 'green')
        } catch (error) {
            showNotification(error.response.data.error, 'red')
            console.log(error)
        }
    }

    const loginForm = () => (
        <div>
            <h2>login to application</h2>
            <form onSubmit={handleLogin}>
                <div>
                    username
                    <input type="text" value={username} name="Username"
                           onChange={({target}) => setUsername(target.value)}/>
                </div>
                <div>
                    password
                    <input type="password" value={password} name="Password"
                           onChange={({target}) => setPassword(target.value)}/>
                </div>
                <button type="submit">login</button>
            </form>
        </div>
    )

    const createBlogForm = () => (
        <div>
            <h2>create new</h2>
            <form onSubmit={handleCreateBlog}>
                <div>
                    title
                    <input type="text" value={blogTitle} name="Title"
                           onChange={({target}) => setBlogTitle(target.value)}/>
                </div>
                <div>
                    author
                    <input type="text" value={blogAuthor} name="Author"
                           onChange={({target}) => setBlogAuthor(target.value)}/>
                </div>
                <div>
                    url
                    <input type="text" value={blogUrl} name="Url"
                           onChange={({target}) => setBlogUrl(target.value)}/>
                </div>
                <button type="submit">create</button>
            </form>
        </div>
    )

    const blogList = () => (
        <div>
            <h2>blogs</h2>
            <div>
                <p>
                    {user.name} logged in
                    <button type="button" onClick={handleLogout}>logout</button>
                </p>
            </div>
            {blogs.map(blog => <Blog key={blog.id} blog={blog}/>)}
        </div>
    )

    const notificationPanel = () => (
        <div style={{
            backgroundColor: 'lightgrey',
            border: `2px solid ${notification.color}`,
            padding: '2px',
            borderRadius: '5px',
        }}>
            <h2 style={{color: `${notification.color}`}}>{notification.text}</h2>
        </div>
    )

    return (
        <div>
            {notification && notificationPanel()}
            {user === null ? loginForm()
                : (
                    <>
                        {createBlogForm()}
                        {blogList()}
                    </>
                )}
        </div>
    )
}

export default App