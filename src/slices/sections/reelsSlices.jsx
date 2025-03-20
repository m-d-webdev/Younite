import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Api from '../../config/axios'
import { start_loading, stop_loading } from "../loader";

export const StartBringing_Reels = createAsyncThunk(
    "ReelsSlice/StartBringing_Reels",
    async (_, { dispatch, rejectWithValue }) => {
        try {
            dispatch(start_loading());
            const reels_Data = await Api.get("/reels/");
            dispatch(stop_loading());
            return reels_Data.data.reels
        } catch (error) {
            console.log(error.message);
            dispatch(stop_loading())
            return rejectWithValue(error.message)
        }
    }
)

export const getMoreReels = createAsyncThunk(
    "getMoreReels",
    async (_, { rejectWithValue, getState }) => {
        try {
            let oldDatasids = getState().Reels.reels
            oldDatasids = oldDatasids.map(e => e._id);
            const res = await Api.get('/reels/getMore', { params: { ids: oldDatasids } })
           
            return res.data.reels;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
)

export const knowTheLength = createAsyncThunk(
    "knowTheLength",
    async (_, { rejectWithValue, getState }) => {
        try {
            let oldDatasids = getState().Reels.reels
            return oldDatasids.length;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
)

const ReelsSlice = createSlice(
    {
        name: "ReelsSlice",
        initialState: {
            isMuted: true,
            userNewReels: [],
            reels: [],
            isLoadingreels: false
        },
        reducers: {
            unshiftUserReel: (state, action) => {
                console.log('accpted on the unshift action ');

                state.userNewReels.unshift(action.payload)
            },
            toggleMuting: s => {
                s.isMuted = !s.isMuted
            }
        },
        extraReducers: (builder) => {
            builder.
                addCase(
                    StartBringing_Reels.pending, (state) => {
                        state.isLoadingreels = true;
                    }
                ).
                addCase(
                    StartBringing_Reels.fulfilled, (state, action) => {
                        state.reels = action.payload;
                        state.isLoadingreels = false
                    }
                ).
                addCase(
                    getMoreReels.pending, (state, action) => {
                        state.isLoadingreels = true
                    }
                ).
                addCase(
                    getMoreReels.fulfilled, (state, action) => {

                        if (action.payload?.length > 0) {
                            action.payload.forEach(element => {
                                state.reels.push(element)
                            });
                        }
                        state.isLoadingreels = false
                    }
                ).
                addCase(
                    StartBringing_Reels.rejected, (state) => {
                        state.isLoadingreels = false
                    }
                )
        }
    }
)


export const { unshiftUserReel, toggleMuting } = ReelsSlice.actions

export default ReelsSlice.reducer