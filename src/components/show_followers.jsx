import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ReactDOM from 'react-dom'
import { motion } from 'framer-motion'
import { v_pop } from '../env';
import L_loader from './L_loader';
import User_ from './user_name';
import { _OnContainerClickOut } from './Abbreviator';
import { close_followers_cmp } from '../slices/viewUser';
import BtnClose from './btnClose';
import EmptyLottie from './emptyLottie';
import LastELementToGetMore from './LastELementToGetMore';
function Show_followers() {
    const { showFollowers, userData } = useSelector(s => s.ViewUser);
    const dispatch = useDispatch()
    let ListFollowerRef = useRef();
    return ReactDOM.createPortal(
        <div className='backendMer'
            onClick={e => _OnContainerClickOut(e, ListFollowerRef.current, () => dispatch(close_followers_cmp()))}
        >
            <motion.div
                ref={ListFollowerRef}
                animate={v_pop.visible}
                initial={v_pop.hidden}
                className="w400 psr p15 c-s-s br10 bg-l">
                {
                    showFollowers.isLoadingFriendFolloers ?
                        <div className="wmia h100 c-c-c">
                            <L_loader />
                        </div> :
                        <>
                            <BtnClose onClick={() => dispatch(close_followers_cmp())} />

                            <h1 className='mb15'>{userData.LastName} Followers</h1>
                            <div className="wmia scrl_none pl10 c-s-s mt10" style={{ maxHeight: "500px", overflow: "auto" }}>
                                {
                                    showFollowers.FriendFollowers.length == 0 ?
                                        <div className="wmia h200 c-c-c">
                                            <p>
                                                Looks like  {userData.LastName} doesn’t have any followers yet!
                                            </p>
                                            <EmptyLottie />
                                        </div>
                                        :
                                        showFollowers.FriendFollowers.map((u, i) => {
                                            if (i == showFollowers.FriendFollowers.length - 1) {
                                                return <LastELementToGetMore
                                                    otherParams={{ _id: userData._id }}
                                                    endPoint={"/users/get_friend_followers"}
                                                    ids={showFollowers.FriendFollowers.map(e => e._id)}
                                                    targetData={"FriendFollowers"}
                                                >
                                                    <User_ className={"wmia mb15   r-b-c "} btnFlClassName={'w150'} id={u._id} img_url={u.profile_img} key={u._id} name={`${u.FirstName} ${u.LastName}`} />
                                                </LastELementToGetMore>
                                            }

                                            return <User_ className={"wmia mb15   r-b-c "} btnFlClassName={'w150'} id={u._id} img_url={u.profile_img} key={u._id} name={`${u.FirstName} ${u.LastName}`} />
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

export default Show_followers
