import { useState, useEffect, useRef } from 'react'
import Lottie from 'react-lottie'
import { useSelector, useDispatch } from 'react-redux'
import ReactDOM from "react-dom"
import Dev from '../components/dev'
import { createSlice } from '@reduxjs/toolkit'
import { _onClickOut } from '../components/Abbreviator'
import AN_dat from "../resources/animate_Done1.json"
import AN_Error from "../resources/loteErro.json"
const Alert_notfication = createSlice({
    name: "Alert_notfication",
    initialState: {
        is_vsbl: false,
        status: true,
        Notf: null
    },
    reducers: {
        open_alert: (state, action) => {
            state.is_vsbl = true;
            if (action.payload[0] == false) {
                state.status = false;
            }
            if (action.payload[1]) {
                state.Notf = action.payload[1];
            }
        },

        hide_alert: (state) => {
            state.is_vsbl = false;
            state.status = true;
            state.Notf = null;

        }
    }
})


export const { open_alert, hide_alert } = Alert_notfication.actions
export default Alert_notfication.reducer;



export function Alert_bell() {
    const Alert_bellRef = useRef(null);
    const { status, Notf } = useSelector(s => s.Alert_Not)
    const dispatch = useDispatch()
    useEffect(() => {
        if (Alert_bellRef.current) {
            _onClickOut(Alert_bellRef.current, () => { dispatch(hide_alert()) })
        }
    }, [])
    // ----------------------------
    return ReactDOM.createPortal(
        <div className='backendMer'>
            <Dev
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 100, opacity: 0 }}
                ref={Alert_bellRef}
                className={"w400 h300 br10 bg-l p10 c-c-c "}
            >
                {
                    status ?
                        <>
                            <Lottie options={{
                                loop: false,
                                autoplay: true,
                                animationData: AN_dat
                            }}
                                width={250} height={250}
                            />

                            <h1>{Notf || "Process have benn done successfully"}</h1>

                        </> :
                        <>
                            <Lottie options={{
                                loop: false,
                                autoplay: true,
                                animationData: AN_Error
                            }}
                                width={150} height={150}
                            />
                        </>

                }
                <button onClick={() => dispatch(hide_alert())} className='wmia mt20 p10 cl'>
                    ok
                </button>
            </Dev>

        </div>,
        document.getElementById("portals")
    )
}

