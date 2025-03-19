import { useEffect, useMemo, useRef, useState } from "react"
import { motion, AnimatePresence } from 'framer-motion'
import moment from 'moment'
import ReactDOM from 'react-dom'
import { useDispatch } from "react-redux"
import { Ten } from "../slices/ten_slice"
export const Abbreviator_text = ({ t, l = 200, s = '', style = {}, onFullText, onLessText }) => {
    if (!t) return <div className=""></div>
    if (t.length < l) return <motion.div
        style={{
            fontSize: "14px",
            whiteSpace: "pre-wrap", maxWidth: "100%", wordWrap: "break-word",
            ...style,
        }}
        className={`c-d  ${s}`}>{t}</motion.div>
    const [IsShowedALl, setIsShowedALl] = useState(false)

    const HandelShowALl = () => {
        setIsShowedALl(true);
        onFullText && onFullText();
    }
    const HandelShowLess = () => {
        setIsShowedALl(false)
        onLessText && onLessText();
    }

    return (
        <>
            <AnimatePresence>

                {
                    IsShowedALl &&
                    <motion.pre
                        style={{
                            fontSize: "14px",
                            whiteSpace: "pre-wrap",
                            maxWidth: "100%",
                            wordWrap: "break-word",
                            ...style
                        }}
                        className={`c-d ${s}`}
                    >
                        {t}
                        <span className="ml5 c-b" style={{
                            cursor: "pointer"
                        }} onClick={HandelShowLess}>
                            Show less
                        </span>
                    </motion.pre>
                }
            </AnimatePresence>

            {!IsShowedALl &&

                <motion.div className={`c-d ${s}`}
                    style={{
                        fontSize: "14px",
                        whiteSpace: "pre-wrap",
                        maxWidth: "100%",
                        wordWrap: "break-word",
                        ...style
                    }}>

                    {
                        t.substring(0, l)
                    }...
                    <span className="ml5 c-b" style={{
                        cursor: "pointer"
                    }} onClick={HandelShowALl}>
                        Show more
                    </span>
                </motion.div>
            }


        </>
    )
}


export const GetShortNum = (Num) => {
    if (Number(Num) < 10000) return Num
    if (Number(Num) >= 10000 && Number(Num) < 1000000) {
        return Num.toString().replace(/[0-9]{3,3}$/, "K")
    } else if (Number(Num) >= 1000000) {
        return Num.toString().replace(/[0-9]{6,6}$/, "M")
    }
}


export const _onClickOut = (elm, close_elm) => {
    const hideElem = (e) => {
        if (!elm.contains(e.target)) {
            close_elm()
            document.removeEventListener('mousedown', hideElem)

        }
    }
    document.addEventListener('mousedown', hideElem)
}

export const _OnContainerClickOut = (e, elem, fn) => {
    if (!elem.contains(event.target)) {
        fn()
    }

}


export const TimeAgo = (t) => {



    let time;
    const now = moment();
    const givenDate = moment(t);
    const daysDiff = now.diff(givenDate, "days");
    if (daysDiff <= 7) {
        time = givenDate.fromNow()
    } else if (daysDiff <= 14) {
        return "last week";
    } else if (daysDiff <= 30) {
        return "this month";
    } else if (daysDiff <= 60) {
        return "last month";
    } else {
        return givenDate.format("MMM YYYY");
    }

    time = time.replace(/hours/, "h")
    time = time.replace(/minutes/, "min")

    return time
}

export const CorrectTime = (t) => {
    const time = new Date(t);
    let deffTime = new Date() - time
    if ((deffTime / (1000 * 60 * 60 * 24)) > 1) {
        return time.toLocaleDateString()
    } else {
        return `${time.getHours()}:${time.getMinutes()}`
    }
}


export const video_time = (url, cl) => {
    const videoRef = useRef()
    useEffect(() => {
        if (videoRef.current) {
            let videoTime = videoRef.current.duration;
            cl(videoTime)
        } else {
            console.log('none');
        }
    }, [])


    return ReactDOM.createPortal(<video ref={videoRef} src={url} muted style={{ opacity: "0", position: "absolute" }}></video>, document.getElementById("portals"))
}


export const BtnCopyText = ({ textTOCopy, buttonText }) => {
    const dispatch = useDispatch();
    const [isTextCopied, setisTextCopied] = useState(false);
    let timeOUtCL;
    const handelCopyText = async () => {
        clearTimeout(timeOUtCL)
        await navigator.clipboard.writeText(textTOCopy);
        dispatch(Ten([, "Text copied !"]));
        setisTextCopied(true);
        timeOUtCL = setTimeout(() => {
            setisTextCopied(false);
        }, 3000);
    }
    return (
        <>
            <button onClick={handelCopyText} className='c-b mr10 border ' style={{ borderColor: "var(--bg-blue)" }}>
                {
                    isTextCopied ?
                        <>
                            <svg className='mr5' style={{ fill: "none", stroke: "var(--bg-blue)", strokeWidth: 2 }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width={32} height={32} strokeWidth={1.25}> <path d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2"></path> <path d="M9 3m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z"></path> <path d="M9 14l2 2l4 -4"></path> </svg>
                            Text copied !
                        </>
                        :
                        <>
                            <svg className='mr5' style={{ fill: "none", stroke: "var(--bg-blue)", strokeWidth: 2 }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width={32} height={32} strokeWidth={1}> <path d="M7 7m0 2.667a2.667 2.667 0 0 1 2.667 -2.667h8.666a2.667 2.667 0 0 1 2.667 2.667v8.666a2.667 2.667 0 0 1 -2.667 2.667h-8.666a2.667 2.667 0 0 1 -2.667 -2.667z"></path> <path d="M4.012 16.737a2.005 2.005 0 0 1 -1.012 -1.737v-10c0 -1.1 .9 -2 2 -2h10c.75 0 1.158 .385 1.5 1"></path> </svg>
                            {
                                buttonText ? buttonText : "Copy link"
                            }
                        </>
                }

            </button>
        </>
    )
}

