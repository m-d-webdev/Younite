import { createSlice } from "@reduxjs/toolkit";



const ScrollVeReducer = createSlice({
    name: "ScrollVeReducer",
    initialState: {
        isVisible: false,
        targetReel: null,
        listReels: []
    },
    reducers: {
        open_scrollReels: (s, a) => {
            s.listReels = a.payload.reels;
            s.targetReel = a.payload.target
            s.isVisible = true
        },
        close_scrollReels: s => {
            s.listReels = []
            s.isVisible = false;
        }
    }
})

export const { close_scrollReels, open_scrollReels } = ScrollVeReducer.actions
export default ScrollVeReducer.reducer