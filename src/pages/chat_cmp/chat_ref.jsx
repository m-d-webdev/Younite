import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { focusOnUser, Set_chat_viewed } from '../../slices/chatSlice'
import { motion } from 'framer-motion'
import { getSocket } from '../../config/socket';
import { CorrectTime } from '../../components/Abbreviator';
function Chat_ref({ setSenserTop, chat, i }) {

    const dispatch = useDispatch();
    const { _id, contacts } = useSelector(s => s.User)
    const THisChat = useSelector(s => s.ChatReducer.All_chatsAndContents[chat._id]);
    let [counterNoneRead, setcounterNoneRead] = useState(THisChat.reduce((c, e) => e.viewed ? c + 1 : c, 0))
    const { focused_data } = useSelector(s => s.ChatReducer);
    const [isOpnedThisChat, setOpenedThisChat] = useState(focused_data?._id == chat._id)
    useEffect(() => {
        setcounterNoneRead(THisChat.reduce((c, e) => (!e.viewed && e.recieverId == _id) ? c + 1 : c, 0))
    }, [THisChat]);
    // useEffect(()=>{
    //     if (isOpnedThisChat) 
    // } ,[])
    useEffect(() => {
        setOpenedThisChat(focused_data?._id == chat._id);
        (focused_data?._id == chat._id) && setSenserTop(i)
    }, [focused_data])

    const handelSendFocus = async () => {
        if (focused_data?._id != chat._id) {
            const socket = getSocket();
            dispatch(focusOnUser(chat));
            dispatch(Set_chat_viewed({ I_Read_friend_msg: true, id: chat._id, me: _id }))
            socket.emit('friend-viewed-messages', { senderId: _id, recieverId: chat._id })
        }
    }
    return (
        <motion.div
            initial={{
                y: -20,
                opacity: 0
            }}
            animate={{
                y: 0,
                opacity: 1,
                transition: {
                    delay: i * 0.05
                }
            }}
            onClick={handelSendFocus} style={{}} className={`wmia z2  br10 p10 pt20 pb20 r-s-s psr  ${isOpnedThisChat ? "activeCHoosedChatRef" : ""}`}>
            {
                !contacts.includes(chat._id) &&
                <svg
                    style={{
                        position: "absolute",
                        top: -5,
                        left: 0
                    }}

                    version="1.1" viewBox="0 0 2048 2048" width="128" height="128" xmlns="http://www.w3.org/2000/svg">
                    <path transform="translate(865)" d="m0 0h318v3l17 3 30 7 37 11 21 7 28 11 27 13 22 12 24 15 10 7 17 12 17 13 14 12 12 11 10 9 23 23 9 11 11 13 10 13 13 18 10 15 15 26 12 23 12 26 12 31 12 40 6 26 6 39 3 31 1 21 1 58v67h20l26 3 20 6 16 8 13 9 12 11 8 9 10 15 8 15 7 19 5 18 3 19 1 15v35l-2 30-5 29-8 26-7 16-10 19-7 11-12 16h-2l-2 4-14 14-11 9-9 7-15 10-27 13-23 8-4 2-2 9-5 23-13 48-13 37-9 22-13 29-12 22-6 12-16 26-12 19-8 11-9 12-16 21-6 8h-2l-2 4-12 14-7 8-14 14-7 8-17 16-12 9-3 2-1 3 10 3 28 11 22 9 20 9 25 12 18 10 19 12 33 22 25 20 13 11 12 11 8 7 18 18 7 8 9 10 10 13 12 16 12 17 13 21 13 23 14 28 14 33 14 40 8 28 10 41 6 34 6 44 3 31 2 30v53l-5 9-7 11-2 3h-33l-3-12-4-10-2-16-6-70-7-56-6-38-8-37-12-40-11-30-10-23-13-27-14-24-10-16-10-14-10-13-11-13-9-11-7-7-7-8-14-14-8-7-14-12-16-12-22-15-17-11-11-7-5-2-2 1-3-2-8 6-9 8-13 10-10 9-11 9-9 8-14 11-16 13-10 8-14 11-10 9-11 9-14 12-12 10-14 11-17 14-14 11-8 7-9 7-10 8-14 9-15 8-24 8-17 2-1 1h-5l-2-3-11-1-11 2-11 8-3 4v13l5 33 12 62 10 51 8 41 11 57 5 30v12l-9 8-2 7 2 2-1 1h-37l-3-11-4-9-7-27-13-63-12-60-15-81-4-23v-3l-42 7h-28l-24-4-13-3-3 11-7 34-6 28-8 44-8 39-7 37-11 49-4 14-8 18-2 3h-35l1-4 1-1-5-10-7-9-1-7 6-31 7-34 10-53 7-36 9-48 13-63 1-13-2-10-10-10-8-2h-10l-8 2-10 2-6-2h-8l-20-7-12-6-12-8-17-13-16-13-13-11-10-8-17-14-11-9-16-13-11-9-13-11-10-8-13-11-14-11-14-12-14-11-12-10-9-7-13-11-11-9-9-6h-7l-14 7-15 10-13 9-17 12-16 12-11 9-8 8-8 7-19 19-7 8-10 11-9 11-12 16-10 15-12 19-11 21-10 19-12 28-6 15-12 36-11 42-6 36-6 44-4 37-5 70-3 12-7 13 2 1h-40l2-3-4-10-6-11v-57l2-32 4-37 8-50 8-39 12-42 9-27 12-30 12-26 15-29 12-20 16-24 12-17 13-16 8-11h2l2-4 11-12 1-2h2v-2h2l2-4 12-12 8-7 15-13 17-13 10-8 17-12 15-10 21-13 29-16 16-8 22-10 29-11 14-5 11-4h2l-7-8-37-37-7-8-18-20-9-11-14-17-13-18-26-39-13-23-13-24-12-25-14-34-9-26-6-18-17-66-2-4-13-5-19-7-15-8-24-16-13-11-13-12-10-11-10-14-12-20-9-19-8-22-6-25-4-30-1-15v-29l2-22 4-22 4-15 8-21 8-15 8-11 7-8 10-10 18-12 16-8 12-4 16-3 19-2 15-1 1-108 2-42 2-23 10-52 7-28 11-33 9-22 9-20 8-16 12-23 7-11 9-14 17-25 12-15 9-11 12-14 12-13 22-22h2v-2l11-9 10-9 12-9 13-10 24-16 20-12 22-12 27-13 33-13 21-7 28-8 41-9 10-1zm313 1m-217 55-49 2-43 4-30 5-36 9-21 7-27 11-19 9-14 7-23 13-15 10-18 13-13 10-11 9-11 10-8 7-20 20-7 8-8 9-9 11-10 13-9 13-10 15-7 11-15 28-14 30-15 40-5 17-7 36-4 27-3 29-1 20-1 123v244l1 52 2 33 4 36 6 36 7 30 13 41 11 29 9 21 14 29 15 27 11 17 11 16 13 18 11 14 11 13 11 12 12 13 26 26h2v2l8 7 14 12 26 20 15 10 19 12 19 11 26 14 26 12 20 8 28 10 26 7 27 6 36 6 36 4 11 1h40l48-5 28-5 30-7 21-6 38-13 28-12 16-8 25-13 25-15 15-10 16-11 17-13 13-11 8-7 10-9 8-8 3-2v-2l4-2 7-8 13-13v-2h2l7-8 8-10 13-16 10-13 13-19 9-14 10-17 15-28 12-25 11-27 7-18 9-29 8-32 6-32 5-39 2-24 1-19 1-108v-290l-1-32-3-39-5-35-8-34-7-23-12-32-14-30-14-26-14-22-12-17-14-18-12-14-12-13-19-19-11-9-9-8-14-11-18-13-17-11-23-13-15-8-34-15-27-10-24-7-31-7-35-5-22-2-46-2zm-564 628-14 2-11 4-9 7-11 10-8 13-8 18-4 17-2 15-1 15v27l2 24 3 18 4 14 7 17 9 16 9 11 11 13 12 11 13 11 19 12 3 1v-265l-2-10-1-1zm1235 0-6 2-1 12-2 225v38l16-8 11-8 12-9 18-18 12-18 11-21 7-22 4-22 2-22v-44l-3-20-4-15-8-17-10-14-8-8-16-8-21-3zm-933 759-15 6-21 6-20 7-15 5-3 3 12 11 12 9 3 1 1 3 8 7 16 13 10 8 14 11 17 14 10 8 12 10 11 9 13 11 17 14 11 9 10 8 11 9 17 14 13 9 13 8 11 5 11 2 6-1 10-7 11-10 14-19 21-33 10-15 7-11 7-10 9-13 3-8-4-2-40-5-26-5-35-9-33-10-34-13-29-13-31-16-14-8-19-11-3-1zm645-1-16 8-21 11-10 6-16 8-17 8-29 12-37 13-23 7-43 10-51 9-2 2 9 16 7 9 29 44 22 33 9 10 10 9 10 5h13l9-4 11-7 10-7 14-11 17-14 12-9 17-14 11-9 13-11 14-12 9-7 16-13 13-11 8-6v-2l4-2 13-11 20-15 9-8 11-8 5-4 2-6-11-5-24-8-20-7-16-6-10-3zm-318 124-6 8-18 27-8 13-11 17-10 15-8 14-9 13-4 8v5l9 10 16 11 8 4 18 7 13 3 16 1 15-2 12-4 16-7 16-10 10-8 3-4-2-9-9-16-14-23-18-27-11-18-7-10-9-15-3-3z" />
                    <path transform="translate(1026,282)" d="m0 0h52l19 2 17 3 26 7 16 6 24 11 17 10 18 12 13 10 10 9 2 1v2l4 2 12 12 9 11 10 12 12 19 9 16 12 27 8 24 7 28 3 21 1 12v36l-2 24-3 21-8 33-6 20-9 21-9 20-15 27-8 12-9 12-8 10-11 13-9 10-8 8-5 6-8 7-14 12-13 10-12 9-16 10-14 8-14 7-5 4-1 2v72l-2 26-4 16-8 17-12 17-11 12-14 10-10 5-11 4-18 4-9 1h-17l-14-2-15-5-15-8-10-8-10-9-10-13-8-15-6-16-3-14-1-10-1-31v-40l1-41 4-27 5-18 5-13 10-21 10-15 10-13 12-13 12-11 16-12 15-9 29-16 14-9 11-8 10-9 10-10 11-16 9-16 7-18 4-14 2-14v-23l-2-13-5-12-6-10-7-8-10-7-11-5-15-3h-17l-25 4-16 5-21 11-12 9-10 9-8 8-12 16-10 14-8 13-10 14-12 13-13 11-15 7-20 6-11 2h-22l-18-4-16-6-13-8-14-12-10-12-11-18-7-17-3-14-1-10v-10l3-15 4-12 8-18 6-12 10-16 8-12 10-14 13-16 7-8 15-16 3-3h2l1-3 8-7 15-13 19-14 19-12 21-12 25-12 21-8 16-5 26-6 26-4zm10 57-22 2-23 4-23 6-26 10-22 11-14 8-19 13-12 10-10 8-8 8-8 7-14 15-11 13-7 10-12 18-9 16-8 19-2 7v12l3 10 6 10 8 9 10 6 17 4 15-1 8-4 11-9 10-14 8-13 7-11 7-10 11-14 5-5v-2l4-2v-2l4-2 7-7 14-11 14-9 22-12 18-7 22-5 14-2h36l21 3 17 6 15 8 13 10 14 14 10 14 8 16 8 22 3 17 1 17-2 27-5 23-8 23-12 23-10 16-8 10-9 11-14 14-11 9-13 10-15 9-16 8-22 13-14 10-15 14-10 12-9 15-8 20-5 23-3 35v66l2 18 4 13 5 9 7 7 7 5 11 4 6 1h13l13-4 11-8 8-9 4-13 2-25v-80l3-16 4-7 7-7 9-6 24-13 19-11 22-15 16-13 10-9 17-17 14-16 11-15 10-15 8-14 12-26 9-25 6-22 4-23 2-22v-39l-3-25-6-25-10-26-11-22-10-16-9-11-12-13-10-9-13-10-15-10-22-12-23-9-23-6-17-3-22-2z" />
                    <path transform="translate(1007,1099)" d="m0 0h15l19 3 15 5 16 9 13 10 7 7 10 13 8 14 6 16 2 9 1 9v21l-3 16-6 14-10 16-12 15-8 7-12 9-16 8-12 4-15 3h-13l-21-3-16-5-15-8-10-8-10-10-9-11-8-13-8-21-3-15v-22l4-19 8-19 11-16 11-12 15-11 16-8 17-5zm3 58-13 4-11 6-7 8-8 16-2 13 3 14 6 12 4 5 10 8 10 4 11 2h10l13-5 10-8 8-9 5-12 1-6v-13l-3-13-4-8-7-8-13-8-7-2z" />
                    <path transform="translate(1206)" d="m0 0h6l-2 2-4-1z" />
                    <path transform="translate(861)" d="m0 0 3 1h-3z" />
                    <path transform="translate(1793,2047)" d="m0 0" />
                    <path transform="translate(1184,1)" d="m0 0" />
                    <path transform="translate(1204)" d="m0 0" />
                </svg>

            }
            <img src={chat?.profile_img} alt="" style={{ minWidth: "40px" }} className="w40 h40 imgCercle bg-d" />
            <div className="r-b-s hmia ml5 wmia overHdn" style={{ maxWidth: "90%" }} >
                <div className="c-s-s wmia" style={{ maxWidth: "80%" }}>
                    <div className="ovrHdn mb5 wmia r-s-c">
                        <span className='fw900  hoverEff2'
                            style={{
                                fontSize: "15px",
                                display: "inline-block",
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                            }}>
                            {chat?.FirstName} {chat?.LastName}
                        </span>
                    </div>
                    {
                        chat.isTyping ?
                            <p className='r-s-e ml10 c-b fw900'>
                                Typing <span className="dots ml5"></span>
                            </p>
                            :
                            <>
                                {THisChat[THisChat.length - 1]?.message &&
                                    <div className="wmia r-s-c">
                                        <motion.span
                                            initial={{
                                                y: 10,
                                                opacity: 0
                                            }}
                                            animate={{
                                                y: 0,
                                                opacity: 1
                                            }}
                                            className='ml5 fw900'
                                            style={{
                                                display: "inline-block",
                                                whiteSpace: "nowrap",
                                                overflow: "hidden",
                                                textOverflow: "ellipsis",

                                            }}
                                        >

                                            {THisChat[THisChat.length - 1].senderId == _id &&
                                                <strong className='fw900' style={{ opacity: ".7" }}>You : </strong>
                                            }
                                            {THisChat[THisChat.length - 1].message}
                                        </motion.span>
                                    </div>

                                }
                            </>
                    }
                </div>
                {
                    counterNoneRead > 0 ?
                        <div className='c-c-c wauto'>
                            <motion.span animate={{ scale: [0, 1] }} className=' fw900  c-c-c text-center ml5 mb5 bg-g w20 h20 br50 ' style={{ minWidth: "20px", minHeight: "20px", fontSize: "12px" }}>
                                {
                                    counterNoneRead < 99 ?
                                        counterNoneRead
                                        : "+99"
                                }
                            </motion.span>
                            <motion.p style={{ fontSize: "11px" }} animate={{ y: [-15, 0], opacity: [0, 1] }}>
                                {CorrectTime(THisChat[THisChat.length - 1]?.createAt)}
                            </motion.p>
                        </div>
                        :
                        THisChat[THisChat.length - 1]?.createAt &&
                        <p className='fw900 op-9' style={{ fontSize: "11px" }}>
                            {CorrectTime(THisChat[THisChat.length - 1]?.createAt)}

                        </p>
                }

            </div>

        </motion.div>
    )
}

export default Chat_ref
