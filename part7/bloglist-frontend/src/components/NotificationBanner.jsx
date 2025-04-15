import { useSelector } from 'react-redux'

const NotificationBanner = () => {
  const { color, text } = useSelector((state) => state.notification)

  const divStyle = {
    backgroundColor: 'lightgrey',
    border: `2px solid ${color}`,
    padding: '2px',
    borderRadius: '5px',
    display: `${text ? '' : 'none'}`,
  }

  const textStyle = {
    color: `${color}`,
  }

  return (
    <div style={divStyle}>
      <h2 data-testid="notification" style={textStyle}>
        {text}
      </h2>
    </div>
  )
}

export default NotificationBanner
