import { createSlice } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import ReactDOM from "react-dom"
import { useEffect, useState } from "react";
const loaderSlice = createSlice({
    name: "loader",
    initialState: {
        isLoading: false,
        loading_delay: 6000
    },
    reducers: {
        start_loading: (state, action) => {
            state.isLoading = true;
            if (action.payload) {
                state.loading_delay = action.payload
            }
        },
        stop_loading: (state) => {
            state.isLoading = false;
        },
    }
})
export const { start_loading, stop_loading } = loaderSlice.actions;
export default loaderSlice.reducer

export const Loader_element = () => {
    const { isLoading, loading_delay } = useSelector(s => s.loader);
    const [AlterErr, setAlertError] = useState(false)
    const dispatch = useDispatch();
   
   

    const closeLoader = () => {
        dispatch(stop_loading())
    }
    return ReactDOM.createPortal(
        <>
            {
                isLoading &&
                <div className="c-c-c loderContainer">
                    <div className="wmia loader_line_container  r-s-c">
                        <span className="loader_line"></span>
                    </div>
                    {
                        AlterErr &&
                        <div className="sayError activeCmp w500  c-c-c br20 bg-l p10">
                            <img src="media/userAsks.png" className="h200 mb20" alt="" />
                            <h1>Oops! Something went wrong. Please try again later</h1>
                            <button onClick={closeLoader} className="mt50 mb20">Ok</button>
                        </div>
                    }
                </div>
            }
        </>, document.getElementById("portals")
    )
}