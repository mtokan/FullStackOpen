import {forwardRef, useImperativeHandle, useState} from 'react'
import PropTypes from 'prop-types'

const Toggleable = forwardRef(({buttonLabel, children}, refs) => {
    const [visible, setVisible] = useState(false)
    
    const hideWhenVisible = {display: visible ? 'none' : ''}
    const showWhenVisible = {display: visible ? '' : 'none'}
    
    const toggleVisibility = () => {
        setVisible(!visible)
    }
    
    useImperativeHandle(refs, () => {
        return {toggleVisibility}
    })
    
    return (
        <div>
            <div style={hideWhenVisible}>
                <button onClick={toggleVisibility}>{buttonLabel}</button>
            </div>
            <div style={showWhenVisible}>
                {children}
                <button onClick={toggleVisibility}>cancel</button>
            </div>
        </div>
    )
})

Toggleable.propTypes = {
    buttonLabel: PropTypes.string.isRequired
}

Toggleable.displayName = 'Toggleable'

export default Toggleable