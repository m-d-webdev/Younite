import { useState, useRef, useEffect } from 'react'
import ReactDOM from 'react-dom'
import Dev from '../components/dev'
import { motion, AnimatePresence } from 'framer-motion'
import { _onClickOut } from '../components/Abbreviator'
import { createSlice } from '@reduxjs/toolkit'

import { useSelector, useDispatch } from "react-redux"
const Zomer_Slice = createSlice({
    name: "Zomer_Slice",
    initialState: {
        zoomer_vsbl: false,
        img_url: ""
    },
    reducers: {
        open_zoomer: (state, action) => {
            state.img_url = action.payload
            state.zoomer_vsbl = true
        },
        close_zoomer: (state) => {
            // state.img_url = null
            state.zoomer_vsbl = false
        }
    }
})

export default Zomer_Slice.reducer;
export const { close_zoomer, open_zoomer } = Zomer_Slice.actions



export const Zoomer = () => {
    const soomerRef = useRef()
    const { img_url, zoomer_vsbl } = useSelector(s => s.Zoomer)
    const dispatch = useDispatch()
    useEffect(() => {
        if (soomerRef.current) {
            _onClickOut(soomerRef.current, () => { dispatch(close_zoomer()) })
        }
    },[])
    return ReactDOM.createPortal(
        <div className='backendMer p20'>
            <motion.img
                ref={soomerRef}
                src={img_url}
                initial={{
                    scale: .95,
                    y: 50,
                    opacity: 0,
                }}
                exit={{
                    scale: .8,
                    y: 50,
                    opacity:0 ,
                    transition:{duration:.15}
                }}
                animate={{
                    scale: 1,
                    y: 0,
                    opacity: 1,
                }}
              
                style={{
                    maxWidth: '100%',
                    maxHeight: "100%",
                    // minHeight: "800px",
                    zIndex:10,
                    borderRadius:"10px",

                }} alt="" />

        </div>, document.getElementById("portals")
    )
}

