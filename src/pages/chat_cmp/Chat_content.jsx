import { useEffect, useMemo, useRef, useState } from 'react'
import Text_message from './text_message'
import Write_chat from './write_chat'
import { useDispatch, useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import Chat_header from './chat_header'
import Logo from '../../components/logo';
import { open_zoomer } from '../../slices/zoomer'
import L_loader from '../../components/L_loader'
import BtnSyncMessages from '../../components/btnSyncMessages'
import { AddTocontcatThunk, BlockUser, UnBlockUser } from '../../slices/userSlice'
function Chat_content() {
    const { All_chatsAndContents, focused_data, isLoadingChat } = useSelector(s => s.ChatReducer)

    const sliderChatRef = useRef();
    const dispatch = useDispatch();
    const [GessMessage, setGessMessage] = useState('');
    const { contacts, blockedList, blockersList } = useSelector(s => s.User)
    useEffect(() => {
        sliderChatRef.current?.scroll({ top: sliderChatRef.current.scrollHeight, left: 0, behavior: "smooth" });
    }, [All_chatsAndContents[focused_data?._id]]);

    useEffect(() => {
        sliderChatRef.current?.scroll({ top: sliderChatRef.current.scrollHeight, left: 0 });
        setGessMessage('')
    }, [focused_data]);

    return (
        <div className='wmia bg-fifth  c-b-s p5  hmia '>
            <div className="wmia r-b-c">
                {
                    focused_data ?
                        <Chat_header />
                        :
                        <div className=""></div>
                }
                <BtnSyncMessages />
            </div>
            {
                focused_data ?
                    <>
                        {
                            (!contacts.includes(focused_data._id) && !blockedList.some(u => u.Blocked_person == focused_data._id)) &&
                            <div className="wmia bg-l br10 r-b-c p10 mt10">
                                <h1 className='fw900'>These senders aren't in your contacts. Save or restrict them.</h1>
                                <div className="r-p-c">
                                    <button onClick={() => dispatch(AddTocontcatThunk(focused_data._id))} className='bg-g curP mr20 w100'>
                                        <svg className='mr10' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" /></svg>                                        Confirm
                                    </button>
                                    <button className='bg-r ' onClick={() => dispatch(BlockUser(focused_data._id))}>
                                        <svg className='f-rl curP mr10' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q54 0 104-17.5t92-50.5L228-676q-33 42-50.5 92T160-480q0 134 93 227t227 93Zm252-124q33-42 50.5-92T800-480q0-134-93-227t-227-93q-54 0-104 17.5T284-732l448 448Z" /></svg>
                                        restrict
                                    </button>
                                </div>
                            </div>
                        }
                        {
                            blockedList.some(u => u.Blocked_person == focused_data._id) &&
                            <div className="wmia bg-l br10 r-b-c p10 mt10">
                                <h1 className='fw900'>You have blocked this user. If you'd like to reconnect, you can unblock them anytime</h1>
                                <div className="r-p-c">
                                    <button onClick={() => { dispatch(UnBlockUser(focused_data._id)) }} className='bg-g curP mr20 p10 w200'>
                                        Lift the block
                                        <svg className='ml10' version="1.1" viewBox="0 0 2048 2048" width="128" height="128" xmlns="http://www.w3.org/2000/svg">
                                            <path transform="translate(1015,127)" d="m0 0h16l34 2 35 4 26 5 29 8 28 10 17 7 28 14 23 13 30 20 17 13 13 11 12 11 21 21 7 8 11 13 10 13 12 17 11 17 10 17 14 27 8 19 3 13v15l-3 10-5 10-8 11-10 10-8 6-8 4-12 3h-23l-13-4-10-6-10-9-6-7-8-13-20-36-7-10-12-17-11-14-8-9v-2h-2l-7-8-10-10-11-9-17-13-19-12-22-12-17-8-21-8-21-6-31-6-30-3h-37l-27 3-24 5-27 8-20 8-25 12-22 14-14 10-14 11-15 14-13 13-9 11-10 12-7 11-11 17-6 11-14 29-9 24-7 29-4 30-1 13-1 27-1 151h741l42 2 20 2 18 3 23 7 24 10 17 9 15 10 19 14 14 12 19 19 9 11 12 17 9 15 12 23 10 25 6 22 3 15 2 27 1 500v49l-1 147-2 36-4 24-6 23-6 16-12 26-8 13-8 12-12 17-9 10-7 8-7 7-11 9-7 6-16 11-15 9-19 10-25 9-25 7-25 4-25 2-33 1h-895l-20-1-30-4-22-6-19-7-16-7-23-13-17-12-13-11-10-9-17-17-11-14-10-13-12-20-8-16-10-24-7-24-4-23-2-28v-713l2-19 6-26 6-20 6-15 12-25 10-16 11-16 13-16 7-8 12-12 14-11 10-7 19-12 23-12 26-10 20-6 26-4 32-2 29-1-1-31v-42l1-100 2-31 5-35 9-38 10-30 10-24 14-29 11-20 11-18 9-12 8-11 10-13 10-12 7-8 5-6h2l2-4 15-14 11-10 14-11 21-16 18-12 27-16 24-12 27-11 30-10 33-8 25-4 32-3zm-414 721-39 1-17 1-16 3-20 8-14 9-11 9-10 9-11 13-10 16-7 15-4 13-2 12-1 12-1 63v624l2 27 5 23 7 16 10 16 11 13 11 10 13 9 17 9 16 6 12 3 27 3 52 1 854-1 22-2 20-4 19-7 13-7 12-9 12-11 12-14 8-13 6-12 5-19 3-22 1-29v-663l-1-19-3-16-6-18-8-16-8-12-11-12-5-5-9-8-19-11-16-6-21-5-25-2-52-1z" />
                                            <path transform="translate(1007,1187)" d="m0 0h31l20 4 13 5 15 8 13 10 11 11 11 15 11 21 5 17 2 11v21l-4 22-6 16-7 13-11 16-12 13-6 4h-2l-1 5-1 28-1 108-1 25-3 15-8 15-8 10-8 7-7 5-14 4-6 1h-22l-15-5-12-7-11-11-7-11-4-9-3-14-1-11v-146l-5-10-18-18-10-14-10-19-5-16-2-12-1-14 2-17 5-19 7-16 9-14 7-9 13-13 18-12 17-8 16-4z" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        }

                        <div ref={sliderChatRef} style={{ maxHeight: "100%", overflow: "auto" }} className="wmia p20  hmia  scrl_none c-s-s">
                            {
                                isLoadingChat ?
                                    <div className="wmia hmia c-c-c">
                                        <L_loader />
                                        <h1 className="mt10">
                                            Retrieving chat history... Please wait.
                                        </h1>
                                    </div>
                                    :
                                    <>
                                        {
                                            All_chatsAndContents[focused_data._id]?.length > 0 ?
                                                All_chatsAndContents[focused_data._id].filter((a, b) => b > All_chatsAndContents[focused_data._id].length - 20).map(m => {
                                                    return <Text_message t={m} key={m.createAt} />
                                                })
                                                :
                                                <>
                                                    <div className="wmia hmia c-c-c c-l">
                                                        <motion.img
                                                            animate={{ scale: [0, 1] }}
                                                            onClick={() => dispatch(open_zoomer(focused_data.profile_img))}
                                                            src={focused_data.profile_img} alt="" style={{ width: "150px", height: "150px" }} className="imgCercle" />
                                                        <span className='mt10'>
                                                            Begin a conversation with
                                                            <strong className='ml5 fw900'>  {focused_data.LastName}</strong>
                                                        </span>

                                                        <div className="cntSuggMessages wmia r-w-p-s">
                                                            <span
                                                                onClick={e => setGessMessage(e.target.innerText)}
                                                            >
                                                                Hey! How are you
                                                            </span>
                                                            <span
                                                                onClick={e => setGessMessage(e.target.innerText)}
                                                            >
                                                                Good morning!
                                                            </span>
                                                            <span
                                                                onClick={e => setGessMessage(e.target.innerText)}
                                                            >
                                                                Hi {focused_data.FirstName}, I hope you're doing well!
                                                            </span>
                                                            <span
                                                                onClick={e => setGessMessage(e.target.innerText)}
                                                            >
                                                                Hey {focused_data.FirstName}, I wanted to reach out and introduce myself.
                                                            </span>
                                                            <span
                                                                onClick={e => setGessMessage(e.target.innerText)}
                                                            >
                                                                Hey {focused_data.FirstName}! Just wanted to say hi 😊
                                                            </span>
                                                            <span
                                                                onClick={e => setGessMessage(e.target.innerText)}
                                                            >
                                                                Hi {focused_data.FirstName}, I’m looking forward to working with you!
                                                            </span>
                                                            <span
                                                                onClick={e => setGessMessage(e.target.innerText)}
                                                            >
                                                                Hello {focused_data.FirstName}, I wanted to discuss [ topic ]. Let me know when you're available!
                                                            </span>
                                                        </div>
                                                    </div>
                                                </>
                                        }
                                    </>
                            }
                        </div>
                        {
                            (!blockedList.some(u => u.Blocked_person == focused_data._id) &&
                                contacts.includes(focused_data._id) && !blockersList.some(u => u.Blocker == focused_data._id)) &&
                            <Write_chat GessMessage={GessMessage} />
                        }
                        {
                            blockersList.some(u => u.Blocker == focused_data._id) &&
                            <div className="wmia r-c-c">
                                <h1>This presone have blocked you</h1>
                            </div>
                        }
                    </> :
                    <div className='wmia hmia c-c-c'>
                        <img className='w500' src="/media/5911276_2992779-removebg-preview (1).png" alt="" />
                        <div className="r-s-e w600">
                            <Logo className="w100 h100" />
                            <p className='fw600 text-center mb5' style={{ fontSize: "15px" }}>
                                Welcome to Younite for Chat! Send a message, and your friends will receive it instantly. Please note that messages are currently not encrypted, so avoid sharing sensitive information.
                            </p>
                        </div>
                    </div>
            }

        </div >
    )
}

export default Chat_content
