const {startStandaloneServer} = require('@apollo/server/standalone')
const createApolloServer = require('./graphql')

const server = createApolloServer()

startStandaloneServer(server, {
  listen: {port: 4000},
}).then(({url}) => {
  console.log(`Server ready at ${url}`)
})