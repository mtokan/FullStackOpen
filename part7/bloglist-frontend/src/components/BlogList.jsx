import Toggleable from './Toggleable.jsx'
import BlogForm from './BlogForm.jsx'
import { useSelector } from 'react-redux'
import { Link } from 'react-router'

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs)

  const divStyle = {
    border: '2px solid black',
    margin: '10px',
    paddingLeft: '10px',
  }

  return (
    <div>
      <Toggleable buttonLabel="new blog">
        <BlogForm />
      </Toggleable>
      {blogs
        .toSorted((firstBlog, secondBlog) => secondBlog.likes - firstBlog.likes)
        .map((blog) => (
          <div key={blog.id} style={divStyle}>
            <p>
              <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
            </p>
          </div>
        ))}
    </div>
  )
}

export default BlogList
