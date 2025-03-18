import { createSlice } from "@reduxjs/toolkit";


const NewNotfs = createSlice({
    name: "NewNotfs",
    initialState: {
        notfsList: []
    },
    reducers: {
        push_notf: (state, action) => {
            const newD = new Date().toISOString()
            state.notfsList.push({
                ...action.payload, notId: newD
            });
        }
        , pop_notf: (state, action) => {
            state.notfsList = state.notfsList.filter(n => n.notId != action.payload)
        }

    }
});

export default NewNotfs.reducer
export const { push_notf, pop_notf } = NewNotfs.actions