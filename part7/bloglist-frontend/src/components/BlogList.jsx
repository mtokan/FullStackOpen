import Toggleable from './Toggleable.jsx'
import BlogForm from './BlogForm.jsx'
import { useSelector } from 'react-redux'
import { Link } from 'react-router'
import { Table } from 'react-bootstrap'

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs)

  return (
    <div>
      <Toggleable buttonLabel="new blog">
        <BlogForm />
      </Toggleable>
      <Table striped>
        <thead>
          <tr>
            <th>title</th>
            <th>author</th>
          </tr>
        </thead>
        <tbody>
          {blogs
            .toSorted((firstBlog, secondBlog) => secondBlog.likes - firstBlog.likes)
            .map((blog) => (
              <tr key={blog.id}>
                <td>
                  <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                </td>
                <td>{blog.author}</td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  )
}

export default BlogList
