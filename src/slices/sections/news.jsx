import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Api from '../../config/axios'
import { start_loading, stop_loading } from "../loader";
import axios from 'axios'
export const StartBringingNews = createAsyncThunk(
    "NewsSlise/StartBringingNews",
    async (_, { dispatch, rejectWithValue }) => {
        try {
            const keysO_Search = ["africa", "morocco", "usa", "europ", "cars", "russia", "war", "asia", "brazil", "tourist", "football"]
            dispatch(start_loading())
            const randomIndex = Math.floor(Math.random() * keysO_Search.length); // Ensure the index is an integer and within bounds
            let word = keysO_Search[randomIndex];
            const NewsData = await axios.get(`https://newsapi.org/v2/everything?q=${word}&apiKey=8dc73c10f5534392b66744f737b4283c`);
            dispatch(stop_loading());
            return NewsData.data.articles;
        } catch (error) {
            console.log(error.message);
            dispatch(stop_loading())
            return rejectWithValue(error.message)
        }
    }
)

const NewsSlise = createSlice(
    {
        name: "NewsSlise",
        initialState: {
            news: [],
            isLoadingNews: false
        },
        reducers: {



        },
        extraReducers: (builder) => {
            builder.
                addCase(
                    StartBringingNews.pending, (state) => {
                        state.isLoadingNews = true
                    }
                ).
                addCase(
                    StartBringingNews.fulfilled, (state, action) => {
                        state.isLoadingNews = false
                        state.news = action.payload;
                    }
                ).
                addCase(
                    StartBringingNews.rejected, (state) => {
                        state.isLoadingNews = false
                    }
                )
        }
    }
)

export const { } = NewsSlise.actions
export default NewsSlise.reducer