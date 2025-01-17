import {useState} from 'react'

const BlogForm = ({createBlog}) => {
    const [blogTitle, setBlogTitle] = useState('')
    const [blogAuthor, setBlogAuthor] = useState('')
    const [blogUrl, setBlogUrl] = useState('')
    
    const handleCreateBlog = (event) => {
        event.preventDefault()
        createBlog({title: blogTitle, author: blogAuthor, url: blogUrl})
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
                    <input type="text" value={blogUrl} name="Url" onChange={({target}) => setBlogUrl(target.value)}/>
                </div>
                <button type="submit">create</button>
            </form>
        </div>
    )
}

export default BlogForm