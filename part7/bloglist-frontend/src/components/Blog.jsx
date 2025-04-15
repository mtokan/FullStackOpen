import { useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { deleteBlog, updateBlog } from '../reducers/blogReducer.js'

const Blog = () => {
  const id = useParams().id
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)
  const blog = blogs.find((blog) => blog.id === id)

  if (blog === undefined || blog === null) return <p>loading... </p>

  const deleteButtonStyle = {
    display: user.username === blog.user.username ? '' : 'none',
  }

  const handleLike = (event) => {
    event.preventDefault()
    const updatedData = { likes: blog.likes + 1 }
    dispatch(updateBlog(blog.id, updatedData, user))
  }

  const handleDelete = (event) => {
    event.preventDefault()
    if (window.confirm('Are you sure you want to delete this post?')) dispatch(deleteBlog(blog.id, user))
  }

  return (
    <div>
      <h2>{blog.title}</h2>
      <div>{blog.url}</div>
      <div>
        {blog.likes} likes <button onClick={handleLike}>like</button>
      </div>
      <div>added by {blog.user.username}</div>
      <button style={deleteButtonStyle} onClick={handleDelete}>
        delete
      </button>
    </div>
  )
}

export default Blog
