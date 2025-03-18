import React, { useEffect, useState } from 'react'
// import ElementSlider from '../components/elementSlider'
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion'

function Counter_moments({ r, fn, ChoosedIndx }) {
    
    const { playingMomentDuration } = useSelector(s => s.Moments)
    const ElementSlider = ({ i }) => {
        const [Dura, setDura] = useState(playingMomentDuration);
        useEffect(() => {
            setDura(playingMomentDuration);
        }, [playingMomentDuration])
        let isShoosedTHisM = ChoosedIndx == i;
        let IsPassed = ChoosedIndx > i
        let MytimeOut;
        clearTimeout(MytimeOut)
        useEffect(() => {
            clearTimeout(MytimeOut)
            if (isShoosedTHisM == true && i != r.length - 1) {
                MytimeOut = setTimeout(() => {
                    fn();
                }, Dura);
            } else {
                clearTimeout(MytimeOut)
            }
            return () => {
                clearTimeout(MytimeOut);
            };
        }, [Dura ,playingMomentDuration])
        return (
            <div className="wmia mr5  br10" style={{ backgroundColor: "#ffffff8d", filter: "drop-shadow(0 0 2px black)" }}>
                <motion.div
                    initial={
                        isShoosedTHisM ?
                            {
                                width: 0
                            } : {
                                width: IsPassed ? "100%" : "0",
                                transition: {
                                    duration: 0
                                }
                            }
                    }

                    animate={
                        isShoosedTHisM ?
                            {
                                width: "100%",
                                transition: {
                                    duration: (Dura / 1000),
                                }
                            } : {}
                    }
                    className="hmia  bg-rl br10"
                    style={{ height: "3px" }}
                >
                </motion.div>
            </div >
        )
    }
    return (
        <div className="wmia  mt5  r-p-c  br10 " style={{ padding: "0px" }}>
            {
                r.map((s, i) =>
                    <ElementSlider key={s._id} i={i} />
                )
            }
        </div>
    )
}

export default Counter_moments
