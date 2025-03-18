import React, { useEffect, useMemo, useRef, useState } from 'react'
import { _onClickOut, Abbreviator_text } from '../components/Abbreviator'
import Quick_coment from '../components/quick_coment'
import User_ from '../components/user_name'
import Interaction_area from '../components/Interaction_area'
import { Post_menu } from '../slices/media/posts_menu'
import { AnimatePresence } from 'framer-motion'
import { useDispatch } from 'react-redux'
const blog = React.forwardRef(({ blog }, ref) => {
    const textareRef = useRef();
    const blog_menuRef = useRef();
    const [PostMenu_visibl, setPostMenu_visibl] = useState(false)
    const [num_cmnts, setnum_cmnts] = useState(blog.comments_count)
    const dispatch = useDispatch()
    useEffect(() => {
        if (textareRef.current)
            textareRef.current.style.height = "auto";
        textareRef.current.style.height = `${textareRef.current.scrollHeight}px`;
    }, [])

    return (
        <div ref={ref} className='mt50 wmia psr bg-l br20 p10 c-s-s ' style={{  maxWidth: "1000px" }}>
            <div className="wmia r-b-c">
                <h1 className='mt10 pb10 ml10 r-s-c'
                    style={{
                        fontSize: "20px ",
                        borderBottom: "solid 1px var(--border-color)"
                        , fontFamily: '"Inter", serif'
                    }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className='mr20' viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="m360-313 167-167-167-167-167 167 167 167Zm0 113L80-480l280-280 240 240h280v80H600L360-200Zm0-280Z" /></svg>
                    {blog.title}
                </h1>
                <div className="psr r-s-e">
                    <button className='hoverEff2 ' onClick={() => setPostMenu_visibl(true)}>
                        <svg version="1.1" viewBox="0 0 2048 2048" xmlns="http://www.w3.org/2000/svg">
                            <path transform="translate(1723,724)" d="m0 0h46l29 3 29 6 21 7 22 9 27 14 17 11 14 10 13 11 11 9 18 18 9 11 10 13 10 15 11 19 8 16 9 19 10 29 3 10 3 9 3 3-1 7 1 4 2-1v117h-3v-4l-5 4-5 16-8 24-13 27-14 24-7 11-10 13-9 11-9 10-19 19-14 11-13 10-14 9-24 13-22 10-19 7-36 9-22 4-22 2h-32l-22-2-24-4-24-7-25-9-23-11-24-14-13-9-13-10-14-12-8-7v-2l-4-2v-2h-2l-7-8-12-14-14-19-10-16-13-25-7-15-12-34-6-25-3-21-1-11v-37l3-27 5-25 6-21 9-24 12-25 13-23 8-12 14-19 13-15 17-17 14-11 15-11 20-13 22-12 15-7 22-8 21-6 20-4zm8 122-20 3-21 5-15 6-16 9-12 8-16 12-14 13-13 17-12 19-8 16-6 20-6 26-2 12v24l6 31 7 24 8 16 13 20 11 14 9 10 14 11 18 13 18 10 12 5 28 7 24 4h20l43-9 18-6 19-10 18-13 11-9 12-11 7-9 11-15 8-13 7-15 6-20 6-37v-24l-6-33-5-17-5-12-9-17-11-16-8-10-9-10-13-11-13-9-19-11-15-7-15-4-28-6-7-1z" />
                            <path transform="translate(1e3 724)" d="m0 0h44l30 3 25 5 30 10 23 10 22 12 22 14 18 14 13 11 19 19 9 11 11 14 9 13 13 22 12 25 8 21 8 29 4 20 3 23v47l-3 25-6 26-7 24-9 21-11 23-10 17-10 15-9 12-9 11-12 13-8 8h-2v2l-10 8-12 10-16 11-21 12-17 9-23 10-20 6-32 8-27 4-13 1h-33l-29-3-16-3-26-8-21-7-25-12-21-12-16-11-16-12-11-10-8-7-8-8v-2h-2l-9-11-13-16-13-19-13-24-10-21-9-23-7-25-4-19-3-27v-35l4-35 5-22 8-26 8-20 10-21 14-24 11-16 8-10 9-10 10-12 8-7 8-8 11-9 13-10 15-10 25-14 19-9 25-9 23-6 15-3 15-2zm6 122-19 3-17 4-19 7-16 9-12 8-12 9-10 9-11 11-9 11-12 19-8 15-6 18-7 28-2 12-1 15 2 19 7 32 6 18 8 16 8 12 10 14 9 11 7 7 14 11 12 8 11 7 15 8 15 5 26 6 18 3h22l28-6 17-4 14-5 21-11 15-10 14-11 13-13 10-13 13-20 7-14 5-16 8-38 1-7v-14l-2-15-3-17-6-25-9-21-11-18-9-12-12-14-10-9-15-11-15-9-17-9-20-6-28-6-8-1z" />
                            <path transform="translate(276,724)" d="m0 0h44l30 3 25 5 33 11 18 8 22 12 15 9 17 12 12 10 11 9 18 18 9 11 12 15 10 15 10 17 10 19 11 27 7 24 5 23 4 30 1 13v14l-2 26-5 30-6 24-8 23-9 20-10 19-12 19-7 10-11 15-12 14-15 15-10 8-9 8-15 10-18 11-16 9-21 10-22 8-35 9-23 4-20 2h-36l-22-2-22-4-27-8-22-8-27-13-20-12-17-12-10-8-12-11-8-7-10-10-7-8-11-13-13-18-12-20-12-23-8-19-8-24v-2l-2-1-2-12h-2l-2-6-2-3v-118h2v6l1-5h2l3-12 10-29 11-26 12-22 10-17 8-11 11-14 9-10 7-8 14-14 10-8 12-10 21-14 18-10 16-8 16-7 28-9 22-5 21-3zm6 122-24 4-21 6-25 12-13 9-12 9-10 9-11 11-10 13-10 15-9 17-9 27-5 25-1 7v25l4 24 4 17 5 14 8 16 7 12 11 16 9 11 9 9 13 10 21 14 17 9 19 6 28 6 13 2h19l31-6 17-4 16-6 18-10 16-11 14-11 5-4v-2l3-1 10-13 14-21 10-16 5-16 8-38 1-7v-18l-3-21-6-27-7-20-8-15-12-18-9-11-9-10-13-11-18-12-22-12-18-6-26-6-14-2z" />
                            <path transform="translate(2046,948)" d="m0 0h2l-1 4z" />
                            <path transform="translate(2046,1095)" d="m0 0 2 1z" />
                            <path transform="translate(2047,963)" d="m0 0" />
                        </svg>
                    </button>
                    <AnimatePresence>
                        {
                            PostMenu_visibl &&
                            <Post_menu onClose={() => setPostMenu_visibl(false)} />
                        }
                    </AnimatePresence>
                </div>
            </div>
            {
                blog.content &&
                <textarea
                    readOnly
                    value={blog.content}
                    ref={textareRef}
                    className='mt15 wmia '
                    style={{
                        resize: "none",
                        // minWidth: "100%",
                        overflow: "hidden",
                        height: "auto",
                        border: "none",
                        fontSize: "15px",
                        lineHeight: "1.5",
                    }}
                >
                </textarea>
            }
            <div className="interation_blog p10 mt50 wmia r-b-c">
                <User_ id={blog.author._id} img_url={blog.author.profile_img} name={`${blog.author.FirstName}  ${blog.author.LastName}`} date={blog.createdAt} />
                {
                    useMemo(() =>
                        <Interaction_area
                            ownerId={blog.author._id}
                            itemId={blog._id}
                            collection={"blogs"}
                            className={'r-c-c'}
                            interaction={{
                                likes: blog.likes,
                                comments: num_cmnts,
                                shares: 87985,
                            }} />
                        , [])
                }
            </div>
            <Quick_coment ownerId={blog.author._id} articleId={blog._id} collection_ref={"blogs"} onCmntAdded={() => setnum_cmnts(num_cmnts + 1)} />
        </div>
    )
})

export default blog
