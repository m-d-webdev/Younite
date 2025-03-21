import React, { useEffect, useState, useRef } from 'react'
import api from '../config/axios.js'

import Post from '../components/post.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { getMoreReels, StartBringing_Reels } from '../slices/sections/reelsSlices.jsx';
import Reel from '../layouts/reel.jsx';
import { motion, AnimatePresence } from 'framer-motion'
import { setSidesOpen } from '../slices/WnidowSize.js';

function Reels() {
    const { reels, isLoadingreels } = useSelector(s => s.Reels)
    const dispatch = useDispatch();
    const [scrollTop, setScrollTOP] = useState(0);
    const Reels_containerRef = useRef(null);
    const { isWorkinOnPhone } = useSelector(s => s.WindowSizeSlice);

    const hande_keyboardClick = () => {
        document.addEventListener("keydown", (e) => {
            switch (e.key) {
                case 'ArrowDown':
                    handelAddScroll()
                    break;
                case 'ArrowUp':
                    handelAddScroll(false)
                    break;

                default:
                    break;
            }
        })
    }

    useEffect(() => {

        if (reels.length == 0) {
            dispatch(StartBringing_Reels());
        }
       
        hande_keyboardClick();
    }, [])


    const handelScroll = (e) => {

        setScrollTOP(e.target.scrollTop);

    }

    const handelAddScroll = (n = true) => {
        if (n) {
            Reels_containerRef.current.scrollBy(
                {
                    top: window.innerHeight - 80,
                    behavior: 'smooth'
                }
            )
        } else {
            Reels_containerRef.current.scrollBy({
                top: -window.innerHeight - 80,
                behavior: 'smooth',
            }
            )

        }
    }
    const [currentIndeChooosed, setcurrentIndeChooosed] = useState(0)


    return (
        <div className="r-c-c wmia hmia"  >
            <div onScroll={handelScroll} ref={Reels_containerRef} className='reels_slider'  >
                {reels &&
                    reels.map((p, i) => {
                        return <Reel onChoose={e => setcurrentIndeChooosed(e)} currentShoose={currentIndeChooosed} i={i} key={p._id} reel={p}  />
                    })
                }

                {
                    [0, 6].map((r) =>
                        <div key={r} className="c-s-s mt50 w500 pl20">
                            <div className="mb20 ml10  pre_elem br10 mr20" style={{ width: "100%", height: `${window.innerHeight - 300}px` }}></div>
                            <div className="r-s-s">
                                <div className="pre_elem w40 h40 imgCercle"></div>
                                <div className="c-s-s ml10">
                                    <div className="w200 pre_elem p10 br20"></div>
                                    <div className="w100 pre_elem p10 mt10 br10"></div>
                                </div>
                            </div>

                        </div>
                    )
                }
            </div>
            {
                !isWorkinOnPhone &&
                < div className="c-c-c ml20">

                    {
                        scrollTop < 600 &&
                        <AnimatePresence key={'teftrwr'}>
                            <motion.button
                                onClick={() => handelAddScroll()}
                                initial={{ y: -50, opacity: 0 }}
                                animate={{ y: 0, opacity: 1, transition: { type: "spring", delay: .1 } }}
                                exit={{ y: -50, opacity: 0 }}

                                className='mb20 '>
                                <svg className='w20   hoverEff2  h20' style={{ transform: "rotate(180deg)" }} version="1.1" viewBox="0 0 2048 2048" xmlns="http://www.w3.org/2000/svg">
                                    <path transform="translate(961)" d="m0 0h114l6 3 30 8 19 6 25 10 16 8 22 12 19 13 14 11 13 11 13 12 8 8 8 7 548 548 7 8 9 9 7 8 11 13 15 20 12 19 9 16 11 25 8 23 7 24 5 28 2 20v49l-3 28-6 28-9 29-9 22-8 16-10 18-7 11-8 12-12 16-9 10-7 8-17 17-11 9-9 8-12 8-21 13-23 12-23 10-27 8-30 7-21 3-23 2h-35l-29-3-29-6-26-8-22-8-26-12-18-10-14-9-17-12-16-13-15-14-8-8-7-8-8-7v79l-1 521-1 42-2 34-3 20-6 24-9 27-8 18-8 17-10 17-9 14-12 17-9 11-2 3h-2l-2 4-18 18h-2v2l-14 11-7 6-15 10-18 11-17 10-24 11-30 11-36 10-9 2 1 2h-96v-2l-36-10-32-11-19-8-22-11-22-13-16-12-14-12-11-9-14-14-7-8-10-12-14-19-8-13-12-21-13-28-7-19-7-25-5-29-3-37-1-33-1-57v-444l1-60v-42h-2l-8 7-18 18-16 14-17 13-22 14-19 11-16 8-19 8-24 8-26 7-20 4-25 3-19 1h-20l-18-1-27-4-21-5-33-11-25-11-19-10-21-13-17-13-13-11-10-9-17-17-7-8-14-18-11-16-10-17-12-23-11-26-7-22-6-25-4-27-1-12v-43l3-24 6-31 9-30 9-22 8-17 8-14 14-22 12-16 7-9 12-13 7-8 517-517 7-8 6-5 7-8 7-7h2l2-4 12-12h2l2-4 8-8 8-7 8-8 11-9 17-13 22-14 14-8 25-12 21-8 19-6 20-5-1-3zm58 128-26 2-20 4-18 6-19 9-15 9-14 10-11 9-12 11-472 472-6 5-5 6-5 5-6 5-5 6-8 7-20 20v2h-2l-5 5-9 10-7 6-7 8-15 15v2h-2l-9 11-13 16-10 17-8 17-7 23-4 17-2 15-1 19 2 21 3 18 8 26 8 19 12 20 9 12 9 11 13 13 17 13 19 12 21 10 17 6 20 5 21 3 25 1 23-3 21-6 16-7 17-9 20-13 13-10 10-8 10-9 11-9 51-51 5-6 11-11v-2h2v-2h2v-2h2v-2h2l7-8 27-27 2-1v-2l4-2 15-12 12-7 14-4h16l15 4 15 8 10 8 9 12 5 11 3 12 1 21v751l1 28 3 31 4 19 7 21 8 17 10 16 9 12 11 13 10 10 14 11 10 7 15 9 24 11 15 5 23 5 16 2h22l24-3 25-6 20-8 23-12 17-12 10-9 8-7 7-8 8-9 10-14 10-18 5-12 5-15 6-28 2-21 1-20v-717l1-56 2-20 5-12 7-11 8-9 16-11 10-4 16-3 11 1 13 5 13 7 10 8 15 14 115 115 8 7 15 13 11 8 17 11 17 8 11 5 17 5 19 4 18 2h18l19-2 24-5 18-6 18-8 21-12 14-11 12-11 13-13 12-16 8-13 8-16 5-13 6-23 3-14 2-22-1-25-3-21-6-21-7-19-9-17-10-15-8-10-11-13-11-12-26-26-5-6-7-6-5-6-8-7-147-147-5-6-8-7-4-5-6-5-6-7-6-5-6-7-6-5-6-7-7-6-5-6-6-5-6-7-6-5-6-7-6-5-6-7-7-6-5-6-5-5-5-4-7-8-7-7-6-5-7-8-5-4-2-3h-2l-2-4-25-25h-2l-2-4-163-163-8-7-14-13-19-14-20-12-21-10-21-6-21-4-9-1z" />
                                    <path transform="translate(1091)" d="m0 0h16l-4 2-7 2-5-2z" />
                                    <path transform="translate(1087)" d="m0 0h2l1 4-5-1 2-1z" />
                                    <path transform="translate(952,2046)" d="m0 0 3 1v1h-6z" />
                                    <path transform="translate(1084)" d="m0 0 2 1z" />
                                    <path transform="translate(1071,2046)" d="m0 0" />
                                    <path transform="translate(970,2045)" d="m0 0" />
                                    <path transform="translate(1090,4)" d="m0 0" />
                                    <path transform="translate(957,2)" d="m0 0" />
                                    <path transform="translate(955,1)" d="m0 0" />
                                    <path transform="translate(1109)" d="m0 0" />
                                </svg>
                            </motion.button>
                        </AnimatePresence>
                    }{
                        scrollTop > 600 &&
                        <>
                            <AnimatePresence >
                                <motion.button
                                    onClick={() => handelAddScroll(false)}
                                    initial={{ y: 50, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1, transition: { type: "spring", delay: .1 } }}
                                    exit={{ y: 50, opacity: 0 }}
                                    key={'asdfdkfasdf'}
                                    className='mb20 '>

                                    <svg className='w20   hoverEff2  h20' version="1.1" viewBox="0 0 2048 2048" xmlns="http://www.w3.org/2000/svg">
                                        <path transform="translate(961)" d="m0 0h114l6 3 30 8 19 6 25 10 16 8 22 12 19 13 14 11 13 11 13 12 8 8 8 7 548 548 7 8 9 9 7 8 11 13 15 20 12 19 9 16 11 25 8 23 7 24 5 28 2 20v49l-3 28-6 28-9 29-9 22-8 16-10 18-7 11-8 12-12 16-9 10-7 8-17 17-11 9-9 8-12 8-21 13-23 12-23 10-27 8-30 7-21 3-23 2h-35l-29-3-29-6-26-8-22-8-26-12-18-10-14-9-17-12-16-13-15-14-8-8-7-8-8-7v79l-1 521-1 42-2 34-3 20-6 24-9 27-8 18-8 17-10 17-9 14-12 17-9 11-2 3h-2l-2 4-18 18h-2v2l-14 11-7 6-15 10-18 11-17 10-24 11-30 11-36 10-9 2 1 2h-96v-2l-36-10-32-11-19-8-22-11-22-13-16-12-14-12-11-9-14-14-7-8-10-12-14-19-8-13-12-21-13-28-7-19-7-25-5-29-3-37-1-33-1-57v-444l1-60v-42h-2l-8 7-18 18-16 14-17 13-22 14-19 11-16 8-19 8-24 8-26 7-20 4-25 3-19 1h-20l-18-1-27-4-21-5-33-11-25-11-19-10-21-13-17-13-13-11-10-9-17-17-7-8-14-18-11-16-10-17-12-23-11-26-7-22-6-25-4-27-1-12v-43l3-24 6-31 9-30 9-22 8-17 8-14 14-22 12-16 7-9 12-13 7-8 517-517 7-8 6-5 7-8 7-7h2l2-4 12-12h2l2-4 8-8 8-7 8-8 11-9 17-13 22-14 14-8 25-12 21-8 19-6 20-5-1-3zm58 128-26 2-20 4-18 6-19 9-15 9-14 10-11 9-12 11-472 472-6 5-5 6-5 5-6 5-5 6-8 7-20 20v2h-2l-5 5-9 10-7 6-7 8-15 15v2h-2l-9 11-13 16-10 17-8 17-7 23-4 17-2 15-1 19 2 21 3 18 8 26 8 19 12 20 9 12 9 11 13 13 17 13 19 12 21 10 17 6 20 5 21 3 25 1 23-3 21-6 16-7 17-9 20-13 13-10 10-8 10-9 11-9 51-51 5-6 11-11v-2h2v-2h2v-2h2v-2h2l7-8 27-27 2-1v-2l4-2 15-12 12-7 14-4h16l15 4 15 8 10 8 9 12 5 11 3 12 1 21v751l1 28 3 31 4 19 7 21 8 17 10 16 9 12 11 13 10 10 14 11 10 7 15 9 24 11 15 5 23 5 16 2h22l24-3 25-6 20-8 23-12 17-12 10-9 8-7 7-8 8-9 10-14 10-18 5-12 5-15 6-28 2-21 1-20v-717l1-56 2-20 5-12 7-11 8-9 16-11 10-4 16-3 11 1 13 5 13 7 10 8 15 14 115 115 8 7 15 13 11 8 17 11 17 8 11 5 17 5 19 4 18 2h18l19-2 24-5 18-6 18-8 21-12 14-11 12-11 13-13 12-16 8-13 8-16 5-13 6-23 3-14 2-22-1-25-3-21-6-21-7-19-9-17-10-15-8-10-11-13-11-12-26-26-5-6-7-6-5-6-8-7-147-147-5-6-8-7-4-5-6-5-6-7-6-5-6-7-6-5-6-7-7-6-5-6-6-5-6-7-6-5-6-7-6-5-6-7-7-6-5-6-5-5-5-4-7-8-7-7-6-5-7-8-5-4-2-3h-2l-2-4-25-25h-2l-2-4-163-163-8-7-14-13-19-14-20-12-21-10-21-6-21-4-9-1z" />
                                        <path transform="translate(1091)" d="m0 0h16l-4 2-7 2-5-2z" />
                                        <path transform="translate(1087)" d="m0 0h2l1 4-5-1 2-1z" />
                                        <path transform="translate(952,2046)" d="m0 0 3 1v1h-6z" />
                                        <path transform="translate(1084)" d="m0 0 2 1z" />
                                        <path transform="translate(1071,2046)" d="m0 0" />
                                        <path transform="translate(970,2045)" d="m0 0" />
                                        <path transform="translate(1090,4)" d="m0 0" />
                                        <path transform="translate(957,2)" d="m0 0" />
                                        <path transform="translate(955,1)" d="m0 0" />
                                        <path transform="translate(1109)" d="m0 0" />
                                    </svg>
                                </motion.button>

                                <motion.button
                                    onClick={() => handelAddScroll()}
                                    initial={{ y: -50, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1, transition: { type: "spring", delay: .1 } }}
                                    key={'asdfdgsdfgkfasdf'}
                                    exit={{ y: -50, opacity: 0 }}
                                    className='mb20 '>

                                    <svg className='w20   hoverEff2  h20' style={{ transform: "rotate(180deg)" }} version="1.1" viewBox="0 0 2048 2048" xmlns="http://www.w3.org/2000/svg">
                                        <path transform="translate(961)" d="m0 0h114l6 3 30 8 19 6 25 10 16 8 22 12 19 13 14 11 13 11 13 12 8 8 8 7 548 548 7 8 9 9 7 8 11 13 15 20 12 19 9 16 11 25 8 23 7 24 5 28 2 20v49l-3 28-6 28-9 29-9 22-8 16-10 18-7 11-8 12-12 16-9 10-7 8-17 17-11 9-9 8-12 8-21 13-23 12-23 10-27 8-30 7-21 3-23 2h-35l-29-3-29-6-26-8-22-8-26-12-18-10-14-9-17-12-16-13-15-14-8-8-7-8-8-7v79l-1 521-1 42-2 34-3 20-6 24-9 27-8 18-8 17-10 17-9 14-12 17-9 11-2 3h-2l-2 4-18 18h-2v2l-14 11-7 6-15 10-18 11-17 10-24 11-30 11-36 10-9 2 1 2h-96v-2l-36-10-32-11-19-8-22-11-22-13-16-12-14-12-11-9-14-14-7-8-10-12-14-19-8-13-12-21-13-28-7-19-7-25-5-29-3-37-1-33-1-57v-444l1-60v-42h-2l-8 7-18 18-16 14-17 13-22 14-19 11-16 8-19 8-24 8-26 7-20 4-25 3-19 1h-20l-18-1-27-4-21-5-33-11-25-11-19-10-21-13-17-13-13-11-10-9-17-17-7-8-14-18-11-16-10-17-12-23-11-26-7-22-6-25-4-27-1-12v-43l3-24 6-31 9-30 9-22 8-17 8-14 14-22 12-16 7-9 12-13 7-8 517-517 7-8 6-5 7-8 7-7h2l2-4 12-12h2l2-4 8-8 8-7 8-8 11-9 17-13 22-14 14-8 25-12 21-8 19-6 20-5-1-3zm58 128-26 2-20 4-18 6-19 9-15 9-14 10-11 9-12 11-472 472-6 5-5 6-5 5-6 5-5 6-8 7-20 20v2h-2l-5 5-9 10-7 6-7 8-15 15v2h-2l-9 11-13 16-10 17-8 17-7 23-4 17-2 15-1 19 2 21 3 18 8 26 8 19 12 20 9 12 9 11 13 13 17 13 19 12 21 10 17 6 20 5 21 3 25 1 23-3 21-6 16-7 17-9 20-13 13-10 10-8 10-9 11-9 51-51 5-6 11-11v-2h2v-2h2v-2h2v-2h2l7-8 27-27 2-1v-2l4-2 15-12 12-7 14-4h16l15 4 15 8 10 8 9 12 5 11 3 12 1 21v751l1 28 3 31 4 19 7 21 8 17 10 16 9 12 11 13 10 10 14 11 10 7 15 9 24 11 15 5 23 5 16 2h22l24-3 25-6 20-8 23-12 17-12 10-9 8-7 7-8 8-9 10-14 10-18 5-12 5-15 6-28 2-21 1-20v-717l1-56 2-20 5-12 7-11 8-9 16-11 10-4 16-3 11 1 13 5 13 7 10 8 15 14 115 115 8 7 15 13 11 8 17 11 17 8 11 5 17 5 19 4 18 2h18l19-2 24-5 18-6 18-8 21-12 14-11 12-11 13-13 12-16 8-13 8-16 5-13 6-23 3-14 2-22-1-25-3-21-6-21-7-19-9-17-10-15-8-10-11-13-11-12-26-26-5-6-7-6-5-6-8-7-147-147-5-6-8-7-4-5-6-5-6-7-6-5-6-7-6-5-6-7-7-6-5-6-6-5-6-7-6-5-6-7-6-5-6-7-7-6-5-6-5-5-5-4-7-8-7-7-6-5-7-8-5-4-2-3h-2l-2-4-25-25h-2l-2-4-163-163-8-7-14-13-19-14-20-12-21-10-21-6-21-4-9-1z" />
                                        <path transform="translate(1091)" d="m0 0h16l-4 2-7 2-5-2z" />
                                        <path transform="translate(1087)" d="m0 0h2l1 4-5-1 2-1z" />
                                        <path transform="translate(952,2046)" d="m0 0 3 1v1h-6z" />
                                        <path transform="translate(1084)" d="m0 0 2 1z" />
                                        <path transform="translate(1071,2046)" d="m0 0" />
                                        <path transform="translate(970,2045)" d="m0 0" />
                                        <path transform="translate(1090,4)" d="m0 0" />
                                        <path transform="translate(957,2)" d="m0 0" />
                                        <path transform="translate(955,1)" d="m0 0" />
                                        <path transform="translate(1109)" d="m0 0" />
                                    </svg>
                                </motion.button>
                            </AnimatePresence>

                        </>
                    }



                </div>
            }
        </div>

    )
}

export default Reels
