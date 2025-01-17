import BlogComponent from './Blog.jsx'
import {render, screen} from '@testing-library/react'
import {userEvent} from '@testing-library/user-event'

test('renders just title and author', () => {
    const blog = {
        title: 'The Blog',
        author: 'The Author',
        url: 'https://blogTestUrl.com',
        likes: 2,
        user: {
            name: 'John Doe',
            username: 'John',
        }
    }
    
    const mockUpdateBlog = vi.fn()
    const mockDeleteBlog = vi.fn()
    
    const {container} = render(<BlogComponent
        blog={blog}
        updateBlog={mockUpdateBlog}
        deleteBlog={mockDeleteBlog}
        user={blog.user}/>)
    
    const elementTitle = screen.queryByText('The Blog')
    const elementAuthor = screen.queryByText('The Author')
    const elementsHidden = container.querySelectorAll('#hidable')
    
    expect(elementTitle).toBeDefined()
    expect(elementAuthor).toBeDefined()
    elementsHidden.forEach(element => {
        expect(element).toHaveStyle('display: none')
    })
})

test('shows url and author after clicking on the button', async () => {
    const blog = {
        title: 'The Blog',
        author: 'The Author',
        url: 'https://blogTestUrl.com',
        likes: 2,
        user: {
            name: 'John Doe',
            username: 'John',
        }
    }
    
    const mockUpdateBlog = vi.fn()
    const mockDeleteBlog = vi.fn()
    
    const {container} = render(<BlogComponent
        blog={blog}
        updateBlog={mockUpdateBlog}
        deleteBlog={mockDeleteBlog}
        user={blog.user}/>)
    
    const testUser = userEvent.setup()
    const button = screen.getByText('view')
    await testUser.click(button)
    
    const elementsHidden = container.querySelectorAll('#hidable')
    elementsHidden.forEach(element => {
        expect(element).not.toHaveStyle('display: none')
    })
})

test('like button work as expected', async () => {
    const blog = {
        title: 'The Blog',
        author: 'The Author',
        url: 'https://blogTestUrl.com',
        likes: 2,
        user: {
            name: 'John Doe',
            username: 'John',
        }
    }
    
    const mockUpdateBlog = vi.fn()
    const mockDeleteBlog = vi.fn()
    
    const {container} = render(<BlogComponent
        blog={blog}
        updateBlog={mockUpdateBlog}
        deleteBlog={mockDeleteBlog}
        user={blog.user}/>)
    
    const testUser = userEvent.setup()
    const button = screen.getByText('like')
    await testUser.click(button)
    await testUser.click(button)
    
    expect(mockUpdateBlog.mock.calls).toHaveLength(2)
})