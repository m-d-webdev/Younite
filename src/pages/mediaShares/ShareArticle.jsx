import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import ReactDOM from 'react-dom'
import { useDispatch, useSelector } from 'react-redux'
import { close_shareWithFriends, getListFriendToShareWith, PostSharedMedia } from '../../slices/SahrePosSlice'
import { _OnContainerClickOut } from '../../components/Abbreviator'
import Lottie from 'react-lottie'
import animateData from '../../resources/Animation - 1739567718145.json'
import BtnClose from '../../components/btnClose'
function ShareArticle() {
    const dispatch = useDispatch();
    const { ListFriendToShareWidth, isLoading } = useSelector(s => s.SharePostReducer)
    useEffect(() => {
        dispatch(getListFriendToShareWith())
    }, []);
    const containerRef = useRef();
    let ListForSend = []
    const handelSubmitSend = () => {

        if (ListForSend.length > 0) {
            dispatch(PostSharedMedia(ListForSend));
        }

        dispatch(close_shareWithFriends());
        
    }

    const SIngleFriend = ({ d, i }) => {
        const [isSelected, setSelected] = useState(false)
        const toggleChooosen = () => {
            if (ListForSend.includes(d._id)) {
                setSelected(false);
                ListForSend = ListForSend.filter(r => r != d._id)
            } else {
                setSelected(true);
                ListForSend.push(d._id)
            }
        }

        return <motion.div
            initial={
                {
                    scale: 0,
                    opacity: 0
                }

            }
            animate={
                isSelected ?
                    {
                        scale: [.7, 1],
                        opacity: [0, 1],

                    }
                    :
                    {
                        scale: 1,
                        opacity: 1,
                        transition: {
                            delay: i * .05
                        }
                    }

            }
            onClick={toggleChooosen} className="c-s-c fw900 fs15  curP mb5 br5 w90 p5  overHdn  "
            style={
                isSelected ?
                    {
                        backgroundColor: "var(--bg-secondary)",
                        color: "var(--bg-primary)"
                    }
                    : {}
            }
        >
            <img src={d.profile_img} className='w60 h60 imgCercle  mb5' alt="" />
            {d.FirstName}
        </motion.div>
    }

    return ReactDOM.createPortal(
        <div className='backendMer'
            onClick={e => _OnContainerClickOut(e, containerRef.current, () => dispatch(close_shareWithFriends()))}
        >
            <div ref={containerRef} className="wmia  p10 br10 bg-third r-w-p-s psr " style={{ maxWidth: "600px" }}>
                <div className="wmia r-b-c">
                    <h1 className=''>
                        Share with friends
                    </h1>
                    <BtnClose onClick={() => dispatch(close_shareWithFriends())} />
                </div>
                {
                    isLoading ?
                        <div className="wmia   c-c-c">
                            <Lottie options={{
                                animationData: animateData,
                                autoplay: true,
                                loop: true
                            }}
                                height={300}
                            />
                            <p>Loading your friend list...</p>
                        </div>
                        :
                        <div className='wmia scrl_none mt10 r-w-p-s' style={{ maxHeight: "90%", overflow: "auto" }}>
                            {
                                ListFriendToShareWidth.map((f, ind) => <SIngleFriend i={ind} d={f} key={f._id} />)
                            }
                        </div>
                }

                {
                    !isLoading &&
                    <div className="wmia r-e-c">
                        <button onClick={handelSubmitSend} className='bl w100'>
                            Send
                            <svg style={{ fill: "none", strokeWidth: 2 }} className=' ' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width={32} height={32} strokeWidth={1}> <path d="M15 10l-4 4l6 6l4 -16l-18 7l4 2l2 6l3 -4"></path> </svg>
                        </button>
                    </div>
                }
            </div>
        </div>, document.getElementById("portals")
    )
}

export default ShareArticle
