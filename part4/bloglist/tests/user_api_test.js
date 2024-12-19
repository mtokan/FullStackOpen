const {test, after, beforeEach} = require('node:test')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const supertest = require('supertest')
const User = require('../models/user')
const app = require('../app')
const assert = require("node:assert");

const api = supertest(app)

beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('password', 10)
    const user = new User({
        username: 'root',
        passwordHash
    })

    await user.save()
})

test('create new user', async () => {
    const response = await api
        .post('/api/users')
        .send({
            username: 'lara',
            name: 'Lara Croft',
            password: 'tombRaider'
        })

    assert.strictEqual(response.status, 201)
})

test('user with same username cannot be created', async () => {
    const response = await api
        .post('/api/users')
        .send({
            username: 'root',
            name: 'Lara Croft',
            password: 'tombRaider'
        })
    console.log(response.body)
    assert.strictEqual(response.status, 400)
})

test('create new user with short password', async () => {
    const response = await api
        .post('/api/users')
        .send({
            username: 'lara',
            name: 'Lara Croft',
            password: 'to'
        })
    console.log(response.body)
    assert.strictEqual(response.status, 400)
})

test('create new user with short username', async () => {
    const response = await api
        .post('/api/users')
        .send({
            username: 'la',
            name: 'Lara Croft',
            password: 'tombRaider'
        })
    console.log(response.body)
    assert.strictEqual(response.status, 400)
})

after(async () => {
    await mongoose.connection.close()
})