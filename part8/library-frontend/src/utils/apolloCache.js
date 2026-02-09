import { ALL_AUTHORS, ALL_BOOKS, ALL_GENRES } from '../queries.js'

export const addBooktoCache = (cache, newBook) => {
  cache.updateQuery({ query: ALL_BOOKS }, (data) => {
    const bookExists = data.allBooks.some((book) => book.id === newBook.id)
    if (!bookExists) return { allBooks: [...data.allBooks, newBook] }
    return data
  })
  cache.updateQuery({ query: ALL_AUTHORS }, (data) => {
    const authorExists = data.allAuthors.some((author) => author.id === newBook.author.id)
    if (!authorExists) return { allAuthors: [...data.allAuthors, newBook.author] }
    return data
  })
  cache.updateQuery({ query: ALL_GENRES }, (data) => {
    let newGenres = []
    newBook.genres.forEach((genre) => {
      const genreExists = data.allGenres.some((item) => item === genre)
      if (!genreExists) newGenres.push(genre)
    })
    if (newGenres.length > 0) return { allGenres: [...data.allGenres, ...newGenres] }
    return data
  })
}
