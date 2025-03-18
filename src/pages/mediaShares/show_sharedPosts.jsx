import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ReactDOM from 'react-dom'
import { motion } from 'framer-motion'
import { v_pop } from '../../env';
import { _OnContainerClickOut } from '../../components/Abbreviator';
import BtnClose from '../../components/btnClose';
import Post from '../../components/post';
import { close_ShowSharedPosts } from '../../slices/SahrePosSlice';
function Show_sharedPosts() {
    const { SharesFromFriendsObject, choosedFriend, targetPost } = useSelector(s => s.SharePostReducer)
    const dispatch = useDispatch();
    const postRef = useRef();
    let ListPostsRef = useRef();
    const posts = SharesFromFriendsObject[choosedFriend]?.media.filter(e => e.type == "posts").map(e => e.contentData);
    useEffect(() => {
        postRef.current?.scrollIntoView({
            bevavior: "smooth",
            block: "start",
        })
    }, [])

    return ReactDOM.createPortal(
        <div className='backendMer'
            onClick={e => _OnContainerClickOut(e, ListPostsRef.current, () => dispatch(close_ShowSharedPosts()))}
        >
            <motion.div
                ref={ListPostsRef}
                animate={v_pop.visible}
                initial={v_pop.hidden}
                className="w700 psr   c-s-s br10 bg-l"
                style={{ maxHeight: "100%", paddingTop: "40px" }}
            >

                <BtnClose onClick={() =>  dispatch(close_ShowSharedPosts())} />
                <div className="wmia scrl_none  p10 c-s-s " style={{ maxHeight: "100%", overflow: "auto" }}>
                    {
                        posts.map(u => {
                            if (u._id == targetPost) {
                                return <Post ref={postRef} key={u._id + "_" + Math.random() * 45} postdata={u} />
                            }
                            return <Post key={u._id + "_" + Math.random() * 45} postdata={u} />
                        }
                        )
                    }
                </div>

            </motion.div>
        </div>,
        document.getElementById("portals")
    )
}

export default Show_sharedPosts
