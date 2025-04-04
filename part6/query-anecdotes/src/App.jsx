import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query'
import {getAnecdotes, updateAnecdote} from './services/anecdotes.js'
import {useNotificationDispatch} from './utils/notificationHelper.js'

const App = () => {
    const queryClient = useQueryClient()
    const dispatch = useNotificationDispatch()
    
    const result = useQuery({
        queryKey: ['anecdotes'],
        queryFn: getAnecdotes,
        retry: 1,
        refetchOnWindowFocus: false,
    })
    
    const updateAnecdoteMutation = useMutation({
        mutationFn: updateAnecdote,
        onSuccess: (updatedAnecdote) => {
            const anecdotes = queryClient.getQueryData(['anecdotes'])
            queryClient.setQueryData(['anecdotes'], anecdotes.map(anecdote =>
                anecdote.id !== updatedAnecdote.id ? anecdote : updatedAnecdote
            ))
            dispatch({type: 'SET_NOTIFICATION', payload: `'${updatedAnecdote.content}' voted`})
        }
    })
    
    const handleVote = (anecdote) => {
        updateAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes + 1})
    }
    
    if (result.isPending) {
        return <div>loading data...</div>
    }
    
    if (result.isError) {
        return <div>anecdote service not available due to problems in server</div>
    }
    
    const anecdotes = result.data
    
    return (
        <div>
            <h3>Anecdote app</h3>
            
            <Notification/>
            <AnecdoteForm/>
            
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => handleVote(anecdote)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default App
