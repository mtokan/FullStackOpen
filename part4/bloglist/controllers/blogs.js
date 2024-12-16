const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const {request, response} = require("express");

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
    if (!request.body.title || !request.body.url ) {
        return response.status(400).json({ error: 'title and url are required'})
    }
    const blog = new Blog(request.body)
    const result = await blog.save()
    response.status(201).json(result)
})

blogsRouter.delete('/:id', async (request, response) => {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
    await Blog.findByIdAndUpdate(request.params.id, request.body, {new: true})
    response.status(200).end()
})

module.exports = blogsRouter