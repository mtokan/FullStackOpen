import {createContext, useReducer, useRef} from 'react'
import {QueryClientProvider} from '@tanstack/react-query'


const notificationReducer = (state, action) => {
    switch (action.type) {
        case 'SET_NOTIFICATION':
            return action.payload
        case 'REMOVE_NOTIFICATION':
            return ''
        default:
            return state
    }
}

export const NotificationContext = createContext()

export const NotificationContextProvider = ({children, client}) => {
    const [notification, notificationDispatch] = useReducer(notificationReducer, '')
    const timeoutRef = useRef(null)
    
    const notificationCustomDispatch = (action) => {
        if (action.type === 'SET_NOTIFICATION') {
            
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current)
            }
            
            notificationDispatch(action)
            
            timeoutRef.current = setTimeout(() => {
                notificationDispatch({type: 'REMOVE_NOTIFICATION'})
                timeoutRef.current = null
            }, 5000)
        } else {
            notificationDispatch(action)
        }
    }
    
    return (
        <NotificationContext.Provider value={[notification, notificationCustomDispatch]}>
            <QueryClientProvider client={client}>
                {children}
            </QueryClientProvider>
        </NotificationContext.Provider>
    )
}



