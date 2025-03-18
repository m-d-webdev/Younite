import { useMemo, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ReactDOM from 'react-dom'
import { motion } from 'framer-motion'
import { v_pop } from '../env';
import L_loader from './L_loader';
import { _OnContainerClickOut } from './Abbreviator';
import { close_Show_reels_cmp } from '../slices/viewUser';

import ReelCmp from '../layouts/reel'
import BtnClose from './btnClose';
import EmptyLottie from './emptyLottie';
import { open_scrollReels } from '../slices/ScrollReels';
import LastELementToGetMore from './LastELementToGetMore';
function Show_Freind_reels() {
    const { showReels, userData } = useSelector(s => s.ViewUser);
    const dispatch = useDispatch()
    let ListReelsRef = useRef();
    const [is_a_reel_opened, seta_reel_opened] = useState(null)



    const ShowReel = () => {
        const CntReelRef = useRef()
        return (
            <div className="backendMer"
                style={{
                    backgroundColor: " rgba(0, 0, 0, 0.504)"
                }}
                onClick={e => _OnContainerClickOut(e, CntReelRef.current, () => seta_reel_opened(null))}
            >
                <div className="p10  br10" ref={CntReelRef}>
                    <ReelCmp reel={is_a_reel_opened} h={'850px'} />
                </div>
            </div>
        )
    }



    return ReactDOM.createPortal(
        <div className='backendMer'
            onClick={e => _OnContainerClickOut(e, ListReelsRef.current, () => dispatch(close_Show_reels_cmp()))}
        >
            <motion.div
                ref={ListReelsRef}
                animate={v_pop.visible}
                initial={v_pop.hidden}
                className="psr  c-s-s br10 bg-l"
                style={{
                    minWidth: "400px",
                    maxWidth: "930px"
                }}
            >
                {
                    showReels.isLoainfReels ?
                        <div className="wmia h100 c-c-c">
                            <L_loader />
                        </div>
                        :
                        <>
                            <BtnClose onClick={() => dispatch(close_Show_reels_cmp())} />
                            <span
                                style={{
                                    borderBottom: "solid 1px var(--border-color)"
                                }}
                                className="wmia p10  r-s-c">
                                <h1 className='mr5 fw900'>{userData.LastName} </h1>
                                Reels
                            </span>
                            <div className="wmia scrl_none mt10 r-w-p-s " style={{ maxHeight: "500px", overflow: "auto" }}>

                                {
                                    showReels.foundReels.length == 0 ?
                                        <div className="wmia h200 c-c-c">
                                            <p>
                                                {userData.LastName} hasn't shared any reels so far
                                            </p>
                                            <EmptyLottie />
                                        </div>
                                        :
                                        showReels.foundReels.map((u, i) => {
                                            if (i == showReels.foundReels.length - 1) {
                                                return <LastELementToGetMore
                                                    endPoint={"/users/get_friend_reels"}
                                                    ids={showReels.foundReels.map(e => e._id)}
                                                    targetData={"showReels.foundReels"}
                                                    otherParams={{ _id: userData._id }}
                                                    
                                                >
                                                    <div onClick={() => dispatch(open_scrollReels({ reels: showReels.foundReels, target: i }))} className="w200 m5  h300  overHidden" key={u._id}>
                                                        <video muted src={u.url} onMouseLeave={e => e.target.pause()} onMouseEnter={e => e.target.play()} className="wmia curP br10 hmia" style={{ objectFit: "cover" }}  ></video>
                                                    </div>
                                                </LastELementToGetMore>
                                            }
                                            return <div onClick={() => dispatch(open_scrollReels({ reels: showReels.foundReels, target: i }))} className="w200 m5  h300  overHidden" key={u._id}>
                                                <video muted src={u.url} onMouseLeave={e => e.target.pause()} onMouseEnter={e => e.target.play()} className="wmia curP br10 hmia" style={{ objectFit: "cover" }}  ></video>
                                            </div>
                                        }

                                        )
                                }
                            </div>
                        </>
                }
                {
                    is_a_reel_opened != null &&
                    <ShowReel />
                }

            </motion.div>


        </div>,
        document.getElementById("portals")
    )
}

export default Show_Freind_reels
