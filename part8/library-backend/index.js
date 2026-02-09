const createApolloServer = require('./graphql')
const express = require('express')
const http = require('http')
const cors = require('cors')
const { expressMiddleware } = require('@as-integrations/express5')
const connectToMongo = require('./db/mongo')
const jwt = require('jsonwebtoken')
const User = require('./models/user')
const { WebSocketServer } = require('ws')
const {createLoaders} = require("./graphql/loader");



const connectDb = async () => {
  await connectToMongo()
}

connectDb()

const getUserFromAuthHeader = async (auth) => {
  if (!auth || !auth.startsWith('Bearer ')) {
    return null
  }

  const decodedToken = jwt.verify(auth.substring(7), process.env.JWT_SECRET)
  return User.findById(decodedToken.id)
}

const startServer = async () => {
  const app = express()
  const httpServer = http.createServer(app)

  const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/',
  })

  const server = createApolloServer(httpServer,wsServer)
  await server.start()

  app.use(
      '/',
      cors(),
      express.json(),
      expressMiddleware(server, {
        context: async ({req}) => {
          const auth = req.headers.authorization
          const currentUser = await getUserFromAuthHeader(auth)
          return {currentUser, loaders: createLoaders()}
        }
      })
  )

  httpServer.listen(4000,() => console.log(`Server is now running on http://localhost:4000`))
}

startServer().catch(err => console.error('Server startup error:', err))