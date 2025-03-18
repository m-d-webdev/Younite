import React, { useState } from 'react'
import User_ from '../../components/user_name'
import { useDispatch, useSelector } from 'react-redux'
import { open_scrollReels } from '../../slices/ScrollReels';
import { Abbreviator_text, CorrectTime } from '../../components/Abbreviator';
import { open_ShowSharedPosts } from '../../slices/SahrePosSlice';

function SignleSharedMedia({ m }) {
    const { SharesFromFriendsObject, choosedFriend } = useSelector(s => s.SharePostReducer)
    const dispatch = useDispatch();

    const TypeReel = ({ reel }) => {
        const handelOpenReel = () => {
            const sharedReels = SharesFromFriendsObject[choosedFriend].media.filter(e => e.type == "reels").map(e => e.contentData)
            let i = 0;
            for (let index = 0; index < sharedReels.length; index++) {
                const element = sharedReels[index];
                if (element._id == reel._id) {
                    break;
                } else {
                    i++
                }

            }
            dispatch(open_scrollReels({ reels: sharedReels, target: i }))


        }
        return (
            <div onClick={handelOpenReel} className="bg-l p15 c-s-s wmia br10" style={{ maxWidth: "400px" }} >
                <User_ id={reel.authorId} date={reel.createAt} img_url={reel.author.profile_img} name={reel.author.FirstName + " " + reel.author.LastName} />
                <div className="wmia mt10 h200">
                    <video loop muted onMouseOver={e => e.target.play()} onMouseLeave={e => e.target.pause()} src={reel.url} className='wmia hmia' style={{ objectFit: "cover", objectPosition: "center" }}></video>
                </div>
            </div>
        )
    }

    const TypePost = ({ post }) => {

        return (
            <div className="bg-l p15 c-s-s wmia br10" style={{ maxWidth: "400px" }}>
                <User_ id={post.authorId} date={post.createdAt} img_url={post.author.profile_img} name={post.author.FirstName + " " + post.author.LastName} />
                {
                    post.image.length > 0 &&
                    <div onClick={() => dispatch(open_ShowSharedPosts(post._id))} className="wmia r-p-c mt10 h200">
                        {
                            post.image.map((a, i) => {
                                if (i < 2) {
                                    return <img src={a} key={a} className={`hmia ${post.image.length == 1 ? "wmia" : "wkhmsin"} `} style={{ objectFit: "cover", objectPosition: "top" }} />
                                }
                            })
                        }
                    </div>
                }
                <Abbreviator_text t={post.content} l={120} s='wmia op-8 mt10' />
            </div >
        )
    }



    const TypeBog = ({ blog }) => {
        const [IsShowedALl, setIsShowedALl] = useState(false)
        const HandelShowALl = () => {
            setIsShowedALl(true);
        }
        const HandelShowLess = () => {
            setIsShowedALl(false)
        }
        return (
            <>
            
                <div className="bg-l p15 c-s-s wmia br10" style={IsShowedALl ? { maxWidth: "100%" } : { maxWidth: "400px" }}>
                    <h1 className="fw900 fs-20">{blog.title}</h1>
                    <Abbreviator_text onFullText={HandelShowALl} onLessText={HandelShowLess} t={blog.content} l={520} s='wmia op-8 mt10' />
                    <User_ id={blog.author._id} date={blog.createAt} img_url={blog.author.profile_img} className={'mt50'} name={blog.author.FirstName + " " + blog.author.LastName} />
                </div >

            </>
        )
    }

    return (
        <div className={m.fromMe ? "wmia mb20 r-e-e" : "wmia mb20 r-s-e"}>
            {
                m.type == "reels" &&
                <TypeReel reel={m.contentData} />
            }
            {
                m.type == "posts" &&
                <>
                    <TypePost post={m.contentData} />
                   
                </>
            }
            {
                m.type == "blogs" &&
                <>
                    <TypeBog blog={m.contentData} />
                </>
            }

        </div>
    )
}

export default SignleSharedMedia
