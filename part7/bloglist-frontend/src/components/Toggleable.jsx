import { Children, cloneElement, isValidElement, useState } from 'react'
import PropTypes from 'prop-types'

const Toggleable = ({ buttonLabel, children }) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const childrenWithProps = Children.map(children, (child) => {
    if (isValidElement(child)) {
      return cloneElement(child, { toggleVisibility })
    }
    return child
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {childrenWithProps}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  )
}

Toggleable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
}

Toggleable.displayName = 'Toggleable'

export default Toggleable
