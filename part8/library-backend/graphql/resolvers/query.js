const Author = require('../../models/author')
const Book = require('../../models/book')

// noinspection JSUnusedGlobalSymbols
const queryResolvers = {
  authorCount: async () => Author.collection.countDocuments(),
  bookCount: async () => Book.collection.countDocuments(),
  allBooks: async (_, args) => {
    const filter = {}
    
    if (args.author) {
      const author = await Author.findOne({name: args.author})
      if (!author) return []
      filter.author = author._id
    }
    if (args.genre) {
      filter.genres = args.genre
    }
    return Book.find(filter).populate('author')
  },
  allAuthors: async () => Author.find({}),
  me: (root, args, context) => {
    return context.currentUser
  }
}

module.exports = queryResolvers