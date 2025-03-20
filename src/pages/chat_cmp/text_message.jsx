import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Abbreviator_text, TimeAgo } from '../../components/Abbreviator';
import { motion } from 'framer-motion'
const Text_message = ({ t }) => {
    // console.log(t);

    const { _id } = useSelector(s => s.User);
    const { focused_data } = useSelector(s => s.ChatReducer)
    const isMyMessage = t.senderId == _id;
    const { isWorkinOnPhone } = useSelector(s => s.WindowSizeSlice);

    return (
        <motion.div
            className={`wmia  mb20  ${!isMyMessage ? "r-s-s" : "r-e-s"} `}>
            {
                <div style={{ maxWidth: "48%" }} className={`  ${!isMyMessage ? "c-s-s" : "c-s-e"} `}>
                    <div className="r-s-s">
                        {
                            !isMyMessage &&
                            <img src={focused_data.profile_img} style={{ minWidth: "30px" }} className='w30 h30 mr15 imgCercle' alt="" />
                        }
                        <p className='p10 fw900 mt10 text br10'
                            style={isMyMessage ?
                                {
                                    border: "10px 0 10px 10px ",
                                    lineHeight: 1.35,
                                    backgroundColor: "var(--bg-third)",
                                }
                                :
                                {
                                    borderRadius: "0 10px 10px 10px",
                                    lineHeight: 1.35,
                                    backgroundColor: "#000",
                                    color: "#fff"
                                }
                            }>
                            {t.message}
                        </p>
                    </div>
                    <div className="r-s-c">
                        {
                            isMyMessage &&
                            <p style={{ opacity: ".8", color: t.viewed ? "var(--bg-blue)" : " var(--bg-secondary)", fontSize: isWorkinOnPhone ? "9px  " : "12px" }} className='mt5  ml10 mr10'>{
                                t.viewed ? "seen" : t.received ? "received" : "sent"
                            }
                            </p>
                        }
                        <p style={{ opacity: ".7", fontSize:isWorkinOnPhone ?"9px": "12px" }} className='mt5  ml10 mr10'>{new Date(t.createAt).toLocaleTimeString()}</p>
                    </div>
                </div>
            }
        </motion.div >
    )
}

export default Text_message
