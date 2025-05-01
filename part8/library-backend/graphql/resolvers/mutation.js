const {authors, books} = require('../data')
const {v1: uuid} = require('uuid')

// noinspection JSUnusedGlobalSymbols
const mutationResolvers = {
  addBook: (_, {title, published, author, genres}) => {
    const authorExists = authors.find(existingAuthor => existingAuthor.name === author)
    if (!authorExists) {
      authors.push({
        name: author,
        born: undefined,
        id: uuid()
      })
    }
    const book = {
      title,
      published,
      author,
      id: uuid(),
      genres
    }
    books.push(book)
    return book
  },
  editAuthor: (_, {name, born}) => {
    const author = authors.find(existingAuthor => existingAuthor.name === name)
    if (!author) return null
    author.born = born
    return author
  }
}

module.exports = mutationResolvers