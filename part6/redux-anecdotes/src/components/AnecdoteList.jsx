import {addVote} from '../reducers/anecdoteReducer.js'
import {useDispatch, useSelector} from 'react-redux'

const AnecdoteList = () => {
    const anecdotes = useSelector(({filter, anecdotes}) => {
        if (filter === '') {
            return anecdotes
        }
        
        return anecdotes.filter(anecdote => anecdote.content.includes(filter))
    })
    const dispatch = useDispatch()
    
    return (
        <div>
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => dispatch(addVote(anecdote.id))}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AnecdoteList