import React, { useEffect, useMemo, useState } from 'react'
import Header from './header'
import { Outlet, useParams } from 'react-router-dom'
import SideBare1 from './layoutCmps/SideBare1'
import { Moments_sideBare } from '../slices/Moments_sideBare';
import Peopel_to_follow from './peopel_to_follow';
import { useSelector } from 'react-redux';
import Notifications_cmp from './Notifications';
import { AnimatePresence } from 'framer-motion';
import Phone_SideBare1 from './layoutCmps/Phone_SideBare1';

function Layout() {
    const [currentPath, setcurrentPath] = useState(window.location.pathname);;
    const { isVisible } = useSelector(s => s.Notifications);
    const [windowHeight, setWindowHeight] = useState(window.innerHeight);
    const { isWorkinOnPhone } = useSelector(s => s.WindowSizeSlice)


    useEffect(() => {
        window.addEventListener('resize', () => setWindowHeight(window.innerHeight))
    }, [])
    const params = useParams();
    const { following } = useSelector(s => s.User)
    useEffect(() => {
        setcurrentPath(window.location.pathname)
    }, [params])
    return (
        <div >

            <Header />
            <main className={`${isWorkinOnPhone ? "c-b-c" : "r-b-s"} wmia `} style={{ paddingTop: "5px", maxWidth: "2000px", justifySelf: "center" }}>
                {
                    !isWorkinOnPhone &&

                    <SideBare1 />
                }
                <div className="MainOutlintsStyle c-s-c"
                    style={{
                        height: isWorkinOnPhone ? windowHeight - 40 : windowHeight - 80
                    }}
                >

                    <Outlet />

                </div>

                {
                    (["/Reels", "/", "/Blogs", "/News", "/search", "/Shares", "/chat"].includes(currentPath) && !isWorkinOnPhone) ?
                        <>
                            <div
                                className=' p15   c-s-s'
                                style={{
                                    width: "20%", maxWidth: "300px"
                                }}
                            >
                                <Moments_sideBare />
                                <Peopel_to_follow />
                            </div>
                        </> :
                        <div className=""></div>
                }
            </main >
            {
                isWorkinOnPhone &&

                <Phone_SideBare1 />
            }


            <AnimatePresence>
                {
                    isVisible &&
                    <Notifications_cmp />
                }
            </AnimatePresence>
        </div >
    )
}

export default Layout
