import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'


const ReportSlice = createSlice({
    name: "ReportSlice",

    initialState: {
        content_id: null,
        collection: null,
        isReportOpen: false,
    },

    reducers: {
        open_reportCmp: (state, action) => {
            state.isReportOpen = true;
            state.collection = action.payload.collection;
            state.content_id = action.payload.content_id
        },
        close_reportCmp: state => {
            state.isReportOpen = false;
        },
    }
})

export default ReportSlice.reducer;
export const { close_reportCmp, open_reportCmp } = ReportSlice.actions