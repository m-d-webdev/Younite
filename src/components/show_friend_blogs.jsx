import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ReactDOM from 'react-dom'
import { motion } from 'framer-motion'
import { v_pop } from '../env';
import L_loader from './L_loader';
import { _OnContainerClickOut } from './Abbreviator';
import { close_Show_blogs_cmp } from '../slices/viewUser';
import BtnClose from './btnClose';
import BlogCmp from '../layouts/blog'
import EmptyLottie from './emptyLottie';
import LastELementToGetMore from './LastELementToGetMore';

function Show_Freind_blogs() {
    const { showBlogs, userData } = useSelector(s => s.ViewUser);
    const dispatch = useDispatch();
    let ListBlogsRef = useRef();
    return ReactDOM.createPortal(
        <div className='backendMer'
            onClick={e => _OnContainerClickOut(e, ListBlogsRef.current, () => dispatch(close_Show_blogs_cmp()))}
        >
            <motion.div
                ref={ListBlogsRef}
                animate={v_pop.visible}
                initial={v_pop.hidden}
                className="w700 psr  c-s-s br10 bg-l">
                {
                    showBlogs.isLoainfBlogs ?
                        <div className="wmia h100 c-c-c">
                            <L_loader />
                        </div> :
                        <>

                            <BtnClose onClick={() => dispatch(close_Show_blogs_cmp())} />

                            <span
                                style={{
                                    borderBottom: "solid 1px var(--border-color)"
                                }}
                                className="wmia p10  r-s-c">
                                <h1 className='mr5 fw900'>{userData.LastName} </h1>
                                Blogs
                            </span>

                            <div className="wmia scrl_none  c-s-s " style={{ maxHeight: "800px", overflow: "auto" }}>

                                {
                                    showBlogs.foundBlogs.length == 0 ?
                                        <div className="wmia h200 c-c-c">
                                            <p>
                                                {userData.LastName} hasn't shared any blogs so far
                                            </p>
                                            <EmptyLottie />
                                        </div>
                                        :
                                        showBlogs.foundBlogs.map((u, i) => {
                                            if (i == showBlogs.foundBlogs.length - 1) {

                                                return <LastELementToGetMore
                                                    endPoint={"/users/get_friend_blogs"}
                                                    ids={showBlogs.foundBlogs.map(e => e._id)}
                                                    targetData={"showBlogs.foundBlogs"}
                                                    otherParams={{ _id: userData._id }}
                                                >
                                                    <BlogCmp blog={u} key={u._id} />
                                                </LastELementToGetMore>
                                            }
                                            return <BlogCmp blog={u} key={u._id} />
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

export default Show_Freind_blogs
