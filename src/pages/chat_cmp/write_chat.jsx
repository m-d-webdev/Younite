import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux'
import { add_message, Set_chat_viewed } from '../../slices/chatSlice';
import { getSocket } from '../../config/socket';
function Write_chat({ GessMessage }) {
    const { focused_data } = useSelector(s => s.ChatReducer);
    const { _id, blockedList } = useSelector(s => s.User);
    const [message, setMessage] = useState('');
    const [isTypingEventSent, setisTypingEventSent] = useState(false)
    const dispatch = useDispatch()
    function handelCheckKey(e) {
        if (e.key == "Enter") {
            if (message != "") {
                return sendMessage();
            }
        }
    }

    useEffect(() => {
        if (GessMessage != "F") {
            setMessage(GessMessage);
            InpRef.current?.focus();
        }
    }, [GessMessage])
    function handelSetMessage(e) {
        if (e.target.value != "") {
            if (!isTypingEventSent) {
                socket.emit("typing-message", {
                    recieverId: focused_data._id,
                    senderId: _id
                })
                setisTypingEventSent(true)
            };
        } else {
            handelCancelTyping()
        }
        setMessage(e.target.value);
    };

    const socket = getSocket();
    const InpRef = useRef();

    const handelCancelTyping = e => {
        if (isTypingEventSent) {
            socket.emit("cancel-typing-message", {
                recieverId: focused_data._id,
                senderId: _id
            });
            setisTypingEventSent(false)
        }
    }


    const sendMessage = async () => {
        // const { blockedList } = getState().User;
        if (blockedList.some(f => f.Blocked_person == focused_data._id)) return socket.emit('user-blocked-me', { _id })
        const createAt = new Date().toISOString()
        let messageFormat = {
            senderId: _id,
            recieverId: focused_data._id,
            type: "text",
            savedInDb: false,
            message,
            _id: `${createAt}${_id}`,
            createAt,
        }
        handelCancelTyping()
        socket.emit("new-massage", { ...messageFormat });
        dispatch(add_message({ ...messageFormat, me: _id }));
        setMessage('');
    }

    useEffect(() => {
        setMessage("")
        InpRef.current?.focus();
    }, [focused_data])
    return (
        <div className='wmia br20  p5 border  r-b-c bg-l'>
            {
                focused_data != null &&
                <>
                    <input onBlur={handelCancelTyping} ref={InpRef} value={message} onKeyUp={handelCheckKey} onChange={handelSetMessage} type="text" className='wmia p10 ' style={{ border: "none" }} placeholder='Type a message' />
                    <AnimatePresence>
                        {
                            message.length > 0 &&
                            <motion.button
                                initial={{
                                    scale: 0,
                                    opacity: 0
                                }}
                                exit={{
                                    scale: .7,
                                    opacity: 0,
                                    transition: {
                                        duration: .2
                                    }
                                }}
                                animate={{
                                    scale: 1,
                                    opacity: 1,
                                    transition: {
                                        duration: .2
                                    }
                                }}
                                className='bg-d curP p5 br50' onClick={sendMessage}>
                                <svg className='w20 h20' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style={{ fill: "none", stroke: "var(--bg-primary)" }} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width={32} height={32} strokeWidth={1.25}> <path d="M15 10l-4 4l6 6l4 -16l-18 7l4 2l2 6l3 -4"></path> </svg>
                            </motion.button>
                        }
                    </AnimatePresence>
                </>
            }
        </div>
    )
}

export default Write_chat
