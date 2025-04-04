import {createSlice} from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes.js'

const anecdoteSlice = createSlice({
    name: 'anecdote',
    initialState: [],
    reducers: {
        addVote(state, action) {
            const id = action.payload.id
            const anecdoteToChange = state.find(anecdote => anecdote.id === id)
            anecdoteToChange.votes += 1
        },
        addAnecdote(state, action) {
            state.push(action.payload)
        },
        setAnecdotes(state, action) {
            return action.payload
        }
    }
})

export const {addVote, addAnecdote, setAnecdotes} = anecdoteSlice.actions

export const initializeAnecdotes = () => {
    return async dispatch => {
        const anecdotes = await anecdoteService.getAll()
        dispatch(setAnecdotes(anecdotes))
    }
}

export const createAnecdote = content => {
    return async dispatch => {
        const newAnecdote = await anecdoteService.createNew(content)
        dispatch(addAnecdote(newAnecdote))
    }
}

export const increaseVote = anecdote => {
    return async dispatch => {
        await anecdoteService.update(anecdote.id, {...anecdote, votes: anecdote.votes + 1})
        dispatch(addVote(anecdote))
    }
}

export default anecdoteSlice.reducer