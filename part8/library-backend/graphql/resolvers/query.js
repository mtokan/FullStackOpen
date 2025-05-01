const {authors, books} = require('../data')

// noinspection JSUnusedGlobalSymbols
const queryResolvers = {
  authorCount: () => authors.length,
  bookCount: () => books.length,
  allBooks: (_, args) => {
    return books.filter(book => {
      const matchesAuthor = !args.author || book.author === args.author
      const matchesGenre = !args.genre || book.genres.includes(args.genre)
      return matchesAuthor && matchesGenre
    })
  },
  allAuthors: () => authors,
}

module.exports = queryResolvers