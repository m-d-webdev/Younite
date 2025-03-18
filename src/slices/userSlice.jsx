import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from 'js-cookie'
import api from "../config/axios";
import ReactDOM from 'react-dom'
import { Ten } from "./ten_slice";
import { start_loading, stop_loading } from './loader'
import { getSocket } from "../config/socket";
import { UpdateField } from "./profileSlice";

export const identificat_user = async (_id) => {
    return new Promise(
        async (resolve, reject) => {
            try {
                let data = api.get('/user/identification', { params: { _id } })
                resolve(data);
            } catch (error) {
                reject(error);
            }
        }
    )
}

export const logoutUser = createAsyncThunk(
    "logoutUser",
    (_, { rejectWithValue }) => {
        Cookies.remove("Access_token");
        window.location.href = "http://localhost:5000/login"
    }
)

export const get_user_personal_data = createAsyncThunk(
    "userSlice/get_user_personal_data",
    async (_, { dispatch, rejectWithValue }) => {
        try {
            let user = await api.get("/user/get_all_user_data");

            return user.data;

        } catch (error) {
            console.log(error.message);
            return rejectWithValue();
        }
    }
)
export const get_profile_personal_info = createAsyncThunk(
    "userSlice/get_profile_personal_info",
    async (_, { dispatch, rejectWithValue }) => {
        try {

            let user = await api.get("/user/get_profile_personal_info");

            console.log(user.data);

            return user.data;

        } catch (error) {
            console.log(error.message);
            return rejectWithValue();
        }
    }
)

export const AddTocontcatThunk = createAsyncThunk(
    "AddTocontcatThunk",
    async (contactId, { rejectWithValue, dispatch, getState }) => {
        try {
            await api.post('/user/addToConact', { contactId });
            dispatch(Ten([, "Successfully added to your contacts."]))
            return contactId;
        } catch (error) {
            console.log(error);
            dispatch(Ten([false, "Could not be added to your contacts. "]))
            return rejectWithValue(error)
        }

    }

)

export const BlockUser = createAsyncThunk(
    "BlockUser",
    async (Blocked_person, { rejectWithValue, dispatch, getState }) => {
        try {
            if (Blocked_person) {
                dispatch(start_loading())
                let res = await api.post('/user/BlockFriend', { Blocked_person });
                const socket = getSocket();
                await socket.emit('friend-blocked', res.data)
                dispatch(stop_loading());
                dispatch(Ten([, "Successfully blocked."]))
                return res.data;
            }
            return rejectWithValue();
        } catch (error) {
            console.log(error);
            dispatch(stop_loading());
            dispatch(Ten([false, "Failed to block"]))
            return rejectWithValue(error)
        }
    }
)
export const UnBlockUser = createAsyncThunk(
    "UnBlockUser",
    async (Blocked_person, { rejectWithValue, dispatch, getState }) => {
        try {
            if (Blocked_person) {
                const { _id } = getState().User
                dispatch(start_loading())
                await api.post('/user/UnBlockFriend', { Blocked_person });
                const socket = getSocket();
                await socket.emit('friend-Unblocked', { _id, Blocked_person })
                dispatch(Ten([, "Successfully Unblocked."]))
                dispatch(stop_loading());
                return Blocked_person;
            }
            return rejectWithValue()
        } catch (error) {
            dispatch(stop_loading())
            console.log(error);
            dispatch(Ten([false, "Failed to Unblocke"]))
            return rejectWithValue(error)
        }
    }
)

const userSlice = createSlice({
    name: "userSlice",
    initialState: {
        isLoaingUserData: false,
        _id: null,
        FirstName: null,
        LastName: null,
        profile_img: null,
        likes: [],
        followers: [],
        following: [],
        contacts: [],
        requestsContact: [],
        isBlockingFriend: false,
        isUnBlockingFriend: false,
        blockersList: [],
        blockedList: [],
        isAddingToCOntact: false,
        isAddLinkCmpVsbl: false,
        SelectedLinkToEdit: {},
        viewed: {
            posts: [],
            reels: [],
            blogs: [],
            moments: [],
            notifications: []
        },
    },

    reducers: {
        update_user_data: (state, action) => {
            switch (action.payload.key) {
                case "FirstName":
                    state.FirstName = action.payload.value
                    break;
                case "LastName":
                    state.LastName = action.payload.value
                    break;
                case "profile_img":
                    state.profile_img = action.payload.value
                    break;
            }
        },
        add_like_in_local: (state, action) => {
            state.likes.push(action.payload);
        },
        add_viewed_article_in_local: (state, action) => {
            state.viewed[action.payload[0]].push(action.payload[1]);
        },
        dislike_in_local: (state, action) => {
            state.likes = state.likes.filter(l => l._id != action.payload)
        },
        add_following_in_local: (state, action) => {
            state.following.push(action.payload);
        },
        remove_following_in_local: (state, action) => {
            state.following = state.following.filter(l => l != action.payload)
        },
        AddToContactLocal: (state, action) => {
            if (!state.contacts.includes(action.payload)) {
                state.contacts.push(action.payload)
            }
        },
        AddToRequestLocal: (state, action) => {
            if (!state.requestsContact.includes(action.payload)) {
                state.requestsContact.push(action.payload);
            }
        },
        deleteFromContactLocal: (state, action) => {
            state.requestsContact = state.requestsContact.filter(e => e != action.payload)
        },
        friend_blocked_me: (state, action) => {
            console.log('dispatched friend blocked me => ', action.payload);
            if (!state.blockersList.some(e => e.Blocker == action.payload.blocker)) {
                state.blockersList.push(action.payload);
            }
        },
        friend_unblocked_me: (state, action) => {
            console.log('dispatched friend Unblocked me => ', action.payload);
            state.blockersList = state.blockersList.filter(f => f.Blocker != action.payload);
            console.log(state.blockersList);

        },

        // ===========
        open_addLink: (state, action) => {
            if (action.payload?._id) {
                state.isEditingLink = true;
                state.SelectedLinkToEdit = action.payload
            } else {
                state.isEditingLink = false;
                state.SelectedLinkToEdit = {}
            }
            state.isAddLinkCmpVsbl = true

        },
        close_addLink: (state) => { state.isAddLinkCmpVsbl = false }
    },
    extraReducers: (builder) => {
        builder
            .addCase(get_user_personal_data.pending, (state) => {
                state.isLoaingUserData = true
            })
            .addCase(get_user_personal_data.fulfilled, (state, action) => {
                state._id = action.payload._id
                state.FirstName = action.payload.FirstName
                state.LastName = action.payload.LastName
                state.profile_img = action.payload.profile_img
                state.likes = action.payload.likes
                state.followers = action.payload.followers
                action.payload.contacts ? state.contacts = action.payload.contacts : null
                state.following = action.payload.following
                state.viewed.moments = action.payload.viewed_moments;
                state.requestsContact = action.payload.requestsContact;
                state.blockedList = action.payload.blockedList;
                state.blockersList = action.payload.blockersList;
                state.isLoaingUserData = false;
            })
            .addCase(get_user_personal_data.rejected, (state, action) => {
                state.isLoaingUserData = false;
            })
            // ==============
            .addCase(AddTocontcatThunk.pending, state => { state.isAddingToCOntact = true })
            .addCase(AddTocontcatThunk.fulfilled, (state, action) => {

                state.isAddingToCOntact = false;
                if (!state.contacts.includes(action.payload)) {
                    state.contacts.push(action.payload);
                }
                state.requestsContact = state.requestsContact.filter(s => s != action.payload)
                console.log('all done =>', action);

            })
            .addCase(AddTocontcatThunk.rejected, state => { state.isAddingToCOntact = false })

            // 
            .addCase(BlockUser.pending, state => { state.isBlockingFriend = true })
            .addCase(BlockUser.fulfilled, (state, action) => {
                state.isBlockingFriend = false;
                // state.contacts = state.contacts.filter(s => s != action.payload)
                // state.requestsContact = state.requestsContact.filter(s => s != action.payload)
                state.blockedList.push(action.payload)

            })
            .addCase(BlockUser.rejected, state => { state.isBlockingFriend = false })
            // 
            .addCase(UnBlockUser.pending, state => { state.isUnBlockingFriend = true })
            .addCase(UnBlockUser.fulfilled, (state, action) => {
                state.isUnBlockingFriend = false;
                state.blockedList = state.blockedList.filter(s => s.Blocked_person != action.payload)
                
            })
            .addCase(UnBlockUser.rejected, state => { state.isUnBlockingFriend = false })

            // ----------------------
            .addCase(UpdateField.fulfilled, (state, action) => {
                state[action.payload.field] ? state[action.payload.field] = action.payload.newVal : null
            })


    }

});
export const {
    update_user_data,
    add_like_in_local,
    dislike_in_local,
    add_following_in_local,
    remove_following_in_local,
    add_viewed_article_in_local,
    AddToContactLocal,
    deleteFromContactLocal,
    AddToRequestLocal,
    friend_blocked_me,
    friend_unblocked_me,
    open_addLink,
    close_addLink

} = userSlice.actions
export default userSlice.reducer;

