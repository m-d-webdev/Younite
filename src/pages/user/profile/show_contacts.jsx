import { useState, useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ReactDOM from 'react-dom'
import { motion } from 'framer-motion'
import { v_pop } from '../../../env';
import L_loader from '../../../components/L_loader';
import User_ from '../../../components/user_name';
import { _onClickOut, _OnContainerClickOut } from '../../../components/Abbreviator';
import BtnClose from '../../../components/btnClose';
import EmptyLottie from '../../../components/emptyLottie';
import Contact_menu from '../../../components/Contact_menu';
function Edit_contacts({ onCLose }) {
    const { blockedList } = useSelector(s => s.User)
    const { listContactsToEdit, isLoadingFollowing } = useSelector(s => s.Profile);
    const dispatch = useDispatch();
    let ListFollowingsRef = useRef();


    const A_contact = ({ u }) => {
        const [menuVsblt, setmenuVsblt] = useState(false);
        const [isBlocked, setisBlcked] = useState(blockedList.some(b => b.Blocked_person == u._id));
        let MenuRef = useRef();
        console.log(isBlocked);

        useEffect(() => {
            if (MenuRef.current) {
                _onClickOut(MenuRef.current, () => setmenuVsblt(false));
            }
        }, [menuVsblt]);
        return <div className={`wmia psr p10 br10  r-b-c mb15 ${isBlocked ? "disabled" : ""} `}>
            <User_ className={"wmia r-s-s  "} btnFlClassName={'hoverEff2 fs12'} id={u._id} img_url={u.profile_img} key={u._id} name={`${u.FirstName} ${u.LastName}`} />
            <div className="c-c-c psr">
                <button onClick={() => setmenuVsblt(true)} className=' curP border'>
                    <svg style={{ fill: "none" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width={32} height={32} strokeWidth={1.25}> <path d="M14 4h6v6h-6z"></path> <path d="M4 14h6v6h-6z"></path> <path d="M17 17m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path> <path d="M7 7m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path> </svg>
                </button>
                {menuVsblt &&

                    <Contact_menu name={`${u.FirstName} ${u.LastName}`} ref={MenuRef} contactId={u._id} className={' z2'} style={{ position: "absolute", top: "0px", filter: "drop-shadow(0 0 10px var(--filter-color)", right: "0", width: "160px" }} />
                }
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
                style={{ maxWidth: "550px" }}
                className="wmia psr p15 c-s-s br10 bg-l">
                {
                    isLoadingFollowing ?
                        <div className="wmia h100 c-c-c">
                            <L_loader />
                            <p className="mt10">Loading contacts</p>
                        </div> :
                        <>
                            <BtnClose onClick={() => onCLose()} />
                            <div className="wmia pb10 mb15 r-s-c" style={{ borderBottom: "solid 1px var(--border-color)" }}>
                                <h1 className=''>Your contacts</h1>
                                <strong className='wf900 ml10 fs18'>{listContactsToEdit.length}</strong>

                            </div>

                            <div className="wmia scrl_none pl10 c-s-s mt10" style={{ maxHeight: "600px", overflow: "auto" }}>
                                {
                                    listContactsToEdit.length == 0 ?
                                        <div className="wmia h200 c-c-c">
                                            <p>
                                                Looks like  you have no contact yet
                                            </p>
                                            <EmptyLottie />
                                        </div>
                                        :
                                        listContactsToEdit.map(u =>
                                            <A_contact u={u} key={u._id} />
                                        )
                                }
                            </div>
                        </>

                }
            </motion.div>
        </div>
    )
}

export default Edit_contacts
