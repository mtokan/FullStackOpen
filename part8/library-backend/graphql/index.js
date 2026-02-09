const {ApolloServer} = require('@apollo/server')
const {ApolloServerPluginDrainHttpServer} = require('@apollo/server/plugin/drainHttpServer')
const typeDefs = require('./typeDefs')
const resolvers = require('./resolvers')
const {makeExecutableSchema} = require("@graphql-tools/schema");
const {useServer} = require('graphql-ws/use/ws')
const {createLoaders} = require("./loader");

const createApolloServer = (httpServer,wsServer) => {
  const schema = makeExecutableSchema({ typeDefs, resolvers })
  const serverCleanup = useServer(
      {
        schema,
        context: async (ctx) => {
          return {
            loaders: createLoaders()
          }
        }
      },
      wsServer
  )
  return new ApolloServer({
    schema,
    plugins: [
        ApolloServerPluginDrainHttpServer({httpServer}),
        {
          async serverWillStart(){
            return {
              async drainServer(){
                await serverCleanup.dispose()
              }
            }
          }
        }
    ]
  })
}

module.exports = createApolloServer