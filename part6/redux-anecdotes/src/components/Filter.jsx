import {changeFilter} from '../reducers/filterReducer.js'
import {useDispatch} from 'react-redux'

const Filter = () => {
    const dispatch = useDispatch()
    
    const handleChange = (event) => {
        event.preventDefault()
        dispatch(changeFilter(event.target.value))
    }
    
    const style = {
        marginBottom: 10
    }
    
    return (
        <div style={style}>
            filter <input onChange={handleChange}/>
        </div>
    )
}

export default Filter