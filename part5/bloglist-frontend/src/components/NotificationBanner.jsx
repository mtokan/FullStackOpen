const NotificationBanner = ({text, color, displayStatus}) => {

    const divStyle = {
        backgroundColor: 'lightgrey',
        border: `2px solid ${color}`,
        padding: '2px',
        borderRadius: '5px',
        display: `${displayStatus ? '' : 'none'}`,
    }

    const textStyle = {
        color: `${color}`,
    }

    return (
        <div style={divStyle}>
            <h2 style={textStyle}>{text}</h2>
        </div>
    )
}

export default NotificationBanner