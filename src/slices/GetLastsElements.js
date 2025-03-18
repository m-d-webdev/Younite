import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../config/axios";



export const GetLastsELements = createAsyncThunk(
    "",
    async ({ endPoint, targetData, ids, otherParams }, { rejectWithValue }) => {
        try {
            let res = await api.get(endPoint, { params: { lastIds: ids, ...otherParams } });
            return { targetData, newData: res.data }
        } catch (error) {
            return rejectWithValue()
        }
    }
)