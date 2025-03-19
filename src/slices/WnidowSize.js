import { createSlice } from "@reduxjs/toolkit";

const WindowSizeSlice = createSlice({
    name: "windowSize",
    initialState: {
        isWorkinOnPhone: window.innerWidth < 800,
        isCloseBares: false
    },
    reducers: {
        setWinSize: (s, a) => {
            s.isWorkinOnPhone = a.payload
        }
        , setSidesOpen: (s, a) => {
            s.isCloseBares = a.payload
        }
    }
})

export const { setWinSize, setSidesOpen } = WindowSizeSlice.actions
export default WindowSizeSlice.reducer