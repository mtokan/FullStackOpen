const Book = require('../../models/book')

// noinspection JSUnusedGlobalSymbols
const authorResolvers = {
  bookCount: async (author) => Book.countDocuments({author: author._id})
}

module.exports = authorResolvers