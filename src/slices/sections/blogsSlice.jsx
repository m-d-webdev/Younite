import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Api from '../../config/axios'
import { start_loading, stop_loading } from "../loader";
import axios from 'axios'

export const getMoreBlogs = createAsyncThunk(
    "getMoreBlogs",
    async (_, { rejectWithValue, getState }) => {
        try {
            let oldDatasids = getState().Blogs.blogs
            oldDatasids = oldDatasids.map(e => e._id);
            const res = await Api.get('/blog/getMore', { params: { ids: oldDatasids } })
            return res.data.blogs;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
)


export const StartBringingBlogs = createAsyncThunk(
    "StartBringingBlogs",
    async (_, { dispatch, rejectWithValue }) => {
        try {
            dispatch(start_loading())

            const BlogsData = await Api.get("/blog");
            dispatch(stop_loading());
            return BlogsData.data.blogs
        } catch (error) {
            console.log(error.message);
            dispatch(stop_loading())
            return rejectWithValue(error.message)
        }
    }
)

const BlogsSlise = createSlice(
    {
        name: "BlogsSlise",
        initialState: {
            blogs: [],
            isLoadingBlogs: false
        },
        reducers: {



        },
        extraReducers: (builder) => {
            builder.
                addCase(
                    StartBringingBlogs.pending, (state) => {
                        state.isLoadingBlogs = true
                    }
                ).
                addCase(
                    StartBringingBlogs.fulfilled, (state, action) => {
                        state.blogs = action.payload;
                        state.isLoadingBlogs = false
                    }
                ).
                addCase(
                    StartBringingBlogs.rejected, (state) => {
                        state.isLoadingBlogs = false
                    }
                )
                .addCase(
                    getMoreBlogs.pending, (state) => {
                        state.isLoadingBlogs = true
                    }
                ).
                addCase(
                    getMoreBlogs.fulfilled, (state, action) => {
                        if (action.payload.length > 0) {
                            action.payload.forEach(element => {
                                state.blogs.push(element)
                            });
                        }
                        state.isLoadingBlogs = false
                    }
                ).
                addCase(
                    getMoreBlogs.rejected, (state) => {
                        state.isLoadingBlogs = false
                    }
                )
        }
    }
)

export const { } = BlogsSlise.actions
export default BlogsSlise.reducer