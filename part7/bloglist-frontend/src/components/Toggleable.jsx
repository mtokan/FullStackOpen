import { Children, cloneElement, isValidElement, useState } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap'

const Toggleable = ({ buttonLabel, children }) => {
  const [visible, setVisible] = useState(false)

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

  const label = visible ? 'cancel' : buttonLabel

  return (
    <div>
      <div>
        <Button onClick={toggleVisibility}>{label}</Button>
      </div>
      <div style={showWhenVisible}>{childrenWithProps}</div>
    </div>
  )
}

Toggleable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
}

Toggleable.displayName = 'Toggleable'

export default Toggleable
