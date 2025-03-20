import React, { useEffect, useMemo, useRef, useState } from 'react'
import Chats_refs from './chat_cmp/chats_ref'
import Chat_content from './chat_cmp/Chat_content'
import { useDispatch, useSelector } from 'react-redux'
import { focusOnUser } from '../slices/chatSlice'
import { AnimatePresence, motion } from 'framer-motion'
import Phone_chats_ref from './chat_cmp/Phone_chats_ref'



function Chat_page() {
    const { focused_data, chats_refs } = useSelector(s => s.ChatReducer)
    const MessgasPageRef = useRef(null);
    const dispatch = useDispatch()
    const [isFormedWarning, setisFormedWarning] = useState(localStorage.getItem("saveMessagesWarning") || false)
    const { isWorkinOnPhone } = useSelector(s => s.WindowSizeSlice);


    useEffect(() => {
        const observer = new IntersectionObserver(([e]) => {
            if (!e.isIntersecting) {
                dispatch(focusOnUser(null));
            }
        }, { threshold: .5 });
        if (MessgasPageRef.current) {
            observer.observe(MessgasPageRef.current)
        };
        let now = new Date()
        if (isFormedWarning) {
            if (new Date(isFormedWarning) < now.setDate(now.getDate() - 1)) {
                setisFormedWarning(false);

            }
        }
    }, []);



    const WarningSaveMessage = () => {
        const SetGetWarnnig = () => {
            setisFormedWarning(true)
            localStorage.setItem('saveMessagesWarning', `${new Date().toDateString()}`)
        }

        return (
            <div className="backendMer">
                <motion.div
                    initial={{
                        scale: 1.2,
                        opacity: 0
                    }}
                    exit={{
                        scale: 1.2,
                        opacity: 0
                    }}
                    animate={{
                        scale: 1,
                        opacity: 1
                    }}
                    className="w400  c-c-c p20 br10 bg-l">

                    <h1 className='mb15 fw900' style={{ color: 'red' }}>Important things to keep in mind </h1>
                    <p className='text-center'>
                        The messages you send are not saved in the database instantly but are stored periodically. Please ensure your messages are registered by using the save icon before closing the platform.
                    </p>
                    <button className='mt20 c-b curP fw900' style={{ fontSize: "17px" }} onClick={() => SetGetWarnnig()}>
                        Got it
                    </button>
                </motion.div>
            </div>
        )
    }
    return (
        <>
            {
                isWorkinOnPhone ?
                    <div ref={MessgasPageRef} className='wmia c-s-s ' style={{ height: "100%" }}>
                        {
                            useMemo(() => {
                                return <Phone_chats_ref />
                            }, [chats_refs])
                        }
                        {
                            useMemo(() =>
                                <Chat_content />
                                , [focused_data])
                        }
                        <AnimatePresence>
                            {
                                !isFormedWarning &&
                                <WarningSaveMessage />
                            }
                        </AnimatePresence>
                    </div>
                    :
                    <div ref={MessgasPageRef} className='wmia r-s-s ' style={{ height: "100%" }}>
                        {
                            useMemo(() => {
                                return <Chats_refs />
                            }, [chats_refs])
                        }
                        {
                            useMemo(() =>
                                <Chat_content />
                                , [focused_data])
                        }
                        <AnimatePresence>
                            {
                                !isFormedWarning &&
                                <WarningSaveMessage />
                            }
                        </AnimatePresence>
                    </div>
            }
        </>

    )
}

export default Chat_page
