import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Abbreviator_text, GetShortNum } from '../components/Abbreviator'
import Cookies from 'js-cookie'
import Sound_mut from '../components/sound_mut'
import { Post_menu } from '../slices/media/posts_menu'
import { AnimatePresence } from 'framer-motion'
import User_ from '../components/user_name'
import Interaction_area from '../components/Interaction_area'
import Quick_coment from '../components/quick_coment'
import Lottie from 'react-lottie'
import LoveJsonLottie from '../resources/Animation - 1738693339844.json'
import { getMoreReels, knowTheLength, toggleMuting } from '../slices/sections/reelsSlices'
import { useDispatch, useSelector } from 'react-redux'
const Reel = React.forwardRef(({ i, lastReelOpened, reel, h, onChoose, currentShoose }, ref) => {
    const CnotanerRef = useRef(null);
    const [isVideoPlaying, setVideoPlaying] = useState(true);
    const [reel_menu_vsbl, setreel_menu_vsbl] = useState(false);
    const [num_cmnts, setnum_cmnts] = useState(reel.comments_count);
    const [isLikeVisible, setisLikeVisible] = useState(false);
    const [isShowing, setSHowing] = useState(true);
    const { isMuted, isLoadingreels } = useSelector(s => s.Reels)
    const { isWorkinOnPhone } = useSelector(s => s.WindowSizeSlice);
    const [reelHeight, setReelHeight] = useState(isWorkinOnPhone ? window.innerHeight - 40 : window.innerHeight - 80);

    const UpdateReelHeight = () => {
        setReelHeight(isWorkinOnPhone ? window.innerHeight - 40 : window.innerHeight - 80);
    };

    const dispatch = useDispatch()

    let reelRef = ref ? ref : useRef(null);
    const handel_keyBord = (e) => {
        switch (e.key) {
            case "s":
                reelRef.current?.click()
                break;
            case "d":
                handel_mute_video()
                break;
        }

    }
    const [isReqSent, setReqSent] = useState(isLoadingreels)
    useEffect(() => {
        let observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    dispatch(knowTheLength()).then(res => {
                        if (i && i == res.payload - 1) {
                            if (!isLoadingreels && !isReqSent) {
                                setReqSent(true);
                                dispatch(getMoreReels());
                            }
                        }
                    });
                    if (onChoose) {
                        onChoose(i)
                    }
                    reelRef.current?.play();
                    localStorage.setItem("reels-last", reel._id)
                    document.addEventListener("keydown", handel_keyBord)
                } else {
                    document.removeEventListener("keydown", handel_keyBord)
                    try {
                        reelRef.current?.pause();
                    } catch (rtt) { };

                    clearTimeout(timeOuRmLiki);
                }
            }, { threshold: .5 }
        )
        if (CnotanerRef.current) {
            observer.observe(CnotanerRef.current)
        }

        window.addEventListener("resize", UpdateReelHeight);

        if (localStorage.getItem("reels-last")) {
            
            if (localStorage.getItem("reels-last") === reel._id) {
                
                CnotanerRef.current?.scrollIntoView({
                    block:"center",
                    behavior:"instant"
                    
                })
            }
        }

        return () => {
            window.removeEventListener("resize", UpdateReelHeight)
            CnotanerRef.current && observer.unobserve(CnotanerRef.current)
        }
    }, [])


    useEffect(() => {
        if (currentShoose != null) {
            if (i == currentShoose - 1 || i == currentShoose || i == currentShoose + 1) {
                setSHowing(true);
            } else {
                setSHowing(false)
            }
        }
    }, [currentShoose])

    const handel_mute_video = () => {
        dispatch(toggleMuting())
    }

    const handelStopVideo = () => {
        if (isVideoPlaying) {
            setVideoPlaying(c => false)
            reelRef.current?.pause()
        } else {
            reelRef.current?.play()
            setVideoPlaying(true)
        }
    }
    let timeOuRmLiki;
    useEffect(() => {
        timeOuRmLiki = setTimeout(() => {
            setisLikeVisible(false);
        }, 1600);
        return () => {
            clearTimeout(timeOuRmLiki);
        }
    }, [isLikeVisible])

    return (
        <>
            <div
                ref={CnotanerRef}
                style={{
                    height: h == undefined ? reelHeight : h,
                }}
                className='cntReel_cmp mb50 psr   pl5 pr5 pb10 c-e-s'>
                {isShowing &&
                    <>
                        <div className="cnt_reel_Menu  r-e-e">
                            <button onClick={() => setreel_menu_vsbl(!reel_menu_vsbl)} className='hoverEff2'>
                                <svg version="1.1" viewBox="0 0 2048 2048" style={{ fill: "#fff", zIndex: "3" }} xmlns="http://www.w3.org/2000/svg">
                                    <path transform="translate(1723,724)" d="m0 0h46l29 3 29 6 21 7 22 9 27 14 17 11 14 10 13 11 11 9 18 18 9 11 10 13 10 15 11 19 8 16 9 19 10 29 3 10 3 9 3 3-1 7 1 4 2-1v117h-3v-4l-5 4-5 16-8 24-13 27-14 24-7 11-10 13-9 11-9 10-19 19-14 11-13 10-14 9-24 13-22 10-19 7-36 9-22 4-22 2h-32l-22-2-24-4-24-7-25-9-23-11-24-14-13-9-13-10-14-12-8-7v-2l-4-2v-2h-2l-7-8-12-14-14-19-10-16-13-25-7-15-12-34-6-25-3-21-1-11v-37l3-27 5-25 6-21 9-24 12-25 13-23 8-12 14-19 13-15 17-17 14-11 15-11 20-13 22-12 15-7 22-8 21-6 20-4zm8 122-20 3-21 5-15 6-16 9-12 8-16 12-14 13-13 17-12 19-8 16-6 20-6 26-2 12v24l6 31 7 24 8 16 13 20 11 14 9 10 14 11 18 13 18 10 12 5 28 7 24 4h20l43-9 18-6 19-10 18-13 11-9 12-11 7-9 11-15 8-13 7-15 6-20 6-37v-24l-6-33-5-17-5-12-9-17-11-16-8-10-9-10-13-11-13-9-19-11-15-7-15-4-28-6-7-1z" />
                                    <path transform="translate(1e3 724)" d="m0 0h44l30 3 25 5 30 10 23 10 22 12 22 14 18 14 13 11 19 19 9 11 11 14 9 13 13 22 12 25 8 21 8 29 4 20 3 23v47l-3 25-6 26-7 24-9 21-11 23-10 17-10 15-9 12-9 11-12 13-8 8h-2v2l-10 8-12 10-16 11-21 12-17 9-23 10-20 6-32 8-27 4-13 1h-33l-29-3-16-3-26-8-21-7-25-12-21-12-16-11-16-12-11-10-8-7-8-8v-2h-2l-9-11-13-16-13-19-13-24-10-21-9-23-7-25-4-19-3-27v-35l4-35 5-22 8-26 8-20 10-21 14-24 11-16 8-10 9-10 10-12 8-7 8-8 11-9 13-10 15-10 25-14 19-9 25-9 23-6 15-3 15-2zm6 122-19 3-17 4-19 7-16 9-12 8-12 9-10 9-11 11-9 11-12 19-8 15-6 18-7 28-2 12-1 15 2 19 7 32 6 18 8 16 8 12 10 14 9 11 7 7 14 11 12 8 11 7 15 8 15 5 26 6 18 3h22l28-6 17-4 14-5 21-11 15-10 14-11 13-13 10-13 13-20 7-14 5-16 8-38 1-7v-14l-2-15-3-17-6-25-9-21-11-18-9-12-12-14-10-9-15-11-15-9-17-9-20-6-28-6-8-1z" />
                                    <path transform="translate(276,724)" d="m0 0h44l30 3 25 5 33 11 18 8 22 12 15 9 17 12 12 10 11 9 18 18 9 11 12 15 10 15 10 17 10 19 11 27 7 24 5 23 4 30 1 13v14l-2 26-5 30-6 24-8 23-9 20-10 19-12 19-7 10-11 15-12 14-15 15-10 8-9 8-15 10-18 11-16 9-21 10-22 8-35 9-23 4-20 2h-36l-22-2-22-4-27-8-22-8-27-13-20-12-17-12-10-8-12-11-8-7-10-10-7-8-11-13-13-18-12-20-12-23-8-19-8-24v-2l-2-1-2-12h-2l-2-6-2-3v-118h2v6l1-5h2l3-12 10-29 11-26 12-22 10-17 8-11 11-14 9-10 7-8 14-14 10-8 12-10 21-14 18-10 16-8 16-7 28-9 22-5 21-3zm6 122-24 4-21 6-25 12-13 9-12 9-10 9-11 11-10 13-10 15-9 17-9 27-5 25-1 7v25l4 24 4 17 5 14 8 16 7 12 11 16 9 11 9 9 13 10 21 14 17 9 19 6 28 6 13 2h19l31-6 17-4 16-6 18-10 16-11 14-11 5-4v-2l3-1 10-13 14-21 10-16 5-16 8-38 1-7v-18l-3-21-6-27-7-20-8-15-12-18-9-11-9-10-13-11-18-12-22-12-18-6-26-6-14-2z" />
                                    <path transform="translate(2046,948)" d="m0 0h2l-1 4z" />
                                    <path transform="translate(2046,1095)" d="m0 0 2 1z" />
                                    <path transform="translate(2047,963)" d="m0 0" />
                                </svg>
                            </button>
                            <AnimatePresence>
                                {
                                    reel_menu_vsbl &&
                                    <Post_menu onClose={() => setreel_menu_vsbl(false)} />
                                }
                            </AnimatePresence>
                        </div>
                        <div onClick={handelStopVideo} className="cnt_main__rell psr wmia c-c-c">
                            {
                                isLikeVisible &&
                                <div className="c-c-c"
                                    style={{
                                        position: "absolute"
                                    }}
                                >
                                    <Lottie options={{
                                        autoplay: true,
                                        loop: false,
                                        animationData: LoveJsonLottie
                                    }} width={250} height={250} />
                                </div>
                            }

                            <video
                                ref={reelRef}
                                src={reel.url}
                                loop
                                muted={isMuted}
                            ></video>

                        </div>
                        <div style={{ zIndex: "2" }} className="r-b-s  wmia">
                            <User_ btnFlClassName={"bg-rev-d"} id={reel.authorId} date={reel.createAt} img_url={reel.author.profile_img} name={`${reel.author.FirstName} ${reel.author.LastName}`} nameStyle={"c-rl"} dateStyle={'c-rl'} />
                            <span className="r-c-c mr10">
                                <Sound_mut fn={handel_mute_video} v={isMuted} />
                            </span>
                        </div>
                        <Abbreviator_text t={reel.description} l={60} s='mt10 c-rl z2 mb10 ml20' />


                        <Interaction_area
                            onLike={() => setisLikeVisible(true)}
                            itemId={reel._id}
                            ownerId={reel.authorId}
                            collection={"reels"}
                            className={'reel_sideBare'}
                            svg_className='c-c-c mb20 mt20'
                            interaction={{
                                likes: reel.likes,
                                comments: num_cmnts,
                                shares: 21168
                            }}
                        />
                        <Quick_coment ownerId={reel.authorId} articleId={reel._id} className={'reel_quickCmt z2'} collection_ref={'reels'} onCmntAdded={() => setnum_cmnts(num_cmnts + 1)} />
                    </>
                }
            </div>
        </>

    )

})

export default Reel
