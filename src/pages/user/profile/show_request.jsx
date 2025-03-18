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
import Btn_addToContact from '../../../components/btn_addToContact';
import { BlockUser } from '../../../slices/userSlice';
function Edit_requests({ onCLose }) {
    const { blockedList } = useSelector(s => s.User)
    const { listRequests, isLoadingFollowing } = useSelector(s => s.Profile);
    const dispatch = useDispatch();
    let ListFollowingsRef = useRef();

    const A_request = ({ u }) => {
        return <div className="wmia r-b-c mb15">
            <User_ className={"wmia     r-s-s"} btnFlClassName={'op-7'} id={u._id} img_url={u.profile_img} key={u._id} name={`${u.FirstName} ${u.LastName}`} />
            <div className='r-p-c '>
                <Btn_addToContact className={'w100 mr10'} contactId={u._id} />
                <button className='bg-r ' onClick={() => dispatch(BlockUser(u._id))}>
                    <svg className='f-rl curP mr10' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q54 0 104-17.5t92-50.5L228-676q-33 42-50.5 92T160-480q0 134 93 227t227 93Zm252-124q33-42 50.5-92T800-480q0-134-93-227t-227-93q-54 0-104 17.5T284-732l448 448Z" /></svg>
                    restrict
                </button>
            </div>
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
                style={{ maxWidth: "650px" }}
                className="wmia psr p15 c-s-s br10 bg-l">
                {
                    isLoadingFollowing ?
                        <div className="wmia h100 c-c-c">
                            <L_loader />
                        </div> :
                        <>
                            <BtnClose onClick={() => onCLose()} />
                            <div className="wmia pb10 mb15 r-s-c" style={{ borderBottom: "solid 1px var(--border-color)" }}>
                                <h1 className=''>Your Contact request</h1>
                                <strong className='wf900 ml10 fs18'>{listRequests.length}</strong>

                            </div>
                            <div className="wmia scrl_none pl10 c-s-s mt10" style={{ maxHeight: "600px", overflow: "auto" }}>
                                {
                                    listRequests.length == 0 ?
                                        <div className="wmia h200 c-c-c">
                                            <p>
                                                No contact request yet
                                            </p>
                                            <EmptyLottie />
                                        </div>
                                        :
                                        listRequests.map(u =>
                                            <A_request u={u} key={u._id} />
                                        )
                                }
                            </div>
                        </>

                }
            </motion.div>
        </div>
    )
}

export default Edit_requests
