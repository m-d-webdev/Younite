import { useState, useEffect, useRef, useMemo } from 'react'
import Logo from "../components/logo";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion'
import { _onClickOut } from '../components/Abbreviator';
// import dev from '../components/dev';
import Dev from '../components/dev';
import Rotate_svg from '../components/rotate_svg';
import { changeTheme } from '../settings';
// import Notifications_cmp from './Notifications';
import { open_notif_bare } from '../slices/NotificationSlice';
import ProfileDropDown from './ProfileDropDown';
import SearchInput from '../components/SearchInput';


export var GotToChat;



function Header() {
    const { isLoaingUserData, profile_img, _id } = useSelector(s => s.User)
    const { currentTheme } = useSelector(s => s.Theme)
    const { All_chatsAndContents } = useSelector(s => s.ChatReducer)
    const NotfsVSBLT = useSelector(s => s.Notifications.isVisible);
    const NewNotfs = useSelector(s => s.Notifications.data);

    const [countNewNotf, setcountNewNotf] = useState(null)
    const [ProfileDropDownVSBL, setProfileDropDownVSBL] = useState(false)
    const { isWorkinOnPhone } = useSelector(s => s.WindowSizeSlice);


    const navigate = useNavigate()
    const dispatch = useDispatch();



    useEffect(() => {
        if (NewNotfs) {
            let n = JSON.parse(localStorage.getItem("n")) || [];
            setcountNewNotf(NewNotfs.reduce((c, e) => !n.includes(e._id) ? c + 1 : c, 0));
        }
    }, [NewNotfs, NotfsVSBLT]);

    useEffect(() => {
        GotToChat = () => navigate("/chat")
    }, [])

    const [CountMessages, setCountMessage] = useState(0);

    useEffect(() => {
        setCountMessage(0);
        Object.keys(All_chatsAndContents).forEach(k => {
            setCountMessage(prev => prev + All_chatsAndContents[k].reduce((c, l) => (!l.viewed && l.recieverId == _id) ? c + 1 : c, 0));
        });
    }, [All_chatsAndContents]);



    return (
        <>

            <header className={`wmia bg-l p5 r-b-c `} >
                <Logo go_main={true} />
                <SearchInput />
                <div className="r-e-c">
                    <div className="c-c-c psr">
                        <span onClick={() => { navigate('/Shares') }} className={`${isWorkinOnPhone ?"p5" :"p10"} psr imgCercle mr15 bg-fourth c-c-c`}>
                            <svg style={{ strokeWidth: 1.5 }} className='f-no' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width={32} height={32} strokeWidth={1}> <path d="M14 20a2 2 0 1 0 -4 0a2 2 0 0 0 4 0z"></path> <path d="M14 4a2 2 0 1 0 -4 0a2 2 0 0 0 4 0z"></path> <path d="M6 12a2 2 0 1 0 -4 0a2 2 0 0 0 4 0z"></path> <path d="M22 12a2 2 0 1 0 -4 0a2 2 0 0 0 4 0z"></path> <path d="M14 12a2 2 0 1 0 -4 0a2 2 0 0 0 4 0z"></path> <path d="M6 12h4"></path> <path d="M14 12h4"></path> <path d="M13.5 5.5l5 5"></path> <path d="M5.5 13.5l5 5"></path> <path d="M13.5 18.5l5 -5"></path> <path d="M10.5 5.5l-5 5"></path> <path d="M12 6v4"></path> <path d="M12 14v4"></path> </svg>
                        </span>
                    </div>
                    <div className="c-c-c psr">
                        <span onClick={() => dispatch(open_notif_bare())} className={`${isWorkinOnPhone ?"p5" :"p10"} psr imgCercle mr15 bg-fourth c-c-c`}>
                            {
                                countNewNotf > 0 &&
                                <p className="countNews">{countNewNotf <= 9 ? countNewNotf : '+9'}</p>
                            }
                            <svg version="1.1" viewBox="0 0 2048 2048" className={`${isWorkinOnPhone ? "w15 h15 " : "w20 h20"} `} xmlns="http://www.w3.org/2000/svg">
                            <path transform="translate(977)" d="m0 0h118l-4 2-9 2-4-1 1 3 33 11 20 10 16 10 16 12 11 9 23 23 13 18 9 15 8 16 10 24 6 22 3 16 2 21v26l-2 17-1 11 8 5 30 13 23 11 25 13 27 16 19 12 13 9 14 10 21 16 16 13 10 9 8 7 10 9 6 5v2l4 2 8 8v2l4 2 7 8 7 7 7 8 12 14 11 13 13 17 11 15 10 15 13 20 13 22 13 24 13 26 13 31 9 23 14 43 7 27 7 32 5 33 4 40 2 32 1 35 1 380 2 13 4 5 12 3 28 4 27 4 20 5 18 6 16 7 16 8 18 11 19 14 16 15 11 11 11 14 16 24 8 16 8 19 7 21 5 21 2 21v24l-2 23-4 20-12 36-8 16-9 17-10 14-13 16-9 10-11 11-14 11-11 8-20 12-27 12-21 6-23 5-26 3-31 1h-187l-159 1-31 1-8 33-6 21-8 22-9 21-14 24-10 16-11 14-13 15-7 7-1 2h-2l-2 4h-2v2l-8 7-13 11-15 11-18 11-23 12-22 10-33 11-31 8-2 1h-84l-1-2-30-8-27-9-25-10-25-13-14-9-17-13-14-12-22-22-7-8-12-14-12-17-9-15-10-19-11-27-7-21-6-26-3-16v-3l-147-1h-264l-21-2-29-6-23-8-25-12-19-12-12-9-15-13-17-17-9-11-10-14-9-15-8-15-10-25-6-20-4-21-2-24v-10l2-22 4-23 6-21 5-15 7-16 9-16 7-11 10-13 7-9h2l2-4 20-20 17-13 13-9 16-9 16-8 18-7 18-5 18-4 19-3 26-3 11-3 7-4 2-4 1-14 1-382 2-55 4-47 6-39 8-37 7-27 12-37 14-35 11-25 8-16 10-19 10-18 6-9 11-18 7-10 9-13 8-11 13-17 8-9 8-10 7-8h2l2-4 12-12 7-8 17-17h2v-2l8-7 12-11 11-9 10-9 16-12 14-10 15-10 10-7 20-12 18-10 29-15 27-12 28-11 9-5 2-4-4-29v-11l1-19 4-25 6-23 8-22 11-22 11-17 10-13 6-8h2l2-4 16-16 11-9 14-10 13-8 19-10 18-7 22-7 4-1zm96 4m-63 129-16 3-16 7-11 7-11 10-8 11-8 14-5 13-5 19-1 13 2 4 10 1 31-2 32-1h33l33 1 29 2h18l1-2v-8l-5-22-7-19-8-15-9-11-13-10-12-7-10-4-20-4zm-10 230-38 3-28 4-26 5-39 10-32 11-29 12-29 14-21 12-24 15-15 11-14 10-16 13-11 9-15 14-30 30-7 8-11 13-10 12-12 16-8 12-12 19-13 22-8 16-12 25-13 32-12 36-5 19-6 32-5 35-3 33-1 24-1 359-1 50-2 25-4 18-8 20-9 15-8 12-9 11-9 10-14 11-14 9-14 7-27 9-21 4-33 4-18 4-13 5-13 7-11 8-14 14-7 10-7 14-5 19-2 15 1 15 5 20 4 9 8 14 11 13 9 8 10 7 16 8 13 4 12 2 10 1 44 1h1050l269-1 30-1 19-3 13-4 11-6 13-9 10-9 9-11 8-13 6-19 2-10 1-20-2-16-7-20-6-11-8-11-7-7-15-11-19-9-17-5-18-3-32-3-15-3-13-4-21-10-16-10-14-12-13-13-13-17-11-19-6-15-5-16-3-17-1-11-1-27-1-361-1-36-3-35-6-43-8-35-7-24-10-28-6-16-11-25-8-16-13-25-14-23-10-15-12-17-12-16-12-14-2-3h-2l-2-4-14-15-25-25-11-9-10-9-16-12-13-10-24-16-25-15-26-14-36-16-27-10-25-8-24-6-37-7-38-4-17-1zm-139 1420-2 2 13 30 8 15 12 18 9 11 7 8 8 7 13 10 16 10 21 10 18 6 23 4h31l21-3 15-4 21-9 16-9 14-10 12-11 5-5 10-11 10-14 8-13 11-23 3-13v-6z" />
                            <path transform="translate(972)" d="m0 0 4 1-4 2-3-1z" />
                            <path transform="translate(952,2046)" d="m0 0 5 1v1h-6z" />
                            <path transform="translate(1065,2047)" d="m0 0h5v1h-5z" />
                            <path transform="translate(968)" d="m0 0 1 2-2-1z" />
                            <path transform="translate(958)" d="m0 0 3 1z" />
                            <path transform="translate(962)" d="m0 0" />
                        </svg>
                    </span>
                </div>
                <Link to={"/chat"} className={`${isWorkinOnPhone ?"p5" :"p10"} psr imgCercle mr15 bg-fourth c-c-c`}>
                    {
                        CountMessages > 0 &&
                        <p className="countNews">{CountMessages < 99 ? CountMessages : '+99'}</p>
                    }
                    <svg version="1.1" viewBox="0 0 2048 2048" className={`${isWorkinOnPhone ? "w15 h15 " : "w20 h20"}` } xmlns="http://www.w3.org/2000/svg">
                            <path transform="translate(1977,133)" d="m0 0h20l11 4 14 7 10 9 8 9 8 11v41h-2l-9 24-10 35-14 45-11 36-12 41-15 49-13 43-17 56-12 39-34 112-12 38-9 30-14 46-17 56-16 52-15 49-20 66-18 59-17 55-29 96-16 52-15 49-14 46-17 56-17 55-15 49-18 60-15 49-8 26-14 46-12 40-12 36-11 23-7 9-10 8-11 5-16 4h-9l-16-4-12-6-10-7-14-10-18-13-32-24-19-14-18-13-17-13-19-14-17-13-19-14-12-9-18-13-16-12-19-14-13-10-14-10-13-10-11-8-19-14-13-10-11-8-38-28-28-21-18-13-13-10-12-9-14-10-18-13-17-12-12-9-16-13-17-13h-6l-3 4-6 15-10 19-61 122-10 19-34 68-17 33-31 62-9 17-11 23-14 27-13 24-6 10-8 11-4 5-11 7-13 6-8 2h-10l-17-4-14-7-10-9-10-13-5-14-2-13-1-15-1-34v-264l1-279v-35l-1-31-4-3-74-29-26-10-28-11-65-25-44-17-50-19-74-29-42-16-41-16-34-13-40-16-25-11-13-9-10-13-7-7v-47l4-2 7-9 5-6 13-10 19-9 27-11 44-17 70-27 33-12 20-8 42-16 28-11 69-26 26-10 58-22 62-24 30-11 31-12 39-15 47-18 42-16 33-13 24-9 35-13 31-12 26-10 32-12 99-38 29-11 39-15 43-16 18-7 47-18 33-13 71-27 35-13 27-11 30-11 50-19 89-34 66-25 44-17 30-11 25-10 53-20 26-10 21-8 33-13 39-15 42-16 53-20 19-7zm-417 288-15 6-9 3-35 14-52 19-49 19-31 12-28 11-103 39-33 13-20 7-52 20-43 16-62 24-28 11-17 6-67 26-20 7-28 11-68 26-74 28-91 35-32 12-65 25-29 11-24 9-26 10-64 24-39 15-28 11-16 6-46 18-27 11-8 3 1 3 40 14 21 9 27 10 52 20 40 15 77 30 82 32 38 15 12 6 10 2 6-3 9-8 16-10 10-8 13-9 17-12 15-11 19-13 34-25 19-13 13-10 16-11 15-11 19-13 14-10 54-39 13-9 10-7 14-10 20-14 18-13 17-12 18-13 19-13 11-8 15-11 19-13 12-9 19-13 13-10 16-11 15-11 11-8 16-11 36-26 19-13 16-12 19-13 12-9 13-9 20-14 15-11 17-12 18-13 17-12 11-8 22-15 14-10 18-13 11-8 20-14 17-12 16-11 17-12 15-10 4-5zm288 7-14 15-14 14-7 8-9 9v2h-2l-7 8-12 13-9 9v2h-2v2h-2v2h-2v2h-2l-7 8-10 10-7 8-6 6v2h-2l-7 8-11 12-12 12v2h-2l-7 8-10 10-7 8-8 8-7 8-10 10-7 8-10 10v2h-2l-7 8-10 10-7 8-6 6v2h-2l-7 8-10 10-7 8-12 12-7 8-11 11-7 8-9 9v2h-2l-7 8-7 7v2h-2l-7 8-15 15v2h-2l-7 8-11 11-7 8-9 9-7 8-21 21-7 8-11 11-7 8-7 7-7 8-11 11-7 8-9 9-7 8-13 13-7 8-8 8-7 8-7 7-7 8-10 10-7 8-13 13v2h-2l-7 8-10 10-7 8-14 14-7 8-8 8-7 8-12 12-7 8-14 14-7 8-17 17-7 8-12 12-7 8-13 13-7 8-11 11-7 8-8 8-7 8-9 9-7 8-8 8-7 8-10 10-7 8-10 10-7 8-14 14-10 8-1 5 8 7 11 8 13 10 17 12 14 11 11 8 15 12 19 14 11 8 18 13 13 10 19 14 11 8 19 14 18 14 28 20 28 21 38 28 13 10 12 9 11 8 16 12 17 12 13 10 18 13 14 10 19 14 13 11 14 11 5 4 4-1 4-16 5-16 12-40 13-41 13-43 15-49 16-53 9-29 17-56 22-72 13-43 8-26 18-59 13-43 20-65 15-49 11-36 18-59 12-40 9-29 12-39 17-56 9-30 19-62 21-69 13-42 9-29 9-30 9-29 3-11-1-3zm-343 185m-2 0-2 2 3 1v-3zm-3 2m-2 1m-1 1m4 0m-6 1-1 2 3-1zm4 0m-7 2m-1 1m-2 1-4 4 2 3 3-1v-3h3v-2zm5 1m-1 2m-10 1-1 2 3-1zm-3 2m5 0m-6 1m4 0v3zm-5 1v3l3-1zm10 1m-13 1m6 0m-8 1-10 8-13 9-16 12-40 28-17 12-22 15-11 8-12 9-11 8-20 14-14 10-19 14-23 16-15 10-12 9-13 10-12 8-17 12-15 11-23 16-15 11-6 4-15 11-12 9-11 7-42 30-17 12-10 7-18 13-16 12-19 13-11 8-12 9-16 11-18 13-17 12-18 13-15 10-18 13-13 10-22 15-14 10-19 14-17 12-16 11-18 13-12 9-1 23-1 226v148l1 9v3l8-9 10-18 15-32 10-19 8-16 21-41 10-19 9-19 32-64 10-18 7-14 11-17 9-12 25-25 7-8 12-12 5-6 5-5 10-11 5-5 10-11 11-11v-2h2v-2h2v-2l4-2 7-8 11-11 7-8 9-9 7-8 7-7 7-8 9-9 7-8 11-11 7-8 30-32 7-7 7-8 13-13 7-8 5-5v-2h2v-2h2v-2h2v-2h2l7-8 11-11 7-8 11-11 6-7 23-23 7-8 8-8 7-8 9-9 7-8 9-9 7-8 5-5 6-7 6-5v-2l4-2 8-10 2-1v-2h2v-2h2l6-7v-2h2l7-8 9-9v-2l4-2v-2h2l7-8 14-14 5-6 22-22 7-8 8-8 7-8 8-8v-2h2l7-8 7-7 7-8 12-13 16-17 22-22 1-3 3-3-1-2 3 1 1-2-3-1 7-6-2-2h-2l6-6v-2l4-1-1-4z" />
                            <path transform="translate(2044,222)" d="m0 0h3l-1 5h-3z" />
                            <path transform="translate(2047,226)" d="m0 0h1v8l-2-2z" />
                            <path transform="translate(1,954)" d="m0 0" />
                            <path transform="translate(0,953)" d="m0 0" />
                            <path transform="translate(1443,677)" d="m0 0" />
                            <path transform="translate(1445,675)" d="m0 0" />
                            <path transform="translate(1447,673)" d="m0 0" />
                            <path transform="translate(1448,672)" d="m0 0" />
                            <path transform="translate(1449,671)" d="m0 0" />
                            <path transform="translate(1450,670)" d="m0 0" />
                            <path transform="translate(1451,669)" d="m0 0" />
                            <path transform="translate(1452,668)" d="m0 0" />
                            <path transform="translate(1453,667)" d="m0 0" />
                            <path transform="translate(1455,665)" d="m0 0" />
                            <path transform="translate(1456,658)" d="m0 0" />
                            <path transform="translate(1460,654)" d="m0 0" />
                            <path transform="translate(1488,624)" d="m0 0" />
                            <path transform="translate(1847,441)" d="m0 0" />
                            <path transform="translate(2047,218)" d="m0 0" />
                        </svg>
                    </Link>
                    <div className="c-c-c psr">
                        {
                            isLoaingUserData ?
                                <div className="pre_elem w40 h40 imgCercle  ml10 mr20"></div>
                                :
                                <img onClick={() => setProfileDropDownVSBL(!ProfileDropDownVSBL)} className={`${isWorkinOnPhone ? "w30 h30 " : "w40 h40"} imgCercle  ml10 mr20`} src={profile_img} alt="" />
                        }

                        {
                            useMemo(() =>
                                <>
                                    <AnimatePresence>
                                        {
                                            ProfileDropDownVSBL &&
                                            <ProfileDropDown onClose={() => setProfileDropDownVSBL(false)} />
                                        }
                                    </AnimatePresence>
                                </>
                                , [ProfileDropDownVSBL])
                        }
                    </div>
                </div>
            </header>

        </>

    )
}

export default Header
