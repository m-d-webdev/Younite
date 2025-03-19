import React, { useEffect, useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import ReactDOM from 'react-dom'
import { connect, useDispatch, useSelector } from 'react-redux';
import BtnClose from './btnClose';
import { BringViewUserBlogs, BringViewUserFolloers, BringViewUserFollowings, BringViewUserPosts, BringViewUserReels, close_view_user } from '../slices/viewUser';
import L_loader from './L_loader';
import { open_zoomer } from '../slices/zoomer';
import { _OnContainerClickOut, Abbreviator_text, GetShortNum } from './Abbreviator';
import Btn_follow from './btn_follow';
import Btn_open_sp_chat from './btn_open_sp_chat';
import Report_friend from './report_friend';
import { open_reportCmp } from '../slices/ReportSlice';
import Btn_addToContact from './btn_addToContact';
const View_user_cmp = () => {
    const ViewUserRef = useRef();
    const dispatch = useDispatch();
    const { userData, isLodingViewUserData } = useSelector(s => s.ViewUser)
    return ReactDOM.createPortal(
        <div className='backendMer'
            onClick={e => _OnContainerClickOut(e, ViewUserRef.current, () => { dispatch(close_view_user()) })}
        >
            <motion.div
                ref={ViewUserRef}
                initial={{
                    y: 200
                    , opacity: 0
                }}
                animate={{
                    y: 0,
                    opacity: 1
                }}

                exit={{
                    y: 200,
                    opacity: 0
                }}
                className="w500  br10 bg-l p20 psr c-c-s">
                <BtnClose onClick={() => dispatch(close_view_user())} />
                {
                    isLodingViewUserData ?
                        <div className="wmia hmia c-c-c"><L_loader /></div>
                        :
                        <>
                            <div className="wmia r-b-s   pr20">
                                <div className="r-s-s">
                                    <img onClick={() => dispatch(open_zoomer(userData.profile_img))} src={userData.profile_img} alt="" style={{ width: "100px", height: "100px" }} className="  imgCercle" />
                                    <div className="c-s-s">
                                        <div className="r-s-c">
                                            <h1
                                                className='fw600 mt10 ml10 '
                                                style={{
                                                    fontSize: "25px",
                                                    fontFamily: "'Rubik', serif",

                                                }}
                                            >
                                                {userData.FirstName}  {userData.LastName}
                                            </h1>

                                            <svg
                                                className='ml10 w20 h20'
                                                version="1.1" viewBox="0 0 2048 2048" width="128" height="128" xmlns="http://www.w3.org/2000/svg">
                                                <path transform="translate(982)" d="m0 0h82l33 9 30 10 26 12 19 11 19 13 13 10 14 12 16 15 43 43 7 8 24 24 7 8 24 24 7 8 8 6 6 2 89 3 42 1 44 2 28 3 23 4 20 5 23 8 24 11 26 15 17 12 13 10 14 12 8 7 19 19 9 11 13 17 15 23 12 22 9 20 9 25 6 23 4 26 3 34 2 56 1 33 1 55 1 18 2 8 8 8 8 7 13 13 8 7 27 27 8 7 21 21 2 1v2l4 2 30 30 7 8 12 14 11 14 12 17 12 22 9 17 10 24 6 16 3 9v121l-6 15-12 31-11 21-14 23-11 16-11 14-11 12-7 8-9 10-12 12-8 7-11 11h-2v2l-8 7-30 30h-2v2l-8 7-8 8-8 7-8 8-8 7-5 5-1 5-2 37-4 129-2 23-5 30-6 25-8 24-9 22-10 19-14 23-14 18-13 16-11 12-13 13-11 9-17 13-18 12-21 12-19 9-21 8-27 8-25 5-33 4-27 2-87 3-41 1-21 1-7 4-15 15-1 2h-2l-2 4-25 25-7 8-21 21-7 8-38 38-8 7-8 8-11 9-14 11-19 12-21 12-23 11-24 9-25 7-23 5-2 1h-57l-26-6-20-6-18-6-27-11-19-10-18-11-12-9-13-11-15-14-6-5v-2l-4-2-16-16-5-6-51-51v-2h-2l-7-8-25-25-5-6-13-10-4-1-82-1-64-2-34-2-27-3-26-5-26-8-20-8-25-12-21-13-14-10-16-13-24-22-7-8-13-14-13-17-12-18-10-17-10-19-8-19-6-19-6-24-4-23-3-36-2-56-2-107-4-6-9-10-45-45-8-7-22-22-8-7-13-13-6-5-7-8-15-15-7-8-11-13-12-16-11-17-14-27-9-21-8-25-8-34v-68l7-27 10-30 9-21 8-17 8-12 7-11 9-13 10-13 12-14 16-17 11-11 8-7 10-10 8-7 13-13 8-7 25-25 8-7 15-14h2l2-4h2l2-4 5-7 1-4 2-63 2-80 2-37 4-31 5-24 11-33 8-19 12-22 14-23 8-10 10-13 12-13 9-10 14-14 8-7 15-12 16-11 25-15 25-12 25-9 19-5 27-5 27-3 47-2 87-2 30-1 16-2 10-6 22-22 7-8 11-11 7-8 10-10 7-8 19-19 7-8 35-35 16-14 11-8 18-13 15-9 25-13 20-8 29-9zm424 637-18 3-18 5-23 11-13 9-11 9-12 11-24 24-7 8-9 9v2h-2l-7 8-9 9-7 8-11 11-7 8-11 11-7 8-9 9-7 8-10 10-7 8-12 12-7 8-11 11-7 8-15 15-7 8-14 14-7 8-20 20-7 8-14 14-7 8-12 12-7 8-21 21-7 8-21 21-7 8-13 13-7 8-33 33-9 11-6 8-2 3-3-5-5-5-7-6-7-8-43-43-7-8-16-16-7-8-16-16-7-8-23-23-7-8-13-13-8-7-15-12-15-10-16-8-11-5-15-4-16-3-9-1h-24l-20 3-18 5-18 8-17 11-9 7-10 9-13 13-12 17-8 15-9 24-4 17-2 15v17l2 16 5 20 11 24 10 16 14 17 9 10 11 12 26 26 7 8 44 44 1 2h2l2 4 34 34 7 8 28 28 7 8 24 24 7 8 22 22 7 8 14 14 7 8 13 13 8 7 14 12 15 11 12 7 25 10 16 4 14 2h25l20-3 16-5 15-6 15-8 17-12 11-10 8-7 13-13v-2h2l7-8 9-9 7-8 24-24 7-8 8-8 7-8 12-12 7-8 10-10 7-8 10-10 5-6 21-21 7-8 9-9 7-8 20-20 7-8 25-25v-2h2l7-8 9-9 7-8 9-9 7-8 11-11v-2l4-2v-2l4-2v-2l3-1 7-8 13-13 5-6 6-5 7-8 1-3 3-1 7-8 6-7 25-25 7-8 21-21 7-8 11-11 7-8 8-8 7-8 25-25 7-8 12-12 7-8 28-30 10-13 10-16 7-16 7-26 2-16v-25l-3-18-9-27-9-17-12-18-9-11-10-10-13-10-15-9-16-8-22-7-15-3-8-1z" fill="#3AACF7" />
                                                <path transform="translate(194,722)" d="m0 0 2 3 3 2-2 5-3 6-1 8-2 3v5h2l1 3-2 5 1 9 6-1 4 4 9-4h5l-2 7h-2v7l-2 6-3 4 1 11-3 6 1 2v6l-5 5-2 6v2h-2v2l4 1-3 5-1 4h-2v8l1 2-2 7-5 2-2-2-2 3 1 1-1 7-7 8h-2v3l4 1 2 9h-5l-3-2 1 7 1 2-1 4 4 6h2l-1-4 2-3v4l2 1-1 5-1 4 4 6-1 5-3 8-6 7-1 5 4 1 4-2 1 7h-3v-2h-2l-1 2-2 1v5l-2 6 4-2v-3l7-1 1 3 5-2 3-3 2 3-2 3h2v2h-2l1 6 2 1v2l-10 5-1 2 2 1v2l-6 2v5l-2 4v4l2 4h2l2 8h-2l1 8 2-1 4 3 2-2-5-5 1-4 3-3 4 1v9l2 3-4 2-2 7 7 1 1-5 1-3 2-1 3-1h5l3-2 3 3-1 5-4 2-3-3v4h4v2l4-1v2l4-1 1 4-1 3-3-1-2-3-2 1 2 5 1 3-1 3-8 2 1 3-2 2 2 2 2-5h2l1 6-2 1v2l4 2 1 3-3 3-4 2v1l5 1 1 7 7 1 1 3-1 6 2 2v12l-1 6 2 1-1 8-1 1v14l-2 8-3 3 4 2 1 6-1 2 1 4-1 6 1 7 4 2v5l1 2h-3v3l3 1 1 3-4 4h-3l-1 7v3l-3 3-9 2-1 5-5 3-3 2-1 4-3 3h-2v2h-2l1 5 2 1 1-2 2 4v5l-1 5 2 5v5l-4 7-2 5-2 3-15 1-4-4-5-3-4-4v-2l-6-2-3-2-1-3-9-4-9-7-5-5-8-6-3-1v-2l-4-2-10-10-3-5v-2l-7-1-9-1v2l4 2-1 2h-10l-5-2v-2l-7-2-11-13-12-17-8-13-12-23-9-20-9-28-8-34v-68l7-27 10-30 9-21 8-17 8-12 7-11 9-13 10-13 12-14 16-17 11-11 8-7 10-10 8-7 13-13 8-7 24-24h5l6-4z" fill="#0888E4" />
                                                <path transform="translate(219,1366)" d="m0 0 5 1v2l5 2 5 5 7 2h9l3-1v3l3 1 1-3 6 1v2l6 1 4 4v4h2l4 7 2 7 1 1 2 9 2 3-3 7v7l1 5 2 4-1 4-1 1 1 11-1 14v20l-2 5v13l-2 5v10l-1 5-1 13-1 4-8 3-3 1-2-2h-9l-3-1-10 2v15h2v2h2l1 4 1 7h-2v4l2 6v9l-1 3v11l-4 8-4-1-7-23-6-27-3-22-2-27-2-56-1-50v-39z" fill="#0888E4" />
                                                <path transform="translate(265,378)" d="m0 0h2l-1 8-3 7-2 9-3 9-5 12-4 8-2 6-1 11-1 8-2 8-1 7-1 4h-2v8l-5 6-4 12v20l-1 10 4 8v2l8 1v5l1 2 2 16 3 1v5l4 4v5l4 1-1 5-2-1-1-1-1 3-3 1v3l-4 2-1 7-1 5 3 9 1 2-2 8h-2l2 6h-2v5l3-1 2 6 4 3-2 8h-4l-3 11-4-1-2 9-6 12-7 2h-4v-55l2-80 2-37 4-31 5-24 11-33 8-19 12-22z" fill="#0A89E4" />
                                                <path transform="translate(547,910)" d="m0 0 9 1 1 4-18 11-14 12-15 15-12 17-8 15-9 24-3 5-2-4 3-4-1-4-4-7-1-9 1-11 2-3 9-15 3-3 4-8 9-8 5-6h4l1-3 13-9 17-8z" fill="#0A89E4" />
                                                <path transform="translate(123,1246)" d="m0 0 10 5 8 8 7 8 24 24 7 6v2l4 2 4 3v2l4 2 4 4v2l5 2 4 5 5 5 4 11 1 5-1 3-4-2-50-50-8-7-22-22-4-3v-5h-2l-3-7z" fill="#0A89E5" />
                                                <path transform="translate(476,1015)" d="m0 0h2l-1 11-3 12-3-3-1-5h2v-10z" fill="#0F8DE6" />
                                                <path transform="translate(225,1555)" d="m0 0 7 1v2l2 1-2 5h-2l-1 3-3-1z" fill="#3AACF8" />
                                                <path transform="translate(477,226)" d="m0 0h7l-3 3-8 1-3-2z" fill="#108EE7" />
                                                <path transform="translate(229,1577)" d="m0 0 5 3 1 3-3 6-2-4z" fill="#3AACF8" />
                                            </svg>
                                        </div>
                                        <p style={{ fontSize: "13px" }} className='mt10 r-c-c  ml20 '>
                                            <svg className='mr10' version="1.1" viewBox="0 0 2048 2048" width="128" height="128" xmlns="http://www.w3.org/2000/svg">
                                                <path transform="translate(468,160)" d="m0 0h23l22 3 18 6 17 9 12 9 10 9 9 10 10 16 7 14 6 18 7 31v2h48l237-1 4-25 6-20 9-20 10-15 14-15 13-10 14-8 15-7 17-4 16-2h23l22 3 18 6 17 9 12 9 10 9 9 10 10 16 7 14 6 18 7 31v2h49l236-1 4-24 4-15 8-20 6-11 8-11 12-13 14-11 14-8 15-7 17-4 16-2h22l17 2 16 4 16 7 13 8 13 10 8 8 10 13 9 16 7 16 5 18 5 25h250l16 2 9 4 6 5 3 6 1 8 1 36v1261l-1 47-2 37-3 20-6 23-7 19-13 25-12 17-11 13-11 12-12 11-11 9-14 10-17 10-16 7-21 7-24 6-27 3-17 1h-1477l-26-2-20-3-18-5-15-5-16-7-17-10-14-10-13-11-4-3v-2l-4-2-14-14-9-11-14-20-10-18-9-20-6-18-5-25-2-18-1-17-1-38-1-85v-703l1-493 1-30 2-10 5-10 7-5 7-2 14-1 55-1 196-1 4-25 6-20 8-18 10-16 15-16 13-10 14-8 16-7 16-4zm2 64-12 3-12 6-10 8-7 8-8 15-4 17-2 22-1 25v36l2 23 4 17 5 11 7 11 10 9 11 7 13 4 5 1h18l12-3 12-7 10-8 7-8 6-12 4-13 2-17 1-69-1-27-3-16-7-14-8-10-8-8-12-7-10-3-7-1zm544 0-12 3-12 6-10 8-7 8-8 15-4 17-2 21-1 23v40l2 23 4 17 7 14 8 10 10 8 8 5 13 4 5 1h18l12-3 12-7 10-8 7-8 6-12 4-13 2-17 1-51v-27l-2-26-4-13-8-13-7-9-12-9-12-5-11-2zm544 0-12 3-12 6-10 8-7 8-8 15-4 17-2 21-1 23v40l2 23 4 17 7 14 8 10 11 9 10 5 15 4h19l13-4 14-9 10-9 5-7 5-12 3-10 2-17 1-60v-18l-2-26-4-13-8-13-9-10-9-7-10-5-14-3zm-947 126-3 2-2 37-4 28-6 18-9 17-9 13-13 14-12 9-12 7-15 6-13 4-21 3h-24l-22-3-17-5-19-9-12-9-10-9-11-13-12-21-9-27-4-29-2-30-1-2h-221l-1 1v191h1790l2-1v-190l-1-1h-221l-1 1-2 36-3 24-5 18-8 16-7 12-7 9-3 3v2h-2l-6 7-12 9-14 8-18 7-19 4-10 1h-24l-18-2-19-5-16-7-15-10-13-12-11-14-10-17-6-15-5-19-3-25-2-30-1-1-282-1-3 2-2 38-4 27-6 18-9 17-10 14-12 13-12 9-12 7-20 8-19 4-8 1h-28l-21-3-17-5-16-8-13-9-13-12-10-13-10-17-6-15-5-19-3-25-2-30-1-1zm-475 256-9 1v1049l2 28 4 22 6 18 9 19 11 16 11 13 10 10 17 13 15 9 17 8 20 6 18 3 30 2 441 1h702l313-1 26-2 25-5 18-6 16-8 11-7 9-7 12-10v-2l4-2v-2l4-2 9-11 7-10 9-15 8-24 5-23 2-22 1-166v-888l-1-4-268-1z" />
                                                <path transform="translate(791,801)" d="m0 0 15 1 13 4 16 8 13 9 11 9 10 9 11 13 8 13 5 15 2 19v17l-3 21-5 16-4 9-7 13-11 15-12 12-16 10h-2l-2 21v12l-1 21-1 49 13 1h138l7-3 1-26v-65l-3-5-5-4-12-6-12-9-9-9-9-13-8-16-4-15v-24l4-14 6-12 13-16 11-10 8-7 10-9 7-10 2-3 3-19 5-10 9-8 7-3h15l12 3 15 7 16 10 11 9 13 12 11 14 8 16 3 10 2 17v17l-3 22-5 16-8 17-8 12-8 10-9 9-14 9-4 2-3 16v13l-1 19v55l11 1h139l7-3 1-29v-62l-1-4-11-7-14-8-12-11-8-9-10-18-5-14-1-5v-25l4-14 6-12 9-11 7-8h2v-2l11-9 14-13 8-14 3-17 5-10 9-8 6-3h16l12 3 17 8 15 10 10 8 12 11 11 14 6 10 5 12 2 11v36l-3 18-7 19-11 20-9 12-7 7-11 7-10 6-2 3-1 9-1 33-1 59 159 1 22 2 15 4 14 7 12 9 12 12 10 15 7 14 4 16 1 10v359h92l40 1 13 2 6 3 5 6 2 9-1 22-4 11-5 6-6 2-7 1-121 1h-1107l-64-1-13-2-6-5-5-10-2-7v-15l4-11 6-7 8-4 14-1 128-1-1-28v-315l2-28 4-15 8-16 10-14 8-8 13-10 15-8 15-4 22-2 150-1 7-2 1-8v-77l-1-11-7-5-14-7-10-8-8-8-7-10-6-10-6-15-3-13v-24l4-14 6-10 11-13 5-5 9-8 14-11 7-8 5-9 3-19 5-10 7-7 7-4zm34 83 1 2zm-2 1-9 7-13 12-13 11-14 11-7 8 1 6 14 14 9 4h13l7-3 5-5 6-11 5-10 2-9 1-25-3-8zm224 0-9 7-10 9-12 11-13 10-10 9-3 5 3 5 8 8 11 8 4 1h12l7-3 5-6 8-13 4-11 1-6 1-24-3-8zm2 0m223 0-9 6-11 10-2 1v2l-4 2-9 8-13 10-7 6-3 6 6 9 11 9 5 3 4 1h12l7-3 5-6 9-16 3-8 1-6 1-25-4-9zm-647 298-23 1-10 2-5 4-6 10-4 16-2 14v43l2 5 6 5 26 12 15 9 16 11 13 10 16 10 8 4 15 4h21l12-3 9-4 21-12 18-13 16-10 18-10 13-5 25-5 10-1h17l23 3 19 5 18 8 16 10 12 9 19 14 13 8 10 4 10 2h21l15-4 15-8 16-10 17-12 16-10 19-10 21-6 22-3h18l23 3 15 4 16 6 16 9 17 12 12 9 15 10 14 7 13 3h17l14-3 14-6 20-12 17-12 21-13 21-10 10-5 3-4 1-5v-33l-1-24-2-14-6-12-5-4-11-2-39-1zm226 160-10 3-14 7-24 16-20 14-13 8-16 7-14 4-21 3h-31l-20-3-17-5-21-10-16-10-13-10-16-12-7-5h-2l-1 60-1 97v47l1 12 2 1 55 1h62l776-1 2-1-1-64-1-149-6 2-11 7-12 9-15 10-16 9-13 6-20 6-19 3h-37l-20-4-15-5-18-10-12-8-18-13-19-12-15-7-11-3h-22l-13 4-15 8-15 10-23 16-13 8-14 7-15 5-18 3-10 1h-30l-21-3-20-7-5-3-16-9-15-11-23-16-19-10-12-3z" />
                                                <path transform="translate(1045,890)" d="m0 0" />
                                                <path transform="translate(821,890)" d="m0 0" />
                                                <path transform="translate(1047,889)" d="m0 0" />
                                                <path transform="translate(1273,886)" d="m0 0" />
                                            </svg>

                                            {new Date(`${userData.BirthDay?.split(".")[2]}-${userData.BirthDay?.split(".")[1]}-${userData.BirthDay?.split(".")[0]}`).toDateString()}
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => dispatch(open_reportCmp({ conent_id: userData._id, collection: "users" }))}
                                >
                                    <svg className='w20 h20 curP' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style={{ fill: "none" }} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width={32} height={32} strokeWidth={1.25}> <path d="M14 4h6v6h-6z"></path> <path d="M4 14h6v6h-6z"></path> <path d="M17 17m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path> <path d="M7 7m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path> </svg>
                                </button>
                            </div>


                            <div className="mt20 r-p-c  p10 wmia br20">
                                <div className='p5 cntUserSharing  psr curP border pl15 pr15  r-c-c br20 ' style={{}}>
                                    <p> <strong className='fw900 fs14 c-d mr5'> {GetShortNum((+userData.postsCount + userData.ReelsCount + userData.blogsCount))} </strong>sharing</p>
                                    <svg xmlns="http://www.w3.org/2000/svg" style={{ fill: "none" }} viewBox="0 0 24 24" className='ml10 ' stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width={32} height={32} strokeWidth={1.25}> <path d="M6 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path> <path d="M18 6m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path> <path d="M18 18m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path> <path d="M8.7 10.7l6.6 -3.4"></path> <path d="M8.7 13.3l6.6 3.4"></path> </svg>
                                    <div
                                        animate={{ scale: [0, 1] }}
                                        style={{
                                            position: "absolute",
                                            top: "25px",
                                            filter: "drop-shadow(0 0 8px var(--filter-color))",
                                            left: "0"
                                        }}
                                        className="cntCountSharing z2 bg10 c-c-c p10 bg-l">
                                        <span
                                            onClick={() => dispatch(BringViewUserPosts(userData._id))}
                                            className="r-s-c mt10 p5 br5 hoverEff1">
                                            <svg className='mr5' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style={{ fill: "none" }} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width={32} height={32} strokeWidth={1.25}> <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path> <path d="M4 13h3l3 3h4l3 -3h3"></path> </svg>
                                            Posts : <strong className='ml10 fw900'>{GetShortNum(userData.postsCount)}</strong>
                                        </span>
                                        <span
                                            onClick={() => dispatch(BringViewUserReels(userData._id))}
                                            className="r-s-c mt10 p5 br5 hoverEff1">
                                            <svg className='mr5' version="1.1" viewBox="0 0 2048 2048" xmlns="http://www.w3.org/2000/svg">
                                                <path transform="translate(624,145)" d="m0 0h780l69 1 34 2 35 4 29 6 24 7 25 9 25 11 16 8 19 10 21 13 12 8 15 11 14 11 12 11 8 7 8 8 7 6 7 8 8 8 9 11 14 18 12 17 14 22 12 22 12 25 12 30 9 28 7 30 4 23 2 19 2 43 1 435v297l-1 146-2 45-3 26-8 38-7 25-8 23-10 24-13 27-11 19-12 19-10 15-13 17-9 10-9 11-25 25-8 7-13 11-15 12-17 12-25 15-16 9-23 11-13 6-37 13-21 6-33 7-26 4-22 2-42 2h-869l-39-2-34-4-32-7-31-9-26-10-33-15-22-12-19-12-17-12-18-14-14-12-10-9-5-5-9-8v-2l-3-1-7-8-14-15-11-14-10-13-17-26-15-26-15-31-10-26-11-34-6-27-5-33-2-24-1-19-1-62v-669l1-176 2-28 5-33 10-40 10-30 12-28 10-21 11-20 8-13 20-30 10-12 8-10 16-17 27-27 11-9 12-10 16-12 20-13 20-12 27-14 28-12 24-8 29-8 32-6 27-3 37-2zm101 146-1 2 36 54 32 49 14 22 22 34 10 16 10 15 18 28 13 20 32 48 6 6h329l-1-6-10-16-26-39-29-43-12-18-16-23-68-102-21-31-8-10-5-5-3-1-312 1 1 3-2-2v-2zm512 0-1 3 10 14 28 42 17 26 13 20 14 22 22 34 10 16 10 15 11 17 7 11 13 20 32 48 7 6h25l91 1h116l81-1 9-1 2-1v-12l-4-34-7-31-9-27-10-23-11-21-10-16-14-19-9-10-7-8-14-14-28-22-20-13-27-14-16-7-25-9-21-5-19-3-43-3-43-1-170 1 1 3-2-1v-2h-4v2h-3v-2l2-1zm-698 1-25 7-22 7-15 6-22 10-14 8-14 9-17 12-14 12-8 7-7 6-7 8-9 9-8 10-9 12-10 15-9 16-9 17-10 23-7 20-7 34-5 37v5l1 1 8 1 39 1h394l2-2-6-11-10-16-14-22-13-20-15-23-12-19-10-15-15-23-11-17-14-22-19-29-10-16-11-17-15-23-6-9-6-7zm1165 438-876 1h-535l-1 2-1 625 1 106 2 28 3 24 5 23 8 24 11 25 11 21 12 19 10 13 9 11 11 12 16 16 11 9 16 12 19 12 18 10 19 9 21 8 25 7 24 4 34 3 56 1h813l32-1 21-2 25-4 19-5 23-8 23-10 18-10 19-12 17-12 14-12 10-9 16-16 7-9 8-10 12-18 13-23 9-20 7-18 5-18 6-29 3-30 1-19v-730z" />
                                                <path transform="translate(865,946)" d="m0 0h19l12 3 12 5 23 12 56 34 29 17 23 14 18 11 17 10 23 14 22 13 21 13 26 15 13 8 20 12 21 13 22 13 23 14 16 11 10 8 9 10 9 14 5 11 2 7 1 8v11l-3 16-5 12-10 15-9 10-11 9-25 16-24 14-23 14-110 66-22 13-28 17-29 17-40 24-13 8-35 21-17 9-15 5-11 2h-12l-16-3-13-5-11-7-12-11-8-10-8-17-3-14-1-9-1-41v-367l1-33 3-17 8-16 8-11 13-13 11-7 12-6zm85 210v179l5-1 16-8 21-12 26-15 24-14 13-8 18-10 19-10 9-5-2-4-24-15-19-12-47-29-21-13-19-12-18-11z" />
                                                <path transform="translate(727,292)" d="m0 0h2v2h-2z" />
                                                <path transform="translate(540,293)" d="m0 0" />
                                            </svg>
                                            Reels :
                                            <strong className='ml10 fw900'>{GetShortNum(userData.ReelsCount)}</strong>
                                        </span>
                                        <span
                                            onClick={() => dispatch(BringViewUserBlogs(userData._id))}
                                            className="r-s-c mt10 p5 br5 hoverEff1">
                                            <svg className='mr5' version="1.1" viewBox="0 0 2048 2048" xmlns="http://www.w3.org/2000/svg">
                                                <path transform="translate(450,331)" d="m0 0h574l44 1 20 2 12 3 15 8 13 11 8 10 8 13 5 14 2 10v20l-4 15-8 16-9 12-10 10-13 8-14 5-13 2-18 1-56 1h-570l-38 1-34 2-22 4-30 10-27 13-18 11-17 13-13 11-15 15-11 14-12 17-11 19-9 19-7 21-5 19-4 25-2 27-1 139v785l1 34 3 22 4 12 6 11 7 9 9 8 19 10 16 5 16 2 13-1 12-4 19-10 11-9 14-12 13-12 8-7 15-13 14-13 11-9 11-10 8-7 15-14 14-12 12-10 15-10 15-5 8-1 29-1h782l65-1 24-3 22-5 23-8 25-12 14-8 18-12 14-12 9-8h2l2-4 9-9 16-20 11-17 12-24 8-24 6-26 4-25 1-12 1-179 2-26 4-14 6-10 8-11 8-9 14-10 12-5 14-4 15-1 15 2 15 5 15 8 10 9 8 9 6 9 5 11 4 17 1 16v140l-1 43-2 33-3 27-5 24-9 33-13 33-7 16-11 20-6 11-13 20-16 22-11 14-11 12-5 6h-2l-2 4-16 15-10 9-28 20-15 10-24 14-24 12-20 8-28 10-32 8-26 5-26 3-42 2-102 1h-621l-85 1-6 2-12 12-8 7-16 15-12 11-10 9-8 7-14 13h-2v2l-10 8-11 10-18 13-21 14-20 11-19 8-29 9-23 5-18 2h-37l-19-2-21-5-24-8-21-9-18-10-17-12-14-12-15-14-2-4h-2l-7-8-11-13-16-24-12-23-8-21-9-27-2-3v-1073l1 2 2-1 11-39 8-26 10-27 18-36 13-21 7-11 12-17 22-26 9-9 1-2h2l2-4 13-12 11-10 11-9 13-10 15-10 21-13 20-11 19-9 27-10 26-8 22-5 26-4 32-3 24-1z" />
                                                <path transform="translate(1785,115)" d="m0 0h42l27 3 22 5 22 8 23 11 18 11 14 10 16 13 19 19 13 17 9 14 6 10 14 28 9 25 7 22 2 1v109l-2-1-3-7-5 10-7 21-12 23-12 20-12 17-9 11-9 10-2 3h-2l-2 4-22 22-5 6-8 7-540 540-8 7-17 16-15 13-10 9-14 11-14 10-17 12-19 12-20 12-23 13-23 11-20 9-36 14-26 8-29 8-26 6-37 7-28 4-37 3h-43l-12-3-14-7-9-7-10-9-9-12-6-12-4-13-2-13v-20l3-44 3-24 7-40 6-28 11-38 9-26 14-35 7-15 13-26 13-23 7-11 9-15 15-22 11-14 7-9 10-13 10-11 9-11 12-13 2-3h2l2-4 238-238 5-6 8-7 8-9 8-7 9-10h2v-2l7-6 3-4h2l1-3 8-7 7-8 8-7 20-20 2-3h2l1-3 8-7 5-6h2l1-3 8-7 9-10h2v-2l7-6 7-8h2v-2l7-6 7-8h2v-2l7-6 7-8h2v-2l7-6 7-8h2v-2l7-6 7-8h2v-2l7-6 7-8h2v-2l7-6 7-8h2v-2l7-6 7-8h2v-2l7-6 6-7 8-7 9-10h2v-2l7-6 7-8 34-34 8-7 14-13 17-12 18-11 21-11 21-8 21-6 23-4zm13 160-11 2-13 5-12 7-10 9-8 7-48 48-5 6-7 6v2l-4 2-5 6-7 6v2l-4 2-5 6-8 7-8 9-7 6v2l-4 2-5 6-7 6v2l-4 2-5 6-5 5-5 4-7 8-12 12-6 5-4 4v2l-4 2-5 6-8 7-4 4v2l-3 1v2l-4 2-8 8-5 6-6 5-7 8-224 224-6 5-5 5-4 5-3 2v2l-4 2-8 8-5 6-7 6v2l-4 2-5 6-7 6v2l-4 2-5 6-7 6v2l-4 2-5 6-7 6v2l-4 2-5 6-8 7-4 5-7 6-7 8-12 12-7 8-10 11v2h-2l-9 12-9 11-10 14-13 21-11 18-8 16-9 20-11 28-12 36-8 27-1 6 10-1 27-7 27-8 28-11 25-12 19-10 27-16 14-9 16-12 13-10 13-11 10-9 8-7 20-20 6-5 6-7 7-6 4-5 7-6 6-7 6-5 7-8 364-364 5-4 6-7 6-5 7-8 5-4 7-8 55-55 6-5 7-8 6-5 7-8 21-21 8-7 12-12 9-13 8-16 4-14v-24l-4-16-7-14-7-10-6-7-10-8-16-8-10-3-9-2z" />
                                                <path transform="translate(450,811)" d="m0 0h157l34 1 18 2 12 4 13 7 11 9 11 13 8 14 5 16 1 7v17l-3 14-8 16-9 13-9 10-9 7-12 6-11 3-22 2-46 1h-174l-29-1-13-2-11-4-13-9-6-5-9-11-9-15-6-16-2-10v-15l3-15 7-17 7-11 6-7h2l2-4 15-10 11-5 13-3 12-1z" />
                                                <path transform="translate(462,1131)" d="m0 0h155l27 1 15 2 10 3 12 6 11 8v2l4 2 11 14 9 17 3 11 1 7v16l-3 15-8 16-7 10-5 7h-2l-2 4-10 8-16 8-17 3-20 1-72 1h-134l-36-1-13-2-12-5-13-9-12-12-8-13-6-12-4-13-1-6v-14l3-16 7-17 9-13 11-11 16-10 10-4 10-2 11-1z" />
                                                <path transform="translate(2047,289)" d="m0 0h1v7h-3z" />
                                                <path transform="translate(3,659)" d="m0 0" />
                                                <path transform="translate(2044,291)" d="m0 0 2 1z" />
                                                <path transform="translate(0,662)" d="m0 0" />
                                            </svg>
                                            Blogs :
                                            <strong className='ml10 fw900'>{GetShortNum(userData.blogsCount)}</strong>
                                        </span>
                                    </div>
                                </div>
                                <span
                                    onClick={() => dispatch(BringViewUserFolloers(userData._id))}
                                    className='p5  curP border pl15 pr15  r-c-c br20 ' style={{}}>
                                    <p>  <strong className='fw900 fs14 c-d mr5'> {GetShortNum(userData.followersCount)}</strong> follower</p>
                                    <svg xmlns="http://www.w3.org/2000/svg" style={{ fill: "none" }} className='ml10 ' viewBox="0 0 24 24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width={32} height={32} strokeWidth={1.25}> <path d="M9 7m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0"></path> <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"></path> <path d="M16 3.13a4 4 0 0 1 0 7.75"></path> <path d="M21 21v-2a4 4 0 0 0 -3 -3.85"></path> </svg>
                                </span>
                                <span
                                    onClick={() => dispatch(BringViewUserFollowings(userData._id))}
                                    className='p5  curP border pl15 pr15  r-c-c br20 ' style={{}}>
                                    <p>  <strong className='fw900 fs14 c-d mr5'> {GetShortNum(userData.followingCount)} </strong> following</p>
                                    <svg xmlns="http://www.w3.org/2000/svg" className='ml10 ' viewBox="0 0 24 24" style={{ fill: "none" }} stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" > <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" /> <path d="M6 21v-2a4 4 0 0 1 4 -4h3" /> <path d="M16 22l5 -5" /> <path d="M21 21.5v-4.5h-4.5" /> </svg>
                                </span>
                            </div>
                            {

                                userData.bio &&
                                <div className="c-s-s mt20">
                                    <Abbreviator_text
                                        t={userData.bio}
                                        l={100}
                                    />
                                </div>
                            }
                            <Btn_addToContact contactId={userData._id}  className={'wmia border mt50'}/>
                            <Btn_follow className={'wmia p10 mt10 bg-rev-d'} user_id={userData._id} />
                            <div className="r-s-c mt20 hoverEff2" >

                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M640-280q83 0 141.5-58.5T840-480q0-83-58.5-141.5T640-680q-27 0-52.5 7T540-653q29 36 44.5 80t15.5 93q0 49-15.5 93T540-307q22 13 47.5 20t52.5 7Zm-160-80q19-25 29.5-55.5T520-480q0-34-10.5-64.5T480-600q-19 25-29.5 55.5T440-480q0 34 10.5 64.5T480-360Zm-160 80q27 0 52.5-7t47.5-20q-29-36-44.5-80T360-480q0-49 15.5-93t44.5-80q-22-13-47.5-20t-52.5-7q-83 0-141.5 58.5T120-480q0 83 58.5 141.5T320-280Zm0 80q-117 0-198.5-81.5T40-480q0-117 81.5-198.5T320-760q45 0 85.5 13t74.5 37q34-24 74.5-37t85.5-13q117 0 198.5 81.5T920-480q0 117-81.5 198.5T640-200q-45 0-85.5-13T480-250q-34 24-74.5 37T320-200Z" /></svg>
                                <strong className='ml10'>

                                    Date joined : {new Date(userData.createdAt).toDateString()}
                                </strong>
                            </div>
                        </>
                }

            </motion.div>


        </div>
        , document.getElementById("portals")
    )
}

export default View_user_cmp
