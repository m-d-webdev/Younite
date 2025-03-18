import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import api from "../../config/axios"
import Texta from '../../components/Texta';
import { motion, AnimatePresence } from 'framer-motion';
import L_loader from '../../components/L_loader';
import { useNavigate } from 'react-router-dom';
import { open_alert } from '../../slices/alert_cmp';


function Create_Post() {
    const { profile_img, FirstName, LastName } = useSelector(s => s.User);
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [content, setcontent] = useState("");
    const [title, settitle] = useState("");
    const [isSendingBlog, setSendingBlog] = useState(false);
    const submutBlog = async (e) => {
        e.target.disabled = true;
        setSendingBlog(true)
        await api.post("/blog", { title, content }).then(res => {
            setSendingBlog(false)
            dispatch(open_alert([, "Your blog has been successfully published "]))
            navigate('/Blogs')
        }).catch(err => {
            setSendingBlog(false)
            console.log('error submit blog =>', err.message);
            dispatch(open_alert([, "Failed to publish the blog  " + err.message]))

        })
    }
    const handelWritBlog = (e) => {
        setcontent(e.target.value)
    }

    return (
        <div className='c-s-c wmia p20' style={{ maxWidth: "1000px" }}>
            <div className="wmia c-c-c">
                <motion.img animate={{ scale: [.4, 1], transition: { duration: .5 } }} src={profile_img} className='w60 h60 imgCercle' alt="" />
                <h1 className='mt10'>{FirstName} {LastName}</h1>
            </div>
            <div className="wmia mt20  r-s-s p10">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M420-160v-520H200v-120h560v120H540v520H420Z" /></svg>
                <Texta placeholder={"Blog's subject..."} className={'ml10'} style={{ border: "none" }} onChange={e => settitle(e.target.value.toUpperCase())} />
            </div>
            <div className="c-s-s wmia p10 mt20">
                <motion.div
                    initial={{ minHeight: "0", height: "0" }}
                    animate={{ minHeight: "500px", height: "auto" ,transition:{duration:.8}}}
                    className="p10 wmia overHdn br10 c-s-s" style={{ minHeight: "500px", border: "solid 1px var(--border-color)" }}>
                    <h1 className='mt10 pb10 ml10 r-s-c'
                        style={{
                            outline: "none",
                            fontSize: "20px ",
                            borderBottom: "solid 1px var(--border-color)"
                            , fontFamily: '"Inter", serif'
                        }}
                    >

                        <svg xmlns="http://www.w3.org/2000/svg" className='mr20' viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="m360-313 167-167-167-167-167 167 167 167Zm0 113L80-480l280-280 240 240h280v80H600L360-200Zm0-280Z" /></svg>
                        {title}
                    </h1>

                    <Texta
                        animate={{ height: [0, 'auto'] }}
                        onChange={handelWritBlog}
                        placeholder="blog body..."
                        className={'mt10 ml10'}
                        style={{ border: "none", minHeight: "" }}
                    />
                </motion.div>

                <div className="wmia mt20 r-e-c">
                    <AnimatePresence>
                        {
                            (content != "" && title != "") &&
                            <motion.button
                                onClick={submutBlog}
                                animate={{
                                    y: [100, 0],
                                    opacity: [0, 1]
                                }}
                                exit={{
                                    y: [0, 100],
                                    opacity: [1, 0]
                                }}

                                className='bl w200 p10'
                            >
                                {
                                    isSendingBlog ?
                                        <L_loader className={''} style={{ borderColo: "#fff" }} />
                                        :
                                        <>
                                            Submit Blog
                                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="m700-300-57-56 84-84H120v-80h607l-83-84 57-56 179 180-180 180Z" /></svg>
                                        </>
                                }

                            </motion.button>
                        }
                    </AnimatePresence>

                </div>
            </div>

        </div >
    )
}

export default Create_Post
