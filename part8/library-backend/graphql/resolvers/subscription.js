const pubsub = require('../pubsub')

const subscriptionResolvers = {
    bookAdded: {
        subscribe: () => pubsub.asyncIterableIterator('BOOK_ADDED')
    }
}

module.exports = subscriptionResolvers