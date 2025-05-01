const {books} = require('../data')

// noinspection JSUnusedGlobalSymbols
const authorResolvers = {
  bookCount: author => books.filter(book => book.author === author.name).length
}

module.exports = authorResolvers