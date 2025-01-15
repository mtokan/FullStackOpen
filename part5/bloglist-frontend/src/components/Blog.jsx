import {useState} from 'react'

const Blog = ({blog, updateBlog, deleteBlog, user}) => {
    const [buttonLabel, setButtonLabel] = useState('view')
    const [visible, setVisible] = useState(false)

    const showWhenVisible = {display: visible ? '' : 'none'}
    const hideDeleteButton = {display: visible && user.username === blog.user.username ? '' : 'none'}

    const toggleVisibility = () => {
        setVisible(!visible)
        setButtonLabel(visible ? 'hide' : 'view')
    }

    const divStyle = {
        border: '2px solid black',
        margin: '10px',
        paddingLeft: '10px',
    }

    const handleLike = (event) => {
        event.preventDefault()
        const updatedData = {likes: blog.likes + 1}
        updateBlog(blog, updatedData)
    }

    const handleDelete = (event) => {
        event.preventDefault()
        if (window.confirm('Are you sure you want to delete this post?')) deleteBlog(blog.id)
    }

    return (
        <div style={divStyle}>
            <p>
                {blog.title} {blog.author}
                <button onClick={toggleVisibility}>{buttonLabel}</button>
            </p>
            <p style={showWhenVisible}>{blog.url}</p>
            <p style={showWhenVisible}>
                {blog.likes}
                <button onClick={handleLike}>like</button>
            </p>
            <p style={showWhenVisible}>{blog.user.name}</p>
            <p style={hideDeleteButton}>
                <button onClick={handleDelete}>delete</button>
            </p>
        </div>
    )
}

export default Blog