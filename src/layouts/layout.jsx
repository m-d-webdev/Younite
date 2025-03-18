import React, { useEffect, useMemo, useState } from 'react'
import Header from './header'
import { Outlet, useParams } from 'react-router-dom'
import SideBare1 from '../components/SideBare1'
import { Moments_sideBare } from '../slices/Moments_sideBare';
import Peopel_to_follow from './peopel_to_follow';
import { useSelector } from 'react-redux';
import Notifications_cmp from './Notifications';
import { AnimatePresence } from 'framer-motion';

function Layout() {
    const [currentPath, setcurrentPath] = useState(window.location.pathname);;
    const { isVisible } = useSelector(s => s.Notifications);
    const [windowHeight, setWindowHeight] = useState(window.innerHeight);
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
            <main className='r-b-s wmia pt10' style={{ maxWidth: "2000px" ,justifySelf:"center" }}>
                <SideBare1 />
                <div className="MainOutlintsStyle c-s-c" style={{
                    height: windowHeight - 70
                }}>
                    <Outlet />

                </div>

                {
                    (["/Reels", "/", "/Blogs", "/News","/search","/Shares","/chat"].includes(currentPath)) ?
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
