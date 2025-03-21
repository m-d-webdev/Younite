import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BlockUser, UnBlockUser } from '../slices/userSlice';
import L_loader from './L_loader';
import { motion } from 'framer-motion'
import { ConfirmAction } from './Confimation';
const Contact_menu = React.forwardRef(({ name, contactId, className, style = {} }, ref) => {
    const {
        contacts,
        requestsContact,
        blockersList,
        blockedList
    } = useSelector(s => s.User)
    const dispatch = useDispatch();
    const [isBlockingUser, setBlockingUser] = useState(false)
    const handelBlockuser = async (e) => {
        setBlockingUser(true)
        await dispatch(BlockUser(contactId))
        setBlockingUser(false)
    }
    const handelUnBlockuser = async (e) => {
        e.preventDefault();
        setBlockingUser(true)
        await dispatch(UnBlockUser(contactId))
        setBlockingUser(false)
    }

    return (
        <motion.div
            initial={{
                scale: 0,
                opacity: 0
            }}
            exit={{
                scale: 0,
                opacity: 0
            }}
            animate={{
                scale: 1,
                opacity: 1,
                transformOrigin: "top center"
            }}
            ref={ref} style={style} className={`p10 bg-l br10 ${className}`}>
            {

                blockedList.some(u => u.Blocked_person == contactId) ?
                    <button className='wmia p19 mb10 ' onClick={handelUnBlockuser}>
                        {
                            isBlockingUser ?
                                <>
                                    <L_loader className={'mr10'} />
                                    Unblocking
                                </>
                                :
                                <>
                                    <svg className='f-g mr10' version="1.1" viewBox="0 0 2048 2048" width="128" height="128" xmlns="http://www.w3.org/2000/svg">
                                        <path transform="translate(1015,127)" d="m0 0h16l34 2 35 4 26 5 29 8 28 10 17 7 28 14 23 13 30 20 17 13 13 11 12 11 21 21 7 8 11 13 10 13 12 17 11 17 10 17 14 27 8 19 3 13v15l-3 10-5 10-8 11-10 10-8 6-8 4-12 3h-23l-13-4-10-6-10-9-6-7-8-13-20-36-7-10-12-17-11-14-8-9v-2h-2l-7-8-10-10-11-9-17-13-19-12-22-12-17-8-21-8-21-6-31-6-30-3h-37l-27 3-24 5-27 8-20 8-25 12-22 14-14 10-14 11-15 14-13 13-9 11-10 12-7 11-11 17-6 11-14 29-9 24-7 29-4 30-1 13-1 27-1 151h741l42 2 20 2 18 3 23 7 24 10 17 9 15 10 19 14 14 12 19 19 9 11 12 17 9 15 12 23 10 25 6 22 3 15 2 27 1 500v49l-1 147-2 36-4 24-6 23-6 16-12 26-8 13-8 12-12 17-9 10-7 8-7 7-11 9-7 6-16 11-15 9-19 10-25 9-25 7-25 4-25 2-33 1h-895l-20-1-30-4-22-6-19-7-16-7-23-13-17-12-13-11-10-9-17-17-11-14-10-13-12-20-8-16-10-24-7-24-4-23-2-28v-713l2-19 6-26 6-20 6-15 12-25 10-16 11-16 13-16 7-8 12-12 14-11 10-7 19-12 23-12 26-10 20-6 26-4 32-2 29-1-1-31v-42l1-100 2-31 5-35 9-38 10-30 10-24 14-29 11-20 11-18 9-12 8-11 10-13 10-12 7-8 5-6h2l2-4 15-14 11-10 14-11 21-16 18-12 27-16 24-12 27-11 30-10 33-8 25-4 32-3zm-414 721-39 1-17 1-16 3-20 8-14 9-11 9-10 9-11 13-10 16-7 15-4 13-2 12-1 12-1 63v624l2 27 5 23 7 16 10 16 11 13 11 10 13 9 17 9 16 6 12 3 27 3 52 1 854-1 22-2 20-4 19-7 13-7 12-9 12-11 12-14 8-13 6-12 5-19 3-22 1-29v-663l-1-19-3-16-6-18-8-16-8-12-11-12-5-5-9-8-19-11-16-6-21-5-25-2-52-1z" />
                                        <path transform="translate(1007,1187)" d="m0 0h31l20 4 13 5 15 8 13 10 11 11 11 15 11 21 5 17 2 11v21l-4 22-6 16-7 13-11 16-12 13-6 4h-2l-1 5-1 28-1 108-1 25-3 15-8 15-8 10-8 7-7 5-14 4-6 1h-22l-15-5-12-7-11-11-7-11-4-9-3-14-1-11v-146l-5-10-18-18-10-14-10-19-5-16-2-12-1-14 2-17 5-19 7-16 9-14 7-9 13-13 18-12 17-8 16-4z" />
                                    </svg>
                                    <p className='c-g'> Lift the block</p>
                                </>
                        }
                    </button>
                    :
                    <button className='wmia p19 mb10 ' onClick={() => ConfirmAction(`Do you really want to block ${name}?`, "", () => handelBlockuser())}>
                        {
                            isBlockingUser ?
                                <>
                                    <L_loader className={'mr10'} />
                                    Blocking
                                </>
                                :
                                <>
                                    <svg className='f-r mr10' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q54 0 104-17.5t92-50.5L228-676q-33 42-50.5 92T160-480q0 134 93 227t227 93Zm252-124q33-42 50.5-92T800-480q0-134-93-227t-227-93q-54 0-104 17.5T284-732l448 448Z" /></svg>
                                    <p className='c-r'> Block this user</p>
                                </>
                        }
                    </button>
            }
        </motion.div>
    )
})

export default Contact_menu
