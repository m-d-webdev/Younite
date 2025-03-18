import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../config/axios";
import { Ten } from "./ten_slice";


export const getListFriendToShareWith = createAsyncThunk(
    "getListFriendToShareWith",
    async (_, { rejectWithValue, getState }) => {
        try {
            const { followers, following, contacts } = getState().User;
            let perPareList = [];
            [followers, following, contacts].forEach(e => {
                e.forEach(id => {
                    if (!perPareList.includes(id)) return perPareList.push(id)
                });
            });
            const res = await api.get("/users/", { params: { users: perPareList } });
            return res.data.users
        } catch (error) {
            return rejectWithValue()
        }
    }
)

export const PostSharedMedia = createAsyncThunk(
    "PostSharedMedia",
    async (reciveirs, { rejectWithValue, getState, dispatch }) => {
        try {
            const { contentId, type } = getState().SharePostReducer
            const res = await api.post("/shares/create", { reciveirs, contentId, type })
            dispatch(Ten([, `${type.substring(0, type.length - 1)} Sent  successfully `]))
            return true
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const FilterFriendsWitchShare = createAsyncThunk(
    "FilterFriendsWitchShare",
    async (_, { rejectWithValue }) => {
        try {
            const res = await api.get('/shares/FilterFriendsWitchShare');
            return res.data;
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

export const GetSharedMedia = createAsyncThunk(
    "GetSharedMedia",
    async (friendId, { rejectWithValue }) => {
        try {
            const res = await api.get('/shares/getSharedMedia', { params: { friendId } });
            console.log(res.data);

            return { data: res.data, friendId }
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)


const SharePostSlice = createSlice({
    name: "SharePostSlice",

    initialState: {
        isLoading: false,
        isVisible: false,
        contentId: null,
        type: null,
        ListFriendToShareWidth: [],

        // ---------------------

        isLoadingSharesFromFriendsObject: false,
        SharesFromFriendsObject: {},

        // -------------

        isGettingShares: false,
        choosedFriend: null,

        // -------------

        isShowingsPost: false,
        targetPost: null,

    },

    reducers: {
        open_shareWithFriends: (s, a) => {
            s.isVisible = true;
            s.type = a.payload.type;
            s.contentId = a.payload.contentId;
        },

        close_shareWithFriends: (s, a) => {
            s.isVisible = false
        },
        open_ShowSharedPosts: (s, a) => {
            s.isShowingsPost = true;
            s.targetPost = a.payload
        },
        close_ShowSharedPosts: (s) => {
            s.isShowingsPost = false;
        },
    },
    extraReducers: b =>
        b.
            addCase(getListFriendToShareWith.pending, s => { s.isLoading = true })
            .addCase(getListFriendToShareWith.fulfilled, (s, a) => {
                s.ListFriendToShareWidth = a.payload;
                s.isLoading = false
            })
            .addCase(getListFriendToShareWith.rejected, (s, a) => {
                s.isLoading = false;
            })
            .addCase(PostSharedMedia.fulfilled, (s, a) => {
                s.contentId = null;
                s.type = null

            })
            .addCase(FilterFriendsWitchShare.pending, s => { s.isLoadingSharesFromFriendsObject = true })
            .addCase(FilterFriendsWitchShare.fulfilled, (s, a) => {
                s.SharesFromFriendsObject = a.payload;
                s.isLoadingSharesFromFriendsObject = false
            })
            .addCase(FilterFriendsWitchShare.rejected, (s, a) => {
                s.isLoadingSharesFromFriendsObject = false;
            })

            .addCase(GetSharedMedia.pending, s => { s.isGettingShares = true })
            .addCase(GetSharedMedia.fulfilled, (s, a) => {
                s.SharesFromFriendsObject[a.payload.friendId]['media'] = a.payload.data.sort((a, b) =>
                    new Date(a.createAt) - new Date(b.createAt)
                );
                s.choosedFriend = a.payload.friendId
                s.isGettingShares = false
            })
            .addCase(GetSharedMedia.rejected, (s, a) => {
                s.isGettingShares = false;
            })
});


export const { open_shareWithFriends, close_shareWithFriends, open_ShowSharedPosts, close_ShowSharedPosts } = SharePostSlice.actions
export default SharePostSlice.reducer