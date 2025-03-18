import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Api from '../../config/axios'
import { start_loading, stop_loading } from "../loader";


export const getMorePosts = createAsyncThunk(
    "getMorePosts",
    async (_, { rejectWithValue, getState }) => {
        try {
            let oldDatasids = getState().Posts.posts
            oldDatasids = oldDatasids.map(e => e._id);
            const res = await Api.get('/post/getMore', { params: { ids: oldDatasids } })
            return res.data.posts;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
)

export const StartBringingPosts = createAsyncThunk(
    "StartBringingPosts",
    async (_, { dispatch, rejectWithValue }) => {
        try {
            dispatch(start_loading())
            const PostsData = await Api.get("/post/");
            dispatch(stop_loading());
            return PostsData.data.posts
        } catch (error) {
            console.log(error.message);
            dispatch(stop_loading())
            return rejectWithValue(error.message)
        }
    }
)

const PostsSlise = createSlice(
    {
        name: "PostsSlice",
        initialState: {
            posts: [],
            isLoadingPosts: false
        },
        reducers: {},
        extraReducers: (builder) => {
            builder.
                addCase(
                    StartBringingPosts.pending, (state) => {
                        state.isLoadingPosts = true
                    }
                ).
                addCase(
                    StartBringingPosts.fulfilled, (state, action) => {
                        state.isLoadingPosts = false
                        state.posts = action.payload;
                    }
                ).
                addCase(
                    getMorePosts.pending, (state, action) => {
                        state.isLoadingPosts = true
                    }
                ).
                addCase(
                    getMorePosts.fulfilled, (state, action) => {
                        if (action.payload.length > 0) {
                            action.payload.forEach(element => {
                                state.posts.push(element)
                            });
                        }
                        state.isLoadingPosts = false
                    }
                ).
                addCase(
                    StartBringingPosts.rejected, (state) => {
                        state.isLoadingPosts = false
                    }
                )
        }
    }
)


export default PostsSlise.reducer