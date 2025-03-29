import {useState} from 'react'

const LoginForm = ({login}) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    
    const handleLogin = (event) => {
        event.preventDefault()
        login({username, password})
        setUsername('')
        setPassword('')
    }
    
    return (
        <div>
            <h2>login to application</h2>
            <form onSubmit={handleLogin}>
                <div>
                    username
                    <input type="text" value={username} name="Username" data-testid="username"
                           onChange={({target}) => setUsername(target.value)}/>
                </div>
                <div>
                    password
                    <input type="password" value={password} name="Password" data-testid="password"
                           onChange={({target}) => setPassword(target.value)}/>
                </div>
                <button type="submit">login</button>
            </form>
        </div>
    )
}

export default LoginForm