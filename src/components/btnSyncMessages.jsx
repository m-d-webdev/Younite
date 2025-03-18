import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { motion } from "framer-motion"
import { SyncMessages } from '../slices/chatSlice'
function BtnSyncMessages() {
    const { isSyncingMessages, isAllSaved } = useSelector(s => s.ChatReducer)
    const dispatch = useDispatch()
    const handelSendToSync = () => {
        if (!isSyncingMessages) {
            dispatch(SyncMessages())
        }
    }

    return (
        <button onClick={handelSendToSync} className='w200 btnAsync psr curP ml10 border'>
            {
                isSyncingMessages ?
                    <>
                        <motion.svg
                            animate={{ rotate: 360 }}
                            transition={{
                                repeat: Infinity, // Infinite loop
                                duration: 1, // 2 seconds per full rotation
                                ease: "linear" // Smooth constant speed
                            }}
                            className={'mr10 '}
                            xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M212-239q-43-48-67.5-110T120-480q0-150 105-255t255-105v-80l200 150-200 150v-80q-91 0-155.5 64.5T260-480q0 46 17.5 86t47.5 70l-113 85ZM480-40 280-190l200-150v80q91 0 155.5-64.5T700-480q0-46-17.5-86T635-636l113-85q43 48 67.5 110T840-480q0 150-105 255T480-120v80Z" /></motion.svg>
                        Syncing ...
                    </>
                    :
                    <>

                        <svg className='mr5 ' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style={{ fill: "none" }} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width={24} height={24} strokeWidth={2}> <path d="M7 18a4.6 4.4 0 0 1 0 -9a5 4.5 0 0 1 11 2h1a3.5 3.5 0 0 1 0 7h-1"></path> <path d="M9 15l3 -3l3 3"></path> <path d="M12 12l0 9"></path> </svg>
                        Sync Messages
                        {
                            isAllSaved ?
                                <>
                                    <div
                                        style={{
                                            position: "absolute",
                                            top: "28px",
                                            opacity: 0
                                        }}
                                        className="wmia statusAsyncElm p5 bg-g br5">
                                        <p className='c-l'>All good.</p>
                                    </div>
                                    <span className='ml10 bg-g br50 ' style={{ padding: "3px" }}></span>
                                </>
                                :
                                <>
                                    <div
                                        style={{
                                            position: "absolute",
                                            top: "28px",
                                            opacity:0
                                        }}
                                        className="wmia  statusAsyncElm p5 bg-d br5">
                                        <p className='c-l'>Something to sync!</p>
                                    </div>
                                    <span className='ml10 bg-r br50 ' style={{ padding: "3px" }}></span>
                                </>
                        }
                    </>
            }

        </button >
    )
}

export default BtnSyncMessages
