import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../config/axios'
import { GetLastsELements } from './GetLastsElements';



export const BringViewUserData = createAsyncThunk(
    "BringViewUserData",
    async (_id, { dispatch, rejectWithValue }) => {
        try {
            const res = await api.get("/users/view_user", { params: { _id } });
            return res.data
        } catch (error) {
            return rejectWithValue(error)
        }
    }
);



export const BringViewUserFolloers = createAsyncThunk(
    "BringViewUserFolloers",
    async (_id, { rejectWithValue }) => {
        try {

            const res = await api.get("/users/get_friend_followers", { params: { _id } });
            return res.data.followers;

        } catch (error) {

            return rejectWithValue(error);

        }
    }
)

export const BringViewUserFollowings = createAsyncThunk(
    "BringViewUserFollowings",
    async (_id, { rejectWithValue }) => {
        try {

            const res = await api.get("/users/get_friend_followings", { params: { _id, lastIds: [] } });
            return res.data.following;

        } catch (error) {

            return rejectWithValue(error);

        }
    }
)

export const BringViewUserPosts = createAsyncThunk(
    "BringViewUserPosts",
    async (_id, { rejectWithValue }) => {
        try {

            const res = await api.get("/users/get_friend_posts", { params: { _id } });
            return res.data.Posts;

        } catch (error) {

            return rejectWithValue(error);

        }
    }
)


export const BringViewUserReels = createAsyncThunk(
    "BringViewUserReels",
    async (_id, { rejectWithValue }) => {
        try {

            const res = await api.get("/users/get_friend_reels", { params: { _id } });
            return res.data.Reels;

        } catch (error) {

            return rejectWithValue(error);

        }
    }
)
export const BringViewUserBlogs = createAsyncThunk(
    "BringViewUserBlogs",
    async (_id, { rejectWithValue }) => {
        try {
            const res = await api.get("/users/get_friend_blogs", { params: { _id } });
            return res.data.Blogs;

        } catch (error) {

            return rejectWithValue(error);

        }
    }
)

const ViewUserSlice = createSlice({
    name: "ViewUserSlice",
    initialState: {
        userData: null,
        isLodingViewUserData: false,
        isViewUserVisible: false,
        showFollowers: {
            isLoadingFriendFolloers: false,
            isVisible: false,
            FriendFollowers: []
        },
        showFollowings: {
            isLoadingFriendFollwings: false,
            isVisible: false,
            FriendFollwings: []
        },
        showPosts: {
            isVisible: false,
            isLoainfPosts: false,
            foundPosts: []
        },
        showReels: {
            isVisible: false,
            isLoainfReels: false,
            foundReels: []
        },
        showBlogs: {
            isVisible: false,
            isLoainfBlogs: false,
            foundBlogs: []
        },
    },
    reducers: {
        close_view_user: state => {
            state.isViewUserVisible = false
        },
        close_followers_cmp: state => {
            state.showFollowers.isVisible = false
            state.showFollowers.FriendFollowers = []
        },
        close_following_cmp: state => {
            state.showFollowings.isVisible = false
            state.showFollowings.FriendFollwings = []
        },
        close_ShowPosts_cmp: state => {
            state.showPosts.isVisible = false
            state.showPosts.foundPosts = []
        },
        close_Show_blogs_cmp: state => {
            state.showBlogs.isVisible = false
            state.showBlogs.foundBlogs = []
        },
        close_Show_reels_cmp: state => {
            state.showReels.isVisible = false
            state.showReels.foundReels = []
        }
    },
    extraReducers: builder => {
        builder
            .addCase(BringViewUserData.pending, (state) => {
                state.isViewUserVisible = true
                state.showFollowers.isVisible = false;
                state.showBlogs.isVisible = false;
                state.showFollowings.isVisible = false;
                state.isLodingViewUserData = true
                state.showFollowings.FriendFollwings = []
                state.showFollowers.FriendFollowers = []
                state.showBlogs.foundBlogs = []

            })
            .addCase(BringViewUserData.fulfilled, (state, action) => {
                state.isViewUserVisible = true;
                state.userData = action.payload
                state.isLodingViewUserData = false;
            })
            .addCase(BringViewUserData.rejected, (state) => {
                state.isLodingViewUserData = false;
                state.isViewUserVisible = false;
                state.userData = null;
            })
            // 
            .addCase(BringViewUserFolloers.pending, (state) => {
                state.showFollowers.isLoadingFriendFolloers = true
                state.showFollowers.isVisible = true
            })
            .addCase(BringViewUserFolloers.fulfilled, (state, action) => {
                state.showFollowers.isVisible = true;
                state.showFollowers.FriendFollowers = action.payload
                state.showFollowers.isLoadingFriendFolloers = false;
            })
            .addCase(BringViewUserFolloers.rejected, (state) => {
                state.showFollowers.isLoadingFriendFolloers = false;
            })
            // 
            .addCase(BringViewUserFollowings.pending, (state) => {
                state.showFollowings.isLoadingFriendFollwings = true
                state.showFollowings.isVisible = true
            })
            .addCase(BringViewUserFollowings.fulfilled, (state, action) => {
                state.showFollowings.isVisible = true;
                state.showFollowings.FriendFollwings = action.payload
                state.showFollowings.isLoadingFriendFollwings = false;
            })
            .addCase(BringViewUserFollowings.rejected, (state) => {
                state.showFollowings.isLoadingFriendFollwings = false;
            })
            // 

            .addCase(BringViewUserPosts.pending, (state) => {
                state.showPosts.isLoainfPosts = true
                state.showPosts.isVisible = true
            })
            .addCase(BringViewUserPosts.fulfilled, (state, action) => {
                state.showPosts.isVisible = true;
                state.showPosts.foundPosts = action.payload
                state.showPosts.isLoainfPosts = false;
            })
            .addCase(BringViewUserPosts.rejected, (state) => {
                state.showPosts.isLoainfPosts = false;
            })
            // 

            .addCase(BringViewUserReels.pending, (state) => {
                state.showReels.isLoainfReels = true
                state.showReels.isVisible = true
            })
            .addCase(BringViewUserReels.fulfilled, (state, action) => {
                state.showReels.isVisible = true;
                state.showReels.foundReels = action.payload
                state.showReels.isLoainfReels = false;
            })
            .addCase(BringViewUserReels.rejected, (state) => {
                state.showReels.isLoainfReels = false;
            })

            // 

            .addCase(BringViewUserBlogs.pending, (state) => {
                state.showBlogs.isLoainfBlogs = true
                state.showBlogs.isVisible = true
            })
            .addCase(BringViewUserBlogs.fulfilled, (state, action) => {
                state.showBlogs.isVisible = true;
                state.showBlogs.foundBlogs = action.payload
                state.showBlogs.isLoainfBlogs = false;
            })
            .addCase(BringViewUserBlogs.rejected, (state) => {
                state.showBlogs.isLoainfBlogs = false;
            })


            .addCase(GetLastsELements.fulfilled, (state, a) => {
                if (a.payload.targetData == "FriendFollwings") {
                    if (a.payload.newData.following.length > 0) {
                        state.showFollowings.FriendFollwings = [...state.showFollowings.FriendFollwings, ...a.payload.newData.following];
                    }
                }

                if (a.payload.targetData == "FriendFollowers") {
                    if (a.payload.newData.followers.length > 0) {
                        state.showFollowers.FriendFollowers = [...state.showFollowers.FriendFollowers, ...a.payload.newData.followers];
                    }
                }

                if (a.payload.targetData == "showPosts-foundPosts") {
                    if (a.payload.newData.Posts.length > 0) {
                        state.showPosts.foundPosts = [...state.showPosts.foundPosts, ...a.payload.newData.Posts];
                    }
                }
                if (a.payload.targetData == "showReels.foundReels") {
                    if (a.payload.newData.Reels.length > 0) {
                        state.showReels.foundReels = [...state.showReels.foundReels, ...a.payload.newData.Reels];
                    }
                }
                if (a.payload.targetData == "showBlogs.foundBlogs") {
                    if (a.payload.newData.Blogs.length > 0) {
                        state.showBlogs.foundBlogs = [...state.showBlogs.foundBlogs, ...a.payload.newData.Blogs];
                    }
                }


            })

    }
})


export const { close_view_user, close_followers_cmp, close_following_cmp, close_ShowPosts_cmp, close_Show_reels_cmp, close_Show_blogs_cmp } = ViewUserSlice.actions
export default ViewUserSlice.reducer;