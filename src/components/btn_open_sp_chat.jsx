import React from 'react'

function Btn_open_sp_chat({ id, style = {}, className, }) {
    return (
        <button className={`l pl20 pr20   ${className}`} style={{ ...style }}>
            Message
            <svg className='ml10' style={{ fill: "none" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width={32} height={32} strokeWidth={1.25}> <path d="M15 10l-4 4l6 6l4 -16l-18 7l4 2l2 6l3 -4"></path> </svg>
        </button>
    )
}

export default Btn_open_sp_chat
