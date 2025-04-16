const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const Comment = require('../models/comment')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 }).populate('comments', { text: 1 })
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const user = request.user
  const { title, url, ...rest } = request.body
  if (!title || !url) {
    return response.status(400).json({ error: 'title and url are required' })
  }
  const blog = await Blog.create({ title, url, ...rest, user: user._id })
  const populatedBlog = await Blog.findById(blog._id).populate('user', { username: 1, name: 1 })
  await User.findByIdAndUpdate(user._id, { $push: { blogs: blog._id } })
  response.status(201).json(populatedBlog)
})

blogsRouter.post('/:id/comments', async (request, response) => {
  const { text } = request.body
  const comment = await Comment.create({ text, blog: request.params.id })
  await Blog.findByIdAndUpdate(request.params.id, { $push: { comments: comment._id } })
  response.status(201).json(comment)
})

blogsRouter.delete('/:id', async (request, response) => {
  const user = request.user
  const blog = await Blog.findById(request.params.id)
  if (!(user.id === blog.user.toString())) {
    return response.status(401).json({ error: 'user not authorized to delete this blog' })
  }
  await blog.deleteOne()
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  await Blog.findByIdAndUpdate(request.params.id, request.body, { new: true })
  response.status(200).end()
})

module.exports = blogsRouter
