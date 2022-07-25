import React from 'react'

const Notification = ({notification}) => {
    if (notification == null) return <div></div>
    console.log(notification)
    const errorStyle = {
        background: 'lightgray',
        borderStyle: 'solid',
        color: 'red',
        fontSize: 20,
        padding: 10
    }
    const successStyle = {
        ...errorStyle,
        color: 'green',
    }
    console.log(notification[1])
    return (
        <div style={notification[0] ? errorStyle : successStyle}>
            {notification[1]}
        </div>
    )
}

export default Notification