import React, { useEffect, useState } from 'react'

import ProfileHeader from './profileHeader'
import { useDispatch, useSelector } from 'react-redux'
import { open_zoomer } from '../../../slices/zoomer'
import api from '../../../config/axios';
import { Abbreviator_text, BtnCopyText, GetShortNum } from '../../../components/Abbreviator';
import { open_addLink } from '../../../slices/userSlice';
import Texta from '../../../components/Texta';
import L_loader from '../../../components/L_loader';
import { DeleteLinkFromProfile, GetBlockedList, GetContactsRequests, GetContactsTOEdit, GetFollowersTOEdit, GetFollowingTOEdit, GetProfileUserInfo, UpdateField } from '../../../slices/profileSlice';
import { ConfirmAction } from '../../../components/Confimation';
import EmptyLottie from '../../../components/emptyLottie';
import Edit_followings from './show_followings';
import Edit_followers from './show_followiners';
import Edit_contacts from './show_contacts';
import Edit_requests from './show_request';
import Edit_blockeds from './show_blockeds';
import { AnimatePresence } from 'framer-motion';
import EditInfo from './EditInfo';
function Personal_info() {
    const { profile_img, } = useSelector(s => s.User);
    const [isListFollowingVSBL, setisListFollowingVSBL] = useState(false)
    const [isListFollowersVSBL, setisListFollowersVSBL] = useState(false)
    const [isListContactsVSBL, setisListContactsVSBL] = useState(false)
    const [isListReqeustVSBL, setisListReqeustVSBL] = useState(false)
    const [isListBolckedVSBL, setisListBolckedVSBL] = useState(false)
    const [EditInfoVSBL, setEditInfoVSBL] = useState(false)
    const isLoadingProfileInfo = useSelector(s => s.Profile.isLoadingData)
    const info = useSelector(s => s.Profile.data)
    const [bio, setBio] = useState(info?.bio);
    const [IsSavingBio, seSavingBio] = useState(false);
    const [isWantToChangeBio, setWantToChangeBio] = useState(false);

    const [isChangedBio, setChangesBio] = useState(false)
    useEffect(() => {
        if (bio != info?.bio && bio != "") {
            setChangesBio(true);
        } else {
            setChangesBio(false);
        }
    }, [bio])

    const dispatch = useDispatch();
    useEffect(() => {
        if (!info) {
            dispatch(GetProfileUserInfo())
        }
    }, []);
    useEffect(() => {
        setBio(info?.bio)
    }, [info]);



    const open_list_following = () => {
        dispatch(GetFollowingTOEdit())
        setisListFollowingVSBL(true)
    }

    const open_list_followers = () => {
        dispatch(GetFollowersTOEdit())
        setisListFollowersVSBL(true)
    }

    const handelOpendContctList = () => {
        dispatch(GetContactsTOEdit())
        setisListContactsVSBL(true)
    }

    const handelOpendContctRequest = () => {
        dispatch(GetContactsRequests())
        setisListReqeustVSBL(true)
    }
    const handelOpendBlocked = () => {
        dispatch(GetBlockedList())
        setisListBolckedVSBL(true)
    }
    const handelOpenInfo = () => {
        setEditInfoVSBL(true)
    }

    const ProfieLink = ({ l }) => {
        const [IsDeleting, setIsDeleting] = useState(false);
        const handelDeleteLink = async () => {
            ConfirmAction("Are you sure you want to remove this link from your profile ?", "", async () => {
                setIsDeleting(true);
                let res = await dispatch(DeleteLinkFromProfile(l._id))
                setIsDeleting(false);
            })
        }

        return <div className="wmia c-s-s">
            <div className="r-s-c">
                <svg className=' w20 h20' style={{ fill: "none", stroke: "var(--bg-blue)", strokeWidth: 2 }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width={32} height={32} strokeWidth={1}> <path d="M9 15l6 -6"></path> <path d="M11 6l.463 -.536a5 5 0 0 1 7.072 0a4.993 4.993 0 0 1 -.001 7.072"></path> <path d="M12.603 18.534a5.07 5.07 0 0 1 -7.127 0a4.972 4.972 0 0 1 0 -7.071l.524 -.463"></path> <path d="M16 19h6"></path> <path d="M19 16v6"></path> </svg>
                <a target='_blank' className='c-b fw900' style={{ fontSize: "15px" }} href={l.url}>{l.url}</a>
            </div>
            <div className="r-s-s mt5 ml10">
                <svg className='mr5' style={{ opacity: .6, fill: "none", strokeWidth: 2 }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width={32} height={32} strokeWidth={1}> <path d="M3 6h2.397a5 5 0 0 1 4.096 2.133l4.014 5.734a5 5 0 0 0 4.096 2.133h3.397"></path> <path d="M18 19l3 -3l-3 -3"></path> </svg>
                <Abbreviator_text t={l.description} l={200} />
            </div>
            <div className="wmia r-e-c  mt20" >
                <BtnCopyText buttonText={"Copy link"} />
                <button onClick={() => dispatch(open_addLink(l))} className='border mr20'>
                    <svg className='mr5' style={{ fill: "none" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width={32} height={32} strokeWidth={0.75}> <path d="M12.003 21c-.732 .001 -1.465 -.438 -1.678 -1.317a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c.886 .215 1.325 .957 1.318 1.694"></path> <path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0"></path> <path d="M19.001 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path> <path d="M19.001 15.5v1.5"></path> <path d="M19.001 21v1.5"></path> <path d="M22.032 17.25l-1.299 .75"></path> <path d="M17.27 20l-1.3 .75"></path> <path d="M15.97 17.25l1.3 .75"></path> <path d="M20.733 20l1.3 .75"></path> </svg>
                    Edit
                </button>
                <button onClick={handelDeleteLink} className='bg-r'>
                    {
                        IsDeleting ?
                            <>
                                <L_loader style={{ borderColor: "#fff" }} />
                                <p className="ml5 c-rl">Deleting ..</p>
                            </>
                            :
                            <>
                                <svg className='mr5' style={{ fill: "none", stroke: "#fff", strokeWidth: 2 }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width={32} height={32} strokeWidth={1.25}> <path d="M4 7l16 0"></path> <path d="M10 11l0 6"></path> <path d="M14 11l0 6"></path> <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"></path> <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"></path> </svg>
                                <p className='c-rl'>
                                    Delete
                                </p>
                            </>
                    }
                </button>
            </div>
        </div>
    }

    const submitBio = async () => {
        seSavingBio(true);
        await dispatch(UpdateField({ field: "bio", newVal: bio })).unwrap().then(() => {
            setWantToChangeBio(false)
            setChangesBio(false);
            seSavingBio(false);
        })

    }


    return (
        <div className='c-s-s wmia ' style={{ maxWidth: "1000px" }}>
            <ProfileHeader p={1} />
            <div className="wmia c-s-s mt50">
                {
                    isLoadingProfileInfo ?
                        <>
                            <div className="wmia r-b-c p20">
                                <div className="r-s-s">
                                    <div className="pre_elem bg-fourth w100 h100 imgCercle">
                                    </div>
                                    <div className="c-s-s ml20">
                                        <div className="w150 p10 br10 pre_elem"></div>
                                        <div className="w200 p10 mt15 br10 pre_elem"></div>
                                        <div className="w100 mt15 p10 br10 pre_elem"></div>
                                    </div>
                                </div>

                                <div className="c-c-c hmia">
                                    <div className="w200 p20 br20 pre_elem"></div>
                                    <div className="w200 p20 mt10 br20 pre_elem"></div>
                                </div>
                            </div>
                            <div className="wmia h60 mt50 p20 mt10 br10 pre_elem"></div>
                            <div className="wkhmsin   p10 mt20 br10 pre_elem"></div>
                            <div className="wkhmsin   p10 mt5 br10 pre_elem"></div>
                            <div className="wkhmsin   p10 mt5 br10 pre_elem"></div>

                        </> :
                        <>
                            <div className="r-b-c wmia">
                                <div className="r-s-s">
                                    <img onClick={() => dispatch(open_zoomer(profile_img))} className='w150 h150 imgCercle' src={profile_img} alt="" />
                                    <div className="c-s-s ml20">
                                        <h1 style={{ fontSize: "25px" }} className="fw900">{info.FirstName} {info.LastName}</h1>
                                        <strong className='fw900  r-s-c mt10'>
                                            <svg style={{ fill: "none" }} className='mr5' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width={32} height={32} strokeWidth={1.5}> <path d="M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10z"></path> <path d="M3 7l9 6l9 -6"></path> </svg>
                                            {info.email}
                                        </strong>
                                        <strong className='fw900 r-s-c mt10'>
                                            <svg style={{ fill: "none" }} className='mr5' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokelinecap="round" strokelinejoin="round" width={32} height={32} strokeWidth={1.5}> <path d="M3 20h18v-8a3 3 0 0 0 -3 -3h-12a3 3 0 0 0 -3 3v8z"></path> <path d="M3 14.803c.312 .135 .654 .204 1 .197a2.4 2.4 0 0 0 2 -1a2.4 2.4 0 0 1 2 -1a2.4 2.4 0 0 1 2 1a2.4 2.4 0 0 0 2 1a2.4 2.4 0 0 0 2 -1a2.4 2.4 0 0 1 2 -1a2.4 2.4 0 0 1 2 1a2.4 2.4 0 0 0 2 1c.35 .007 .692 -.062 1 -.197"></path> <path d="M12 4l1.465 1.638a2 2 0 1 1 -3.015 .099l1.55 -1.737z"></path> </svg>
                                            {new Date(info.BirthDay).toDateString()}
                                        </strong>
                                    </div>
                                </div>
                                <div className="c-c-c w200">
                                    <div onClick={open_list_followers} className='wmia  curP p10 r-c-c br20 bg- border'>
                                        {info.followersCount > 0
                                            ?
                                            <span className='wmia  curP r-c-c'>

                                                <svg className='mr10' style={{ fill: "none" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width={32} height={32} strokeWidth={0.75}> <path d="M9 7m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0"></path> <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"></path> <path d="M16 3.13a4 4 0 0 1 0 7.75"></path> <path d="M21 21v-2a4 4 0 0 0 -3 -3.85"></path> </svg>
                                                <strong className='mr10'>followers : </strong>
                                                {
                                                    GetShortNum(info.followersCount)
                                                }
                                            </span>
                                            :
                                            "No followers yet "
                                        }
                                    </div>
                                    <div onClick={open_list_following} className='curP mt20 p10 r-c-c wmia br20 bg- border'>
                                        {info.followingCount > 0
                                            ?
                                            <span className='wmia  curP r-c-c'>
                                                <svg className='mr10' style={{ fill: "none" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width={32} height={32} strokeWidth={0.75}> <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0"></path> <path d="M6 21v-2a4 4 0 0 1 4 -4h3"></path> <path d="M16 22l5 -5"></path> <path d="M21 21.5v-4.5h-4.5"></path> </svg>
                                                <strong className='mr10'>followings</strong>
                                                {
                                                    GetShortNum(info.followingCount)
                                                }
                                            </span>
                                            :
                                            "No following yet "
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="mb20 wmia mt50 r-s-c">
                                <button onClick={handelOpenInfo} className='br curP w200 br20 p10'>
                                    <svg style={{ fill: "none", strokeWidth: 3, stroke: "#fff" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width={32} height={32} strokeWidth={0.75}> <path d="M12.003 21c-.732 .001 -1.465 -.438 -1.678 -1.317a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c.886 .215 1.325 .957 1.318 1.694"></path> <path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0"></path> <path d="M19.001 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path> <path d="M19.001 15.5v1.5"></path> <path d="M19.001 21v1.5"></path> <path d="M22.032 17.25l-1.299 .75"></path> <path d="M17.27 20l-1.3 .75"></path> <path d="M15.97 17.25l1.3 .75"></path> <path d="M20.733 20l1.3 .75"></path> </svg>
                                    Edit you info
                                </button>
                            </div>
                            <p className=' r-c-c'> <svg className='mr10' style={{ fill: "none" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width={28} height={28} strokeWidth={1.5}> <path d="M12 5m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path> <path d="M5 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path> <path d="M19 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path> <path d="M12 14m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path> <path d="M12 7l0 4"></path> <path d="M6.7 17.8l2.8 -2"></path> <path d="M17.3 17.8l-2.8 -2"></path> </svg>  Social connections</p>
                            <div className="wmia mt10 r-s-c ">
                                <div onClick={handelOpendContctList} className='p10 r-c-c curP br20   border'>
                                    {info.contacts > 0
                                        ?
                                        <span className=' r-c-c  w200 curP'>
                                            <svg className='mr10' style={{ fill: "none" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width={32} height={32} strokeWidth={0.75}> <path d="M20 6v12a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2z"></path> <path d="M10 16h6"></path> <path d="M13 11m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path> <path d="M4 8h3"></path> <path d="M4 12h3"></path> <path d="M4 16h3"></path> </svg>

                                            <strong className='mr10'>contacts : </strong>
                                            {
                                                info.contacts
                                            }
                                        </span>
                                        :
                                        "No contacts yet "
                                    }
                                </div>
                                <div onClick={handelOpendContctRequest} className='p10 curP ml20 r-c-c br20  border'>
                                    {info.requestsContactCount > 0
                                        ?
                                        <span className='wmia r-c-c pr20  curP'>

                                            <svg className='mr10' style={{ fill: "none" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width={32} height={32} strokeWidth={0.75}> <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0"></path> <path d="M16 19h6"></path> <path d="M19 16v6"></path> <path d="M6 21v-2a4 4 0 0 1 4 -4h4"></path> </svg>
                                            <strong className='mr10'>Contact Request</strong>
                                            {
                                                info.requestsContactCount
                                            }
                                        </span>
                                        :
                                        "No contact requests  "
                                    }
                                </div>
                                <div onClick={handelOpendBlocked} className='p10 ml20 curP r-c-c br20   border'>
                                    {info.blockedListCount > 0
                                        ?
                                        <span className='r-c-c w200 curP'>

                                            <svg className='mr10' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q54 0 104-17.5t92-50.5L228-676q-33 42-50.5 92T160-480q0 134 93 227t227 93Zm252-124q33-42 50.5-92T800-480q0-134-93-227t-227-93q-54 0-104 17.5T284-732l448 448Z" /></svg>
                                            <strong className='mr10'>Blockeds : </strong>
                                            {
                                                info.blockedListCount
                                            }
                                        </span>
                                        :
                                        "No blocked "
                                    }
                                </div>
                            </div>
                            <div style={{ borderLeft: "solid 1px var(--border-color)", maxWidth: "600px" }} className="p10 wmia mt20 c-s-s">
                                <p className='mb10 r-s-c'>
                                    <svg style={{ fill: "none" }} className='mr5' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokelinecap="round" strokelinejoin="round" width={32} height={32} strokeWidth={1.25}> <path d="M10 9a2 2 0 1 0 4 0a2 2 0 0 0 -4 0"></path> <path d="M4 8v-2a2 2 0 0 1 2 -2h2"></path> <path d="M4 16v2a2 2 0 0 0 2 2h2"></path> <path d="M16 4h2a2 2 0 0 1 2 2v2"></path> <path d="M16 20h2a2 2 0 0 0 2 -2v-2"></path> <path d="M8 16a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2"></path> </svg>
                                    Bio
                                </p>
                                {
                                    info.bio ?
                                        <div className="r-s-s">
                                            <Abbreviator_text t={info.bio} l={200} s='fw900 wmia p10' />
                                            <button onClick={() => setWantToChangeBio(true)} className='curP op-6 ml10'>
                                                <svg className='f-no' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokelinecap="round" strokelinejoin="round" width={32} height={32} strokeWidth={1.25}> <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1"></path> <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z"></path> <path d="M16 5l3 3"></path> </svg>
                                            </button>
                                        </div>
                                        :
                                        <div className='mt10 r-s-s'>
                                            <p className='ml10'>You have not added any bio text yet.</p>
                                            <button onClick={() => setWantToChangeBio(true)} className='curP ml10'>
                                                <svg className='f-no' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokelinecap="round" strokelinejoin="round" width={32} height={32} strokeWidth={1.25}> <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1"></path> <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z"></path> <path d="M16 5l3 3"></path> </svg>
                                            </button>
                                        </div>
                                }
                                {
                                    isWantToChangeBio &&
                                    <>

                                        <Texta value={bio} className='wmia  scrl_none bg-l border' style={{ minHeight: "150px", padding: "10px" }} onChange={e => setBio(e.target.value)} />

                                        {

                                            <div className='wmia mt10 r-e-c'>

                                                <button onClick={() => setWantToChangeBio(false)} className='border  mr10'>
                                                    <svg className='mr10' style={{ transform: "rotate(180deg)" }} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="m560-240-56-58 142-142H160v-80h486L504-662l56-58 240 240-240 240Z" /></svg>
                                                    Cancel
                                                </button>
                                                {
                                                    isChangedBio &&
                                                    <>
                                                        {
                                                            IsSavingBio ?
                                                                <div className="r-c-c">
                                                                    <L_loader style={{ borderWidth: "2px" }} />
                                                                    <p className='ml10'>saving</p>
                                                                </div>
                                                                :
                                                                <>
                                                                    <button onClick={submitBio} className='br  w100'> <svg style={{ fill: "none", stroke: "#fff", strokeWidth: 2 }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokelinecap="round" strokelinejoin="round" width={32} height={32} strokeWidth={1}> <path d="M6 4h10l4 4v10a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2"></path> <path d="M12 14m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path> <path d="M14 4l0 4l-6 0l0 -4"></path> </svg>  Save</button>
                                                                </>
                                                        }
                                                    </>

                                                }
                                            </div>
                                        }

                                    </>
                                }



                            </div>
                            <div style={{ borderLeft: "solid 1px var(--border-color)" }} className="wmia p10 mt20  c-s-s">

                                <p className='mb10 r-c-c'>
                                    <svg className='mr10' style={{ fill: "none" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width={32} height={32} strokeWidth={0.75}> <path d="M12 6h-6a2 2 0 0 0 -2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-6"></path> <path d="M11 13l9 -9"></path> <path d="M15 4h5v5"></path> </svg>
                                    Links
                                </p>
                                {
                                    info.links?.length > 0 ?
                                        <div style={{ maxHeight: "400px", overflow: "auto", maxWidth: "800px" }} className="scrl_none wmia mt10 pl20 c-s-s">
                                            {
                                                info.links.map(l => <ProfieLink l={l} key={l._id} />)
                                            }
                                        </div>
                                        :
                                        <div className='r-c-c pl20'>
                                            You have not added any link  yet.
                                            <EmptyLottie />
                                        </div>
                                }

                                <button onClick={() => dispatch(open_addLink())} className='cr mt20 w150  br5 curP'>
                                    <svg className='mr10' style={{ fill: "none", strokeWidth: 2, stroke: "var(--bg-primary)" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width={32} height={32} strokeWidth={1}> <path d="M9 15l6 -6"></path> <path d="M11 6l.463 -.536a5 5 0 0 1 7.072 0a4.993 4.993 0 0 1 -.001 7.072"></path> <path d="M12.603 18.534a5.07 5.07 0 0 1 -7.127 0a4.972 4.972 0 0 1 0 -7.071l.524 -.463"></path> <path d="M16 19h6"></path> <path d="M19 16v6"></path> </svg>
                                    Add a link
                                </button>
                            </div>
                        </>
                }



            </div>
            <>

                <AnimatePresence>

                    {isListFollowingVSBL &&
                        <Edit_followings onCLose={() => setisListFollowingVSBL(false)} />
                    }
                </AnimatePresence>
                <AnimatePresence>

                    {isListFollowersVSBL &&
                        <Edit_followers onCLose={() => setisListFollowersVSBL(false)} />
                    }
                </AnimatePresence>
                <AnimatePresence>

                    {isListContactsVSBL &&
                        <Edit_contacts onCLose={() => setisListContactsVSBL(false)} />
                    }
                </AnimatePresence>
                <AnimatePresence>

                    {isListReqeustVSBL &&
                        <Edit_requests onCLose={() => setisListReqeustVSBL(false)} />
                    }
                </AnimatePresence>
                <AnimatePresence>

                    {isListBolckedVSBL &&
                        <Edit_blockeds onCLose={() => setisListBolckedVSBL(false)} />
                    }
                </AnimatePresence>
                <AnimatePresence>

                    {EditInfoVSBL &&
                        <EditInfo onCLose={() => setEditInfoVSBL(false)} />
                    }
                </AnimatePresence>

            </>
        </div>
    )
}

export default Personal_info
