const Author = require('../../models/author')
const Book = require('../../models/book')
const User = require('../../models/user')
const {GraphQLError} = require('graphql/error')
const jwt = require('jsonwebtoken')

// noinspection JSUnusedGlobalSymbols
const mutationResolvers = {
  addBook: async (_, {title, published, author, genres}, context) => {
    if (!context.currentUser) {
      throw new GraphQLError('not authenticated', {
        extensions: {
          code: 'BAD_USER_INPUT'
        }
      })
    }
    let existingAuthor = await Author.findOne({name: author})
    if (!existingAuthor) {
      const newAuthor = new Author({name: author})
      try {
        existingAuthor = await newAuthor.save()
      } catch (error) {
        throw new GraphQLError('saving author failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: author,
            error
          }
        })
      }
    }
    const book = new Book({title, published, author: existingAuthor._id, genres})
    let savedBook;
    try {
      savedBook = await book.save()
    } catch (error) {
      throw new GraphQLError('saving book failed', {
        extensions: {
          code: 'BAD_USER_INPUT',
          invalidArgs: title,
          error
        }
      })
    }
    return savedBook.populate('author')
  },
  editAuthor: async (_, {name, born}, context) => {
    if (!context.currentUser) {
      throw new GraphQLError('not authenticated', {
        extensions: {
          code: 'BAD_USER_INPUT'
        }
      })
    }
    const author = await Author.findOne({name})
    if (!author) return null
    author.born = born
    return author.save()
  },
  createUser: async (_, {username, favoriteGenre}) => {
    const user = new User({username, favoriteGenre})
    try {
      return user.save()
    } catch (error) {
      throw new GraphQLError('saving user failed', {
        extensions: {
          code: 'BAD_USER_INPUT',
          invalidArgs: username,
          error
        }
      })
    }
  },
  login: async (_, {username, password}) => {
    const user = await User.findOne({username: username})
    
    if (!user || password !== 'secret') {
      throw new GraphQLError('invalid username or password', {
        extensions: {
          code: 'BAD_USER_INPUT',
        }
      })
    }
    
    const userForToken = {
      username: user.username,
      id: user._id
    }
    
    return {value: jwt.sign(userForToken, process.env.JWT_SECRET)}
  }
}

module.exports = mutationResolvers