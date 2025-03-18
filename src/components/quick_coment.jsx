import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, delay } from 'framer-motion'
import { _onClickOut } from './Abbreviator';
import { useDispatch, useSelector } from 'react-redux';
import { Add_comment } from '../slices/comments';
import L_loader from './L_loader';
import Emoji_btn from './emoji_btn';
const Quick_coment = ({ ownerId, className, collection_ref, articleId, onCmntAdded }) => {
   
    const WriteCompSecRef = useRef(null);
    const imp_cmnyRef = useRef(null);
    const dispatch = useDispatch();
    const [comment, setComment] = useState("")
    const [is_open_to_write_cmnt, setOpen_to_write_cmnt] = useState(false)
    const [isSendingComment, setisSendingComment] = useState(false)
    useEffect(() => {

        if (WriteCompSecRef.current) {
            imp_cmnyRef.current?.focus();
            _onClickOut(WriteCompSecRef.current, () => setOpen_to_write_cmnt(false))
        }

    }, [is_open_to_write_cmnt]);

    const handelSendComment = async () => {
        setisSendingComment(true)
        const sending_comment = await dispatch(Add_comment({ collection_ref, articleId, content: comment, ownerId }));
        setOpen_to_write_cmnt(false);
        setComment("");
        setisSendingComment(false);
        if (onCmntAdded != undefined) {
            onCmntAdded()
        }

    }

    return (
        <div className={`mt10 wmia  h30 r-s-c  ${className} `}>
            <AnimatePresence>
                {
                    is_open_to_write_cmnt &&
                    <motion.div
                        ref={WriteCompSecRef}
                        initial={{
                            width: 0,
                            opacity: 0,
                        }}
                        animate={{
                            width: "100%",
                            opacity: 1,
                            transition: {
                                duration: .05,
                                type: "tween"
                            }
                        }}
                        exit={{
                            width: 0,
                            opacity: 0,
                            transition: {
                                duration: .15,
                                type: "tween"
                            }
                        }}

                        className='wmia p10 bg-fourth br20 r-b-c '
                    >
                        <div className="r-s-c"
                            style={{
                                width: "90%"
                            }}
                        >

                            <svg xmlns="http://www.w3.org/2000/svg" onClick={() => setOpen_to_write_cmnt(false)} viewBox="0 -960 960 960" className='mr15 ml10' fill="#FFFFFF"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" /></svg>
                            <input type="text"
                                className='wmia'
                                onChange={(e) => setComment(e.target.value)}
                                ref={imp_cmnyRef}
                                value={comment}
                                placeholder='Write your comment here .. '
                                style={{
                                    border: "none",
                                }} />
                        </div>

                        {
                            isSendingComment ?
                                <>
                                    <L_loader />
                                </>
                                :
                                <>
                                    <AnimatePresence>
                                        <Emoji_btn />

                                        {
                                            comment != "" &&
                                            <motion.button
                                                initial={{
                                                    scale: 0,
                                                    opacity: 0,
                                                    transition: {
                                                        duration: .1
                                                    }
                                                }}
                                                animate={{
                                                    scale: 1,
                                                    opacity: 1,
                                                    transition: {
                                                        duration: .1
                                                    }
                                                }}
                                                exit={{
                                                    scale: 0,
                                                    opacity: 0,
                                                    transition: {
                                                        duration: .1
                                                    }
                                                }}
                                                onClick={handelSendComment}

                                                className='hoverEff2'>
                                                <svg version="1.1" viewBox="0 0 2048 2048" width="128" height="128" xmlns="http://www.w3.org/2000/svg">
                                                    <path transform="translate(187,140)" d="m0 0h18l24 3 34 8 23 8 27 11 132 55 27 11 135 56 38 16 27 11 43 18 27 11 21 9 39 16 24 10 27 11 26 11 24 10 27 11 212 88 31 13 39 16 26 11 20 8 33 14 34 14 111 46 113 47 77 32 36 15 39 16 31 13 58 24 27 11 26 11 34 14 24 10 24 11 17 9 23 14 13 10 6 5v2h2v2h2l7 8 10 11 11 16 10 18 9 20 4 10 5 18 1 5 2 4h1v90l-7-2-2 1-8 22-9 17-7 11-16 21-13 15-7 7-18 12-19 11-15 8-29 13-34 14-26 11-27 11-113 47-27 11-26 11-20 8-11 5-27 11-41 17-29 12-26 11-58 24-21 9-16 6-28 12-70 29-46 19-43 18-24 10-22 9-48 20-77 32-34 14-19 8-24 10-39 16-84 35-22 9-31 13-37 15-45 19-94 39-63 26-43 18-27 11-38 16-44 18-24 10-40 17-40 16-25 9-22 6-33 5-21 1-17-1-18-3-29-9-23-11-18-12-10-8-10-9-4-3v-2l-3-1-7-8-12-14-10-15-9-16-11-26-6-18-2-8v-71h2l1-8 11-39 23-91 9-34 15-60 14-55 52-205 15-58 11-43 11-41 1-5v-16l-9-35-13-50-9-36-11-42-10-39-16-63-12-48-17-66-15-59-18-71-26-104-5-19v-4l-2-1-2-4v-79l2 4 10-30 10-22 6-11 12-17 10-13 14-15 14-11 14-10 15-9 19-9 18-6 24-5zm4 121-15 3-18 8-9 7-11 11-10 15-4 12-2 13v15l3 21 6 27 16 64 14 54 19 75 11 42 11 43 12 48 17 66 14 56 18 71 10 39 4 11 1 1 51 1h521l28 1 13 2 16 8 12 11 8 14 4 11 1 6v12l-3 12-8 16-12 13-9 6-12 4-6 1-17 1-494 1h-92l-3 1-2 4-6 29-12 46-9 38-8 30-29 114-16 63-14 55-7 27-24 95-9 34-9 35-6 25-3 21v14l2 14 6 16 7 11 11 12 13 8 17 7 8 2h18l17-3 24-8 29-12 33-14 24-10 96-40 27-11 33-14 24-10 34-14 31-13 41-17 39-16 23-10 61-25 31-13 29-12 44-18 23-10 37-15 62-26 61-25 28-12 54-22 26-11 36-15 37-15 14-6 31-13 49-20 21-9 24-10 37-15 38-16 63-26 26-11 36-15 30-12 33-14 19-8 32-13 74-31 28-11 38-16 24-10 20-8 30-13 18-10 12-9 9-10 5-10 4-16 1-8-1-5v-4h2l1-6-5-21-6-15-6-9-8-8-11-7-17-9-28-12-15-6-178-74-15-6-45-19-27-11-36-15-38-16-37-15-45-19-44-18-67-28-37-15-40-17-49-20-43-18-34-14-41-17-31-13-44-18-43-18-46-19-24-10-31-13-44-18-38-16-34-14-106-44-84-35-37-15-28-12-27-11-41-17-31-13-29-12-36-15-38-16-29-11-17-5-21-3zm1855 734m-4 82 1 2 2-1z" />
                                                    <path transform="translate(2047,964)" d="m0 0h1v5l-2-1z" />
                                                    <path transform="translate(0,1663)" d="m0 0h1v6h-1z" />
                                                    <path transform="translate(2046,1083)" d="m0 0 2 1z" />
                                                    <path transform="translate(0,1745)" d="m0 0" />
                                                    <path transform="translate(2047,979)" d="m0 0" />
                                                    <path transform="translate(2043,978)" d="m0 0" />
                                                </svg>
                                            </motion.button>
                                        }
                                    </AnimatePresence>
                                </>
                        }


                    </motion.div>
                }
            </AnimatePresence >

            <AnimatePresence >
                {!is_open_to_write_cmnt && <>
                    <motion.span
                        initial={{
                            opacity: 0,
                            transition: {
                                delay: .5
                            }
                        }}
                        animate={{
                            opacity: 1,
                            transition: {
                                delay: .2,
                                duration: .03,
                                type:"keyframes"
                            }
                        }}
                       
                        onClick={() => setOpen_to_write_cmnt(true)}
                        className='br20   bg-fourth  p10 r-p-c'>
                        <svg version="1.1" viewBox="0 0 2048 2048" className='w20 h20' xmlns="http://www.w3.org/2000/svg">
                            <path transform="translate(1826)" d="m0 0h85l-1 3-3 1v2l-5-1-6-1-5 1 20 8 18 10 13 10 10 10 10 14 9 16 7 17 4 18 1 8v17l-3 19-4 15-8 24-6 15-16 38-5 11-1 8 5 5 11 12 9 13 6 13 4 15 1 11-3 16-6 17-3 8 1 8 10 9 14 10 11 9 7 6 13 19 14 27 6 15 2 9v7h2v6 3l-2-1 1 6 4 1v-5h1v26l-2-2v3h2v8l-8 1-1 7-5 13-8 18-10 20-13 23-10 18-12 20-10 18-6 10-13 23-10 18-9 20-13 32-13 40-7 29-4 24-6 50-5 47-3 16-4 9-6 9-5 6-12 9-5 2-10-1-13-5-12-8-7-8-4-11-1-9v-14l6-62 6-52 10-41 11-39 19-50 13-28 10-18 11-19 12-20 8-14 11-19 14-23 8-15 8-13 11-27 2-7v-9l-7-21-7-14-7-9-8-4-6 1-3 5-7 20-21 49-20 47-14 32-9 21-11 26-6 14-9 20-10 24-11 25-8 20-8 19-13 31-16 37-11 26-9 21-7 17-10 23-13 30-13 31-12 29-12 27-9 21-11 26-10 24-16 37-11 25-16 38-10 25-7 15-27 63-12 29-13 30-14 32-12 29-12 28-10 23-17 40-15 36-12 27-22 52-15 36-13 30-9 21-12 29-11 25-8 16-8 12-11 13-13 11-11 9-14 11-16 13-14 11-10 9-10 8-12 10-13 10-10 8-11 9-14 11-13 11-8 7-13 10-11 9-10 8-13 11-14 11-18 12-12 7-4 4v2h-31l-2-4-10-10-8-7-9-10-11-14-13-16-10-13-11-14-16-21-9-12-22-28-14-17-9-11-11-13-12-13-11-12-8-7-14-12-18-14-18-13-19-11-15-6-13-3h-21l-17 6-13 7-10 8-12 12-1 2h-2l-2 4-10 12-7 8-26 32-22 28-8 10h-2l-2 4-17 17-7 5-5 5-11 10-18 12-19 11-12 6-24 9-18 4-22 3h-23l-26-4-21-6-24-10-26-13-16-10-17-12-17-13-12-8-7 1-14 9-19 11-31 20-26 16-19 12-48 30-15 9-16 9-18 7-4 1h-14l-8-4-7-7-6-7-8-4-4-3 1-4 5 5 3 2-3-8-5-4-1-2v-9l4-6 3-2 5-9 10-10 10-7 13-8 18-12 16-10 22-14 14-9 22-14 16-10 26-16 16-9 6-4h2l-1-6-12-19-13-23-12-23-10-23-9-24-6-22-5-25-2-19v-34l2-23 6-24 7-24 6-16 8-17 10-18 12-19 12-16 12-14 22-22 11-9 15-11 15-10 26-14 15-7 28-9 26-6 15-2h43l24 4 17 5 22 9 15 8 18 12 14 11 8 7v2h2l18 22 11 17 9 18 8 26 5 24v25l-6 31-5 15-12 25-10 17-8 12-11 14-8 10-9 10-7 8-10 11-1 2h-2l-2 4-17 17-8 7-13 12-8 7-16 13-11 9-14 11-15 12-14 10-15 11-16 12-16 11-4 5 1 5 13 8 20 11 21 12 20 9 15 3h20l14-3 17-7 17-9 13-10 11-9 8-8 8-7 12-13 11-14 12-14 13-16 7-8 10-13 2-3h2l2-4 8-10 9-11 15-15 17-13 15-9 16-8 19-7 14-3 13-1h30l13 1 22 6 20 8 16 8 14 8 18 12 18 14 12 11 8 7 17 17 7 8 11 12 9 11 10 11 11 14 8 9 9 11 15 16 3 3-1-9-3-16-2-17-3-44-6-81-1-21 2-17 5-17 9-20 11-26 13-30 18-42 10-24 10-23 13-31 12-28 13-30 10-23 13-31 12-28 13-30 10-23 16-38 13-30 9-21 10-23 11-26 15-35 11-25 22-52 15-35 11-25 11-26 15-35 13-30 54-126 11-26 9-21 8-19 11-26 13-29 11-26 15-35 19-44 11-26 57-133 13-30 33-77 8-19 8-16 8-13 6-8h2l2-4 8-8 21-12 10-3 30-1 7-2 3-7 5-15 8-18 6-15 14-29 10-17 10-14 9-10 16-11 21-12 14-7zm61 3m-32 94-8 2-7 5-9 13-8 16-13 31-11 27 1 4 3 3 28 13 13 5 6 1 6-14 9-20 12-29 6-15 2-9v-10l-4-9-10-9-8-4zm-157 162-5 10-6 15-9 21-11 26-10 23-23 54-11 26-11 25-10 23-28 66-10 23-9 22-6 13-22 52-8 16-3 9 5 5 25 11 27 12 19 8 21 9 20 8 30 13 22 11 5 3 6-10 7-16 8-17 6-16 11-25 13-30 10-24 13-30 21-49 11-26 16-38 12-28 11-26 16-39 7-17 7-14 6-13v-7l-5-5-25-11-20-9-43-19-29-12-25-11-25-12zm344 266 1 2zm-559 236-4 5-6 16-32 76-11 26-10 23-14 32-9 21-12 29-13 30-14 32-9 21-12 29-15 34-9 21-11 26-10 24-18 41-14 33-13 30-6 15-15 34-15 35-13 30-7 18-7 15-27 63-11 26-33 77-11 25-4 9-7 14 2 6 13 13 18 13 20 12 14 8 20 9 19 7 29 8 26 5 9 2 5-1 7-9 8-16 5-11 16-38 10-23 10-24 18-42 13-31 8-19 13-30 13-31 15-35 14-33 17-40 8-19 11-25 12-29 10-23 11-26 14-33 5-11 22-52 14-33 12-28 8-19 14-33 27-63 14-33 8-20 11-25 21-49 4-10-1-6-24-10-13-5-38-17-28-12-29-12-35-15-5-2zm-1083 687-20 2-25 5-20 7-23 12-12 8-16 13-10 9-8 8-6 7v2h-2l-10 14-9 15-8 16-8 20-6 23-3 16v33l3 23 7 28 6 15 11 24 11 21 13 18 5 6 5 3 8-4 9-8 14-10 16-12 11-8 18-14 26-20 18-14 11-9 14-12 16-15 20-20 7-8 9-10 6-7v-2h2l9-13 9-14 10-19 4-13 2-11v-22l-4-15-8-15-11-14-7-7-11-9-16-10-16-7-15-4-17-2zm692 333 2 22 4 58 1 25 1 8 5-2 14-10 14-12 14-11 13-10 10-9 11-8 7-8-4-4-34-12-23-10-22-11-11-6z" />
                            <path transform="translate(2046,538)" d="m0 0h2v7l-2-4z" />
                            <path transform="translate(8,2016)" d="m0 0 3 2-1 2z" />
                            <path transform="translate(0,2047)" d="m0 0 3 1z" fill="#fff" />
                            <path transform="translate(2044,503)" d="m0 0 2 1z" />
                            <path transform="translate(0 2e3)" d="m0 0" />
                            <path transform="translate(1895,4)" d="m0 0" />
                            <path transform="translate(1893,4)" d="m0 0" />
                        </svg>
                        <p className='ml10'>Quick comment</p>

                    </motion.span>
                </>
                }
            </AnimatePresence>
        </div >
    )
}

export default Quick_coment
