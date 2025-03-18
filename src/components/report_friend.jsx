import React, { useRef } from 'react'
import ReactDOM from 'react-dom'
import { motion } from 'framer-motion'
import { v_from_bottom, v_pop } from '../env'
import { _OnContainerClickOut } from './Abbreviator';
import { close_reportCmp } from '../slices/ReportSlice';
import { useDispatch } from 'react-redux';
function Report_friend({ _id }) {
    const CmpReportRef = useRef(null);
    const dispatch = useDispatch()
    return ReactDOM.createPortal(
        <div className='backendMer'
            onClick={e => _OnContainerClickOut(e, CmpReportRef.current, () => dispatch(close_reportCmp()))}
        >
            <motion.div

                ref={CmpReportRef}
                animate={v_pop.visible}
                initial={v_pop.hidden}
                exit={v_pop.hidden}
                className="w300  bg-l br10 p10"
            >
                <button className='hoverEff1 wmia p10 br10'>
                    <svg className='mr10' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q54 0 104-17.5t92-50.5L228-676q-33 42-50.5 92T160-480q0 134 93 227t227 93Zm252-124q33-42 50.5-92T800-480q0-134-93-227t-227-93q-54 0-104 17.5T284-732l448 448Z" /></svg>
                    Block
                </button>
                <button className='hoverEff1 mt10 wmia p10 br10'>
                    <svg className='mr10 w20 h20' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style={{ fill: "none" }} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width={32} height={32} strokeWidth={1.25}> <path d="M18 4a3 3 0 0 1 3 3v8a3 3 0 0 1 -3 3h-5l-5 3v-3h-2a3 3 0 0 1 -3 -3v-8a3 3 0 0 1 3 -3h12z"></path> <path d="M12 8v3"></path> <path d="M12 14v.01"></path> </svg>
                    Report
                </button>
                <button className='hoverEff1 mt10 wmia p10 br10'>
                    <svg className='mr10 w20 h20' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style={{ fill: "none" }} stroke="currentColor" strokelinecap="round" strokelinejoin="round" width={32} height={32} strokeWidth={1.25}> <path d="M7 7m0 2.667a2.667 2.667 0 0 1 2.667 -2.667h8.666a2.667 2.667 0 0 1 2.667 2.667v8.666a2.667 2.667 0 0 1 -2.667 2.667h-8.666a2.667 2.667 0 0 1 -2.667 -2.667z"></path> <path d="M4.012 16.737a2.005 2.005 0 0 1 -1.012 -1.737v-10c0 -1.1 .9 -2 2 -2h10c.75 0 1.158 .385 1.5 1"></path> </svg>
                    Copy  link
                </button>
                <button className='hoverEff1 mt10 wmia p10 br10'>
                    <svg className='mr10' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M360-240 120-480l240-240 56 56-144 144h568v80H272l144 144-56 56Z" /></svg>
                    Back
                </button>
            </motion.div>
        </div>,
        document.getElementById("portals")
    )
}

export default Report_friend
