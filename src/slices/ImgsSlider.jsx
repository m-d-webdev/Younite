import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ReactDOM from 'react-dom'
import { useState, useEffect, useRef, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence, delay } from 'framer-motion'
import { start_loading, stop_loading } from "./loader";
import { _onClickOut, _OnContainerClickOut } from "../components/Abbreviator";
import { Ten } from "./ten_slice";
import { open_zoomer } from "./zoomer";
import BtnClose from "../components/btnClose";

const ImgsSliderSlice = createSlice({
    name: "ImgsSliderSlice",
    initialState: {
        is_visible: false,
        imgs: [],

    },
    reducers: {
        open_imgsSlider: (state, action) => {
            state.imgs = action.payload;
            state.is_visible = true
        },
        close_imgsSlider: (state) => {
            state.is_visible = false
        }
    }
})

export default ImgsSliderSlice.reducer
export const { close_imgsSlider, open_imgsSlider } = ImgsSliderSlice.actions


export function ImgsSlider_page() {
    const { imgs } = useSelector(s => s.ImgsSlider)
    const ContainerImgsSliderRef = useRef();
    const dispatch = useDispatch();
    const [TransformVal, setTransformVal] = useState(0)
    const [currentIndex, setcurrentIndex] = useState(0)
    const handelMoveSlider = (der = true) => {
        if (!der) {
            setTransformVal(TransformVal + 700)
            setcurrentIndex(currentIndex - 1)
        } else {
            if (-TransformVal < ContainerImgsSliderRef.current.offsetWidth - 700) {
                setcurrentIndex(currentIndex + 1)
                setTransformVal(TransformVal - 700)
            }

        }
    }

    const ImgContainer = useMemo(() =>
        ({ img, index }) => {
            const [isChoosed, setChoosed] = useState(false);
            const imsmgRef = useRef();
            useEffect(() => {
                if (currentIndex == index) {
                    setChoosed(true)
                } else {

                    setChoosed(false)
                }
            }, [currentIndex])

            return (
                <div style={{ minWidth: "700px" }} className="w700 r-c-c">
                    <motion.img src={img}
                        initial=
                        {{
                            scale: .7
                        }}
                        animate={{
                            scale: isChoosed ? [.6, 1] : .7,
                            transition: {
                                type: "spring",
                                duration: .15
                            }
                        }}
                        onClick={() => dispatch(open_zoomer(img))}
                        alt=""
                        ref={imsmgRef}
                        style={{
                            objectFit: "cover",
                            objectPosition: "center",
                            // opacity: isChoosed ? 1 : .6,
                            transform: `scale(${isChoosed ? 1 : .8})`,
                            transition: '.2s'
                        }}
                    />
                </div>
            )
        }
        , [currentIndex])
    return ReactDOM.createPortal(
        <div className="backendMer   p0"
            style={{
                backgroundColor: " rgba(0, 0, 0, 0.633)"
            }}
        // onClick={(e) => _OnContainerClickOut(e, ContainerImgsSliderRef.current, () => dispatch(close_imgsSlider()))}
        >
            <div className="wmia psr r-b-c">
                <div
                    style={{
                        width: "25%",
                        height: "800px",
                        backdropFilter: "blur(6px)",
                        zIndex: 5
                    }}
                ></div>
                <div
                    style={{
                        // overflow:"hidden",
                        width: "50%",
                        minWidth: "700px"
                    }}
                    className="h800 r-s-c">
                    <div
                        style={{
                            transform: `translateX(${TransformVal}px)`
                        }}
                        ref={ContainerImgsSliderRef}
                        className="cntImgsSlider r-s-c ">
                        {
                            imgs.map((i, index) =>
                                <ImgContainer key={i} img={i} index={index} />
                            )
                        }
                    </div>
                </div>
                <div
                    style={{
                        width: "25%",
                        height: "800px",
                        backdropFilter: "blur(6px)",
                        zIndex: 5
                    }}
                ></div>

                {
                    (ContainerImgsSliderRef.current ? -TransformVal < ContainerImgsSliderRef.current.offsetWidth - 700 : true) &&

                    <button
                        style={{
                            position: "absolute",
                            right: "5%",
                            backgroundColor: "#fff",
                            padding: "10px",
                            zIndex: 6
                        }}

                        className="imgCercle"
                        onClick={() => handelMoveSlider(true)}
                    >
                        <svg style={{ fill: '#000' }} xmlns="http://www.w3.org/2000/svg" className="w30 h30" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="m560-240-56-58 142-142H160v-80h486L504-662l56-58 240 240-240 240Z" /></svg>
                    </button>
                }

                {
                    -TransformVal >= 600 &&
                    <button
                        style={{
                            position: "absolute",
                            left: "5%",
                            backgroundColor: "#fff",
                            padding: "10px",
                            zIndex: 6
                        }}

                        onClick={() => handelMoveSlider(false)}
                        className="imgCercle"
                    >
                        <svg style={{ fill: '#000', transform: "rotate(180deg)" }} xmlns="http://www.w3.org/2000/svg" className="w30 h30" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="m560-240-56-58 142-142H160v-80h486L504-662l56-58 240 240-240 240Z" /></svg>
                    </button>
                }

                <button style={{ backgroundColor: "#fff", zIndex:6, borderRadius: "50%", padding: "10px" }} className="btnClose"
                    onClick={() => dispatch(close_imgsSlider())}>
                    <svg style={{fill:"#000"}} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" /></svg>
                </button>
            </div>

        </div>, document.getElementById("portals")

    )
}
