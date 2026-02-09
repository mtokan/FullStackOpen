const Book = require('../models/book')
const DataLoader = require("dataloader");

const batchBookCounts = async (authorIds) => {
    const books = await Book.find({ author: { $in: authorIds } })
    return authorIds.map(id =>
        books.filter(book => book.author.toString() === id.toString()).length
    )
}

const createLoaders = () => {
    return {
        bookCount: new DataLoader(keys => batchBookCounts(keys))
    }
}

module.exports = {batchBookCounts, createLoaders}