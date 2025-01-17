import {render, screen} from '@testing-library/react'
import BlogForm from './BlogForm.jsx'
import userEvent from '@testing-library/user-event'

test('Blog Form should send correct inputs', async () => {
    const mockCreateBlog = vi.fn()
    
    const {container} = render(<BlogForm createBlog={mockCreateBlog}/>)
    
    const titleInput = container.querySelector('input[name="Title"]')
    const authorInput = container.querySelector('input[name="Author"]')
    const urlInput = container.querySelector('input[name="Url"]')
    const button = screen.getByText('create')
    
    const user = userEvent.setup()
    await user.type(titleInput, 'Blog Title')
    await user.type(authorInput, 'John Doe')
    await user.type(urlInput, 'https://blogTestUrl.com')
    await user.click(button)
    
    expect(mockCreateBlog.mock.calls).toHaveLength(1)
    expect(mockCreateBlog.mock.calls[0][0]).toEqual({
        title: 'Blog Title',
        author: 'John Doe',
        url: 'https://blogTestUrl.com'
    })
})