import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createBlog } from '../reducers/blogReducer.js'
import { Button, Form, FormGroup } from 'react-bootstrap'

const BlogForm = ({ toggleVisibility }) => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')

  const handleCreateBlog = (event) => {
    event.preventDefault()
    createBlog({ title: blogTitle, author: blogAuthor, url: blogUrl })
    dispatch(createBlog({ title: blogTitle, author: blogAuthor, url: blogUrl }, user))
    toggleVisibility()
    setBlogTitle('')
    setBlogAuthor('')
    setBlogUrl('')
  }

  return (
    <div>
      <Form onSubmit={handleCreateBlog}>
        <Form.Group>
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            onChange={({ target }) => setBlogTitle(target.value)}
            value={blogTitle}
          />
        </Form.Group>
        <FormGroup>
          <Form.Label>Author</Form.Label>
          <Form.Control
            type="text"
            name="author"
            onChange={({ target }) => setBlogAuthor(target.value)}
            value={blogAuthor}
          />
        </FormGroup>
        <FormGroup>
          <Form.Label>Url</Form.Label>
          <Form.Control type="text" name="url" onChange={({ target }) => setBlogUrl(target.value)} value={blogUrl} />
        </FormGroup>
        <Button variant={'primary'} type={'submit'}>
          create
        </Button>
      </Form>
    </div>
  )
}

export default BlogForm
