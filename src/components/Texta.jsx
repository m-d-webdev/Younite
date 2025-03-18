import React, { useEffect, useRef } from 'react'

const Texta = React.forwardRef(({ style = {}, onChange, className, value, id = "", placeholder }, ref) => {
    function handelChangeTextarea(e) {
        e.target.style.height = "auto";
        e.target.style.height = `${e.target.scrollHeight}px`;
        onChange(e);
    }
    const inputRef = ref ? ref : useRef(null)
    useEffect(() => {
        inputRef.current.style.height = "auto"
        inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;

    }, [value])

    return (
        <textarea id={id} value={value} ref={inputRef} placeholder={placeholder} onChange={handelChangeTextarea} className={className} style={{ padding: "0", minHeight: "none", width: "100%", resize: "none", ...style }} ></textarea>
    )
})

export default Texta
