import {useMutation, useQueryClient} from '@tanstack/react-query'
import {createAnecdote} from '../services/anecdotes.js'
import {useNotificationDispatch} from '../utils/notificationHelper.js'

const AnecdoteForm = () => {
    const queryClient = useQueryClient()
    const dispatch = useNotificationDispatch()
    
    const newAnecdoteMutation = useMutation({
        mutationFn: createAnecdote,
        onSuccess: (newAnecdote) => {
            const anecdotes = queryClient.getQueryData(['anecdotes'])
            queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
            dispatch({type: 'SET_NOTIFICATION', payload: `'${newAnecdote.content}' added to anecdotes.`})
        },
        onError: (error) => {
            const message = error.response?.data?.error
            dispatch({type: 'SET_NOTIFICATION', payload: message})
        }
    })
    
    const onCreate = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        newAnecdoteMutation.mutate({content: content, votes: 0})
    }
    
    return (
        <div>
            <h3>create new</h3>
            <form onSubmit={onCreate}>
                <input name='anecdote'/>
                <button type="submit">create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm
