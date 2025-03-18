import React, { useEffect, useRef } from 'react'
import { TimeAgo } from './Abbreviator';
import { useDispatch, useSelector } from 'react-redux';
import api from '../config/axios';
import Btn_addToContact from './btn_addToContact';
import { BlockUser } from '../slices/userSlice';


function Single_Notification({ n, onClick }) {

    let oldViwedNotificatioList = JSON.parse(localStorage.getItem('n')) || [];
    const SingleNotRef = useRef();
    const dispatch = useDispatch();

    const NotfiIcone = () => {
        if (['like', 'comment', 'replay', "new", "joined", "start_following", "checked_followings", "checked_followers", "viewed_profile", "new-contact-req", "new-contact"].includes(n.type)) {
            return <img src={n.sender.profile_img} style={{ minWidth: "40px" }} className='w40 h40 imgCercle mr10' alt="" />
        }
        return <img src="https://i.pinimg.com/236x/9f/da/d4/9fdad4234821712259011d224af899a4.jpg" alt="" />
    }

    return (
        <div onClick={(e) => onClick(n)} ref={SingleNotRef} className="wmia p10 hoverEff1 mb15 br10  c-s-s">
            <div className='wmia r-b-s '>
                <div className="r-s-s">
                    <NotfiIcone />
                    <div className="c-s-s">
                        <strong className='wf900'>{n.message}</strong>
                        <p className='m' style={{ opacity: ".8", fontSize: "12px" }}>{TimeAgo(n.createAt)}</p>
                    </div>
                </div>
                {
                    !oldViwedNotificatioList.includes(n._id) &&
                    <span style={{
                        padding: "3px",
                        backgroundColor: ["start_following", "new"].includes(n.type) ? "red" : ["checked_followings", "checked_followers", "viewed_profile"].includes(n.type) ? "var(--bg-blue)" : "var(---)"
                    }} className="ml10 imgCercle">
                    </span>
                }
            </div >
            {
                (['comment', 'replay', "new", "start_following"].includes(n.type)) &&
                <>
                    <button className='curP'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style={{ fill: "none" }} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width={32} height={32} strokeWidth={1.25}> <path d="M4 12v-6a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v8"></path> <path d="M20 18h-17"></path> <path d="M6 15l-3 3l3 3"></path> </svg>
                    </button>
                </>
            }
            {
                (['new-contact-req'].includes(n.type)) &&
                <div className='wmia r-p-c mt5'>
                    <Btn_addToContact contactId={n.senderId} />
                    <button className='bg-r ' onClick={() => dispatch(BlockUser(n.senderId))}>
                        <svg className='f-rl curP mr10' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q54 0 104-17.5t92-50.5L228-676q-33 42-50.5 92T160-480q0 134 93 227t227 93Zm252-124q33-42 50.5-92T800-480q0-134-93-227t-227-93q-54 0-104 17.5T284-732l448 448Z" /></svg>
                        restrict
                    </button>
                </div>
            }
        </div>
    )
}

export default Single_Notification
