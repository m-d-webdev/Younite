import React, { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Abbreviator_text } from './Abbreviator'

import { Post_menu } from "../slices/media/posts_menu"
import { AnimatePresence } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux'
import { open_zoomer } from '../slices/zoomer'
import Quick_coment from './quick_coment'
import User_ from './user_name'
import Interaction_area from './Interaction_area'
import { open_imgsSlider } from '../slices/ImgsSlider'
import Image from './Image'



const Post = React.forwardRef(({ postdata }, ref) => {
    const { isWorkinOnPhone } = useSelector(s => s.WindowSizeSlice);

    const dispatch = useDispatch()
    const [MenuPost_vsbl, setMenuPost_vsbl] = useState(false)
    const [num_cmnts, setnum_cmnts] = useState(postdata.comments_count)
    return (
        <div ref={ref} className={`wmia bg-l  mt20  c-s-s mb10 drop-shadow-sm ${isWorkinOnPhone ? "p5" : "p10"} br10  Post_element`} style={{ maxWidth: "700px" }}>
            <div className="PosterSection wmia r-b-c">
                <div className="r-s-c">
                    <User_ className={''} date={postdata.createdAt} id={postdata.authorId} img_url={postdata.author.profile_img} name={`${postdata.author.LastName} ${postdata.author.FirstName}`} />
                </div>
                <div className="r-e-c psr">
                    <AnimatePresence>
                        {MenuPost_vsbl &&
                            <Post_menu onClose={() => { setMenuPost_vsbl(false) }} />
                        }
                    </AnimatePresence>
                    <button onClick={() => setMenuPost_vsbl(!MenuPost_vsbl)} className='hoverEff2'>
                        <svg version="1.1" viewBox="0 0 2048 2048" width="128" height="128" xmlns="http://www.w3.org/2000/svg">
                            <path transform="translate(1723,724)" d="m0 0h46l29 3 29 6 21 7 22 9 27 14 17 11 14 10 13 11 11 9 18 18 9 11 10 13 10 15 11 19 8 16 9 19 10 29 3 10 3 9 3 3-1 7 1 4 2-1v117h-3v-4l-5 4-5 16-8 24-13 27-14 24-7 11-10 13-9 11-9 10-19 19-14 11-13 10-14 9-24 13-22 10-19 7-36 9-22 4-22 2h-32l-22-2-24-4-24-7-25-9-23-11-24-14-13-9-13-10-14-12-8-7v-2l-4-2v-2h-2l-7-8-12-14-14-19-10-16-13-25-7-15-12-34-6-25-3-21-1-11v-37l3-27 5-25 6-21 9-24 12-25 13-23 8-12 14-19 13-15 17-17 14-11 15-11 20-13 22-12 15-7 22-8 21-6 20-4zm8 122-20 3-21 5-15 6-16 9-12 8-16 12-14 13-13 17-12 19-8 16-6 20-6 26-2 12v24l6 31 7 24 8 16 13 20 11 14 9 10 14 11 18 13 18 10 12 5 28 7 24 4h20l43-9 18-6 19-10 18-13 11-9 12-11 7-9 11-15 8-13 7-15 6-20 6-37v-24l-6-33-5-17-5-12-9-17-11-16-8-10-9-10-13-11-13-9-19-11-15-7-15-4-28-6-7-1z" />
                            <path transform="translate(1e3 724)" d="m0 0h44l30 3 25 5 30 10 23 10 22 12 22 14 18 14 13 11 19 19 9 11 11 14 9 13 13 22 12 25 8 21 8 29 4 20 3 23v47l-3 25-6 26-7 24-9 21-11 23-10 17-10 15-9 12-9 11-12 13-8 8h-2v2l-10 8-12 10-16 11-21 12-17 9-23 10-20 6-32 8-27 4-13 1h-33l-29-3-16-3-26-8-21-7-25-12-21-12-16-11-16-12-11-10-8-7-8-8v-2h-2l-9-11-13-16-13-19-13-24-10-21-9-23-7-25-4-19-3-27v-35l4-35 5-22 8-26 8-20 10-21 14-24 11-16 8-10 9-10 10-12 8-7 8-8 11-9 13-10 15-10 25-14 19-9 25-9 23-6 15-3 15-2zm6 122-19 3-17 4-19 7-16 9-12 8-12 9-10 9-11 11-9 11-12 19-8 15-6 18-7 28-2 12-1 15 2 19 7 32 6 18 8 16 8 12 10 14 9 11 7 7 14 11 12 8 11 7 15 8 15 5 26 6 18 3h22l28-6 17-4 14-5 21-11 15-10 14-11 13-13 10-13 13-20 7-14 5-16 8-38 1-7v-14l-2-15-3-17-6-25-9-21-11-18-9-12-12-14-10-9-15-11-15-9-17-9-20-6-28-6-8-1z" />
                            <path transform="translate(276,724)" d="m0 0h44l30 3 25 5 33 11 18 8 22 12 15 9 17 12 12 10 11 9 18 18 9 11 12 15 10 15 10 17 10 19 11 27 7 24 5 23 4 30 1 13v14l-2 26-5 30-6 24-8 23-9 20-10 19-12 19-7 10-11 15-12 14-15 15-10 8-9 8-15 10-18 11-16 9-21 10-22 8-35 9-23 4-20 2h-36l-22-2-22-4-27-8-22-8-27-13-20-12-17-12-10-8-12-11-8-7-10-10-7-8-11-13-13-18-12-20-12-23-8-19-8-24v-2l-2-1-2-12h-2l-2-6-2-3v-118h2v6l1-5h2l3-12 10-29 11-26 12-22 10-17 8-11 11-14 9-10 7-8 14-14 10-8 12-10 21-14 18-10 16-8 16-7 28-9 22-5 21-3zm6 122-24 4-21 6-25 12-13 9-12 9-10 9-11 11-10 13-10 15-9 17-9 27-5 25-1 7v25l4 24 4 17 5 14 8 16 7 12 11 16 9 11 9 9 13 10 21 14 17 9 19 6 28 6 13 2h19l31-6 17-4 16-6 18-10 16-11 14-11 5-4v-2l3-1 10-13 14-21 10-16 5-16 8-38 1-7v-18l-3-21-6-27-7-20-8-15-12-18-9-11-9-10-13-11-18-12-22-12-18-6-26-6-14-2z" />
                            <path transform="translate(2046,948)" d="m0 0h2l-1 4z" />
                            <path transform="translate(2046,1095)" d="m0 0 2 1z" />
                            <path transform="translate(2047,963)" d="m0 0" />
                        </svg>
                    </button>
                </div>
            </div>
            {
                (postdata.content || postdata.title) &&
                <div className="postDescriptionSection c-s-s mt20 p10 " >
                    <strong style={{ fontSize: "16px" }} className='mb5 fw900'>{postdata.title}</strong>
                    {
                        postdata.content &&
                        <>
                            {
                                postdata.image.length == 0 ?
                                    <div className="  bg- br20">
                                        <Abbreviator_text t={postdata.content} l={1500} s='fw600 ml10 mt10 c-d' />
                                    </div>
                                    :
                                    <Abbreviator_text t={postdata.content} l={100} s='fw600 mt5   c-d' />
                            }

                        </>
                    }
                </div>
            }
            {
                postdata.image &&
                <>
                    {
                        postdata.image.length > 2 ?
                            <>
                                {
                                    postdata.image.length == 3 ?
                                        <div className={`PostImgsSection r-p-c wmia  mt10 psr  threeImgs`}>
                                            <div className="c-c-c wkhmsin hmia">
                                                <Image loading='lazy' src={postdata.image[0]} onClick={() => { dispatch(open_zoomer(postdata.image[0])) }} className='wmia hmia br10' alt="" />
                                            </div>
                                            <div className="c-b-c wkhmsin hmia ">
                                                <div className="c-c-c h-49% wmia">

                                                    <Image loading='lazy' onClick={() => { dispatch(open_zoomer(postdata.image[1])) }} src={postdata.image[1]} className='wmia hmia br10' alt="" />
                                                </div>
                                                <div className="c-c-c h-49% wmia">
                                                    <Image loading='lazy' onClick={() => { dispatch(open_zoomer(postdata.image[2])) }} src={postdata.image[2]} className='wmia hmia br10' alt="" />
                                                </div>
                                            </div>
                                        </div>
                                        :
                                        <div className={`PostImgsSection r-p-c  wmia  mt10 psr threeImgs`}>
                                            <div className="c-c-c wkhmsin hmia">
                                                <Image loading='lazy' src={postdata.image[0]} onClick={() => { dispatch(open_zoomer(postdata.image[0])) }} className='wmia hmia br10' alt="" />
                                            </div>
                                            <div className="c-p-c wkhmsin hmia psr cntTwo_secondimgs">
                                                <div className="c-c-c wmia h-[48%]">
                                                    <Image loading='lazy' src={postdata.image[1]} onClick={() => { dispatch(open_zoomer(postdata.image[1])) }} className='wmia  hmia br10' alt="" />
                                                </div>
                                                <div onClick={() => dispatch(open_imgsSlider(postdata.image.filter((e, index) => index > 1)))} className="c-c-c psr hkhmsin overHdn br10 CNTMorethanCount wmia">
                                                    <Image loading='lazy' src={postdata.image[2]} className='wmia br10' alt="" />
                                                    <p className='MorethanCount'> + {postdata.image.length - 2}</p>
                                                </div>
                                            </div>
                                        </div>
                                }
                            </>
                            :
                            <div className={`PostImgsSection bg-third wmia  mt10 psr ${postdata.image.length == 2 ? `TwoImgs c-c-c` : " r-p-c"}`}>
                                {postdata.image.map(i =>
                                    <div className={`c-c-c wmia `}>
                                        <Image src={i} key={i} onClick={() => { dispatch(open_zoomer(i)) }} className=' br10' alt="" style={{ maxWidth: "100%" ,objectPosition:"top" }} />
                                    </div>
                                )}
                            </div>
                    }
                </>
            }
            {
                useMemo(() =>
                    <Interaction_area
                        ownerId={postdata.authorId}
                        itemId={postdata._id}
                        collection={"posts"}
                        className={'mt20 interactionPostStyle  br10 r-s-c'}
                        interaction={{
                            likes: postdata.likes,
                            comments: num_cmnts,
                            shares: 164492
                        }}
                    />
                    , [])
            }
            {
                useMemo(() =>
                    <Quick_coment ownerId={postdata.authorId} articleId={postdata._id} collection_ref={'posts'} className={"mt20"} onCmntAdded={() => setnum_cmnts(num_cmnts + 1)} />
                    , [])
            }
        </div>
    )
})

export default Post
