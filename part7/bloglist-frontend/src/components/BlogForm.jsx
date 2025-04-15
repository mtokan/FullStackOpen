import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createBlog } from '../reducers/blogReducer.js'

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
      <h2>create new</h2>
      <form onSubmit={handleCreateBlog}>
        <div>
          title
          <input
            type="text"
            value={blogTitle}
            name="Title"
            data-testid="title"
            onChange={({ target }) => setBlogTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            type="text"
            value={blogAuthor}
            name="Author"
            data-testid="author"
            onChange={({ target }) => setBlogAuthor(target.value)}
          />
        </div>
        <div>
          url
          <input
            type="text"
            value={blogUrl}
            name="Url"
            data-testid="url"
            onChange={({ target }) => setBlogUrl(target.value)}
          />
        </div>
        <button type="submit" data-testid="blogSubmitButton">
          create
        </button>
      </form>
    </div>
  )
}

export default BlogForm
