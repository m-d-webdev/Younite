import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion'
import { focusOnUser } from '../../slices/chatSlice';
import Btn_addToContact from '../../components/btn_addToContact';
import Contact_menu from '../../components/Contact_menu';
import { _onClickOut } from '../../components/Abbreviator';
import { BringViewUserData } from '../../slices/viewUser'
function Chat_header() {
    const { focused_data, connected_friends } = useSelector(s => s.ChatReducer);

    const dispatch = useDispatch();
    const { contacts, blockedList } = useSelector(s => s.User)
    const [Contact_menuVsbl, setContact_menuVsbl] = useState(false)
    const [isConnected, setUserConnected] = useState(connected_friends.includes(focused_data._id));
    useEffect(() => {
        setUserConnected(connected_friends.includes(focused_data._id));
    }, [focused_data, connected_friends])
    const MenuRef = useRef();
    useEffect(() => {
        if (MenuRef.current) {
            _onClickOut(MenuRef.current, () => setContact_menuVsbl(false))
        }

    }, [Contact_menuVsbl])

    return (
        <motion.div
            className='wmia  bg-l  p10 br10 r-b-c'>
            <div className="r-s-s">

                <motion.img onClick={() => dispatch(BringViewUserData(focused_data._id))} src={focused_data.profile_img} className='w40 h40 imgCercle' alt="" />
                <div className="c-s-s">
                    <h1 className='ml10 fw900'
                        style={{ fontSize: "15px" }}
                    >{focused_data.FirstName} {focused_data.LastName}</h1>
                    {
                        isConnected ?
                            <span

                                className='r-s-c mt5 fw900 c-b ml15 curP'
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style={{ fill: "none", stroke: "var(--bg-blue)" }} className='mr5' stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width={24} height={24} strokeWidth={2}> <path d="M7 12l5 5l-1.5 1.5a3.536 3.536 0 1 1 -5 -5l1.5 -1.5z"></path> <path d="M17 12l-5 -5l1.5 -1.5a3.536 3.536 0 1 1 5 5l-1.5 1.5z"></path> <path d="M3 21l2.5 -2.5"></path> <path d="M18.5 5.5l2.5 -2.5"></path> <path d="M10 11l-2 2"></path> <path d="M13 14l-2 2"></path> </svg>
                                Connected
                            </span>
                            : <span
                                className='r-s-c mt5 fw900  ml15 curP'
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className='mr5' style={{ fill: "none", stroke: "var(--bg-secondary)" }} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width={24} height={24} strokeWidth={2}> <path d="M20 16l-4 4"></path> <path d="M7 12l5 5l-1.5 1.5a3.536 3.536 0 1 1 -5 -5l1.5 -1.5z"></path> <path d="M17 12l-5 -5l1.5 -1.5a3.536 3.536 0 1 1 5 5l-1.5 1.5z"></path> <path d="M3 21l2.5 -2.5"></path> <path d="M18.5 5.5l2.5 -2.5"></path> <path d="M10 11l-2 2"></path> <path d="M13 14l-2 2"></path> <path d="M16 16l4 4"></path> </svg>
                                Offline
                            </span>

                    }
                </div>
                {
                    !blockedList.some(u => u.Blocked_person == focused_data._id) &&
                    < Btn_addToContact className={'ml10'} contactId={focused_data._id} />
                }
            </div>
            <div className="r-s-c">
                <div className="psr c-c-c mr20 ">
                    <button onClick={() => setContact_menuVsbl(true)} className=' curP border'>
                        <svg style={{ fill: "none" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width={32} height={32} strokeWidth={1.25}> <path d="M14 4h6v6h-6z"></path> <path d="M4 14h6v6h-6z"></path> <path d="M17 17m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path> <path d="M7 7m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path> </svg>
                    </button>
                    <AnimatePresence>
                        {
                            Contact_menuVsbl &&
                            <Contact_menu name={`${focused_data.FirstName} ${focused_data.LastName}`} ref={MenuRef} contactId={focused_data._id} className={'w200'} style={{ position: "absolute", top: "30px", filter: "drop-shadow(0 0 10px var(--filter-color)" }} />
                        }
                    </AnimatePresence>
                </div>
                <button
                    onClick={() => dispatch(focusOnUser(null))}
                    className='border curP br5'>
                    <svg className='mr5' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style={{ fill: "none" }} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width={32} height={32} strokeWidth={1.25}> <path d="M9 12h6"></path> <path d="M12 3c7.2 0 9 1.8 9 9s-1.8 9 -9 9s-9 -1.8 -9 -9s1.8 -9 9 -9z"></path> </svg>
                    Close this chat
                </button>
            </div>
        </motion.div>
    )
}


export default Chat_header
