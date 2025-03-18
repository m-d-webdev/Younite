import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ReactDOM from 'react-dom'
import { motion } from 'framer-motion'
import { v_pop } from '../../../env';
import L_loader from '../../../components/L_loader';
import User_ from '../../../components/user_name';
import { _OnContainerClickOut } from '../../../components/Abbreviator';
import BtnClose from '../../../components/btnClose';
import EmptyLottie from '../../../components/emptyLottie';
function Edit_followers({ onCLose }) {
    const { listFollowersToEdit, isLoadingFollowing } = useSelector(s => s.Profile);
    const dispatch = useDispatch();
    let ListFollowingsRef = useRef();
    const { followers    } = useSelector(s => s.User)
    const A_Follower = ({ u }) => {
        return <div className="wmia r-b-c mb15">
            <User_ className={"wmia     r-b-c "} btnFlClassName={'bl pt5 pb5 pl10 pr10'} id={u._id} img_url={u.profile_img} key={u._id} name={`${u.FirstName} ${u.LastName}`} />
        </div>
    }

    return (
        <div className='backendMer'
            onClick={e => _OnContainerClickOut(e, ListFollowingsRef.current, () => onCLose())}
        >
            <motion.div
                ref={ListFollowingsRef}
                animate={v_pop.visible}
                initial={v_pop.hidden}
                exit={v_pop.hidden}
                style={{ maxWidth: "550px" }}
                className="wmia psr p15 c-s-s br10 bg-l">
                {
                    isLoadingFollowing ?
                        <div className="wmia h100 c-c-c">
                            <L_loader />
                            <p className="mt10">loading followers </p>
                        </div> :
                        <>
                            <BtnClose onClick={() => onCLose()} />
                            <div className="wmia pb10 mb15 r-s-c" style={{ borderBottom: "solid 1px var(--border-color)" }}>
                                <h1 className=''>Your Followers</h1>
                                <strong className='wf900 ml10 fs18'>{followers.length}</strong>

                            </div>
                            <div className="wmia scrl_none pl10 c-s-s mt10" style={{ maxHeight: "600px", overflow: "auto" }}>
                                {
                                    listFollowersToEdit.length == 0 ?
                                        <div className="wmia h200 c-c-c">
                                            <p>
                                                Looks like  you have no followers yet
                                            </p>
                                            <EmptyLottie />
                                        </div>
                                        :
                                        listFollowersToEdit.map(u =>
                                            <A_Follower u={u} key={u._id} />
                                        )
                                }
                            </div>
                        </>

                }
            </motion.div>
        </div>
    )
}

export default Edit_followers
