// noinspection JSUnusedGlobalSymbols
const authorResolvers = {
  bookCount: async (author, args, {loaders}) => {
    return loaders.bookCount.load(author._id)
  }
}

module.exports = authorResolvers