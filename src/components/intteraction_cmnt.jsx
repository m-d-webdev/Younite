import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import api from '../config/axios'
import { motion, AnimatePresence } from 'framer-motion'
import { add_like_in_local, dislike_in_local } from '../slices/userSlice'
import { GetShortNum } from './Abbreviator'
import { Post_menu } from '../slices/media/posts_menu'
function Interaction_cmnt({ likes_count, ownerId, comment_id, onOpenReplies, replies_count }) {
    const dispatch = useDispatch()
    const { likes } = useSelector(s => s.User)
    const [isSupported, setisSupported] = useState(likes.some(e => e.itemId == comment_id && e.collection_ref == "comments"))
    const [is_ComntMneuVSBL, setis_ComntMneuVSBL] = useState(false)
    const [LocalLikeCount, setLocalLikeCount] = useState(likes_count)
    const [is_sendingLikeReq, setis_sendingLikeReq] = useState(false)

    const handelAddLike = async (e) => {
        if (is_sendingLikeReq) return;
        e.target.disabled = true;
        setis_sendingLikeReq(true);
        setLocalLikeCount(LocalLikeCount + 1)
        setisSupported(true);
        const res = await api.post("/interaction/add_like", {
            collection_ref: "comments",
            itemId: comment_id, ownerId
        });
        dispatch(add_like_in_local({
            collection_ref: "comments",
            itemId: res.data.itemId,
            like_at: res.data.like_at,
            _id: res.data._id
        }))

        e.target.disabled = false;
        setis_sendingLikeReq(false)
    }

    const handel_dislike = async (e) => {
        if (is_sendingLikeReq) return;
        e.target.disabled = true
        setis_sendingLikeReq(true)
        const res = await api.post("/interaction/dislike", { _id: likes.filter(e => e.itemId == comment_id && e.collection_ref == "comments")[0]._id });
        dispatch(dislike_in_local(likes.filter(e => e.itemId == comment_id && e.collection_ref == 'comments')[0]._id))
        setLocalLikeCount(LocalLikeCount - 1)
        setisSupported(false);
        e.target.disabled = false
        setis_sendingLikeReq(false)
    }

    const handelOpenReplies = () => {
        onOpenReplies()
    }

    return (
        <div className='r-b-c mt5 wmia '>
            <div className="">
                <span
                    style={{ cursor: "pointer" }}
                    className=' r-c-c op-7 ml20 pr20'
                    onClick={handelOpenReplies}
                >
                    <svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className='f-no' stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width={32} height={32} strokeWidth={1}> <path d="M4 5v6a3 3 0 0 0 3 3h7"></path> <path d="M10 10l4 4l-4 4m5 -8l4 4l-4 4"></path> </svg>
                    {
                        replies_count >0?
                        <p style={{ fontSize: "12px", minWidth: "15px" }} className='ml10 text-center'>{GetShortNum(replies_count)} replay</p>
                     :
                        <p style={{ fontSize: "12px", minWidth: "15px" }} className='ml10 text-center'>no replay </p>
                    }

                </span>
            </div>
            <div className="r-c-c">

                {
                    isSupported &&
                    <span
                        style={{ cursor: "pointer" }}
                        className='br10 r-c-c p5 pl10 pr20 bg-third '
                        onClick={handel_dislike}
                    >
                        <motion.svg
                            animate={{
                                scale: [.4, 1.2, .8, 1],
                                transitionDuration: .1
                            }} version="1.1" viewBox="0 0 2048 2048" className={'f-b'} xmlns="http://www.w3.org/2000/svg">
                            <path transform="translate(1199,257)" d="m0 0h28l19 2 18 5 19 9 16 10 13 11 6 5v2l4 2 7 8 11 14 12 19 8 17 8 22 5 22 2 18v25l-3 22-5 20-8 24-13 33-11 28-15 37-28 70-21 52-8 19h96l319 1 39 1 25 2 18 4 16 6 16 8 14 9 14 11 10 9v2h2l7 8 13 18 6 10 10 23 5 18 3 18 2 24v64l-3 28-5 28-5 20-9 26-14 33-17 39-18 41-15 34-7 15-15 33-8 18-11 26-18 40-16 36-11 24-8 18-11 26-18 40-28 63-17 39-8 18-13 28-12 23-11 18-10 13-14 15-3 3h-2v2l-8 7-15 11-17 10-20 9-27 9-24 5-23 2-26 1h-504l-31-2-20-3-25-7-25-10-16-8-15-9-17-12-15-13-10-9-83-83v-2h-2l-7-8-12-13-4-9-2-7-1-11-1-39v-467l1-120 2-15 6-11 12-13 50-50 1-2h2l2-4 26-26 7-8 16-17 9-10 12-13 7-8 9-10 11-14 9-10 11-14 9-11 13-17 10-13 26-36 11-15 9-13 11-15 8-11 7-10 24-34 6-8 9-13 11-15 9-13 11-15 13-18 16-23 12-16 9-13 11-15 7-11 7-9 10-14 13-19 6-8 10-14 10-13 13-16 5-6h2l2-4 11-9 18-12 19-9 12-4 17-3z" />
                            <path transform="translate(309,870)" d="m0 0h21l17 2 21 5 20 9 12 7 11 8 13 11 2 4h2l11 14 10 15 8 16 6 18 4 19 1 9 1 25v210l-1 343-2 20-4 18-4 11-8 16-10 16-10 13-4 5h-2v2h-2v2l-8 7-17 12-16 8-19 7-20 4-19 2h-20l-20-3-17-5-21-10-12-8-14-12-11-11-8-10-9-14-10-19-6-16-4-17-2-18-1-43v-296l1-236 4-24 4-14 7-17 12-21 12-14 9-10 13-11 15-10 16-8 13-5 17-4z" />
                        </motion.svg>

                        <p style={{ fontSize: "12px", minWidth: "15px" }} className='ml10 text-center' > {GetShortNum(LocalLikeCount)}</p>
                    </span>

                }
                {
                    !isSupported &&
                    <span
                        style={{ cursor: "pointer" }}
                        className='br10 r-c-c p5 pl10 pr20'
                        onClick={handelAddLike}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style={{ fill: "none" }} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width={28} height={28} strokeWidth={1.5}> <path d="M7 11v8a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1v-7a1 1 0 0 1 1 -1h3a4 4 0 0 0 4 -4v-1a2 2 0 0 1 4 0v5h3a2 2 0 0 1 2 2l-1 5a2 3 0 0 1 -2 2h-7a3 3 0 0 1 -3 -3"></path> </svg>


                        <p style={{ fontSize: "12px", minWidth: "15px" }} className='ml10 text-center'>{GetShortNum(LocalLikeCount)}</p>

                    </span>
                }



                <span className="psr r-s-c">

                    <button
                        onClick={() => setis_ComntMneuVSBL(true)}
                        className='w30 hoverEff2 ml10 br20 p5 '>
                        <svg version="1.1" viewBox="0 0 2048 2048" width="128" height="128" xmlns="http://www.w3.org/2000/svg">
                            <path transform="translate(1006,767)" d="m0 0h31l36 4 23 5 18 6 26 12 20 12 14 10 14 11 12 11 16 16 9 11 13 18 14 24 11 24 9 27 5 22 2 14 1 16v18l-1 22-4 27-6 22-10 27-14 27-14 21-13 16-7 8-18 18-26 20-15 9-17 9-25 10-27 8-21 4-16 2-16 1h-25l-14-1-28-5-17-5-12-4-20-9-21-11-19-13-14-11-12-11-8-7v-2h-2l-9-11-9-10-13-18-11-19-11-23-7-19-8-32-3-24v-40l3-23 6-27 10-30 8-16 9-17 10-15 10-13 9-10 7-8 17-17 11-9 15-11 15-9 19-10 19-8 23-7 28-5z" />
                            <path transform="translate(1710,767)" d="m0 0h31l29 3 22 4 18 5 19 8 17 8 21 13 14 10 13 11 8 7 18 18 9 11 13 18 11 19 8 16 8 19 8 26 5 24 1 8 1 29-1 24-4 27-5 20-8 23-8 18-13 23-11 16-8 10-11 13-18 18-12 9-10 8-15 10-17 9-21 9-24 8-20 5-28 4-15 1h-26l-19-2-23-4-17-5-17-6-29-14-16-10-14-10-11-9-10-9-9-8v-2h-2l-9-11-9-10-13-18-11-19-11-23-7-19-8-32-3-24v-40l3-23 6-27 10-30 8-16 9-17 10-15 10-13 9-10 7-8 17-17 11-9 15-11 13-8 21-11 19-8 23-7 28-5z" />
                            <path transform="translate(303,767)" d="m0 0h29l29 3 23 4 18 5 19 8 17 8 21 13 14 10 13 11 8 7 18 18 9 11 13 18 14 24 11 24 9 27 5 22 2 14 1 16v18l-1 22-4 27-6 22-10 27-14 27-14 21-13 16-7 8-18 18-26 20-15 9-17 9-20 8-25 8-22 5-22 3-16 1h-24l-20-2-23-4-24-7-23-10-23-12-19-13-14-11-12-11-6-5-7-8-9-10-13-17-12-18-11-21-8-19-7-22-5-21-3-23v-40l4-29 7-28 8-23 12-25 12-20 10-13 6-8h2l2-4 11-12 14-14 11-9 13-10 18-11 19-10 20-8 15-5 22-5 21-3z" />
                        </svg>
                    </button>
                    <AnimatePresence>
                        {
                            is_ComntMneuVSBL &&
                            <Post_menu onClose={() => setis_ComntMneuVSBL(false)} />
                        }
                    </AnimatePresence>
                </span>
            </div>

        </div>
    )
}

export default Interaction_cmnt
