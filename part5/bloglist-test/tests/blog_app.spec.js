import {expect, test} from '@playwright/test'

const baseUrl = 'http://localhost:3003'
const frontendUrl = 'http://localhost:5173'

const firstUser = 'firstUser'
const secondUser = 'secondUser'
const password = 'password'
const firstUserTitle = 'firstUserTitle'
const secondUserTitle = 'secondUserTitle'
const firstUserSecondTitle = 'firstUserSecondTitle'
const firstUserTitleLikeCount = 0

const createUser = async (request,username,password) => {
    await request.post(`${baseUrl}/api/users`, {
        data: {username: username, name: username, password: password}
    })
}
const createBlog = async (request,username,password,blogTitle,blogAuthor,blogUrl,blogLikes) => {
    const response = await request.post(`${baseUrl}/api/login`, {
        data: {username: username, password: password}
    })
    const json = await response.json()
    await request.post(`${baseUrl}/api/blogs`, {
        data: {title: blogTitle, author: blogAuthor, url: blogUrl, likes: blogLikes},
        headers: {'Authorization': `Bearer ${json.token}`, 'Content-Type': 'application/json'},
    })
}

test.describe('Blog app', ()=> {
    test.beforeEach(async ({page, request}) => {
        await request.post(`${baseUrl}/api/testing/reset`)
        await createUser(request, firstUser, password)
        await createUser(request, secondUser, password)
        await createBlog(request, firstUser, password, firstUserTitle, 'Author', 'Url',firstUserTitleLikeCount)
        await createBlog(request, firstUser, password, firstUserSecondTitle, 'Author', 'Url',2)
        await createBlog(request, secondUser, password, secondUserTitle, 'Author', 'Url',5)
        await page.goto(frontendUrl)
    })
    
    test('login form is shown', async ({page}) => {
        const locator = await page.getByText('login to application')
        await expect(locator).toBeVisible()
    })
    
    test.describe('Login', ()=> {
        test('succeed with correct credentials', async ({page}) => {
            await page.getByTestId('username').fill(secondUser)
            await page.getByTestId('password').fill(password)
            await page.getByRole('button').click()
            
            const blogLocator = await page.getByText('blogs')
            const bannerLocator = await page.getByTestId('notification')
            await expect(bannerLocator).toHaveCSS('color', 'rgb(0, 128, 0)')
            await expect(blogLocator).toBeVisible()
        })
        
        test('failed with incorrect credentials', async ({page}) => {
            await page.getByTestId('username').fill(secondUser)
            await page.getByTestId('password').fill('passwordX')
            await page.getByRole('button').click()
            
            const locator = await page.getByTestId('notification')
            await expect(locator).toHaveCSS('color', 'rgb(255, 0, 0)')
        })
    })
    
    test.describe('When logged in', ()=> {
        test.beforeEach(async ({page}) => {
            await page.getByTestId('username').fill(secondUser)
            await page.getByTestId('password').fill(password)
            await page.getByRole('button').click()
            await expect(page.getByText('blogs')).toBeVisible()
        })
        
        test('a new blog can be created', async ({page}) => {
            await page.getByText('new blog').click()
            
            await page.getByTestId('title').fill('Unique Event')
            await page.getByTestId('author').fill('Incredible Author')
            await page.getByTestId('url').fill('Ordinary Url')
            await page.getByTestId('blogSubmitButton').click()
            
            const locator = await page.getByText('Unique')
            await expect(locator).toBeVisible()
        })
        
        test('a blog can be liked', async ({page}) => {
            await page.getByText(firstUserTitle).getByText('view').click()
            await page.getByText(firstUserTitle).locator('..').getByText('like').click()
            const locator = await page.getByText(`${firstUserTitleLikeCount + 1}`)
            await expect(locator).toBeVisible()
        })
        
        test('added blog can be deleted', async ({page}) => {
            await page.on('dialog', async dialog => {
                await dialog.accept()
            })
            
            await page.getByText(secondUserTitle).getByText('view').click()
            await page.getByText(secondUserTitle).locator('..').getByText('delete').click()
            
            const locator = await page.getByText(secondUserTitle)
            await expect(locator).not.toBeVisible()
        })
        
        test('only added blog can be deleted', async ({page}) => {
            await page.getByText(firstUserTitle).getByText('view').click()
            const locator = await page.getByText(firstUserTitle).locator('..').getByText('delete')
            await expect(locator).not.toBeVisible()
        })
        
        test('blogs should be sorted by likes', async ({page}) => {
            await page.getByText(firstUserTitle).getByText('view').click()
            const divs = await page.getByTestId('mainBlogDiv')
            const likeCounts = []
            
            for (let i = 0; i < await divs.count(); i++) {
                const div = divs.nth(i)
                const likeText = await div.getByTestId('likes').innerText()
                const likes = Number(likeText.match(/\d+/)[0])
                likeCounts.push(likes);
            }
            
            console.log(likeCounts)
            const isSorted = likeCounts.every((value, index, array) => index === 0 || array[index - 1] >= value)
            await expect(isSorted).toBe(true);
        })
    })
})

