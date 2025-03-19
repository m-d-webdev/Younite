import React, { useState, useEffect, useMemo, useRef } from 'react'
import api from '../../config/axios';
import EmojisBtn from '../../components/emoji_btn'
import User_ from '../../components/user_name';
import { Abbreviator_text } from '../../components/Abbreviator';
import { useDispatch, useSelector } from 'react-redux';
import { start_loading, stop_loading } from '../../slices/loader';
import { Ten } from '../../slices/ten_slice';
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion"
import { open_alert } from "../../slices/alert_cmp"
import { unshiftUserReel } from '../../slices/sections/reelsSlices';
const Video_remo = React.memo(
    ({ src }) => {
        return <div className="wmia br10 r-c-c mt20   p20">
            <motion.video
                initial={{
                    opacity: 0,
                    scale: .6,
                    y: 100
                }}
                animate={{
                    opacity: 1,
                    scale: 1,
                    y: 0,

                }}
                autoPlay loop className='br10 ' style={{ height: "750px", width: "500px", objectFit: "cover" }} src={src}></motion.video>
        </div>
    }
)

const Reel_create = () => {
    const [description, setDescription] = useState('');
    const [video, setvideo] = useState(null);
    const [currentSteps, setCurrentStep] = useState(0)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handelSubmitVideo = async (e) => {
        e.target.disabled = true
        dispatch(start_loading())
        const f = new FormData();

        f.append("video", video)
        f.append("description", description)
        await api.post('/reels/create', f, {
            headers: {
                Accept: "multipart/forma-data"
            }
        }).then(res => {

            dispatch(stop_loading());
            dispatch(unshiftUserReel(res.data.reel))
            dispatch(open_alert([, "You reel has been uploaded successfully"]));
            navigate('/Reels');
            
        }).catch(er => {
            dispatch(stop_loading())
            dispatch(Ten([false, "Failed to upload your reel. Please try again!"]))
            console.log(er);
        })
    }

    const UploadVideoStep = () => {
        const handelChangeI = (e) => {
            if (e.target.files.length > 0) {
                if (e.target.files[0].size > 15728640) return dispatch(Ten([false, "Your video is too large! Please ensure it is under 10 MB and try again"]));
                setvideo(e.target.files[0]);
                setCurrentStep(1)
            }
        }
        return (
            <div className='c-s-c '>
                <div className="wmia r-p-c">
                    <motion.div className='c-c-c'>
                        <motion.h1
                            style={{ fontSize: "22px" }}
                            className='fw900 mt5'
                            animate={{
                                y: [30, 0],
                                opacity: [0, 1],
                                transition: {
                                    delay: .6,
                                    duration: .6,
                                    type: "spring"
                                }
                            }}
                        >Transform moments into something amazing.</motion.h1>
                        <motion.h1
                            style={{ fontSize: "22px" }}
                            className='fw900 mt5'
                            animate={{
                                y: [30, 0],
                                opacity: [0, 1],
                                transition: {
                                    delay: 1.2,
                                    duration: .8,
                                    type: "spring"
                                }
                            }}
                        >Share your vision with the world
                        </motion.h1>
                        <motion.h1
                            style={{ fontSize: "22px" }}
                            className='fw900 mt5'
                            animate={{
                                y: [30, 0],
                                opacity: [0, 1],
                                transition: {
                                    delay: 1.8,
                                    duration: .8,
                                    type: "spring"
                                }
                            }}
                        > Create your reel.</motion.h1>


                    </motion.div>
                    <motion.img
                        initial={{
                            opacity: 0,
                            // scale: ,
                            y: 100
                        }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                            y: 0,
                            transition: {
                                delay: .6
                            }
                        }}
                        src="../media/rb_5524.png" className='h500' alt="" />

                </div>

                <input type="file" onChange={handelChangeI} name="video" id="video" style={{ display: "none" }} accept='video/*' />
                <motion.label

                    animate={{
                        opacity: [0, 1],
                        y: [100, 0],
                        transition: {
                            delay: .5,
                            type: "spring"
                        }
                    }}
                    htmlFor="video" className=' wmia mt50 p10 br10 bg-fourth r-c-c ' style={{ maxWidth: "400px" }}>
                    <svg version="1.1" viewBox="0 0 2048 2048" className='w30 h30 mr10' xmlns="http://www.w3.org/2000/svg">
                        <path transform="translate(1070,278)" d="m0 0h18l31 2 42 4 33 5 27 6 37 11 30 10 23 10 19 9 40 21 19 12 19 13 17 13 16 12 16 13 14 12 18 18 7 8 12 13 7 8 9 10 13 17 13 18 9 14 12 19 8 14 9 16 12 25 12 30 14 37 8 32 10 46 6 30 2 7 10 2 21 4 29 8 28 10 30 14 29 15 22 14 17 12 11 8 13 10 11 9 14 12 15 15 7 8 7 7 7 8 9 10 13 17 16 23 14 21 9 16 12 23 14 32 9 24 12 37 8 32 6 31 1 3 1 2h1v156h-2l-2-14-1 1-4 6-11 42-12 36-8 22-17 36-12 23-15 24-11 15-10 14-13 16-9 11-7 8h-2v2h-2l-2 4-8 8h-2v2l-8 7-14 13-7 6h-2v2l-10 8-13 10-19 12-28 17-24 13-30 13-27 10-26 8-26 6-41 7-28 3-19 1-46 1h-367l-2-2-1-6-1-33v-401l2-3 115-1 29-1 12-2 12-6 10-8 6-10 3-8 1-10-3-12-8-16-9-15-13-18-12-17-12-16-12-17-14-19-13-18-12-17-14-19-39-54-14-19-14-20-12-16-10-14-13-18-12-17-26-36-12-17-8-10-9-11-4-4v-2l-4-2-8-6-13-4-5-1-16 4-11 7-11 11-9 12-9 13-13 18-10 13-9 13-7 10-13 18-7 10-12 16-12 17-22 30-8 11-11 16-28 38-13 18-12 17-9 12-26 36-10 14-14 19-9 12-10 15-8 13-6 15-1 11 4 13 7 12 9 8 9 4 14 3 22 1 119 1 4 2 1 5v429l-2 5-5 2-273 1h-203l-22-1-34-5-21-4-21-5-31-12-30-13-24-13-22-14-14-10-14-11-13-11-8-7-9-9-8-7-4-4v-2l-3-1-7-8-11-12-13-17-14-19-14-21-12-21-8-15-14-31-9-24-13-44-1-5-2 3-2-5h-2v-3h-2v2l-2-1v-9h2l-1-5v-4l-1-6v-120h3l4-17 8-37 11-33 11-26 13-29 7-14 9-14 14-18 12-16 16-20 12-14 12-12 10-8 16-13 19-14 11-8 16-12 1-3-9-30-5-25-3-31v-16l4-34 5-26 8-26 7-20 13-26 10-16 7-10 10-13 11-13 7-8 16-16 13-10 12-9 17-11 22-12 23-10 22-7 22-5 29-4 11-1h34l36 4 18 4 15 5 5 2 5-1 10-18 8-13 9-17 6-10 6-9 12-17 10-13 14-19 10-11 8-10 39-39h2v-2l8-7 13-11 18-14 28-20 19-12 25-14 23-12 22-10 25-10 36-12 27-7 33-7 35-5 33-3zm976 945 1 2zm0 4m-2044 49m0 3 1 2zm3 125 1 2zm1 4-1 3h2zm-2 3-1 2h2zm3 1-2 4 2 1 1-5zm-4 2m5 2v3z" />
                        <path transform="translate(2047,1186)" d="m0 0h1v10l-1-4h-2v-4h2z" />
                        <path transform="translate(4,1422)" d="m0 0" />
                        <path transform="translate(2044,1372)" d="m0 0" />
                        <path transform="translate(2047,1203)" d="m0 0" />
                        <path transform="translate(2047,1199)" d="m0 0" />
                    </svg>
                    Upload your reel

                </motion.label>
            </div>
        )
    }


    const NextToDescStep = () => {
        return (
            <div className='wmia c-c-c p10' style={{ maxWidth: "600px" }}>

                <div className="wmia  r-b-c">
                    <h1 className='ml10 fw900'>Video review </h1>
                    <span className="r-c-c">

                        <motion.label
                            initial={{
                                opacity: 0,
                                // scale: .6,
                                y: 20
                            }}
                            animate={{
                                opacity: 1,
                                scale: 1,
                                y: 0,
                            }}
                            onClick={() => setCurrentStep(0)} htmlFor="video" className=' p10 br10 border bg-rev-l r-c-c w200  mr20' >
                            <svg xmlns="http://www.w3.org/2000/svg" className='mr10' viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" /></svg>
                            Pick a Different Video
                        </motion.label>

                        <motion.button
                            initial={{
                                opacity: 0,
                                // scale: .6,
                                y: 20
                            }}
                            animate={{
                                opacity: 1,
                                scale: 1,
                                y: 0,
                                transition: {
                                    delay: .2
                                }

                            }}
                            onClick={() => setCurrentStep(2)}
                            className='bl ml10 p10 w100'>
                            Next
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="m700-300-57-56 84-84H120v-80h607l-83-84 57-56 179 180-180 180Z" /></svg>
                        </motion.button>
                    </span>
                </div>

                <Video_remo src={URL.createObjectURL(video)} />
            </div>
        )
    }

    const AddDescriptionStep = () => {
        const [Localdescription, setLocalDescription] = useState(description);
        function handelNext() {
            setDescription(Localdescription);
            setCurrentStep(3)
        }
        return (
            <div className='wmia h400 c-b-c' style={{ maxWidth: "800px" }}>

                <div className="wmia  r-b-c">
                    <h1 className='ml10 fw900'>Add description </h1>
                    <span className="r-c-c">

                        <motion.label
                            initial={{
                                opacity: 0,
                                // scale: .6,
                                y: 20
                            }}
                            animate={{
                                opacity: 1,
                                scale: 1,
                                y: 0,

                            }} onClick={() => setCurrentStep(0)} htmlFor="video" className=' p10 br10 border bg-rev-l r-c-c w200  mr20' >
                            <svg xmlns="http://www.w3.org/2000/svg" className='mr10' viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" /></svg>
                            Pick a Different Video
                        </motion.label>

                        <motion.button
                            initial={{
                                opacity: 0,
                                // scale: .6,
                                y: 20
                            }}
                            animate={{
                                opacity: 1,
                                scale: 1,
                                y: 0,
                                transition: {
                                    delay: .2
                                }

                            }}
                            onClick={() => handelNext()}
                            className='bl ml10 p10 w100'>
                            Next
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="m700-300-57-56 84-84H120v-80h607l-83-84 57-56 179 180-180 180Z" /></svg>
                        </motion.button>
                    </span>
                </div>
                <motion.div
                    initial={{
                        opacity: 0,
                        // scale: .6,
                        y: 100
                    }}
                    animate={{
                        opacity: 1,
                        scale: 1,
                        y: 0,
                        transition: {
                            delay: .2
                        }

                    }}
                    style={{
                        border: "solid 1px var(--filter-color)",
                    }}
                    className="psr wmia  pt15">
                    <div className="btnClose">
                        <EmojisBtn />
                    </div>
                    <textarea name=""
                        className='wmia p15  scrl_none '
                        onChange={e => setLocalDescription(e.target.value)}
                        style={{
                            resize: "none",
                            border: "none",
                            minHeight: "200px",
                            lineHeight: "1.8",

                        }}
                        value={Localdescription}
                        placeholder={`Give the reel a  description....`}
                        id=""
                    >
                    </textarea>
                </motion.div>
            </div>
        )
    }
    const LastStep = () => {
        const [reelHeight, setReelHeight] = useState(window.innerHeight - 120)
        const { profile_img, FirstName, LastName, _id } = useSelector(s => s.User)
        return (
            <div className="c-s-s  ">
                <div className="wmia r-b-c ">
                    <h1>Publish</h1>
                    <div className="r-c-c ">
                        <button
                            onClick={() => setCurrentStep(2)}
                            className=" hoverEff2 mr20 cr">
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M360-240 120-480l240-240 56 56-144 144h568v80H272l144 144-56 56Z" /></svg>
                            back
                        </button>
                        <motion.button
                            initial={{
                                opacity: 0,
                                // scale: .6,
                                y: 20
                            }}
                            animate={{
                                opacity: 1,
                                scale: 1,
                                y: 0,
                                transition: {
                                    delay: .2
                                }

                            }}
                            className='bl w200'
                            onClick={handelSubmitVideo}
                        >
                            Publish
                            <svg version="1.1" viewBox="0 0 2048 2048" width="128" height="128" xmlns="http://www.w3.org/2000/svg">
                                <path transform="translate(1978)" d="m0 0h48l5 10 6 7 10 7 1 1v43h-3l-4 9-8 24-9 29-15 46-12 38-15 47-18 57-15 47-16 50-11 35-10 31-11 34-16 50-35 110-16 51-15 47-16 50-14 44-14 43-5 17-10 31-17 53-13 41-12 38-16 51-10 31-17 53-12 37-5 17-9 27-11 35-21 66-12 38-16 50-14 45-9 27-8 25-10 32-12 37-9 29-20 63-11 35-17 54-9 28-8 25-9 29-16 50-8 23-10 23-7 12-7 6-6 9v1h-33l-8-6-8-8-11-16-8-15-13-29-10-22-9-21-18-41-12-29-6-13-11-26-18-41-11-26-13-30-18-42-17-39-15-35-26-60-18-42-14-32-9-21-13-30-12-28-14-32-10-23-15-35-26-60-23-54-13-31-12-28-9-20-4-6-5-4-24-9-21-8-33-13-47-18-41-16-50-19-117-45-36-14-29-11-78-30-36-14-50-19-41-16-50-19-112-43-44-17-29-11-49-19-20-9-10-6-12-11-7-6h-1v-35l9-10 12-10 16-8 15-6 45-16 40-14 24-8 41-14 47-16 34-12 36-12 106-36 26-9 38-13 105-36 121-41 23-8 82-28 144-49 74-25 31-11 27-9 79-27 342-116 28-10 36-12 85-29 43-15 36-12 70-24 36-12 62-21 43-15 16-6 5-2zm-148 150-44 15-36 12-52 17-25 9-72 24-64 22-36 12-47 16-217 74-21 7-41 14-36 12-19 7-36 12-64 22-36 12-105 36-65 22-29 10-27 9-41 14-191 65-20 7-82 28-36 12-31 11-30 10-41 14-46 16-28 9-29 8-6 4 3 2 18 8 27 11 36 14 29 11 39 15 41 16 34 13 229 88 104 40 24 9 28 11 27 10 36 14 22 9 20 7 32 13 17 6 19 8 5 1 1-3 3-1 5-6v-2h2l21-21 7-8 650-650 6-7 8-7 4-5 8-7 113-113 8-7 7-7 8-7 15-15v-2zm68 61-27 27v2l-3 1-5 5-11 12-8 8-5 6-3 2v2l-4 2-29 29-6 5-7 8-7 6-7 8-705 705-8 7-4 4v2h-2l-7 8-10 9-2 1v2h-2l-5 5-2 4 6 10 8 19 15 34 15 36 20 46 24 56 39 90 30 70 11 25 13 30 11 26 39 90 15 35 13 30 16 37 14 33 13 30 11 25 13 31 10 29 4 6 4 1 4-7 15-45 12-39 14-44 12-36 21-66 16-50 17-54 10-32 10-30 11-35 20-63 22-69 18-57 22-69 16-50 13-41 15-47 18-57 17-53 14-45 10-31 14-44 10-31 17-54 8-25 13-40 8-26 10-31 19-59 30-95 14-44 16-51 20-62 14-45 6-16 2-10v-5z" />
                                <path transform="translate(663,1336)" d="m0 0h8l13 4 10 6 8 8 6 12 3 10v10l-8 16-8 11-9 11h-2v2h-2v2h-2l-2 4-33 33-6 7-8 7-9 10-3 3h-2v2h-2l-2 4-10 10h-2l-2 4-28 28h-2v2h-2l-2 4-14 14h-2l-2 4-8 8-5 4-7 8-4 2v2l-6 5-6 7-8 7-8 9-8 7-8 9-8 7-8 9-8 7-9 10-6 5-1 2h-2l-2 4-8 8h-2v2h-2v2h-2l-2 4-8 8h-2v2h-2l-2 4-10 10h-2v2h-2l-2 4-296 296-11 9-8 6-14 10-4 4v1h-32l2-6-11-12-8-7-5-4h-2v-29h2l2-5 12-16 9-10 7-8 24-24 7-8 4-4h2l2-4 552-552 14-11 11-7 10-4z" />
                                <path transform="translate(352,1157)" d="m0 0h7l12 5 14 9 7 7 5 8 2 7 1 12-3 10-8 14-10 12-7 8-275 275-8 7-11 10-11 7-18 8-4 1h-7l-10-4-10-7v-2l-3-1-7-8-8-9v-26l13-17 8-10 30-30 3-4h2l2-4 6-5 7-8 7-7h2l2-4 220-220h2l2-4h2l2-4 8-7 10-8 16-8z" />
                                <path transform="translate(842,1648)" d="m0 0 14 2 12 6 8 6 8 13 6 11-1 10-5 12-8 14-10 11-7 8-77 77-5 6-8 7-8 9-8 7-8 9-8 7-8 9-7 6-7 8-5 4-7 8-83 83-3 1v2l-7 6-7 8-5 4-5 5-8 9-11 9-8 7-14 10-5 4h-2v2h-26v-3l-5-5-13-12-6-8-5-10-1-7 8-21 7-11 12-14 80-80 6-7 8-7 3-4h2l2-4 11-10 7-8 9-8 1-2h2l2-4 11-10 1-2h2l2-4 11-10 1-2h2l2-4 11-10 7-8 9-8 7-8 9-8 7-8 9-8 7-8 8-7 7-8 19-19 7-6 5-6 8-7 11-10 15-10 7-3z" />
                                <path transform="translate(2045,75)" d="m0 0h3v9h-2v-4h-3z" />
                                <path transform="translate(1357,2045)" d="m0 0 7 2v1h-8z" />
                                <path transform="translate(0,2045)" d="m0 0 3 3h-3z" />
                                <path transform="translate(8,2031)" d="m0 0 3 2-1 2z" />
                                <path transform="translate(547,2046)" d="m0 0 1 2-2-1z" />
                                <path transform="translate(6,2030)" d="m0 0 2 1z" />
                                <path transform="translate(1399,2046)" d="m0 0" />
                                <path transform="translate(1359,2044)" d="m0 0" />
                                <path transform="translate(13,2037)" d="m0 0" />
                                <path transform="translate(12,2036)" d="m0 0" />
                                <path transform="translate(11,2035)" d="m0 0" />
                                <path transform="translate(12,2031)" d="m0 0" />
                                <path transform="translate(10,2029)" d="m0 0" />
                                <path transform="translate(11,2028)" d="m0 0" />
                                <path transform="translate(2,2019)" d="m0 0" />
                                <path transform="translate(1,730)" d="m0 0" />
                                <path transform="translate(0,691)" d="m0 0" />
                                <path transform="translate(1975)" d="m0 0" />
                            </svg>

                        </motion.button>
                    </div>
                </div>

                <div
                    style={{
                        height: reelHeight,
                    }}
                    className='cntReel_cmp mt50 psr pl5 pr5 pb10 c-e-s'>
                    <div className="cnt_main__rell wmia c-c-c">
                        <motion.video
                            initial={{
                                opacity: 0,
                                scale: .6,
                                y: 20
                            }}
                            animate={{
                                opacity: 1,
                                scale: 1,
                                y: 0,
                                transition: {
                                    delay: .2
                                }

                            }}
                            src={URL.createObjectURL(video)}
                            loop
                            autoPlay

                        ></motion.video>
                    </div>
                    <div style={{ zIndex: "2" }} className="r-b-s  wmia">
                        <User_ id={_id} date={new Date} img_url={profile_img} name={`${FirstName} ${LastName}`} nameStyle={"c-rl"} dateStyle={'c-rl'} />
                    </div>
                    <Abbreviator_text t={description} l={60} s='mt10 c-rl z2  ml20' />
                </div>

            </div>
        )
    }
    return (
        <div className='wmia mt20 r-p-c ' style={{}}>
            {
                currentSteps == 0 &&
                <UploadVideoStep />
            }
            {
                currentSteps == 1 &&
                <NextToDescStep />
            }
            {
                currentSteps == 2 &&
                <AddDescriptionStep />
            }
            {
                currentSteps == 3 &&
                <LastStep />
            }

        </div>
    )
}

export default Reel_create
