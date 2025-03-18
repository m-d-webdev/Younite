import React, { useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import { useDispatch, useSelector } from 'react-redux';
import Reel from '../layouts/reel.jsx';
import { _OnContainerClickOut } from '../components/Abbreviator.jsx';
import { close_scrollReels } from '../slices/ScrollReels.js';

function ScrollReelsCmp() {
    const [isLoadingreels, setisLoadingreels] = useState(false);
    const { listReels, targetReel } = useSelector(s => s.ScrollReels)

    // const handelScroll = (e) => {
    //     setScrollTOP(e.target.scrollTop);
    // }
    const TargetReelReef = useRef()
    const containerReelsRef = useRef()
    const Reels_containerRef = useRef()

    useEffect(() => {
        if (TargetReelReef) {
            TargetReelReef.current?.scrollIntoView({ behavior: "instant" , block:"center" })
        }

    }, [])
    const di = useDispatch();
    return ReactDOM.createPortal(
        <div className='backendMer '
        style={{backgroundColor:"rgba(0, 0, 0, 0.47)"}}
            onClick={e => _OnContainerClickOut(e, Reels_containerRef.current, () => di(close_scrollReels()))}
        >
            <div ref={Reels_containerRef} className='reels_slider'  >
                {isLoadingreels &&
                    [0, 6, 4].map((e) =>
                        <div key={e} className="c-s-s  w500 ">
                            <div className="mb20 ml10  pre_elem br10 mr20" style={{ width: "100%", height: `${window.innerHeight - 300}px` }}></div>
                            <div className="r-s-s">
                                <div className="pre_elem w40 h40 imgCercle"></div>
                                <div className="c-s-s ml10">
                                    <div className="w200 pre_elem p10 br20"></div>
                                    <div className="w100 pre_elem p10 mt10 br10"></div>
                                </div>
                            </div>
                        </div>
                    )
                }

                {listReels &&
                    <div className="wmia c-s-s" ref={containerReelsRef}>
                        {

                            listReels.map((p, i) => {
                                if (targetReel == i) return <Reel ref={TargetReelReef} key={p._id} reel={p} />
                                return <Reel key={p._id} reel={p} />
                            }
                            )
                        }
                    </div>
                }
            </div>


        </div>,
        document.getElementById('portals')
    )
}

export default ScrollReelsCmp
