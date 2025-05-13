const mongoose = require('mongoose')
const Author = require('./models/author')
const Book = require('./models/book')
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI;

const authors = [
  {name: 'Robert Martin', born: 1952},
  {name: 'Martin Fowler', born: 1963},
  {name: 'Fyodor Dostoevsky', born: 1821},
  {name: 'Joshua Kerievsky'},
  {name: 'Sandi Metz'}
]

const books = [
  {
    title: 'Clean Code',
    published: 2008,
    author: 'Robert Martin',
    genres: ['refactoring']
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: 'Robert Martin',
    genres: ['agile', 'patterns', 'design']
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: 'Martin Fowler',
    genres: ['refactoring']
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: 'Joshua Kerievsky',
    genres: ['refactoring', 'patterns']
  },
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: 'Sandi Metz',
    genres: ['refactoring', 'design']
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    genres: ['classic', 'crime']
  },
  {
    title: 'Demons',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    genres: ['classic', 'revolution']
  },
]

mongoose.connect(MONGODB_URI)
  .then(async () => {
    console.log('Connected to MongoDB')
    await Author.deleteMany({})
    await Book.deleteMany({})
    
    const authorDocs = {}
    for (let a of authors) {
      const newAuthor = new Author(a)
      const savedAuthor = await newAuthor.save()
      authorDocs[a.name] = savedAuthor._id
    }
    
    for (let b of books) {
      const book = new Book({
        title: b.title,
        published: b.published,
        author: authorDocs[b.author],
        genres: b.genres
      })
      await book.save()
    }
    
    console.log('Seeding done!')
    await mongoose.connection.close()
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err.message)
  })