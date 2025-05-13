const {readFileSync} = require('fs')
const {join} = require('path')

const typeDefs = readFileSync(join(__dirname, 'schema.graphql'), 'utf8')
module.exports = typeDefs