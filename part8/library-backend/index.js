const {startStandaloneServer} = require('@apollo/server/standalone')
const createApolloServer = require('./graphql')
const connectToMongo = require('./db/mongo')
const jwt = require('jsonwebtoken')
const User = require('./models/user')

const connectDb = async () => {
  await connectToMongo()
}

connectDb()

const server = createApolloServer()

startStandaloneServer(server, {
  listen: {port: 4000},
  context: async ({req, res}) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.startsWith('Bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), process.env.JWT_SECRET)
      const currentUser = await User.findById(decodedToken.id)
      return {currentUser}
    }
  },
}).then(({url}) => {
  console.log(`Server ready at ${url}`)
})