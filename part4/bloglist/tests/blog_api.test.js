const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const Blog = require('../models/blog')
const app = require('../app')
const assert = require("node:assert");

const api = supertest(app)

const initialBlogs = [{
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
}, {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
}, {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
}, {
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
}, {
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
}, {
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
}]

beforeEach(async () => {
    await Blog.deleteMany({})

    const blogObjects = initialBlogs.map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
})

test('there are 6 blogs', async () => {
    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, 6)
})

test('has a property named id', async () => {
    const response = await api.get('/api/blogs')
    console.log(response.body[0])
    assert(response.body[0].hasOwnProperty('id'))
})

test('add a new blog', async () => {
    const response = await api.post('/api/blogs').send({
        title: 'Test blog',
        author: 'Test author',
        url: 'https://test.com',
        likes: 100
    })
    console.log(response.body)
    const response2 = await api.get('/api/blogs')
    assert.strictEqual(response2.body.length, 7)
})

test('likes default to 0', async () => {
    const response = await api.post('/api/blogs').send({
        title: 'Test blog',
        author: 'Test author',
        url: 'https://test.com',
    })
    console.log(response.body)
    const response2 = await api.get('/api/blogs')
    assert.strictEqual(response2.body[6].likes, 0)
})

test('title is missing', async () => {
    const response = await api.post('/api/blogs').send({
        author: 'Test author',
        url: 'https://test.com',
        likes: 100
    })
    console.log(response.body)
    assert.strictEqual(response.status, 400);
})

test('url is missing', async () => {
    const response = await api.post('/api/blogs').send({
        title: 'Test blog',
        author: 'Test author',
        likes: 100
    })
    console.log(response.body)
    assert.strictEqual(response.status, 400);
})

test('delete first blog', async () => {
    const response = await api.get('/api/blogs')
    console.log(response.body[0])
    await api.delete(`/api/blogs/${response.body[0].id}`)
    const response2 = await api.get('/api/blogs')
    assert.strictEqual(response2.body.length, 5)
})

test('update first blog likes', async () => {
    const response = await api.get('/api/blogs')
    console.log(response.body[0])
    await api.put(`/api/blogs/${response.body[0].id}`).send({
        likes: 100
    })
    const response2 = await api.get('/api/blogs')
    assert.strictEqual(response2.body[0].likes, 100)
})

after(async () => {
    await mongoose.connection.close()
})