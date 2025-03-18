import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../config/axios'

export const serachForData = createAsyncThunk(
    "serachForData",
    async (term, { rejectWithValue }) => {

        try {
            term = term.trim();
            const res = await api.get('/search/', {
                params: {
                    q: term
                }
            });
            console.log(res.data);
            
            return res.data;
        } catch (error) {
            console.log(error);

            return rejectWithValue(error)
        }

    }
)

const searchSlice = createSlice({
    name: "searchSlice",
    initialState: {
        isSearching: false,
        oldSerachs: [],
        resultSearchData: {
            users: [],
            posts: [],
            reels: [],
            blogs: []
        }
    },
    extraReducers: b => {
        b
            .addCase(serachForData.pending, s => { s.isSearching = true })
            .addCase(serachForData.fulfilled, (s, a) => {
                s.isSearching = false;
                s.resultSearchData = a.payload
            })
            .addCase(serachForData.rejected, s => { s.isSearching = false })
    }
})

export default searchSlice.reducer;
