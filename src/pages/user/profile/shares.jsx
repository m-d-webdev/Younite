import React, { useEffect, useState } from 'react'
import Post from '../../../components/post'
import Blog from '../../../layouts/blog'
import ProfileHeader from './profileHeader'
import { useDispatch, useSelector } from 'react-redux'
import { GetPersonalBlogs, GetPersonalPosts, GetPersonalReels } from '../../../slices/profileSlice'
import EmptyLottie from '../../../components/emptyLottie'
import { open_scrollReels } from '../../../slices/ScrollReels'

function Profile_Shares() {
    // const [isLoadingProfileInfo, setisLoadingProfileInfo] = useState(true)
    const di = useDispatch();
    const [SectionOpened, setSectionOpen] = useState(0)

    const ShowPersonalPosts = () => {
        const { personalPosts } = useSelector(s => s.Profile);
        useEffect(() => {
            if (personalPosts.posts.length == 0) {
                di(GetPersonalPosts());
            }
        }, []);
        return (
            <>

                {
                    personalPosts.isLoadingPosts ?
                        <div className="wmia c-c-c">
                            <div style={{ maxWidth: "600px" }} className='wmia c-s-s'>
                                <div className="wmia  h400  p10 mt20 br10 pre_elem"></div>
                                <div className="r-s-s mt15">
                                    <div className="pre_elem bg-fourth w80 h80 imgCercle">
                                    </div>
                                    <div className="c-s-s ml20">
                                        <div className="w150 p10 br10 pre_elem"></div>
                                        <div className="w100 mt15 p10 br10 pre_elem"></div>
                                    </div>
                                </div>
                            </div>
                            <div style={{ maxWidth: "600px" }} className='wmia mt50 c-s-s'>
                                <div className="wmia  h400  p10 mt20 br10 pre_elem"></div>
                                <div className="r-s-s mt15">
                                    <div className="pre_elem bg-fourth w80 h80 imgCercle">
                                    </div>
                                    <div className="c-s-s ml20">
                                        <div className="w150 p10 br10 pre_elem"></div>
                                        <div className="w100 mt15 p10 br10 pre_elem"></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        :
                        <>

                            {
                                personalPosts.posts.length == 0 ?
                                    <div className="wmia h200 c-c-c">
                                        <EmptyLottie />
                                        <p className='mt15'>You didn't share any post yet </p>
                                    </div>
                                    :
                                    personalPosts.posts.map(p => <Post postdata={p} key={p._id} />)
                            }
                        </>
                }
            </>

        )
    }
    const ShowPersonalBlogs = () => {
        const { personalBlogs } = useSelector(s => s.Profile);
        useEffect(() => {
            if (personalBlogs.blogs.length == 0) {
                di(GetPersonalBlogs());
            }
        }, []);
        return (
            <>

                {
                    personalBlogs.isLoadingBlogs ?
                        <div className="wmia c-c-c">
                            <div style={{ maxWidth: "600px" }} className='wmia c-s-s'>
                                <div className="wmia  h400  p10 mt20 br10 pre_elem"></div>
                                <div className="r-s-s mt15">
                                    <div className="pre_elem bg-fourth w80 h80 imgCercle">
                                    </div>
                                    <div className="c-s-s ml20">
                                        <div className="w150 p10 br10 pre_elem"></div>
                                        <div className="w100 mt15 p10 br10 pre_elem"></div>
                                    </div>
                                </div>
                            </div>
                            <div style={{ maxWidth: "600px" }} className='wmia mt50 c-s-s'>
                                <div className="wmia  h400  p10 mt20 br10 pre_elem"></div>
                                <div className="r-s-s mt15">
                                    <div className="pre_elem bg-fourth w80 h80 imgCercle">
                                    </div>
                                    <div className="c-s-s ml20">
                                        <div className="w150 p10 br10 pre_elem"></div>
                                        <div className="w100 mt15 p10 br10 pre_elem"></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        :
                        <>

                            {
                                personalBlogs.blogs.length == 0 ?
                                    <div className="wmia h200 c-c-c">
                                        <EmptyLottie />
                                        <p className='mt15'>You didn't share any post yet </p>
                                    </div>
                                    :
                                    personalBlogs.blogs.map(p => <Blog blog={p} key={p._id} />)
                            }
                        </>
                }
            </>

        )
    }
    const ShowPersonalReels = () => {
        const { personalReels } = useSelector(s => s.Profile);
        useEffect(() => {
            if (personalReels.reels.length == 0) {
                di(GetPersonalReels());
            }
        }, []);
        return (
            <>

                {
                    personalReels.isLoadingReels ?
                        <div className="wmia r-w-p-s">
                            <div style={{ maxWidth: "400px" }} className='wmia  c-s-s'>
                                <div className="wmia  h400  p10  br10 pre_elem"></div>
                            </div>
                            <div style={{ maxWidth: "400px" }} className='wmia   c-s-s'>
                                <div className="wmia  h400  p10  br10 pre_elem"></div>
                              
                            </div>
                            <div style={{ maxWidth: "400px" }} className='wmia   c-s-s'>
                                <div className="wmia  h400  p10  br10 pre_elem"></div>
                              
                            </div>
                        </div>

                        :
                        <>

                            {
                                personalReels.reels.length == 0 ?
                                    <div className="wmia h200 c-c-c">
                                        <EmptyLottie />
                                        <p className='mt15'>You didn't share any post yet </p>
                                    </div>
                                    :
                                    <div className="wmia r-w-p-s">
                                        {
                                            personalReels.reels.map((p, ind) =>
                                                <div key={p._id} onClick={() => di(open_scrollReels({ reels: personalReels.reels, target: ind }))} className="w300 h400 psr br10 overHdn m5">
                                                    <video muted onMouseEnter={e => { e.target.muted = false; e.target.play() }} onMouseLeave={e => { e.target.muted = true; e.target.pause() }} src={p.url} className='wmia hmia' style={{ objectFit: "cover" }}></video>
                                                    <div style={{ position: "absolute", bottom: "0", left: 0 }} className="wmia r-s-c z2">
                                                        <strong>
                                                            {p.comments_count}
                                                        </strong>
                                                    </div>
                                                </div>
                                            )
                                        }
                                    </div>
                            }
                        </>
                }
            </>

        )
    }


    return (
        <div className='c-s-c wmia hmia' >
            <ProfileHeader p={2} />
            <div className="r-s-s hmia mt10 wmia" style={{ maxHeight: "93%" }}>
                <div className="scrl_none wmia hmia c-s-c  " style={{ overflow: "auto" }}>
                    {
                        SectionOpened == 0 &&
                        <ShowPersonalPosts />
                    }
                    {
                        SectionOpened == 1 &&
                        <ShowPersonalReels />
                    }
                    {
                        SectionOpened == 2 &&
                        <ShowPersonalBlogs />
                    }
                </div>
                <div className=" br20 ml10  c-c-c">
                    <span onClick={() => setSectionOpen(0)} className='r-c-c mb20   w100  curP bg-rev-l  br5  border p10' >
                        <svg className='f-no  mr10' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width={32} height={32} strokeWidth={1.25}> <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path> <path d="M4 13h3l3 3h4l3 -3h3"></path> </svg>
                        Posts
                    </span>
                    <span onClick={() => setSectionOpen(1)} className='r-c-c mb20  w100  curP bg-rev-l   br5  border p10' >
                        <svg className='mr10' version="1.1" viewBox="0 0 2048 2048" xmlns="http://www.w3.org/2000/svg">
                            <path transform="translate(624,145)" d="m0 0h780l69 1 34 2 35 4 29 6 24 7 25 9 25 11 16 8 19 10 21 13 12 8 15 11 14 11 12 11 8 7 8 8 7 6 7 8 8 8 9 11 14 18 12 17 14 22 12 22 12 25 12 30 9 28 7 30 4 23 2 19 2 43 1 435v297l-1 146-2 45-3 26-8 38-7 25-8 23-10 24-13 27-11 19-12 19-10 15-13 17-9 10-9 11-25 25-8 7-13 11-15 12-17 12-25 15-16 9-23 11-13 6-37 13-21 6-33 7-26 4-22 2-42 2h-869l-39-2-34-4-32-7-31-9-26-10-33-15-22-12-19-12-17-12-18-14-14-12-10-9-5-5-9-8v-2l-3-1-7-8-14-15-11-14-10-13-17-26-15-26-15-31-10-26-11-34-6-27-5-33-2-24-1-19-1-62v-669l1-176 2-28 5-33 10-40 10-30 12-28 10-21 11-20 8-13 20-30 10-12 8-10 16-17 27-27 11-9 12-10 16-12 20-13 20-12 27-14 28-12 24-8 29-8 32-6 27-3 37-2zm101 146-1 2 36 54 32 49 14 22 22 34 10 16 10 15 18 28 13 20 32 48 6 6h329l-1-6-10-16-26-39-29-43-12-18-16-23-68-102-21-31-8-10-5-5-3-1-312 1 1 3-2-2v-2zm512 0-1 3 10 14 28 42 17 26 13 20 14 22 22 34 10 16 10 15 11 17 7 11 13 20 32 48 7 6h25l91 1h116l81-1 9-1 2-1v-12l-4-34-7-31-9-27-10-23-11-21-10-16-14-19-9-10-7-8-14-14-28-22-20-13-27-14-16-7-25-9-21-5-19-3-43-3-43-1-170 1 1 3-2-1v-2h-4v2h-3v-2l2-1zm-698 1-25 7-22 7-15 6-22 10-14 8-14 9-17 12-14 12-8 7-7 6-7 8-9 9-8 10-9 12-10 15-9 16-9 17-10 23-7 20-7 34-5 37v5l1 1 8 1 39 1h394l2-2-6-11-10-16-14-22-13-20-15-23-12-19-10-15-15-23-11-17-14-22-19-29-10-16-11-17-15-23-6-9-6-7zm1165 438-876 1h-535l-1 2-1 625 1 106 2 28 3 24 5 23 8 24 11 25 11 21 12 19 10 13 9 11 11 12 16 16 11 9 16 12 19 12 18 10 19 9 21 8 25 7 24 4 34 3 56 1h813l32-1 21-2 25-4 19-5 23-8 23-10 18-10 19-12 17-12 14-12 10-9 16-16 7-9 8-10 12-18 13-23 9-20 7-18 5-18 6-29 3-30 1-19v-730z" />
                            <path transform="translate(865,946)" d="m0 0h19l12 3 12 5 23 12 56 34 29 17 23 14 18 11 17 10 23 14 22 13 21 13 26 15 13 8 20 12 21 13 22 13 23 14 16 11 10 8 9 10 9 14 5 11 2 7 1 8v11l-3 16-5 12-10 15-9 10-11 9-25 16-24 14-23 14-110 66-22 13-28 17-29 17-40 24-13 8-35 21-17 9-15 5-11 2h-12l-16-3-13-5-11-7-12-11-8-10-8-17-3-14-1-9-1-41v-367l1-33 3-17 8-16 8-11 13-13 11-7 12-6zm85 210v179l5-1 16-8 21-12 26-15 24-14 13-8 18-10 19-10 9-5-2-4-24-15-19-12-47-29-21-13-19-12-18-11z" />
                            <path transform="translate(727,292)" d="m0 0h2v2h-2z" />
                            <path transform="translate(540,293)" d="m0 0" />
                        </svg>
                        Reels
                    </span>
                    <span onClick={() => setSectionOpen(2)} className='r-c-c  mb20 w100  curP bg-rev-l   br5  border p10' >
                        <svg className='f-no  mr10' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width={32} height={32} strokeWidth={1.25}> <path d="M3 4m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z"></path> <path d="M7 8h10"></path> <path d="M7 12h10"></path> <path d="M7 16h10"></path> </svg>
                        Blogs
                    </span>
                </div>
            </div>
        </div >
    )
}

export default Profile_Shares
