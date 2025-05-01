const {ApolloServer} = require('@apollo/server')
const typeDefs = require('./typeDefs')
const resolvers = require('./resolvers')

const createApolloServer = () => {
  return new ApolloServer({
    typeDefs,
    resolvers,
  })
}

module.exports = createApolloServer