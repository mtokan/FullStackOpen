import ReactDOM from 'react-dom/client'
import App from './App'
import {QueryClient} from '@tanstack/react-query'
import {NotificationContextProvider} from './NotificationContext.jsx'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
    <NotificationContextProvider client={queryClient}>
        <App/>
    </NotificationContextProvider>
)