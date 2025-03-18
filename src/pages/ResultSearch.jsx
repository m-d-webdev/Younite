import React, { useEffect, useState } from 'react'
import Blog from '../layouts/blog'
import { useDispatch, useSelector } from 'react-redux'
import L_loader from '.././components/L_loader'
import User_ from '../components/user_name';
import Post from '../components/post';
import Lottie from 'react-lottie';
import AnimDa from '../resources/Animation - 1739490460382.json'
import { open_scrollReels } from '../slices/ScrollReels';
function ResultSearch() {
    const { _id } = useSelector(s => s.User)
    const { isSearching, oldSerachs, resultSearchData } = useSelector(s => s.searchSlice)
    const [typeChoosed, setTypeChoosed] = useState("users")
    const [catChoosed, setcatChoosed] = useState([]);
    const di = useDispatch()
    useEffect(() => {
        const mostMs = Object.keys(resultSearchData).sort((a, b) => resultSearchData[b].length - resultSearchData[a].length)
        setTypeChoosed(mostMs[0]);
        setcatChoosed(resultSearchData[mostMs[0]]);

    }, [resultSearchData]);

    return (
        <div className='wmia c-c-c ' style={{ maxWidth: "800px" }}>
            <div
                style={{
                    position: "sticky",
                    top: "0"
                }}
                className="wmia z2 p10 bg-l r-p-c">
                <button
                    onClick={() => {
                        setcatChoosed(resultSearchData.users);
                        setTypeChoosed("users")
                    }}
                    className='w150  curP border br20 mr15'>
                    <svg className="f-no mr10 " xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width="32" height="32" strokeWidth="1">
                        <path d="M9 7m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0"></path>
                        <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"></path>
                        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                        <path d="M21 21v-2a4 4 0 0 0 -3 -3.85"></path>
                    </svg>
                    Users
                    <p className='ml5 op-7'>
                        {
                            resultSearchData.users?.length
                        }
                    </p>
                </button>
                <button
                    onClick={() => {
                        setcatChoosed(resultSearchData.posts)
                        setTypeChoosed("posts");
                    }
                    }
                    className='w150  curP border br20 mr15'>
                    <svg className="f-no mr10 " xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width="32" height="32" strokeWidth="1">
                        <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
                        <path d="M4 13h3l3 3h4l3 -3h3"></path>
                    </svg>
                    Posts
                    <p className='ml5 op-7'>
                        {
                            resultSearchData.posts?.length
                        }
                    </p>
                </button>
                <button
                    onClick={() => {
                        setcatChoosed(resultSearchData.reels)
                        setTypeChoosed("reels");
                    }
                    }
                    className='w150  curP border br20 mr15'>
                    Reels
                    <p className='ml5 op-7'>
                        {
                            resultSearchData.reels?.length
                        }
                    </p>
                </button>
                <button
                    onClick={() => { setcatChoosed(resultSearchData.blogs); setTypeChoosed("blogs") }}
                    className='w150  curP border br20 mr15'>
                    <svg className="f-no mr10 " xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width="32" height="32" strokeWidth="1">
                        <path d="M3 4m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z"></path>
                        <path d="M7 8h10"></path>
                        <path d="M7 12h10"></path>
                        <path d="M7 16h10"></path>
                    </svg>
                    Blogs
                    <p className='ml5 op-7'>
                        {
                            resultSearchData.blogs?.length
                        }
                    </p>
                </button>
            </div>
            <div className="mt15 r-w-p-s scrl_none wmia  p10 " style={{
                maxHeight: "100%",
                overflow: "auto"
            }}>

                {
                    isSearching ?

                        <div className="wmia h400 c-c-c">
                            <L_loader />
                            <p className='mt10'>Loking for results ..</p>
                        </div>

                        :
                        <>
                            {
                                catChoosed.length == 0 &&
                                <div className="wmia h400 c-c-c">
                                    <Lottie options={{
                                        loop: true,
                                        autoplay: true,
                                        animationData: AnimDa
                                    }} height={300} />
                                    <p className='mt10 fw900'>
                                        {typeChoosed}  :  No matches found for
                                    </p>
                                </div>
                            }
                            {
                                catChoosed.map((r, ind) => {
                                    if (typeChoosed == "users") {
                                        if (_id != r._id) return <User_ cntStyle={{ maxWidth: "500px" }} btnFlClassName={"w150 ml10 bl border r-c-c p7 "} id={r._id} img_url={r.profile_img} className={'wmia r-b-c mb50 '} name={`${r.FirstName}  ${r.LastName}`} nameStyle={{ fontWeight: 900 }} key={r._id} />
                                    } else if (typeChoosed == "posts") {
                                        return <Post postdata={r} key={r._id} />
                                    } else if (typeChoosed == "blogs") {
                                        return <Blog blog={r} key={r._id} />
                                    }
                                    else if (typeChoosed == "reels") {
                                        return <div key={r._id} onClick={() => di(open_scrollReels({ reels: resultSearchData.reels, target: ind }))} className="w300 h400 psr br10 overHdn m5">
                                            <video muted onMouseEnter={e => { e.target.muted = false; e.target.play() }} onMouseLeave={e => { e.target.muted = true; e.target.pause() }} src={r.url} className='wmia hmia' style={{ objectFit: "cover" }}></video>
                                        </div>
                                    }
                                })
                            }
                        </>
                }
            </div>
        </div>
    )
}

export default ResultSearch
