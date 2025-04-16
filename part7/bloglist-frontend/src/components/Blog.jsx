import { Link, useNavigate, useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { createComment, deleteBlog, updateBlog } from '../reducers/blogReducer.js'
import { Button, Form, ListGroup } from 'react-bootstrap'

const Blog = () => {
  const id = useParams().id
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)
  const blog = blogs.find((blog) => blog.id === id)

  if (!blogs) return <p>loading... </p>

  if (!blog) {
    return <p>blog not found</p>
  }

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
    if (window.confirm('Are you sure you want to delete this post?')) {
      dispatch(deleteBlog(blog, user))
      navigate('/')
    }
  }

  const handleComment = (event) => {
    event.preventDefault()
    dispatch(createComment(blog.id, { text: event.target.text.value }, user))
  }

  return (
    <div>
      <h2>{blog.title}</h2>
      <div>{blog.url}</div>
      <div>
        {blog.likes} likes <Button onClick={handleLike}>like</Button>
      </div>
      <div>
        added by <Link to={`/users/${blog.user.id}`}>{blog.user.username}</Link>
      </div>
      <Button style={deleteButtonStyle} onClick={handleDelete}>
        delete
      </Button>
      <h3>comments</h3>
      <Form onSubmit={handleComment}>
        <Form.Group>
          <Form.Control type="text" name="text" />
        </Form.Group>
        <Button variant={'primary'} type={'submit'}>
          add comment
        </Button>
      </Form>
      <ListGroup>
        {blog.comments.map((comment) => (
          <ListGroup.Item key={comment.id}>{comment.text}</ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  )
}

export default Blog
