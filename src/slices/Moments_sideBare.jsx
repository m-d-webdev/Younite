import React, { useEffect, useMemo, useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import { useNavigate } from 'react-router-dom'
import api from '../config/axios'
import { motion } from 'framer-motion'
import { useSelector, useDispatch } from 'react-redux'
import L_loader from "../components/L_loader"
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import Single_moment from '../components/Single_moment'
import { _OnContainerClickOut, Abbreviator_text, GetShortNum, TimeAgo } from '../components/Abbreviator'
import Emoji_btn from '../components/emoji_btn'
import HappyIcone from '../components/HappyIcone'
import { Ten } from './ten_slice'
import { add_viewed_article_in_local } from './userSlice'
import List_replies from '../components/list_replies'
import List_Views from '../components/list_views'
import Counter_moments from '../components/Counter_moments'
import { BringViewUserData } from './viewUser'


export const BringUserMoments = createAsyncThunk(
    "MomentsSlice/BringUserMoments",
    async (_, { rejectWithValue }) => {
        try {

            const req = await api.get("/user/Get_user_moments");
            return req.data.user_moments
        } catch (error) {
            return rejectWithValue()
        }
    }
)

export const BringNewMoments = createAsyncThunk(
    "MomentsSlice/BringNewMoments",
    async (_, { rejectWithValue }) => {
        try {
            const req = await api.get("/user/Get_current_moments");
            req.data.NewMoments.forEach(m => {
                let SortedMoments = m.moments.sort((a, b) => new Date(b.createAt) - new Date(a.createAt));
                m['SortedMoments'] = SortedMoments
            })
            return req.data.NewMoments
        } catch (error) {
            return rejectWithValue()
        }
    }
)

const MomentsSlice = createSlice({
    name: "MomentsSlice",
    initialState: {
        isLoading: false,
        user_moments: [],
        Moments: [],
        ShowMomentVSBL: false,
        shoosedMoment: {},
        ShowuserMomentsVSBL: false,
        playingMomentDuration: 6000
    },
    reducers: {
        open_showMoments: (state, action) => {
            state.ShowMomentVSBL = true;
            state.shoosedMoment = action.payload
        },
        close_showMoments: (state) => {
            state.ShowMomentVSBL = false;
        },
        open_show_user_Moments: (state) => {
            state.ShowuserMomentsVSBL = true;
        },
        close_sho_user_wMoments: (state) => {
            state.ShowuserMomentsVSBL = false;
        },
        setplayingMomentDuration: (state, action) => {
            state.playingMomentDuration = action.payload;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(BringNewMoments.pending, (state) => {
                state.isLoading = true
            })
            .addCase(BringNewMoments.fulfilled, (state, action) => {
                state.isLoading = false;
                state.Moments = action.payload
            })
            .addCase(BringNewMoments.rejected, (state) => {
                state.isLoading = false
            })

            // -------

            .addCase(BringUserMoments.fulfilled, (state, action) => {
                state.user_moments = action.payload
            })
    }
})

export const { open_showMoments, close_showMoments, open_show_user_Moments, close_sho_user_wMoments, setplayingMomentDuration } = MomentsSlice.actions

export default MomentsSlice.reducer;



// --------------
export function Moments_sideBare() {
    const { profile_img, following } = useSelector(s => s.User)
    const { isLoading, Moments, user_moments } = useSelector(s => s.Moments)
    const Loader_loding = useSelector(s => s.loader.isLoading)

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [countReplies, setcountReplies] = useState(user_moments?.reduce((t, el) => (t + el.replies?.length), 0))
    const [countViewrs, setcountViewrs] = useState(user_moments?.reduce((t, el) => (t + el.views?.length), 0))
    useEffect(() => {
        setcountReplies(user_moments?.reduce((t, el) => (t + el.replies?.length), 0))
        setcountViewrs(user_moments?.reduce((t, el) => (t + el.views?.length), 0))
    }, [user_moments]);

    useEffect(() => {
        dispatch(BringNewMoments());
        dispatch(BringUserMoments());
    }, [])
    return (
        <div className='wmia'>
            <>
                {
                    user_moments.length == 0 ?
                        <>
                            <motion.button
                                initial={{
                                    y: 20,
                                    opacity: 0,
                                }}
                                animate={{
                                    y: 0,
                                    opacity: 1,
                                    transition: { duration: .5 }
                                }}
                                onClick={() => navigate('/create/moment')}
                                style={{
                                    background: "rgb(2, 13, 153)",
                                    background: "linear-gradient(100deg, rgba(2,13,153,0.8028711484593838) 24%, rgba(201,6,162,0.5675770308123249) 98%)"
                                }}
                                className='r-s-c wmia   br20 br10'>
                                <img style={{ filter: "drop-shadow(0 0 20px #fff)" }} src={profile_img} alt="" className="w40 h40 imgCercle" />
                                <strong className='fw900 ml10 c-rl r-s-c'>
                                    <svg xmlns="http://www.w3.org/2000/svg" className='mr5 f-rl' viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" /></svg>
                                    New moment
                                </strong>
                            </motion.button>
                        </>
                        :
                        <>
                            <motion.button
                                initial={{
                                    y: 20,
                                    opacity: 0,
                                }}
                                animate={{
                                    y: 0,
                                    opacity: 1,
                                    transition: { duration: .5 }
                                }}
                                onClick={() => dispatch(open_show_user_Moments())}
                                className='r-b-c wmia hoverEff1 bg-l  br10 p10'>
                                <div className="r-s-c">
                                    <img style={{ filter: "drop-shadow(0 0 20px #fff)" }} src={profile_img} alt="" className="w40 h40 imgCercle" />
                                    <strong className='fw900 ml10  r-s-c'>
                                        My moments
                                    </strong>
                                </div>
                                <div className="r-s-c">

                                    <div className="r-s-c">
                                        <span className="imgCercle bg-g mr5" style={{ padding: "4px" }}></span>
                                        <p>{user_moments.length}</p>
                                    </div>

                                    <span className="c-c-c  br5 bg-third ml5" style={{ padding: "4px 7px " }}>
                                        <svg style={{ width: "13px", height: "13px" }} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z" /></svg>
                                        <p style={{ fontSize: "11px" }}>{GetShortNum(countViewrs)}</p>
                                    </span>

                                    <span className="c-c-c  br5 bg-third ml5" style={{ padding: "4px 7px " }}>
                                        <svg style={{ width: "13px", height: "13px" }} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M760-200v-160q0-50-35-85t-85-35H273l144 144-57 56-240-240 240-240 57 56-144 144h367q83 0 141.5 58.5T840-360v160h-80Z" /></svg>
                                        <p style={{ fontSize: "11px" }}>{GetShortNum(countReplies)}</p>
                                    </span>

                                </div>
                            </motion.button>
                        </>
                }
            </>
            {
                following.length > 0 &&
                <>

                    <div className="wmia  p10 bg-l r-b-c mt20">

                        <p className=''>New moments</p>
                        <button onClick={() => dispatch(BringNewMoments())} className='imgCercle p5 bg-fourth c-c-c'>
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M480-80q-75 0-140.5-28.5t-114-77q-48.5-48.5-77-114T120-440h80q0 117 81.5 198.5T480-160q117 0 198.5-81.5T760-440q0-117-81.5-198.5T480-720h-6l62 62-56 58-160-160 160-160 56 58-62 62h6q75 0 140.5 28.5t114 77q48.5 48.5 77 114T840-440q0 75-28.5 140.5t-77 114q-48.5 48.5-114 77T480-80Z" /></svg>
                        </button>
                    </div>
                    <div className="list_newMoments bg-l scrl_none wmia pl5 pt15" style={{ minHeight: "100px", maxHeight: "330px", overflow: "auto" }}>
                        {
                            isLoading ?

                                <L_loader className={'mrauto mt20'} />

                                :

                                Moments.map((m, index) =>
                                    <Single_moment i={index} m={m} key={m._id} />

                                )
                        }
                    </div>
                </>
            }

        </div>
    )
}


export function ShowMoments() {

    const { profile_img, viewed } = useSelector(s => s.User)
    const { shoosedMoment } = useSelector(s => s.Moments);

    const SlideRef = useRef()
    const ConteitnwRef = useRef(null)
    const [ScrollRightVal, setScrollRightVal] = useState(0)
    const dispatch = useDispatch();
    const handelMoveMoments = e => {
        const { clientX } = e
        const GoRight = (window.innerWidth / 2) < clientX;
        if (GoRight) {
            MoveSLiderFn(true)
        } else {
            MoveSLiderFn(false)
        }
    }
    const [SelectedMomentIndex, setSelctedMomentIndex] = useState(ScrollRightVal / 510);


    const MoveSLiderFn = (v = true) => {

        const SlideRef_width = SlideRef.current?.offsetWidth;
        let isStillHaveSpaceToScrollRight = ScrollRightVal < SlideRef_width - 510
        let isStillHaveSpaceToScroll_left = ScrollRightVal > 0
        if (v) {
            if (isStillHaveSpaceToScrollRight) {
                setScrollRightVal(c => c + 510)
            }
        } else {
            if (isStillHaveSpaceToScroll_left) {
                setScrollRightVal(c => c - 510)
            }
        }
    }

    useEffect(() => {
        setSelctedMomentIndex(ScrollRightVal / 510);
    }, [ScrollRightVal])

    const WriteRepliesCmp = ({ momentId }) => {

        const [content, setcontent] = useState("")
        const [isSendingReplay, setisSendingReplay] = useState(false)
        const [isWritinng, setisWritinng] = useState(false)

        const [isLikedDone, setLikedDone] = useState(false)
        const [iLovedDone, seLovedDone] = useState(false)
        const [isHAHA, sisHAHA] = useState(false)


        const SubmitReplay = async (e) => {
            setisSendingReplay(true);
            await api.post("/user/put_moment_replay", {
                content,
                momentId
            }).then(res => {
                console.log(res);
                setisSendingReplay(false);
                setcontent('');
                dispatch(Ten([, "Raplay submited successfully"]))
            }).catch(er => {
                console.log(er);
                dispatch(Ten([false, "Failed to save the replay "]))
                setisSendingReplay(false);

            })
        }

        const sendInteractio = async (k, cl) => {
            setLikedDone(false);
            seLovedDone(false);
            sisHAHA(false);
            cl();
            await api.post("/user/put_moment_replay", {
                content: k,
                momentId
            }).then(e => {

            })
        }

        return (
            <motion.div
                className="r-b-c p5    " style={{ position: "absolute", width: "95%", bottom: '10px', filter: "drop-shadow(0 0 10px var(--filter-color))" }}>
                <motion.div
                    animate={{
                        width: isWritinng ? ['75%', '100%'] : ''
                    }}

                    className="r-s-c bg-l br20 p5 wmia ">
                    <img src={profile_img} alt="" style={{ minWidth: "30px", minHeight: "30px" }} className="w30 h30 imgCercle" />
                    <input value={content} type="text" className='ml10 wmia mr15' onChange={e => setcontent(e.target.value)} style={{ border: "none" }} placeholder='Replay ... ' />
                    < Emoji_btn />
                    <>

                        {
                            isSendingReplay ?
                                <>
                                    <L_loader className={'mr5 ml5'} />
                                </>
                                :
                                <>
                                    {
                                        content != "" &&
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

                                            onClick={SubmitReplay}
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
                                </>
                        }
                    </>
                </motion.div>
                <>
                    {
                        content == "" &&

                        <>
                            <motion.button
                                style={{ cursor: "pointer" }}
                                onClick={(e) => sendInteractio('??love??', () => seLovedDone(true))}

                                initial={{
                                    y: 50
                                }}
                                animate={
                                    iLovedDone ?
                                        {
                                            y: [0, -760],
                                            x: [0, -350],
                                            scale: [1, 4],
                                            opacity: [1, 0]
                                        }
                                        :
                                        {
                                            y: 0,
                                            transition: {
                                                delay: .3
                                            },
                                        }
                                }

                                className={'p0 ml5'}
                            >
                                <svg version="1.1" viewBox="0 0 2048 2048" className='w30 h30' xmlns="http://www.w3.org/2000/svg">
                                    <path transform="translate(929)" d="m0 0h184l54 8 48 9 41 9 52 13 39 12 35 12 34 13 28 12 33 16 22 11 10 6 14 7 24 14 19 12 16 10 15 10 20 14 19 14 17 13 10 8 13 11 11 9 13 12 10 9 24 22 38 38 7 8 9 10 7 8 9 10 11 14 11 13 10 13 12 16 12 17 14 20 14 22 14 23 9 15 14 25 11 21 8 16 17 36 11 26 14 36 12 36 12 40 15 60 10 50 12 74 1 7v161l-11 70-8 45-8 36-11 44-14 48-10 30-15 38-13 31-14 30-12 24-13 23-17 29-8 13-15 24-15 22-12 17-11 14-10 13-14 19-11 13-7 8-9 10-7 8-16 17-9 10-26 26-8 7-3 3h-2v2l-11 9-9 9-8 7-14 12-11 9-16 12-19 14-15 11-17 12-23 15-28 17-17 10-21 12-35 18-33 16-43 18-39 14-34 11-35 10-44 11-51 11-54 10-31 5h-176l-44-8-95-19-60-15-35-11-24-8-35-14-42-18-30-14-32-16-46-27-19-12-16-10-17-12-18-13-21-16-16-12-13-11-11-9-11-10-8-7-10-9-15-14-9-9-8-7v-2l-4-2v-2l-3-1-7-8-12-12-7-8-15-16-7-8-11-13-8-10-13-16-13-17-14-19-11-16-16-24-16-26-15-26-13-24-9-17-11-23-13-29-11-27-9-24-14-41-13-44-8-33-12-55-8-44-7-45v-195l5-25 11-59 10-46 10-40 17-56 9-25 11-28 11-26 11-25 15-31 10-19 15-27 9-15 10-17 7-10 7-11 19-28 33-44 13-16 12-14 11-12 15-16 24-26 21-21 8-7 7-7 8-7 12-11 13-12 11-9 16-13 20-15 19-14 13-9 39-26 22-13 24-14 24-13 32-16 42-19 33-13 28-10 34-11 44-12 40-10 50-10 38-7z" fill="#E62A43" />
                                    <path transform="translate(737,487)" d="m0 0h24l22 1 27 3 27 6 26 8 12 5 16 7 13 7 15 9 22 15 10 9 8 6 7 7 11 9 28 28 8 11 4 4v3l8 1 9-9 3-5h2l1-4 5-4h2l2-4 9-10 3-3h2l1-3 8-7 21-18 10-8 11-8 16-11 20-11 17-9 32-12 24-6 21-4 29-3h31l28 2 27 4 21 5 30 10 19 8 21 11 15 9 14 9 14 11 10 8 13 12 6 5 7 8 10 10 9 11 13 18 12 19 9 15 15 32 7 17 6 18 6 20 8 37 3 18 1 13v40l-3 35-5 32-7 28-12 37-13 30-8 17-9 16-7 12-9 15-7 11-4 6h-2l-1 4-6 9-10 13-1 2h-2l-2 4-5 7-5 5-10 13-8 8-7 10-7 6-9 11-5 5-10 11h-2l-1 3-4 4h-2l-2 4-12 12h-2l-2 4-15 14-17 16-3 3h-2v2l-7 6h-2l-1 3-8 7-10 9-11 9-7 7-8 7-10 9-13 12-14 12-13 12-11 9-14 12-11 9-17 14-9 8-8 7-14 12-10 9-8 7-10 9-11 9-3 1v2l-10 8-14 12-6 5-11 9-13 11-10 9-10 8-10 9-12 9-15 7-11 3-6 1h-18l-16-5-12-6-18-13-10-8-13-11-8-7-30-26-10-9-10-8-15-13-11-9-15-13-14-12-10-9-11-9-15-13-10-9-11-9-15-13-11-9-15-14-8-7-10-9-15-13-16-15-8-7-13-12-16-15-9-9-8-7-47-47-7-8-10-11-7-8-14-15-9-11-11-13-14-19-7-10-12-18-11-17-6-11-14-26-9-20-13-35-7-24-8-36-4-27-2-28v-18l2-35 4-28 4-19 7-25 5-14 3-9 8-18 8-16 11-20 11-18 21-28 11-12 7-8 11-12 14-12 16-13 13-9 18-11 23-12 12-6 27-10 21-6 26-5 21-3z" fill="#FEFEFD" />
                                </svg>
                            </motion.button>
                            <motion.button
                                style={{ cursor: "pointer" }}
                                onClick={(e) => sendInteractio('??like??', () => setLikedDone(true))}
                                initial={{
                                    y: 50
                                }}
                                animate={
                                    isLikedDone ?
                                        {
                                            y: [0, -760],
                                            x: [0, -370],
                                            scale: [1, 4],
                                            opacity: [1, 0]
                                        }
                                        :
                                        {
                                            y: 0,
                                            transition: {
                                                delay: .3
                                            },
                                        }
                                }
                                className={'p0 ml5'}
                            >
                                <svg version="1.1" viewBox="0 0 2048 2048" className='w30 h30' xmlns="http://www.w3.org/2000/svg">
                                    <path transform="translate(929)" d="m0 0h184l60 9 51 10 43 10 44 11 50 16 33 12 29 12 27 12 25 12 30 15 22 12 28 17 21 13 25 17 18 13 16 12 21 16 9 7 13 11 11 9 13 12 8 7 15 14 10 9 30 30 7 8 12 13 7 8 10 11 9 11 12 14 20 26 12 17 10 14 11 16 14 22 16 26 15 26 11 19 19 38 14 31 16 40 11 30 9 28 14 49 14 58 8 43 8 48 4 26v161l-11 70-8 45-9 40-11 43-15 51-11 31-12 30-11 26-16 35-8 15-8 16-13 23-17 28-14 23-19 28-11 16-11 14-21 28-11 14-12 14-9 10-7 8-32 34-16 16-8 7-8 8-8 7-12 11-11 9-13 12-17 13-12 9-19 14-16 12-21 14-19 12-18 11-15 9-24 14-42 22-34 16-40 17-41 15-42 13-28 8-54 13-42 9-61 11-19 3h-176l-44-8-94-19-60-15-35-11-30-10-40-16-33-14-32-15-22-12-16-9-28-17-17-10-21-13-19-13-18-13-19-14-13-10-14-11-14-12-10-9-11-9-7-7-8-7-12-11-12-12-2-1v-2l-4-2v-2l-4-2v-2h-2l-7-8-13-13-7-8-11-12-9-11-13-15-13-16-11-14-15-20-13-18-12-17-15-23-13-21-12-21-15-27-19-38-13-29-17-42-17-49-14-47-9-37-11-51-9-49-6-39v-194l7-36 11-57 8-37 10-40 16-53 10-28 11-28 11-26 16-35 17-34 14-24 5-9 24-39 12-19 14-20 12-16 13-17 8-11 10-13 11-14 12-14 8-8 7-8 9-9 7-8 8-8 7-8 15-15 8-7 16-15 10-9 15-14 11-9 14-11 19-14 15-11 13-10 17-12 29-19 27-16 20-12 21-12 23-12 29-14 38-16 30-12 47-16 47-13 44-11 65-13 43-7z" fill="#2296F9" />
                                    <path transform="translate(952,413)" d="m0 0h9l20 4 24 8 21 9 17 9 11 6 12 7 17 12 12 11 5 5 8 9 9 15 7 15 4 16 2 13v35l-4 28-5 23-11 42-18 66-12 41-8 28-1 5 22 3 36 2 53 1 245 1 20 1 26 4 17 5 21 8 17 8 19 12 11 8 13 11 8 8 10 13 7 11 8 16 4 11 4 24v18l-3 23-7 30-13 50-11 43-20 79-16 64-13 50-8 28-12 36-10 25-8 17-10 17-11 16-9 11-9 10-9 9-16 12-10 6-16 8-15 6-14 4-9 2-23 2h-304l-74 1h-20l-14-1-16-4-69-28-35-14-34-13-6-5-2-4-1-11-1-150-1-333v-104l1-43 2-17 4-12 13-28 16-38 11-26 16-38 12-30 14-34 12-28 15-36 11-26 12-28 10-21 8-17 10-17 10-10 8-4z" fill="#FDFDFD" />
                                    <path transform="translate(616,826)" d="m0 0h115l2 2 1 9 1 155v139l-1 319-1 16-3 18-8 16-9 10-9 8-10 6-9 4-13 3-25 2h-146l-20-4-15-6-8-6-9-9-5-8-6-17-2-18-1-23-1-456v-95l1-13 7-14 10-13 8-8 13-9 13-5 18-2z" fill="#FDFDFD" />
                                    <path transform="translate(2027,1212)" d="m0 0h2l-1 8-8 36-11 43-15 51-11 31-12 30-11 26-16 35-8 15-8 16-13 23-17 28-14 23-19 28-11 16-11 14-21 28-11 14-12 14-9 10-7 8-32 34-16 16-8 7-8 8-8 7-12 11-11 9-13 12-17 13-12 9-19 14-16 12-21 14-19 12-18 11-15 9-24 14-42 22-34 16-40 17-41 15-42 13-28 8-54 13h-28l-2-2 1-5 5-2v-3l9-5h2v-2l7-3 10-4 15-1 3-3 1-4 7-3 15-3 6-2h4v-2l16-7 8-1 8-3 11-4 9-1 10-4 12-2 13-5 5-3 9-2 11-3 7-3 6-1 2-2 5-1v2l11-2 1-3 18-9h2l1-2 10-4 10-5 4-3 5-1 5-3 2 1 1-2 13-5 4-2 8-5h3v-2l16-8 8-6 12-7 18-12 8-4 2-4 10-7 8-4 7-5 4-1 1-3 6-2 9-5 3-3 6-4 5-6 9-6 4-5 2-5 6-2v2l9-5 9-10h3l4-2 11-8 4-2 1-2h3v-2l4-1 1-3 6-4 10-10 8-7 6-11 4-2 5-5 8-7 8-8 7-8 8-8 2-8 3-6v-3l8-9 5-2 2-7 8-8 8-15 8-10h2l2-5 7-10 3-5h2l3-9 3-4h2l3-9 10-19 7-13 8-10 8-14 6-11 18-36 4-10 10-19 10-18 5-11 5-9 6-12 3-7 6-12h2l2-5 6-10 2-10 3-9 7-18 2-3h2v-2h2l3-14 5-25 1-7 4-9 5-16 5-11 3-12 5-10 4-5z" fill="#0E88EE" />
                                    <path transform="translate(573,103)" d="m0 0 4 1-6 7-9 3-2 2v-2h-5v-2z" fill="#128BF0" />
                                    <path transform="translate(607,87)" d="m0 0 4 1-9 8h-6l-3 1-1 2-3-1-4 1v-2z" fill="#118AF0" />
                                    <path transform="translate(1210,18)" d="m0 0h9l10 2 1 3-7 1-7-2-6-2z" fill="#1089EF" />
                                    <path transform="translate(539,121)" d="m0 0h3v2l-5 5h-4l2-5z" fill="#118AF0" />
                                    <path transform="translate(594,93)" d="m0 0 3 1-2 3h-2l-1 2-3-1-4 1v-2z" fill="#148CF1" />
                                </svg>
                            </motion.button>
                            <motion.button
                                style={{ cursor: "pointer" }}
                                onClick={(e) => sendInteractio('??haha??', () => sisHAHA(true))}
                                initial={{
                                    y: 50
                                }}
                                animate={
                                    isHAHA ?
                                        {
                                            y: [0, -760],
                                            x: [0, -390],
                                            scale: [1, 4],
                                            opacity: [1, 0]
                                        }
                                        :
                                        {
                                            y: 0,
                                            transition: {
                                                delay: .3
                                            },
                                        }
                                }
                                className={'p0 ml5'}
                            >

                                <HappyIcone className={'w30 h30'} />

                            </motion.button>

                        </>
                    }
                </>

            </motion.div >

        )
    }

    const declare_view_moment = async (moment_id) => {
        const isMatch = viewed.moments.includes(moment_id);
        if (!isMatch) {
            await api.post('/user/declare_view_moment', { moment_id }).then(res => {
                dispatch(add_viewed_article_in_local(["moments", moment_id]))
            }).catch(err => {
                console.log("error declaring viewed => ", err);
            })
        }
    }

    const MomentTypeText = useMemo(
        () =>
            ({ content, style, _id }) => {
                let StyleProps = {}
                style.split('?').map(e => {
                    StyleProps = { ...StyleProps, [e.substring(0, e.indexOf('='))]: e.substring(e.indexOf('=') + 1) }
                })
                const MomentRef = useRef(null);
                useEffect(() => {
                    if (MomentRef.current) {

                        new IntersectionObserver(
                            ([ent]) => {
                                if (ent.isIntersecting) {
                                    dispatch(setplayingMomentDuration(6000))
                                    declare_view_moment(_id)
                                }
                            }, { threshold: 1 }
                        ).observe(MomentRef.current)
                    }

                }, [])
                return (
                    <motion.div
                        ref={MomentRef}
                        className="w500 scrl_none c-c-c   p10 borde psr  text-center border  br10 hmia" style={{ ...StyleProps, height: "100%", margin: "0 5px", maxHeight: "100%", overflow: "auto" }}>
                        <p style={{ ...StyleProps, maxHeight: "100%", overflow: "auto", paddingBottom: "50px", paddingTop: "40px" }} className='scrl_none'>{content}</p>
                        <WriteRepliesCmp momentId={_id} />
                    </motion.div>
                )
            }, []);

    const MomentTypeImage = useMemo(
        () =>
            ({ content, url, _id }) => {
                const MomentRef = useRef(null);
                useEffect(() => {

                    if (MomentRef.current) {
                        new IntersectionObserver(
                            ([ent]) => {
                                if (ent.isIntersecting) {
                                    dispatch(setplayingMomentDuration(6000))
                                    declare_view_moment(_id);
                                }
                            }, { threshold: 1 }
                        ).observe(MomentRef.current)
                    }

                }, [])

                return (
                    <div
                        ref={MomentRef}
                        className={`w500 scrl_none c-c-c    psr  text-center  hmia ${content != "" ? 'MometComt' : ""} `} style={{ height: "100%", margin: "0 5px", maxHeight: "100%" }}>
                        <img src={url} className='br10' style={{ width: "100%", height: "100%", objectFit: "cover" }} alt="" />

                        <Abbreviator_text t={content} l={90} s='DescMomentContent' />

                        <WriteRepliesCmp momentId={_id} />
                    </div>
                )
            }, []);

    const MomentTypeVideo = useMemo(
        () =>
            ({ content, url, _id }) => {
                const videoRef = useRef(null);
                useEffect(() => {
                    const obser = new IntersectionObserver(
                        ([ent]) => {
                            if (ent.isIntersecting) {
                                const getTime = () => {
                                    if (!isNaN((ent.target.duration * 1000))) {
                                        dispatch(setplayingMomentDuration((ent.target.duration) * 1000))
                                    } else {
                                        setTimeout(() => {
                                            // dispatch(setplayingMomentDuration((ent.target.duration) * 1000))

                                            getTime()
                                        }, 200);
                                    }
                                }
                                getTime()

                                ent.target.currentTime = 0
                                ent.target.play();
                            } else {

                                ent.target.pause()
                            }
                        },

                        {
                            threshold: 1
                        }
                    )
                    if (videoRef.current) {
                        obser.observe(videoRef.current)
                    }
                }, [])

                return (
                    <div

                        className={`w500 scrl_none c-c-c    psr  text-center  hmia ${content != "" ? 'MometComt' : ""}`} style={{ height: "100%", margin: "0 5px", maxHeight: "100%" }}>
                        <video ref={videoRef} src={url} className='br10' style={{ width: "100%", height: "100%", objectFit: "cover" }} autoPlay alt=""></video>
                        <Abbreviator_text  t={content} l={90} s='DescMomentContent'/>
                        <WriteRepliesCmp momentId={_id} />
                    </div>
                )
            }, []);



    return ReactDOM.createPortal(
        <div className='backendMer'
            onClick={e => _OnContainerClickOut(e, ConteitnwRef.current, () => dispatch(close_showMoments()))}
        >
            <div className=" r-c-c psr" ref={ConteitnwRef}>
                <button onClick={() => MoveSLiderFn(false)} className='bg-l p10 imgCercle mr20'>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z" /></svg>
                </button>
                <div className="c-s-c psr ">
                    <div className="wmia cntMomentUserSelected p10 r-s-s">
                        <img onClick={() => dispatch(BringViewUserData(shoosedMoment._id))} src={shoosedMoment.author.profile_img} className='w40 h40 imgCercle' alt="" />
                        <div className="c-s-s wmia ml10" >
                            <div className="r-s-c">
                                <strong className='c-rl ' onClick={() => dispatch(BringViewUserData(shoosedMoment._id))}>
                                    {shoosedMoment.author.FirstName} {shoosedMoment.author.LastName}
                                </strong>
                                <p className='c-rl' style={{ fontSize: "12px" }}>{TimeAgo(shoosedMoment.moments[SelectedMomentIndex].createAt)}</p>
                            </div>
                            {
                                useMemo(() =>
                                    <Counter_moments ChoosedIndx={SelectedMomentIndex} fn={() => MoveSLiderFn(true)} r={shoosedMoment.moments} />
                                    , [SelectedMomentIndex])

                            }
                        </div>
                    </div>
                    <div className="r-s-c  psr  mb10" onDoubleClick={handelMoveMoments} style={{ height: "850px", width: "510px", overflow: "hidden" }}>
                        <div ref={SlideRef} className="r-s-c" style={{ height: "100%", transition: ".4s", transform: `translateX(-${ScrollRightVal}px)` }}>
                            {
                                shoosedMoment.SortedMoments.map(el => {
                                    if (el.type == "text") {
                                        return <MomentTypeText content={el.content} style={el.style} key={el._id} _id={el._id} />
                                    }
                                    else if (el.type == "image") {
                                        return <MomentTypeImage content={el.content} url={el.url} key={el._id} _id={el._id} />
                                    }
                                    else if (el.type == "video") {
                                        return <MomentTypeVideo content={el.content} url={el.url} key={el._id} _id={el._id} />
                                    }
                                })
                            }
                        </div>
                    </div>
                </div>
                <button onClick={() => MoveSLiderFn(true)} className='bg-l p10 imgCercle ml20 '>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z" /></svg>
                </button>
            </div>
        </div>,
        document.getElementById("portals")
    )
}

export function ShowuserMoments() {

    const { user_moments } = useSelector(s => s.Moments)
    const SlideRef = useRef()
    const ConteitnwRef = useRef(null)
    const [ScrollRightVal, setScrollRightVal] = useState(0);
    const [choosedMoment, setchoosedMoment] = useState(0)
    const dispatch = useDispatch();
    const handelMoveByIndex = e => {
        setchoosedMoment(e)
        setScrollRightVal(510 * e)
    }

    const MomentTypeText = useMemo(
        () =>
            ({ content, style, _id }) => {
                let StyleProps = {}
                style.split('?').map(e => {
                    StyleProps = { ...StyleProps, [e.substring(0, e.indexOf('='))]: e.substring(e.indexOf('=') + 1) }
                })
                return (
                    <motion.div
                        className="w500 scrl_none c-c-c   p10  psr  text-center border  br10 hmia" style={{ ...StyleProps, height: "100%", margin: "0 5px", maxHeight: "100%", overflow: "auto" }}>
                        <p style={{ ...StyleProps, maxHeight: "100%", overflow: "auto", paddingBottom: "50px" }} className='scrl_none'>{content}</p>
                    </motion.div>
                )
            }, []);
    const MomentTypeImage = useMemo(
        () =>
            ({ content, url, _id }) => {

                return (
                    <div
                        className={`w500 scrl_none c-c-c    psr  text-center  hmia ${content != "" ? 'MometComt' : ""} `} style={{ height: "100%", margin: "0 5px", maxHeight: "100%" }}>
                        <img src={url} className='br10' style={{ width: "100%", height: "100%", objectFit: "cover" }} alt="" />
                        <Abbreviator_text t={content} l={90} s='DescMomentContent2' />
                    </div>
                )
            }, []);
    const MomentTypeVideo = useMemo(
        () =>
            ({ content, url, _id }) => {


                const videoRef = useRef(null);

                useEffect(() => {
                    const obser = new IntersectionObserver(

                        ([ent]) => {
                            if (ent.isIntersecting) {
                                ent.target.currentTime = 0
                                ent.target.play()
                            } else {

                                ent.target.pause()
                            }
                        },

                        {
                            threshold: 1
                        }
                    )
                    if (videoRef.current) {
                        obser.observe(videoRef.current)
                    }
                }, [])

                return (
                    <div

                        className={`w500 scrl_none c-c-c    psr  text-center  hmia ${content != "" ? 'MometComt' : ""}`} style={{ height: "100%", margin: "0 5px", maxHeight: "100%" }}>
                        <video ref={videoRef} loop src={url} className='br10' style={{ width: "100%", height: "100%", objectFit: "cover" }} autoPlay alt=""></video>
                        <Abbreviator_text t={content} l={90} s='DescMomentContent2' />
                    </div>
                )
            }, []);


    const ShowRepliesANDViewsForMoment = ({ momentId }) => {
        const [isLoadingInter, setisLoadingInter] = useState(true)
        const [ListViews, setListViews] = useState([]);
        const [Listreplies, setListreplies] = useState([]);
        const [isShowingView, setisShowingView] = useState(false)

        const GetViewsData = async () => {
            setisLoadingInter(true);
            await api.get("/moments/get_interaction", { params: { momentId } }).then(res => {
                console.log(res);
                setListViews(res.data.views);
                setListreplies(res.data.replies)
                setisLoadingInter(false);
            }).catch(er => {
                setisLoadingInter(false);
                console.log(er);
            })
        }
        useEffect(() => {
            GetViewsData();
        }, [])

        return (
            <div className='h800 c-s-s bg-l br10  cntInterMoment' style={{ width: "600px" }}>
                <div className="wmia r-p-c p5 " style={{ borderBottom: "solid 1px var(--border-color)" }}>
                    <button
                        onClick={() => setisShowingView(true)}
                        className="r-c-c p10 br5 bg-l wkhmsin hoverEff1 ">
                        <svg className={isShowingView ? "f-b mr10" : "mr10"} version="1.1" viewBox="0 0 2048 2048" width="128" height="128" xmlns="http://www.w3.org/2000/svg">
                            <path transform="translate(983,795)" d="m0 0h77l46 3 47 5 41 6 40 8 42 10 44 13 38 13 34 13 33 14 33 15 32 16 22 12 27 15 19 12 26 16 18 12 19 13 38 28 17 13 17 14 10 8 13 11 10 8 10 9 8 7 10 9 2 1v2l4 2 13 13 8 7 43 43 7 8 13 13 7 8 9 10 7 8 9 10 9 11 11 13 10 13 12 15 10 13 15 20 11 16 12 17 8 12 11 17 20 32 18 32 8 14 9 16 7 12 1 1v51l-3 1-11 16-9 10-10 9-13 8-17 6-16 2h-12l-15-3-16-8-10-8-10-10-12-18-16-28-15-25-15-24-16-25-11-15-12-17-14-19-14-18-9-11-24-28-12-13v-2h-2l-7-8-9-10-14-15-7-7-7-8-11-11-8-7-9-9-8-7-14-13-8-7-10-9-11-9-14-12-14-11-15-12-14-10-18-13-20-14-17-11-21-13-16-10-21-12-28-15-23-12-35-16-19-8-34-13-41-14-37-10-36-9-27-5-46-7-33-3-36-2h-48l-50 3-41 5-45 8-32 7-49 14-30 10-27 10-35 14-15 7-35 17-20 10-23 13-19 11-15 9-17 11-18 12-19 13-18 13-10 8-12 9-14 11-10 8-11 9-14 12-8 7-10 9-3 1v2l-8 7-7 7h-2l-1 3-8 7-33 33-7 8-7 7-7 8-2 3h-2l-2 4-10 11-6 8h-2l-2 4-11 13-9 11-14 17-6 9-10 13-10 14-12 17-10 15-10 16-9 14-14 24-16 28-10 17-8 11-9 10-5 5-9 6-14 6-15 4-16 1-18-3-13-5-14-9-13-13-11-17-6-7v-50l1-2h2l13-26 8-14 6-12 13-22 10-17 11-17 7-11 18-27 8-11 7-10 13-18 9-12 12-15 11-14 11-13 7-9 10-12 9-11 13-14 7-8 15-16 62-62 8-7 11-10 11-9 10-9 5-4h2v-2l11-9 14-11 30-23 16-12 17-12 30-20 32-21 24-14 25-14 29-16 28-14 28-13 28-12 38-15 31-11 46-14 38-10 47-10 35-6 50-6 37-3z" />
                            <path transform="translate(1016,1106)" d="m0 0h16l33 2 32 4 27 6 24 7 21 8 20 9 20 10 22 13 22 15 17 13 11 9 12 11 23 23 9 11 11 13 14 20 15 24 14 27 8 18 13 36 7 26 7 38 3 29v43l-2 23-5 29-7 32-12 36-9 21-10 21-12 21-15 23-10 14-9 11-9 10-7 8-22 22-10 8-9 8-12 9-16 11-22 13-27 14-25 11-30 10-26 7-47 8-31 3h-26l-31-3-36-6-28-7-29-10-21-9-21-10-23-13-15-10-11-8-13-10-13-11-16-14-7-8-12-12-9-11-8-9-12-16-12-18-12-21-11-21-10-23-7-20-9-29-6-27-4-26-2-34v-18l2-30 4-27 7-32 7-23 9-25 11-24 13-25 13-21 11-15 8-11 9-11 10-12 7-8 16-16 8-7 14-12 36-26 28-16 29-14 24-9 30-9 24-5 28-4 12-1zm-6 161-21 2-17 3-25 7-17 7-16 8-16 10-18 13-11 10-7 6-7 8-7 7-8 10-9 12-12 21-11 23-7 19-5 20-4 29v36l3 23 5 22 6 18 12 27 8 14 8 12 9 12 12 14 8 7 5 5 10 9 17 12 17 10 16 8 16 7 15 5 25 6 21 3 27 1 18-1 20-4 27-8 27-11 15-8 17-11 16-12 20-18 10-11 8-10 13-20 9-16 10-25 6-19 5-24 2-19v-30l-2-22-7-30-7-20-13-28-10-16-10-14-11-13-12-13-14-12-17-12-24-14-22-10-21-7-17-4-24-3-11-1z" />
                            <path transform="translate(1950,572)" d="m0 0h22l16 4 16 8 10 7 7 6 9 12 10 19 4 11 2 9 2 1v17l-3 1-4 10-7 13-8 11-13 15-15 14-11 10-8 7-14 13-8 7-12 11-20 18-15 14-13 11-13 12-8 7-10 9-11 9-7 7-14 11-12 8-11 5-17 4-10 1-20-3-14-5-11-6-10-9-7-7-7-10-5-10-5-17-2-13v-8l4-16 5-12 6-10 9-10 7-8 13-12 12-11 8-7 15-14 8-7 4-4h2v-2l8-7 26-24 8-7 13-12 9-8h2v-2l8-7 12-11 8-7 13-11 13-10 13-8 12-5z" />
                            <path transform="translate(1008,154)" d="m0 0h27l16 4 16 8 8 6 7 6 11 15 6 13 4 16 1 18v179l-1 58-2 18-6 15-9 13-9 10-8 7-12 6-15 5-15 3h-11l-18-4-11-4-13-9-10-9-8-10-7-15-4-12-2-13-1-14-1-36v-153l1-36 2-21 4-14 7-13 11-14 10-9 13-8 13-5z" />
                            <path transform="translate(80,571)" d="m0 0h9l14 3 13 5 13 7 13 10 15 13 10 9 12 11 10 9 8 7 15 14 10 9 8 7 11 10 8 7 14 13 8 7 14 12 15 14 8 7 11 11 11 14 9 17 4 13 1 13-2 14-5 15-8 16-8 10-10 10-19 10-15 4-6 1h-23l-14-4-14-8-12-9-14-12-13-12-12-11-12-10v-2l-4-2-14-13-8-7-11-10-8-7-14-13-8-7-24-22-13-12-10-9-14-13-9-11-7-10-5-8-7-14-1-1v-28h4l1-4 4-10 7-14 13-15 11-9 15-9 13-4z" />
                            <path transform="translate(2044,672)" d="m0 0 4 2-1 4v-3l-3-1z" />
                            <path transform="translate(2046,678)" d="m0 0" />
                            <path transform="translate(2047,1531)" d="m0 0" />
                            <path transform="translate(0,1473)" d="m0 0" />
                            <path transform="translate(2044,675)" d="m0 0" />
                        </svg>
                        <p className={isShowingView ? "c-b" : ""}>views</p>
                    </button>
                    <button
                        onClick={() => setisShowingView(false)}
                        className="r-c-c p10 br5 bg-l wkhmsin hoverEff1 ">
                        <svg className={!isShowingView ? "f-b mr10" : "mr10"} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M760-200v-160q0-50-35-85t-85-35H273l144 144-57 56-240-240 240-240 57 56-144 144h367q83 0 141.5 58.5T840-360v160h-80Z" /></svg>
                        <p className={!isShowingView ? "c-b" : ""}>replies</p>
                    </button>
                </div>

                {isLoadingInter ?
                    <div className="wmia hmia c-c-c">
                        <L_loader className={'mrauto'} />
                    </div>
                    :
                    <>
                        {
                            isShowingView ?
                                <List_Views views={ListViews} />
                                :
                                <List_replies replies={Listreplies} />
                        }
                    </>
                }
            </div>
        )

    }


    return ReactDOM.createPortal(
        <div className='backendMer'
            onClick={e => _OnContainerClickOut(e, ConteitnwRef.current, () => dispatch(close_sho_user_wMoments()))}
        >
            <div className="psr   r-c-c  psr" ref={ConteitnwRef}>
                <div className="r-s-s h800">
                    <motion.div animate={{ x: [60, 0], opacity: [0, 1], transition: { duration: .5 } }} className="c-s-s   bg-l mr10 hmia  p10 br10 wmia scrl_none" style={{ width: "100px", maxHeight: "800px", overflow: "auto", paddingTop: "30px" }}>
                        {
                            user_moments.map((t, index) => {
                                let Styke
                                if (t.type == "text") {

                                    t.style.split("?").map(el => {
                                        let BG = el.split("=");
                                        if (BG[0] == "fontSize") {
                                            BG[1] = BG[1].substring(0, BG[1].length - 2)
                                        }
                                        Styke = { ...Styke, [BG[0]]: BG[1] }
                                    })
                                }
                                return <span onClick={() => handelMoveByIndex(index)} className='c-c-c spMmentBare wmia' key={t._id}>
                                    {
                                        t.type == "text" ?
                                            <div style={{
                                                backgroundColor: Styke.backgroundColor
                                            }} className="wmia h60 overHdn br10 ">
                                                <p style={{ fontSize: `${Styke.fontSize - 12}px`, fontFamily: Styke.fontFamily, color: Styke.color }}>
                                                    {t.content.substring(0, 60)}

                                                </p>
                                            </div>
                                            :
                                            <>
                                                {
                                                    t.type == "image" ?
                                                        <img style={{ objectFit: "cover", objectPosition: "top" }} src={t.url} className='wmia h70 br10' alt="" />
                                                        :
                                                        <video style={{ objectFit: "cover", objectPosition: "top" }} src={t.url} className='wmia h70  br10  ' alt=""></video>
                                                }
                                            </>
                                    }
                                    <p className='ml10  ' style={{ fontSize: "12px" }}>
                                        {
                                            TimeAgo(t.createAt)
                                        }
                                    </p>
                                </span>
                            }

                            )
                        }
                    </motion.div>
                    <div className="r-s-c  psr  mb10" style={{ height: "100%", width: "510px", overflow: "hidden" }}>
                        <div ref={SlideRef} className="r-s-c" style={{ height: "100%", transition: ".4s", transform: `translateX(-${ScrollRightVal}px)` }}>
                            {
                                user_moments.map(el => {
                                    if (el.type == "text") {
                                        return <MomentTypeText content={el.content} style={el.style} key={el._id} _id={el._id} />
                                    }
                                    else if (el.type == "image") {
                                        return <MomentTypeImage content={el.content} url={el.url} key={el._id} _id={el._id} />
                                    }
                                    else if (el.type == "video") {
                                        return <MomentTypeVideo content={el.content} url={el.url} key={el._id} _id={el._id} />
                                    }
                                })
                            }
                        </div>
                    </div>
                </div>
                {
                    useMemo(() =>
                        <ShowRepliesANDViewsForMoment momentId={user_moments[choosedMoment]._id} />
                        , [choosedMoment])
                }
            </div>
        </div >,
        document.getElementById("portals")
    )
}
