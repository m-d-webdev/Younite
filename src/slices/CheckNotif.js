import { createAsyncThunk, createSlice, isAction } from "@reduxjs/toolkit";
import api from "../config/axios";

export const BringNotificationDesc = createAsyncThunk(
    "BringNotificationDesc",
    async (notificationBody, { rejectWithValue, dispatch }) => {
        try {
            const res = await api.get('/interaction/describNotification', {
                params: {
                    not: notificationBody
                }
            })
            return { notificationBody, contentBody: res.data.contentBody, targetComent: res.data.targetComent, targetReplay: res.data.targetReplay }
        } catch (error) {
            return rejectWithValue(error);
        }
    }
)

const PageSlice = createSlice({
    name: "NotifSlice",
    initialState: {
        isVisible: false,
        notificationBody: null,
        contentBody: null,
        contentComents: [],
        targetComent: null,
        isLoading: false,
        targetReplay: null,
    },
    reducers: {
        open_page_check: (state) => {
            state.isVisible = true;
        },
        close_page_check: (state) => {
            state.isVisible = false;
        },
    },
    extraReducers: b => {
        b
            .addCase(BringNotificationDesc.pending, (state) => {
                state.isVisible = true
                state.isLoading = true;
            })
            .addCase(BringNotificationDesc.fulfilled, (state, action) => {
                state.isVisible = true;
                state.isLoading = false;
                state.contentBody = action.payload.contentBody
                state.targetComent = action.payload.targetComent
                state.targetReplay = action.payload.targetReplay
                state.notificationBody = action.payload.notificationBody
            })
            .addCase(BringNotificationDesc.rejected, (state) => {
                state.isVisible = false;
                state.isLoading = false;
            })
    }
});

export const { close_page_check } = PageSlice.actions


export default PageSlice.reducer