import React, { useEffect, useMemo, useState } from 'react'
import api from "../../config/axios"
import { useDispatch, useSelector } from 'react-redux'
import EmojisBtn from '../../components/emoji_btn'
import { open_zoomer } from '../../slices/zoomer'
import L_loader from '../../components/L_loader'
import { Ten } from '../../slices/ten_slice'
import { useNavigate } from 'react-router-dom'
import { open_alert } from "../../slices/alert_cmp"
import { motion, AnimatePresence } from 'framer-motion'
const CntPostImg = ({ url, isn, postImgs, setpostImgs }) => {
    const [isVisible, setisVisible] = useState(true)
    const handelRemImg = () => {
        setisVisible(false)
        setTimeout(() => {
            setpostImgs(postImgs.filter((e, index) => index != isn))
        }, 200)
    }
    const { isWorkinOnPhone } = useSelector(s => s.WindowSizeSlice);

    return useMemo(() => (
        <div
            className={`psr ${isWorkinOnPhone ? "w-full" : "wkhmsin"}   overHdn mb15`} key={isn} style={isWorkinOnPhone ? {} : { maxWidth: "500px" }}>
            <button onClick={handelRemImg} className='btnClose hoverEff2 br10  p5 bg-rl'>
                <svg style={{ fill: "red" }} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" /></svg>
            </button>
            <AnimatePresence>
                {
                    isVisible &&
                    <motion.img
                        animate={{
                            scale: [.4, 1],
                            opacity: [0, 1],
                            y: [100, 0]
                        }}
                        exit={{
                            scale: [1, .8],
                            opacity: [1, 0],
                            y: [0, 100]
                        }}
                        onClick={() => dispatch(open_zoomer(url))}
                        style={{
                            objectFit: "cover"
                        }}
                        className='wmia hmia ' src={url} key={url} />
                }
            </AnimatePresence>

        </div>
    ), [])
}
function Create_Post() {
    const { profile_img, FirstName, LastName } = useSelector(s => s.User);

    const dispatch = useDispatch()
    const [content, setcontent] = useState("");
    const [title, settitle] = useState("");
    const [postImgs, setpostImgs] = useState([]);
    const [isSendingPost, setSendingPost] = useState(false);


            

    const navigate = useNavigate()


    const handelWritePost = e => {
        e.target.style.height = "auto"
        e.target.style.height = `${e.target.scrollHeight}px`;
        setcontent(e.target.value)
    }

    const handelUploadImgs = (e) => {
        const imgs = e.target.files
        if (!imgs.length > 0) return;
        setpostImgs(olg => ([...olg, ...imgs]));
    }


    const handelSubmitPost = async (e) => {
        e.target.disabled = true;
        setSendingPost(true);
        const F = new FormData();
        postImgs.length > 0 ?
            postImgs.forEach(i => F.append("images", i))
            : F.append("images", [])
        F.append("content", content);
        F.append("title", title);
        api.post('/post/', F)
            .then(res => {
                setSendingPost(false);
                navigate("/")
                dispatch(open_alert([, "Your post has been successfully submited , well publish after review , thank you  "]))

            })
            .catch(err => {
                dispatch(open_alert([false, "Failed to submit the post !"]))
                setSendingPost(false);
                console.log(err.message);
            })
    }

    return (
        <div className='wmia c-s-s p20  ' style={{ maxWidth: "1000px" }}>
            <div className="r-s-s wmia">
                <motion.img animate={{ scale: [.4, 1], transition: { duration: .5 } }} src={profile_img} alt="" className="w60 h60 imgCercle" />
                <h1 className=' fw900 ml10'>{FirstName} {LastName}</h1>
            </div>

            <div className="c-s-s wmia  br10 mt50">
                <strong className='r-s-c'> <svg className='mr10' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M440-280h80v-160h160v-80H520v-160h-80v160H280v80h160v160ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm0-560v560-560Z" /></svg>Create new  Post </strong>
                <motion.div animate={{ y: [50, 0], opacity: [0, 1], transition: { duration: .4 } }} className="wmia mt20 p10 r-s-c">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M420-160v-520H200v-120h560v120H540v520H420Z" /></svg>
                    <motion.input animate={{ width: [0, '100%'], transition: { delay: .6, duration: .8 } }} onChange={(e) => settitle(e.target.value)} className='ml10' type="text" style={{ border: "none" }} placeholder='Give the post a title ... (Optional)' />
                </motion.div>
                <div
                    style={{
                        border: "solid 1px var(--filter-color)",
                    }}
                    className="psr wmia mt20 pt15">
                    <div className="btnClose">
                        <EmojisBtn />
                    </div>
                    <motion.textarea name=""
                        animate={{ opacity: [0, 1], y: [50, 0], transition: { delay: .2, duration: .5 } }}
                        className='wmia p15  scrl_none '
                        onChange={handelWritePost}
                        style={{
                            resize: "none",
                            border: "none",
                            minHeight: "200px",
                            lineHeight: "1.8",
                        }}
                        placeholder={`What's on your mind, ${FirstName}? Share your thoughts here...`}
                        id=""
                    >
                    </motion.textarea>
                </div>
                {

                    <div
                        style={{
                            border: "solid 1px var(--border-color)"
                        }}
                        className="mt20  wmia p10 r-w-p-s br10">
                        {
                            postImgs.map((i, index) => {
                                const url = URL.createObjectURL(i);
                                return <CntPostImg url={url} isn={index} setpostImgs={setpostImgs} postImgs={postImgs} />
                            })
                        }
                    </div>


                }
                <motion.div
                    animate={{ y: [50, 0], opacity: [0, 1], transition: { duration: .6 } }}
                    style={{
                        border: "solid 1px var(--border-color)"
                    }}
                    className="mt10 wmia p10 r-e-c br10">
                    <input

                        onChange={handelUploadImgs}
                        type="file" name="" id="post_imgs" accept='image/*' multiple style={{ display: "none" }} />
                    <label className='r-s-c mr15 p5' htmlFor='post_imgs'>
                        <svg xmlns="http://www.w3.org/2000/svg" className='mr10' viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M480-480ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h320v80H200v560h560v-320h80v320q0 33-23.5 56.5T760-120H200Zm40-160h480L570-480 450-320l-90-120-120 160Zm440-320v-80h-80v-80h80v-80h80v80h80v80h-80v80h-80Z" /></svg>
                        Add Images
                    </label>

                </motion.div>

                <div className="wmia mt50 r-e-c">
                    <AnimatePresence>
                        {
                            (content != "" || postImgs.length > 0) &&
                            <motion.button animate={{ y: [60, 0], opacity: [0, 1] }} exit={{ y: [0, 60], opacity: [1, 0] }} onClick={handelSubmitPost} className='bg-rev-l border r-c-c w200 p10  '>
                                {
                                    isSendingPost ?
                                        <L_loader className={''} style={{ borderColor: "#fff" }} />
                                        :
                                        <>
                                            Post
                                            <svg className='ml10' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="m700-300-57-56 84-84H120v-80h607l-83-84 57-56 179 180-180 180Z" /></svg>
                                        </>
                                }
                            </motion.button>
                        }
                    </AnimatePresence>
                </div>
            </div>

        </div>
    )
}

export default Create_Post
