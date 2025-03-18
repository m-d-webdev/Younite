import { useState, useEffect, useRef } from "react"
import ReactDOM from 'react-dom'
import { motion, transform } from "framer-motion"
import { _onClickOut } from "../../components/Abbreviator";
import Dev from "../../components/dev";
export function Post_menu({ onClose }) {
    const menuRef = useRef();

    useEffect(() => {
        if (menuRef) {
            _onClickOut(menuRef.current, onClose)

        }
    }, [])
    return (
        <>
            <Dev
                animate={{
                    scale: 1,
                    transformOrigin: "top right"
                }}
                ref={menuRef}
                className="p10 br10 w200 menu_post c-s-s bg-l"
            >
                <button className="p10 r-s-c wmia hoverEff1 mb10">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" className="mr10" fill="undefined"><path d="M200-120v-640q0-33 23.5-56.5T280-840h400q33 0 56.5 23.5T760-760v640L480-240 200-120Zm80-122 200-86 200 86v-518H280v518Zm0-518h400-400Z" /></svg>
                    save
                </button>
                <button className="p10 r-s-c wmia hoverEff1 mb10">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" className="mr10" fill="#FFFFFF"><path d="m791-55-91-91q-49 32-104.5 49T480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-60 17-115.5T146-700l-91-91 57-57 736 736-57 57ZM480-160q43 0 83.5-11t78.5-33L204-642q-22 38-33 78.5T160-480q0 133 93.5 226.5T480-160Zm334-100-58-58q22-38 33-78.5t11-83.5q0-133-93.5-226.5T480-800q-43 0-83.5 11T318-756l-58-58q49-32 104.5-49T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 60-17 115.5T814-260ZM537-537ZM423-423Z" /></svg>
                    Hide
                </button>
                <button className="p10 r-s-c wmia hoverEff1 mb10">
                    <svg version="1.1" viewBox="0 0 2048 2048" className="mr10" xmlns="http://www.w3.org/2000/svg">
                        <path transform="translate(566,383)" d="m0 0h912l38 2 27 3 21 5 19 7 21 11 15 10 11 8 10 9 8 7 8 8 9 11 13 18 12 22 8 19 6 19 3 15 2 21 1 32v583l-1 35-2 30-5 25-7 20-7 16-8 15-14 20-9 11-12 13-4 4h-2v2l-17 13-15 10-21 11-21 7-24 6-18 3-26 2-23 1-501 1-25 1-8 3-10 8-15 10-15 11-6 4-16 11-15 10-22 16-28 19-17 12-18 13-15 10-20 14-18 13-24 16-9 7-10 7-33 22-18 10-15 5-10 2h-26l-16-4-12-5-14-10-9-9-9-12-8-14-5-17-1-7v-37l3-72v-42l-2-2-24-5-15-5-16-7-23-13-16-12-13-12-14-14-9-11-11-15-12-21-8-19-6-18-5-23-2-20-1-21-1-134v-81l1-415 3-26 5-23 5-15 11-24 10-18 10-14 18-21 16-14 16-12 19-11 26-11 15-5 21-4 18-2zm166 85-179 1-23 1-18 3-17 6-13 7-16 12-12 12-10 13-9 16-5 11-5 19-2 14-1 42v602l2 21 5 22 5 12 7 11 11 14 15 15 16 11 16 8 18 6 24 4 22 3 16 4 8 4 5 6 6 12 2 12v29l-3 70-3 52-1 19v14l6-2 11-7 18-13 23-16 15-10 14-10 17-12 23-16 12-8 17-12 32-22 34-24 20-14 19-13 10-7 16-11 23-15 11-6 9-4 13-2h547l23-1 18-2 15-4 16-6 15-9 13-10 10-10 9-12 10-17 4-9 5-21 2-14 1-18 1-176v-332l-1-107-1-25-3-17-7-21-8-15-9-12-12-13-14-11-14-8-14-6-15-4-16-2-48-2z" />
                        <path transform="translate(1007,665)" d="m0 0h18l16 3 12 5 9 6 6 5 7 10 4 9 1 4v21l-4 33-4 28-9 76-7 49-6 51-4 24-3 8-5 5-7 2-9 1h-9l-9-2-6-4-6-8-4-9-5-23-5-37-10-77-15-117v-16l3-10 6-11 8-9 12-9 15-6z" />
                        <path transform="translate(1014,1039)" d="m0 0h18l12 3 13 7 10 9 8 10 6 12 2 7v18l-4 13-8 14-8 10-8 7-11 7-14 5-4 1-14-1-15-5-12-9-9-9-8-14-5-15-1-9 3-14 6-14 11-14 8-8 11-7z" />
                    </svg>
                    Report
                </button>
            </Dev>
        </>

    )
}

