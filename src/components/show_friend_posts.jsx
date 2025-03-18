import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ReactDOM from 'react-dom'
import { motion } from 'framer-motion'
import { v_pop } from '../env';
import L_loader from './L_loader';
import User_ from './user_name';
import { _OnContainerClickOut } from './Abbreviator';
import { close_ShowPosts_cmp } from '../slices/viewUser';
import BtnClose from './btnClose';
import Post from './post';
import EmptyLottie from './emptyLottie';
import LastELementToGetMore from './LastELementToGetMore';
function Show_Freind_posts() {
    const { showPosts, userData } = useSelector(s => s.ViewUser);
    const dispatch = useDispatch()
    let ListPostsRef = useRef();
    return ReactDOM.createPortal(
        <div className='backendMer'
            onClick={e => _OnContainerClickOut(e, ListPostsRef.current, () => dispatch(close_ShowPosts_cmp()))}
        >
            <motion.div
                ref={ListPostsRef}
                animate={v_pop.visible}
                initial={v_pop.hidden}
                className="w600 psr  c-s-s br10 bg-l">
                {
                    showPosts.isLoainfPosts ?
                        <div className="wmia h100 c-c-c">
                            <L_loader />
                        </div> :
                        <>
                            <BtnClose onClick={() => dispatch(close_ShowPosts_cmp())} />
                            <span
                                style={{
                                    borderBottom: "solid 1px var(--border-color)"
                                }}
                                className="wmia p10  r-s-c">
                                <h1 className='mr5 fw900'>{userData.LastName} </h1>
                                Posts
                            </span>
                            <div className="wmia scrl_none  p10 c-s-s " style={{ maxHeight: "800px", overflow: "auto" }}>

                                {
                                    showPosts.foundPosts.length == 0 ?
                                        <div className="wmia h200 c-c-c">
                                            <p>
                                                {userData.LastName} hasn't shared any posts so far
                                            </p>
                                            <EmptyLottie />
                                        </div>
                                        :
                                        showPosts.foundPosts.map((u, i) => {
                                            if (i == showPosts.foundPosts.length - 1) {
                                                return <LastELementToGetMore
                                                    endPoint={'/users/get_friend_posts'}
                                                    ids={showPosts.foundPosts.map(e => e._id)}
                                                    targetData={'showPosts-foundPosts'}
                                                    key={u._id}
                                                    otherParams={{ _id: userData._id }}
                                                >

                                                    <Post postdata={u} />
                                                </LastELementToGetMore>

                                            }
                                            return <Post key={u._id} postdata={u} />
                                        }
                                        )
                                }
                            </div>
                        </>

                }
            </motion.div>
        </div>,
        document.getElementById("portals")
    )
}

export default Show_Freind_posts
