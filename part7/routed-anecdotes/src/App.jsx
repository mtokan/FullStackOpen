import {useEffect, useState} from 'react'
import {Link, Route, Routes, useNavigate, useParams} from 'react-router'
import {useField} from './hooks'

const Menu = () => {
  const padding = {
    paddingRight: 5
  }
  return (
    <div>
      <Link to='/' style={padding}>anecdotes</Link>
      <Link to='/create' style={padding}>create new</Link>
      <Link to='/about' style={padding}>about</Link>
    </div>
  )
}

const AnecdoteList = ({anecdotes}) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(anecdote =>
        <li key={anecdote.id}>
          <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
        </li>)}
    </ul>
  </div>
)

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>
    
    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke
      laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea
      about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>
    
    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://fullstackopen.com/'>Full Stack Open</a>.
    See
    <a
      href='https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js'>
      https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js
    </a>
    for the source code.
  </div>
)

const CreateNew = (props) => {
  const content = useField('text')
  const author = useField('text')
  const info = useField('text')
  const navigate = useNavigate()
  
  
  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.inputs.value,
      author: author.inputs.value,
      info: info.inputs.value,
      votes: 0
    })
    props.notify(`a new anecdote '${content.inputs.value}' created`)
    navigate('/')
  }
  
  const handleReset = (e) => {
    e.preventDefault()
    content.reset()
    author.reset()
    info.reset()
  }
  
  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit} onReset={handleReset}>
        <div>
          content
          <input {...content.inputs} />
        </div>
        <div>
          author
          <input {...author.inputs} />
        </div>
        <div>
          url for more info
          <input {...info.inputs} />
        </div>
        <button type='submit'>create</button>
        <button type='reset'>reset</button>
      </form>
    </div>
  )
  
}

const Anecdote = ({anecdotes}) => {
  const id = useParams().id
  const anecdote = anecdotes.find(anecdote => anecdote.id === Number(id))
  return (
    <div>
      <h2>{anecdote.content} by {anecdote.author}</h2>
      <p> has {anecdote.votes} votes</p>
      <p>for more info see {anecdote.info}</p>
    </div>
  )
}

const Notification = ({notification, clearNotification}) => {
  const style = {
    display: 'block',
    borderRadius: '3px',
    border: '3px solid red',
    padding: '5px',
  }
  
  useEffect(() => {
    if (!notification) return;
    
    const timoutId = setTimeout(() => {
      clearNotification()
    }, 5000)
    
    return () => {
      clearTimeout(timoutId)
    }
  }, [notification, clearNotification]);
  
  
  if (!notification) return null
  
  return (
    <p style={style}>{notification}</p>
  )
}

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'https://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])
  
  const [notification, setNotification] = useState('')
  
  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
  }
  
  const notify = (notification) => {
    setNotification(notification)
  }
  
  const clearNotification = () => setNotification('')
  
  
  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu/>
      <Notification notification={notification} clearNotification={clearNotification}/>
      <Routes>
        <Route path='/anecdotes/:id' element={<Anecdote anecdotes={anecdotes}/>}/>
        <Route path='/' element={<AnecdoteList anecdotes={anecdotes}/>}/>
        <Route path='/create' element={<CreateNew addNew={addNew} notify={notify}/>}/>
        <Route path='/about' element={<About/>}/>
      </Routes>
      <Footer/>
    </div>
  )
}

export default App
