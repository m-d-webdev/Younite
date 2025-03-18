import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import L_loader from '../components/L_loader';
import Single_Notification from '../components/Single_Notification';
import { _onClickOut } from '../components/Abbreviator';
import { close_notif_bare } from '../slices/NotificationSlice';
import { motion } from 'framer-motion'
import { BringNotificationDesc } from '../slices/CheckNotif';
import { BringViewUserData } from '../slices/viewUser';
import { OpenContact } from '../slices/chatSlice';
import { useNavigate } from 'react-router-dom';
import { Ten } from '../slices/ten_slice';
function Notifications_cmp() {
    const { contacts, blockedList } = useSelector(s => s.User);
    const { isLoading, data } = useSelector(s => s.Notifications);
    let oldViwedNotificatioList = JSON.parse(localStorage.getItem('n')) || [];
    const navigate = useNavigate()
    const cntNotRef = useRef();
    const dispatch = useDispatch()
    const declare_view_notif = () => {

        data.map(
            n => {
                if (!oldViwedNotificatioList.includes(n._id)) {
                    oldViwedNotificatioList.push(n._id);
                }
            }
        );

        localStorage.setItem('n', JSON.stringify(oldViwedNotificatioList));

    }
    useEffect(() => {
        if (cntNotRef.current) {
            _onClickOut(cntNotRef.current, () => dispatch(close_notif_bare()))
        }
        declare_view_notif();
    }, []);

    const HandelOpenNotification = async (n) => {
        if (["new", "like", 'comment', "replay"].includes(n.type)) {
            dispatch(close_notif_bare());
            dispatch(BringNotificationDesc(n));
        }
        if (["joined", "start_following", "checked_followings", "checked_followers", "viewed_profile"].includes(n.type)) {
            dispatch(close_notif_bare());
            dispatch(BringViewUserData(n.senderId));
        }
        
        if (n.type == "new-contact") {
            dispatch(OpenContact(
                n.senderId
            )).unwrap().then(() => {
                dispatch(close_notif_bare());
                navigate('/chat')
            }).catch(err => {                
                dispatch(Ten([false, 'Failed to open chat']))
            })
        }

    }


    return (
        <div className="backendMer">

            <motion.div
                initial={{
                    opacity: 0,
                    x: 200
                }}
                exit={{
                    opacity: 0,
                    x: 100,
                    transition: {
                        type: "keyframes"
                    }
                }}
                animate={{
                    opacity: 1,
                    x: 0,
                    transition: {
                        type: "keyframes"
                    }
                }}
                ref={cntNotRef}
                style={{
                    position: "fixed",
                    top: 0,
                    zIndex: 3,
                    height: "100vh",
                    right: 0,
                    width: "350px",
                    filter: "drop-shadow(-10px 10px 10px var(--filter-color))"
                }}
                className='bg-l   p15 br10 c-s-s'>
                <h1 className="fw900">Notifications</h1>
                {
                    isLoading ?
                        <div className="wmia h100 c-c-c">
                            <L_loader />
                        </div>
                        :
                        <div className='wmia mt20 scrl_none' style={{ maxHeight: "100%", overflow: "auto" }}>
                            {
                                data.map(d => {
                                    if (!(contacts.includes(d.senderId) && d.type == "new-contact-req") && !blockedList.some(b => b.Blocked_person == d.senderId)) {
                                        return <Single_Notification onClick={(e) => HandelOpenNotification(e)} n={d} key={d._id} />
                                    }
                                })
                            }
                        </div>
                }
            </motion.div>
        </div>

    )
}

export default Notifications_cmp
