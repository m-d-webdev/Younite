import React, { useEffect, useState, useRef, useMemo } from 'react'
import ReactDOM from 'react-dom'
import { useDispatch, useSelector } from 'react-redux'
import Sound_mut from '../components/sound_mut';
import { _OnContainerClickOut, Abbreviator_text } from '../components/Abbreviator';
import L_loader from '../components/L_loader';
import { open_zoomer } from '../slices/zoomer';
import { close_page_check } from '../slices/CheckNotif';
import { open_imgsSlider } from '../slices/ImgsSlider'
import User_ from '../components/user_name'
import { BringViewUserData } from '../slices/viewUser';
import { BringComments } from '../slices/comments';
import { BringReplies } from '../slices/media/replies';
import Post from '../components/post'
import Reel from '../layouts/reel';
import Blog from '../layouts/blog'
function Check_notification() {
    const dispatch = useDispatch()

    const { isVisible, notificationBody, contentBody, targetReplay, contentComents, isLoading, targetComent } = useSelector(s => s.CheckNotReducer);
    const { profile_img, FirstName, LastName } = useSelector(s => s.User)
    const MainRef = useRef()

    const ContentPage = () => {
        if (notificationBody.content_type == 'reels' || (notificationBody.content_type == 'comments' && targetComent.collection_ref == 'reels') || (notificationBody.content_type == 'replay' && targetComent.collection_ref == 'reels')) {
            return <div className="bg-l br10 p10 scrl_none hmia c-s-c" style={{ overflow: "auto", width: "450px" }}>
                <Reel reel={contentBody} h={'100%'} />
            </div>
        }
        else if (notificationBody.content_type == 'posts' || notificationBody.content_type == 'post' || (notificationBody.content_type == 'comments' && targetComent.collection_ref == 'posts') || (notificationBody.content_type == 'replay' && targetComent.collection_ref == 'posts')) {
            return <div className="bg-l br10 p10 scrl_none hmia c-s-c" style={{ overflow: "auto", width: "600px" }}>
                <Post postdata={contentBody} />
            </div>
        }
        else if (notificationBody.content_type == 'blogs' || (notificationBody.content_type == 'comments' && targetComent.collection_ref == 'blogs') || (notificationBody.content_type == 'replay' && targetComent.collection_ref == 'blogs')) {
            return <div className="bg-l br10 p10 scrl_none hmia c-s-c" style={{ overflow: "auto", width: "700px" }}>
                <Blog blog={contentBody} />
            </div>
        }

    }


    return ReactDOM.createPortal(
        <div className='backendMer'
            onClick={e => _OnContainerClickOut(e, MainRef.current, () => dispatch(close_page_check()))}
        >
            <div ref={MainRef} className="r-w-p-s hmia  " style={{ maxHeight: "800px"}}>
                {
                    isLoading ?
                        <div className="wima hmia c-c-c">
                            <L_loader />
                        </div>
                        :
                        <>
                            <ContentPage />
                        </>
                }

                {
                    notificationBody?.type != "new" &&
                    <div className=" bg-l ml10 br10 p10  c-s-s" style={{ overflow: "auto", maxWidth: "600px" }}>
                        {
                            isLoading ?
                                <div className="wima hmia c-c-c">
                                    <L_loader />
                                </div>
                                :
                                <>

                                    <div className="wmia c-c-c h200">
                                        <img onClick={() => dispatch(BringViewUserData(notificationBody.senderId))} src={notificationBody.sender.profile_img} className='w100 h100 imgCercle' alt="" />
                                        <h1 className='mt10 fw900'>{notificationBody.message}</h1>

                                    </div>

                                    {
                                        targetComent &&
                                        <>

                                            <div className="wmia mt10 p10 c-s-s">
                                                {
                                                    notificationBody.type == "comment" ?
                                                        <User_ id={notificationBody.senderId} img_url={notificationBody.sender.profile_img} name={notificationBody.sender.FirstName + " " + notificationBody.sender.LastName} date={notificationBody.createAt} />
                                                        :
                                                        <User_ id={targetComent.authorId} img_url={profile_img} name={FirstName + " " + LastName} date={targetComent.createAt} />
                                                }
                                                <pre
                                                    style={{
                                                        wordWrap: "break-word",
                                                        whiteSpace: "wrap"
                                                    }}
                                                    className='c-d mt10 ml15'>
                                                    {
                                                        targetComent.content
                                                    }
                                                </pre>

                                            </div>
                                            {
                                                targetReplay &&
                                                <>
                                                    <svg className='ml20' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="m560-120-57-57 144-143H200v-480h80v400h367L503-544l56-57 241 241-240 240Z" /></svg>
                                                    <div className="wmia c-s-s mt10 p10 ml20 pl20">


                                                        <User_ id={notificationBody.senderId} img_url={notificationBody.sender.profile_img} name={notificationBody.sender.FirstName + " " + notificationBody.sender.LastName} date={targetReplay.createAt} />
                                                        <pre
                                                            style={{
                                                                wordWrap: "break-word",
                                                                whiteSpace: "wrap"
                                                            }}
                                                            className='c-d mt10 ml15'>
                                                            {
                                                                targetReplay.content
                                                            }
                                                        </pre>
                                                    </div>

                                                    <button onClick={() => dispatch(BringReplies({ ...targetComent, author: { profile_img, FirstName, LastName } }))}>See all replays </button>
                                                </>
                                            }








                                            <button
                                                onClick={() => dispatch(BringComments({
                                                    articleId: targetComent.articleId,
                                                    collection_ref: targetComent.collection_ref,
                                                }))}
                                                className='wmia mt20 bl curP p10'>
                                                Load all comments
                                                <svg className='ml10 ' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="m216-160-56-56 464-464H360v-80h400v400h-80v-264L216-160Z" /></svg>
                                            </button>

                                        </>
                                    }
                                </>

                        }
                    </div>
                }
                
            </div>
        </div>,
        document.getElementById('portals')
    )
}

export default Check_notification
