import { createSlice } from "@reduxjs/toolkit";
import { useState, useEffect, useRef, useMemo } from "react";
import { motion } from 'framer-motion'
import ReactDOM from 'react-dom'
import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import BtnClose from "../components/btnClose";
import Lottie from "react-lottie"
import AnimateDoneJson from '../resources/lottieDone.json'
import AnimateeRRORJson from '../resources/loteErro.json'
const TenSLice = createSlice(
    {
        name: "TenSlice",
        initialState: {
            is_visible: false,
            message: null,
            status: true
        },
        reducers: {
            Ten: (state, action) => {
                state.status = true;
                state.message = null;

                state.is_visible = true;
                if (action.payload[0] == false) {
                    state.status = false
                }
                if (action.payload[1]) {
                    state.message = action.payload[1]
                }
            },
            close_ten: (state) => {
                state.is_visible = false;
            }
        }
    }
)
export const { Ten, close_ten } = TenSLice.actions
export default TenSLice.reducer;


export const Ten_cmp = () => {
    const dispatch = useDispatch();
    let timeO;
    const { is_visible, message, status } = useSelector(s => s.Ten)
    const handelCloseTen = () => {
        clearTimeout(timeO)
        dispatch(close_ten())
    }
    useEffect(() => {
        clearTimeout(timeO)
        timeO = setTimeout(() => {
            handelCloseTen()
        }, 4000);

        return () => {
            clearTimeout(timeO)

        }
    }, [])

    return ReactDOM.createPortal(
        <motion.div

            animate={{
                y: [200, 0],
                opacity: 1,
                transition: {
                    duration: .7,
                    type: "spring"
                }
            }}
            exit={{
                y: [-20, 200],
                opacity: 0,
                transition: {
                    duration: .7,
                    type: "spring"
                }
            }}
            className="TenDoneStyle  r-s-c br20 bg-third">
            {status ?
                <Lottie options={{
                    animationData: AnimateDoneJson,
                    autoplay: true,
                    loop: false
                }}
                    width={"40px"}
                    height={"40px"}
                />
                : <Lottie options={{
                    animationData: AnimateeRRORJson,
                    autoplay: true,
                    loop: false
                }}
                    width={"40px"}
                    height={"40px"}
                />

            }
            <div className="c-s-s ml10">
                <p className="">{message || "Completed Successfully"}</p>
            </div>
            <BtnClose onClick={() => dispatch(close_ten())} />
        </motion.div>
        , document.getElementById("portals")

    )
}


