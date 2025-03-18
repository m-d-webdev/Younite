import React, { useRef } from 'react'
import { motion } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux';
import { open_zoomer } from '../slices/zoomer'
import { changeTheme } from '../settings'
import { _OnContainerClickOut } from '../components/Abbreviator';
import { open_upload_pic } from '../slices/profileSlice';
import { ConfirmAction } from '../components/Confimation';
import { logoutUser } from '../slices/userSlice';
import { Link } from 'react-router-dom'
const ProfileDropDown = ({ onClose }, ref) => {
    const { profile_img, FirstName, LastName } = useSelector(s => s.User)
    const dispatch = useDispatch()
    const { currentTheme } = useSelector(s => s.Theme);

    const MenuRef = useRef()
    return (
        <div className="backendMer"
            onClick={e => _OnContainerClickOut(e, MenuRef.current, () => onClose())}
        >

            <motion.div className='bg-l p10 br10 c-s-s'
                initial={{
                    scale: .5,
                    opacity: 0
                }}
                exit={{
                    scale: .5,
                    opacity: 0,
                    transformOrigin: "top right"
                }}
                animate={{
                    scale: 1,
                    opacity: 1,
                    transformOrigin: "top right"
                }}
                ref={MenuRef}
                style={{
                    width: "250px",
                    zIndex: "3",
                    position: "absolute",
                    right: 0,
                    // height: "400px",
                    top: "40px",
                    filter: "drop-shadow(0 -5px 10px var(--filter-color))"
                }}>

                <div className="wmia  c-c-c">
                    <div className="c-c-c wmia p10  cntUserImfDropdown">
                        <h1 className=' c-l wmia fw900' style={{
                            fontFamily: "'42dot Sans', serif",
                            fontSize: "17px"
                        }}>
                            {FirstName} {LastName}
                        </h1>
                        <div className="mt10 c-c-c psr">
                            <img src={profile_img} onClick={() => dispatch(open_zoomer(profile_img))} className='w100 h100 imgCercle' alt="" />
                            <button className='bg-d p5 curP br50'
                                onClick={() => dispatch(open_upload_pic())}

                                style={{
                                    position: "absolute",
                                    bottom: "5px",
                                    right: "-6px"
                                }}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style={{ fill: "none", stroke: "var(--bg-primary)" }} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width={24} height={24} strokeWidth={2}> <path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4"></path> <path d="M13.5 6.5l4 4"></path> </svg>
                            </button>
                        </div>
                    </div>

                    <div className="mt15 psr c-s-s wmia  ">
                        <Link to={'profile'} className='hoverEff1  wmia p10 r-s-c br5'>
                            <svg style={{ fill: "none" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width={28} height={28} strokeWidth={1.5}> <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0"></path> <path d="M6 21v-2a4 4 0 0 1 4 -4h2.5"></path> <path d="M19.001 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path> <path d="M19.001 15.5v1.5"></path> <path d="M19.001 21v1.5"></path> <path d="M22.032 17.25l-1.299 .75"></path> <path d="M17.27 20l-1.3 .75"></path> <path d="M15.97 17.25l1.3 .75"></path> <path d="M20.733 20l1.3 .75"></path> </svg>
                            <p className="ml10 ">Profile</p>
                        </Link>


                        <button className='hoverEff1  wmia p10 r-s-c br5'>
                            <svg style={{ fill: "none" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width={28} height={28} strokeWidth={1.5}> <path d="M11.992 21c-.728 -.003 -1.455 -.442 -1.667 -1.317a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c.882 .214 1.32 .95 1.317 1.684"></path> <path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0"></path> <path d="M19 22.5a4.75 4.75 0 0 1 3.5 -3.5a4.75 4.75 0 0 1 -3.5 -3.5a4.75 4.75 0 0 1 -3.5 3.5a4.75 4.75 0 0 1 3.5 3.5"></path> </svg>
                            <p className="ml10 ">Setting</p>
                        </button>

                        <div className="wmia r-b-c hoverEff1  wmia p10">
                            <div className="r-s-c  ">
                                <svg style={{ fill: "none" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width={28} height={28} strokeWidth={1.5}> <path d="M3 21v-4a4 4 0 1 1 4 4h-4"></path> <path d="M21 3a16 16 0 0 0 -12.8 10.2"></path> <path d="M21 3a16 16 0 0 1 -10.2 12.8"></path> <path d="M10.6 9a9 9 0 0 1 4.4 4.4"></path> </svg>
                                <p className="ml10 ">Theme</p>
                            </div>

                            <div className="r-c-c">
                                {currentTheme == "light" ?
                                    <button onClick={e => dispatch(changeTheme())} className='border curP'>
                                        Switch
                                        <svg className='ml5' style={{ fill: "none" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width={28} height={28} strokeWidth={1.5}> <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z"></path> <path d="M17 4a2 2 0 0 0 2 2a2 2 0 0 0 -2 2a2 2 0 0 0 -2 -2a2 2 0 0 0 2 -2"></path> <path d="M19 11h2m-1 -1v2"></path> </svg>
                                    </button> :
                                    < button onClick={e => dispatch(changeTheme())} className=' r-s-c border br5 curP'>
                                        Switch
                                        <svg className='ml5' style={{ fill: "none" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width={28} height={28} strokeWidth={1.5}> <path d="M3 12h1m8 -9v1m8 8h1m-15.4 -6.4l.7 .7m12.1 -.7l-.7 .7"></path> <path d="M9 16a5 5 0 1 1 6 0a3.5 3.5 0 0 0 -1 3a2 2 0 0 1 -4 0a3.5 3.5 0 0 0 -1 -3"></path> <path d="M9.7 17l4.6 0"></path> </svg>
                                    </button>

                                }
                            </div>
                        </div>

                        <button onClick={() => ConfirmAction("Do you really want to sign out", "", () => dispatch(logoutUser()))} className='hoverEff1  wmia p10 r-s-c br5'>
                            <svg style={{ fill: "none" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width={28} height={28} strokeWidth={1.5}> <path d="M7 6a7.75 7.75 0 1 0 10 0"></path> <path d="M12 4l0 8"></path> </svg>
                            <p className="ml10 ">Disconnect </p>
                        </button>
                    </div>
                </div>

            </motion.div >

        </div >
    )
};

export default ProfileDropDown
