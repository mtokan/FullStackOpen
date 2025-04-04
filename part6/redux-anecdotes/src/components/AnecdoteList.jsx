import {increaseVote} from '../reducers/anecdoteReducer.js'
import {useDispatch, useSelector} from 'react-redux'
import {setNotification} from '../reducers/notificationReducer.js'
import {useMemo} from 'react'

const AnecdoteList = () => {
    const filter = useSelector(state => state.filter)
    const anecdotes = useSelector(state => state.anecdotes)
    const dispatch = useDispatch()
    
    const sortedAnecdotes = useMemo(() => {
        if (filter === '') {
            return [...anecdotes].sort((a, b) => b.votes - a.votes)
        }
        return anecdotes
            .filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
            .sort((a, b) => b.votes - a.votes)
    }, [anecdotes, filter])
    
    const handleVotes = (anecdote) => {
        dispatch(increaseVote(anecdote))
        dispatch(setNotification(`you voted '${anecdote.content}'`, 5))
    }
    
    return (
        <div>
            {sortedAnecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => handleVotes(anecdote)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AnecdoteList