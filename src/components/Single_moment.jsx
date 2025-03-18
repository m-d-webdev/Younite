import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux'
import { open_showMoments } from '../slices/Moments_sideBare'
import { TimeAgo } from './Abbreviator';
function Single_moment({ m, i }) {
    const dispatch = useDispatch();
    const _viewedMoment = useSelector(s => s.User.viewed.moments);
    const [CountNotViewd, setCountNotViewd] = useState(m.moments.filter(mo => !_viewedMoment.includes(mo._id)).length);
    useEffect(() => {
        setCountNotViewd(m.moments.filter(mo => !_viewedMoment.includes(mo._id)).length);
    }, [_viewedMoment])
    return (
        <motion.div
            onClick={() => dispatch(open_showMoments(m))}
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1, transition: { delay: i * .1 } }}
            className='cntUsersMoment wmia hoverEff1    br10 p5 r-b-c mb15'>
            <div className="r-s-c">
                <div className={`cntUerImgsBorder  psr imgCercle  c-c-c ${CountNotViewd > 0 ? "active" : "inactive"} `} >
                    <img className='w40 h40 imgCercle' src={m.author.profile_img} alt="" />
                </div>
                <div className="c-s-s ml10 ">
                    <strong className='fw900'>{m.author.FirstName} {m.author.LastName}</strong>
                    <p className="hoverEff2 mt5 ml5" style={{ fontSize: "12px" }}>{TimeAgo(m.moments[m.moments.length - 1].createAt)}</p>
                </div>
            </div>
            <p style={{ fontSize: "12px", opacity: .8 }} className='r-s-c c-g' >
                {
                    CountNotViewd > 0 &&
                    <span className="imgCercle bg-g mr5" style={{ padding: "4px" }}></span>
                }
                {
                    CountNotViewd > 0 ?
                        CountNotViewd
                        :
                        m.count
                }
            </p>
        </motion.div>
    )
}

export default Single_moment
