
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../config/axios";
import ReactDOM from 'react-dom'
import Dev from '../components/dev'
import { useEffect, useRef, useState } from "react";
import { _onClickOut } from "../components/Abbreviator";
import { useDispatch } from "react-redux";
import { motion } from 'framer-motion'
import { start_loading, stop_loading } from "./loader";
import { open_alert } from "./alert_cmp";
import { close_addLink, update_user_data } from "./userSlice";
import { Ten } from "./ten_slice";


// -***************************

export const Update_profile_pic = createAsyncThunk(
    "profileSlice/Update_profile_pic",
    async (file, { dispatch, rejectWithValue }) => {
        try {
            dispatch(start_loading());
            const F = new FormData();
            F.append("profile_pic", file)
            return await api.post("/user/upload_profile", F)
                .then(res => {
                    console.log(res);

                    const imgUr = res.data.img_url;
                    dispatch(stop_loading());
                    dispatch(hide_upload_pic());
                    dispatch(open_alert([, "Profile picture has been successfully aptated"]))

                    dispatch(update_user_data({ key: "profile_img", value: imgUr }))
                    return imgUr;

                })
                .catch(er => {
                    console.log(er.message);

                    dispatch(stop_loading())
                    dispatch(open_alert([false, "Failed to update your profile picutr"]))

                })
        } catch (error) {
            console.log(error.message);
            return rejectWithValue()

        }
    }
)
export const GetProfileUserInfo = createAsyncThunk(
    "GetProfileUserInfo",
    async (_, { rejectWithValue }) => {
        try {
            let res = await api.get("/user/get_profile_personal_info");
            return res.data

        } catch (error) {
            return rejectWithValue()
        }

    }
)


export const DeleteLinkFromProfile = createAsyncThunk(
    "DeleteLinkFromProfile",
    async (_id, { rejectWithValue }) => {
        try {
            let res = await api.post("/user/DeleteLinkFromProfile", { _id })
            return _id
        } catch (error) {
            return rejectWithValue()
        }
    }
)


export const AddLinkToProfile = createAsyncThunk(
    "AddLinkToProfile",
    async ({ LinkDesc, bodyLink }, { dispatch, rejectWithValue }) => {
        try {
            let res = await api.post("/user/addLinkToProfile", { LinkDesc, bodyLink });
            if (res.status == 200) {
                dispatch(open_alert([, "Your link was succesfuly  added to your profile "]))
                dispatch(close_addLink())
                return res.data
            } else {
                dispatch(Ten([false, "There was a probleme while saving the link"]))
                return rejectWithValue()
            }

        } catch (error) {
            return rejectWithValue()
        }

    }
)

export const UpdateLink = createAsyncThunk(
    "UpdateLink",
    async (q, { dispatch, rejectWithValue }) => {
        try {
            let res = await api.post("/user/updateUserFiel", q);
            if (res.status == 200) {
                dispatch(open_alert([, "Your link was succesfuly updated "]))
                dispatch(close_addLink());
                return q
            } else {
                dispatch(Ten([false, "Failed to update the link "]))
                return rejectWithValue()
            }
        } catch (error) {
            return rejectWithValue()
        }

    }

)


export const GetFollowingTOEdit = createAsyncThunk(
    "GetFollowingTOEdit",
    async (_, { rejectWithValue, getState }) => {
        try {
            const _id = getState().User._id;

            let res = await api.get("/users/get_friend_followings", { params: { _id } });
            console.log(res);
            return res.data.following
        } catch (error) {
            return rejectWithValue(error)
        }

    }
)
export const GetFollowersTOEdit = createAsyncThunk(
    "GetFollowersTOEdit",
    async (_, { rejectWithValue, getState }) => {
        try {
            const _id = getState().User._id;
            let res = await api.get("/users/get_friend_followers", { params: { _id } });
            return res.data.followers
        } catch (error) {
            return rejectWithValue(error)
        }

    }
)
export const GetContactsTOEdit = createAsyncThunk(
    "GetContactsTOEdit",
    async (_, { rejectWithValue, getState }) => {
        try {
            let res = await api.get("/user/get_contacts");
            return res.data.contacts;
        } catch (error) {
            return rejectWithValue(error)
        }

    }
)
export const GetContactsRequests = createAsyncThunk(
    "GetContactsRequests",
    async (_, { rejectWithValue, getState }) => {
        try {

            let res = await api.get("/user/GetContactsRequests");
            return res.data;

        } catch (error) {

            return rejectWithValue(error)
        }

    }
)

export const GetBlockedList = createAsyncThunk(
    "GetBlockedList",
    async (_, { rejectWithValue, getState }) => {
        try {

            let res = await api.get("/user/GetBlockedPersons");
            console.log(res);
            return res.data;

        } catch (error) {

            return rejectWithValue(error)
        }

    }
)

export const UpdateField = createAsyncThunk(
    "UpdateField",
    async ({ field, newVal }, { rejectWithValue, getState }) => {
        try {
            let res = await api.post('/user/updateUserFiel', { field, newVal })
            return { field, newVal };

        } catch (error) {

            return rejectWithValue(error)
        }

    }
)

// ------------------------

export const GetPersonalPosts = createAsyncThunk(
    "GetPersonalPosts",
    async (_, { rejectWithValue }) => {
        try {
            const res = await api.get("/profile/GetPersonalPosts");
            return res.data;

        } catch (error) {
            return rejectWithValue(error);

        }
    }
)



export const GetPersonalBlogs = createAsyncThunk(
    "GetPersonalBlogs",
    async (_, { rejectWithValue }) => {
        try {
            const res = await api.get("/profile/GetPersonalBlogs");
            return res.data;
        } catch (error) {
            return rejectWithValue(error);

        }
    }
)





export const GetPersonalReels = createAsyncThunk(
    "GetPersonalReels",
    async (_, { rejectWithValue }) => {
        try {
            const res = await api.get("/profile/GetPersonalReels");
            console.log(res.data);

            return res.data;
        } catch (error) {
            return rejectWithValue(error);

        }
    }
)







const ProfileSlice = createSlice({
    name: "profileSlice",
    initialState: {


        data: null,
        isLoadingData: true,
        isLoadingFollowing: false,
        listFollowingToEdit: [],
        listFollowersToEdit: [],
        listContactsToEdit: [],
        listRequests: [],
        listBlockeds: [],
        //----- 

        personalPosts: {
            isLoadingPosts: false,
            posts: []
        },
        personalReels: {
            isLoadingReels: false,
            reels: []
        },
        personalBlogs: {
            isLoadingBlogs: false,
            blogs: []
        },

        // --------------------
        cmps_params: {
            Upload_prof_pic_vsbl: false
        }

    },
    reducers: {
        open_upload_pic: (state, action) => {
            state.cmps_params.Upload_prof_pic_vsbl = true
        }
        , hide_upload_pic: (state) => {
            state.cmps_params.Upload_prof_pic_vsbl = false
        }
    },
    extraReducers: b => {
        b
            .addCase(GetProfileUserInfo.pending, state => { state.isLoadingData = true })
            .addCase(GetProfileUserInfo.fulfilled, (state, action) => {
                state.data = action.payload
                state.isLoadingData = false;
            })
            .addCase(GetProfileUserInfo.rejected, state => { state.isLoadingFollowing = false })
            // --------------
            .addCase(GetFollowingTOEdit.pending, state => { state.isLoadingFollowing = true })
            .addCase(GetFollowingTOEdit.fulfilled, (state, action) => {
                state.listFollowingToEdit = action.payload
                state.isLoadingFollowing = false;
            })
            .addCase(GetFollowingTOEdit.rejected, state => { state.isLoadingFollowing = false })
            // --------------

            .addCase(GetFollowersTOEdit.pending, state => { state.isLoadingFollowing = true })
            .addCase(GetFollowersTOEdit.fulfilled, (state, action) => {
                state.listFollowersToEdit = action.payload
                state.isLoadingFollowing = false;
            })
            .addCase(GetFollowersTOEdit.rejected, state => { state.isLoadingFollowing = false })

            // --------------

            .addCase(GetContactsTOEdit.pending, state => { state.isLoadingFollowing = true })
            .addCase(GetContactsTOEdit.fulfilled, (state, action) => {
                state.listContactsToEdit = action.payload
                state.isLoadingFollowing = false;
            })
            .addCase(GetContactsTOEdit.rejected, state => { state.isLoadingFollowing = false })
            // -*------------------
            .addCase(GetContactsRequests.pending, state => { state.isLoadingFollowing = true })
            .addCase(GetContactsRequests.fulfilled, (state, action) => {
                state.listRequests = action.payload
                state.isLoadingFollowing = false;
            })
            .addCase(GetContactsRequests.rejected, state => { state.isLoadingFollowing = false })
            // -*------------------
            .addCase(GetBlockedList.pending, state => { state.isLoadingFollowing = true })
            .addCase(GetBlockedList.fulfilled, (state, action) => {
                state.listBlockeds = action.payload
                state.isLoadingFollowing = false;
            })
            .addCase(GetBlockedList.rejected, state => { state.isLoadingFollowing = false })

            // --------------
            .addCase(DeleteLinkFromProfile.fulfilled, (state, action) => {
                state.data.links = state.data.links.filter(e => e._id != action.payload)
            })
            .addCase(UpdateLink.fulfilled, (state, action) => {
                state.data.links = state.data.links.map(e => e._id == action.payload.newVal._id ? { ...e, url: action.payload.newVal.url, description: action.payload.newVal.description } : e)
            })
            // ----------
            .addCase(AddLinkToProfile.fulfilled, (state, action) => {
                state.data.links.push(action.payload)
            })
            //    -----------
            .addCase(UpdateField.fulfilled, (state, action) => {
                state.data[action.payload.field] = action.payload.newVal
            })
            // --------------- P E R S O N A  < P O S T S ------------

            .addCase(GetPersonalPosts.pending, (s) => {
                s.personalPosts.isLoadingPosts = true;
            })

            .addCase(GetPersonalPosts.fulfilled, (s, a) => {
                s.personalPosts.isLoadingPosts = false;
                s.personalPosts.posts = a.payload
            })

            .addCase(GetPersonalPosts.rejected, (s) => {
                s.personalPosts.isLoadingPosts = false;
            })

            // -*----------------
            .addCase(GetPersonalReels.pending, (s) => {
                s.personalReels.isLoadingReels = true;
            })

            .addCase(GetPersonalReels.fulfilled, (s, a) => {
                s.personalReels.isLoadingReels = false;
                s.personalReels.reels = a.payload
            })

            .addCase(GetPersonalReels.rejected, (s) => {
                s.personalReels.isLoadingReels = false;
            })
            // -*----------------
            .addCase(GetPersonalBlogs.pending, (s) => {
                s.personalBlogs.isLoadingBlogs = true;
            })

            .addCase(GetPersonalBlogs.fulfilled, (s, a) => {
                s.personalBlogs.isLoadingBlogs = false;
                s.personalBlogs.blogs = a.payload
            })

            .addCase(GetPersonalBlogs.rejected, (s) => {
                s.personalBlogs.isLoadingBlogs = false;
            })
    }

})
export const { open_upload_pic, hide_upload_pic } = ProfileSlice.actions
export default ProfileSlice.reducer;

// ======================================

export function Upload_prof_pic() {
    const dispatch = useDispatch()
    const ProfRef = useRef();
    const [img_file, setImg_files] = useState('')
    const [IsDraggin, setIsDraggin] = useState(false)

    useEffect(() => {
        if (ProfRef.current) {
            _onClickOut(ProfRef.current, () => dispatch(hide_upload_pic()))
        }
    }, [ProfRef])

    const handelDropOver = (e) => {
        e.preventDefault();
        setIsDraggin(true);
        e.dataTransfer.dropEffect = "copy"
    }


    const handelDrop = (e) => {
        e.preventDefault();
        setIsDraggin(true);
        const file = e.dataTransfer.files[0];
        if (file.type.split("/")[0] == "image") {
            setImg_files(file)
        } else {
            // ----------------

        }

    }

    const handelSubmitForm = async (e) => {
        e.preventDefault();
        dispatch(Update_profile_pic(img_file))
    }

    return ReactDOM.createPortal(
        <div className='backendMer'>
            <Dev
                initial={{
                    scale: .8,
                    opacity: 0,
                    transformOrigin: "center bottom"
                }}
                exit={{
                    scale: .9,
                    opacity: 0,
                    transformOrigin: "center bottom"
                }}
                animate={{
                    transformOrigin: "center bottom",
                    scale: 1, opacity: 1,
                }}
                ref={ProfRef} className={"w500  p10 br10  bg-l"} >
                <form onSubmit={handelSubmitForm} className="wmia c-s-c" encType="multipart/form-data">
                    <h2 className="wmia">Update your profile picture </h2>
                    {
                        img_file ?
                            <>
                                <motion.img
                                    initial={{
                                        scale: 0
                                    }}
                                    animate={{
                                        scale: 1
                                    }}
                                    src={URL.createObjectURL(img_file)} className="w200 h200 imgCercle mt50 mb20" alt="" />
                                <button className="mt20 wmia p10 bg-g">
                                    Choose this image <svg className="ml10" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M400-304 240-464l56-56 104 104 264-264 56 56-320 320Z" /></svg>
                                </button>
                                <label onClick={() => setImg_files(null)} className="cr p10 mt15 wmia">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" /></svg>
                                    Choose another image
                                </label>

                            </>
                            :
                            <>
                                <div className="wmia p10 h100  bg-fourth mt20 r-c-c" onDragOver={handelDropOver} onDragLeave={() => setIsDraggin(false)} onDrop={handelDrop}>
                                    {
                                        IsDraggin ?
                                            <>
                                                <svg version="1.1" viewBox="0 0 2048 2048" width="128" height="128" xmlns="http://www.w3.org/2000/svg">
                                                    <path transform="translate(503,106)" d="m0 0h693l16 2 12 4 11 7 9 9 8 14 5 12 2 10v8l-3 14-5 12-6 11-8 10-10 8-12 4-13 2-13 1-634 1-52 1-28 2-27 4-21 6-20 7-22 10-22 13-16 12-13 10-15 14-13 13-11 14-9 12-16 25-11 23-6 14-9 28-4 16-3 22-1 14-1 54v804l13-11 8-9 8-10 9-11 11-14 11-13 9-11 13-15 11-14 36-44 13-16 10-11 8-10 11-13 10-12 7-8 19-19 14-11 18-13 22-12 27-11 19-5 23-4 28-2 26 1 32 5 19 5 16 6 25 12 19 12 12 9 13 11 5 4v2l4 2v2l4 2 7 8 9 10 9 11 11 13 9 11 11 13 11 14 13 16 7 10 5-1 9-9 7-8 9-10 9-11h2l2-4 9-11 16-17 8-10 10-11 7-8 24-28 9-10 8-10 15-16 9-11 14-15 7-8 13-16 11-12 9-11 12-14 9-11h2l2-4 12-13 12-12 11-9 12-9 17-11 18-10 23-10 20-6 20-4 15-2 14-1h20l26 2 30 5 19 6 17 7 23 12 24 16 9 8 11 9 19 19 7 8 9 10 7 8 9 10 9 11 11 12 7 8 12 14 9 10 9 11 9 10 7 8 13 15 12 14 12 13 9 11 13 14 7 8 12 14 9 10 9 11 13 15 10 11 9 11 12 13 12 14 11 12 7 8 13 14 9 11 7 7 7 8 14 17 9 10 4 5 2 1v2l4 2 2 3h2l-1-31v-476l2-14 8-16 7-9 8-8 10-7 12-6 14-3h10l14 3 14 8 11 9 9 11 8 15 2 8 1 10-1 679-1 26-4 40-5 30-7 25-9 27-11 26-8 16-12 22-15 24-9 12-10 13-13 15-16 17-15 14-11 9-15 12-18 13-25 15-27 14-28 12-27 9-26 7-27 5-33 4-35 2-75 1-311-1h-653l-28-2-40-6-26-6-30-10-24-10-29-14-17-10-18-12-11-8-14-11-14-12-12-11-17-17-7-8-9-10-13-17-11-15-12-19-15-28-11-24-10-26-8-28-6-27-5-35-2-33v-1011l1-39 2-24 4-28 6-28 6-20 8-24 13-30 13-25 12-20 8-12 8-11 14-18 12-14 29-29 14-11 15-12 18-13 21-13 22-12 21-10 26-10 19-6 25-6 36-6 20-2zm762 901-18 3-16 6-16 9-14 12-8 7-12 13-9 11-13 15-12 14-9 10-11 13-11 12v2h-2l-7 8-11 13-13 15-12 14-10 11-9 11-11 12-9 11-8 8-8 10-10 11-7 8-24 28-9 10-8 10-13 14-9 11-7 7-9 11-9 9-7 8-13 12-16 8-18 7-16-2-15-6-12-8-15-15-1-2h-2l-2-4-12-14-9-11-11-13-11-14-11-13-11-14-9-10-8-10-11-13-9-11-9-10-7-8-11-11-15-11-21-10-15-4-9-1h-28l-18 4-18 8-10 7-13 11-10 10-9 11-12 14-13 16-10 13-8 10-11 13-9 11-11 13-9 11-8 10-10 12-8 10-13 16-9 11-11 13-11 14-9 10-7 9-13 16-11 14-13 15-9 11-7 8-9 11-12 14-7 9-9 12-3 8 1 13 3 18 9 31 8 22 10 21 10 17 12 17 9 11 14 15 8 9 11 9 9 8 11 8 15 10 24 13 26 12 24 8 22 5 20 3 25 2 27 1h933l61-1 32-2 25-4 22-6 21-7 20-9 24-13 15-10 16-12 13-11 3-2v-2h2l7-8 9-9 9-11 10-13 10-15 9-16 9-19 6-15 7-25 8-35v-10l-7-14-22-26-10-11-9-11-14-15-7-8-9-10-7-8-12-14-10-11-9-11-11-12-9-11-12-13-7-8-12-14-12-13-7-8-12-14-11-12-7-8-2-3h-2l-2-4-12-14-9-10-9-11-10-11-7-8-12-14-12-13-7-8-2-3h-2l-2-4-11-12-9-11-12-13-9-11-10-11-9-11-11-12-7-8-12-14-4-5h-2l-2-4-11-12-9-11-4-5h-2l-2-4-15-16-7-7-16-12-12-7-19-7-15-3-9-1z" />
                                                    <path transform="translate(1616,106)" d="m0 0h11l14 3 9 4 12 7 6 5 8 10 6 11 3 15 1 22v87l-1 90-1 2h188l17 1 16 4 11 7 8 7 9 14 5 11 3 13v12l-4 16-4 10-10 14-9 9-12 6-16 3-15 1h-186v195l-2 16-4 10-8 12-8 8-11 7-15 6-8 2h-12l-16-3-12-5-11-7-9-9-7-11-4-12-2-21v-188l-109 1h-83l-20-2-10-4-12-9-7-8-6-10-6-15-3-13v-11l4-15 9-17 9-10 9-8 7-4 13-3h203v-29l1-165 2-16 8-16 7-9 9-8 11-7 11-4z" />
                                                    <path transform="translate(579,362)" d="m0 0h32l22 2 25 5 21 7 17 7 22 12 17 12 15 12 11 9 11 11 11 14 8 11 11 18 12 25 9 25 5 20 3 21v46l-3 23-5 20-10 27-8 16-12 21-9 13-9 11-11 12-17 16-18 13-17 10-16 8-14 6-21 7-21 5-21 3-15 1h-27l-25-3-21-5-20-7-20-9-18-10-14-10-10-8-10-9-5-4v-2l-4-2v-2h-2l-7-8-10-12-12-17-12-21-9-20-8-23-5-19-4-24-1-15v-13l2-17 6-29 9-29 12-26 9-15 7-11 8-10 6-8 14-15 13-12 14-10 15-10 21-12 16-7 17-6 24-6zm10 129-21 3-14 5-13 7-11 8-14 14-8 11-9 17-5 15-3 19v15l4 20 6 16 9 16 9 11 9 9 12 9 16 8 15 5 11 2 18 1 15-1 16-4 17-8 15-10 14-13 10-14 7-14 6-19 1-8v-30l-2-13-6-16-8-15-8-10-2-3h-2l-2-4-14-11-10-6-15-7-17-4-9-1z" />
                                                </svg>

                                                <p className="ml10">Grop right here .. </p>

                                            </> :

                                            <>
                                                <svg version="1.1" className="w20 h20" viewBox="0 0 2048 2048" xmlns="http://www.w3.org/2000/svg">
                                                    <path transform="translate(1123,53)" d="m0 0h40l21 2 24 5 21 7 33 16 19 12 17 13 14 12 12 11 10 10 8 7 51 51v2l3 1 5 6 7 6 6 7 6 5 6 7 6 5 6 7 6 5 6 7 6 5 6 7 6 5 6 7 6 5 6 7 6 5 6 7 6 5 6 7 6 5 6 7 6 5 6 7 6 5 6 7 6 5 6 7 6 5 6 7 6 5 6 7 6 5 6 7 6 5 6 7 6 5 6 7 6 5 6 7 6 5 6 7 6 5 6 7 6 5 6 7 6 5 6 7 6 5 6 7 6 5 6 7 6 5 6 7 6 5 6 7 6 5 5 6 7 6 5 6 8 7 65 65v2h2l7 8 13 13 7 8 11 13 13 15 9 11 11 13 13 16 12 16 10 14 13 21 12 22 14 26 19 37 10 25 14 43 10 34 6 19 7 32 4 27 3 26 1 3h3v2l2 1v5h-5v7l3 1 1 10 1 4v100l-1 6 1 4v41l-2-1-1-14-1-1v-5h-2l-2 6-6 37-6 27-11 37-9 30-12 36-11 24-11 21-6 12-11 20-7 14-14 24-7 11-10 13-6 8-10 12-7 9-12 15-9 11-11 13-9 10-8 10h-2l-2 4-7 8h-2l-2 4-161 161-8 7-8 8-11 9-12 11-11 9-14 12-13 10-22 16-15 10-15 9-18 10-29 15-21 10-29 11-31 10-28 8-26 6-38 6-38 4-47 3-32 1h-471l-44-2-34-3-37-6-32-8-36-12-19-7-22-10-19-10-23-13-14-9-17-12-16-13-11-9-15-13-7-7-7-6v-2l-3-1-7-8-12-13-9-11-11-13-14-19-13-20-12-21-17-33-10-23-12-36-7-24-6-27-4-30-4-42-2-38v-166l-6-9-32-32v-2l-3-1-17-17v-2l-4-2-8-8v-2l-4-2v-2l-4-2-8-8v-2l-4-2-56-56v-2h-2l-7-8-10-10-7-8-9-10-10-13-11-15-11-19-9-20-10-28-3-7-3-6v-99l2 3 4-9 9-27 11-24 11-20 9-13 12-16h2l2-4 16-16 11-9 14-10 10-7 15-9 17-8 37-13 13-4 1-5-13-29-9-21-5-14-5-19-3-29-1-12v-28l5-25 7-25 7-21 6-13 7-13 9-13 11-15 10-13 11-12 12-11 11-8 13-10 20-12 19-9 27-9 22-6 18-2h44l22 2 24 6 21 8 7 3 8 2 6 2 3-17 6-20 8-24 13-27 13-19 10-14 7-9 8-10 13-13 16-12 16-11 22-12 16-7 18-6 24-6 22-3 22-1 33 2 23 4 24 7 21 8 25 13 14 10 14 11 4 4 5-1 3-5 5-16 10-26 5-12 12-20 16-22 7-9 11-12 11-11 14-11 15-10 21-12 18-8 27-9 18-4zm18 108-16 1-23 5-19 8-16 10-13 11-10 10-11 15-7 12-6 15-5 18-3 18v21l5 25 5 15 7 14 14 20 11 14 4 5h2l2 4 11 12 10 14 5 11 2 7v13l-3 11-7 11-1 3h-2l-5 5-9 8-12 6-12 3-9-1-12-4-11-7-10-8-11-10-8-7-56-56-4-5-4-4h-2l-2-4h-2l-2-4h-2l-2-4h-2l-2-4-44-44-8-7-13-11-18-12-10-6-21-9-18-4-8-1h-28l-18 3-16 5-16 8-16 11-12 11-7 7-9 12-9 16-4 8-7 25-3 18v18l3 19 5 18 5 12 10 16 9 12 8 10 9 10 10 10 6 7h2l1 3 8 7 4 5 8 7 102 102 11 14 6 11 4 12v13l-5 14-7 11-1 3h-2l-5 5-7 6-12 5-10 2h-8l-10-2-16-8-10-8-10-9-7-7h-2v-2h-2v-2l-4-4h-2l-2-4-8-8h-2l-2-4-12-12h-2l-2-4-12-12h-2l-2-4-153-153-22-18-15-10-19-10-19-6-18-3-16-1-21 2-19 5-21 10-16 11-10 8-8 8-9 12-9 15-7 15-5 17-4 25v16l3 19 6 20 7 12 6 11 8 12 12 14 9 10 213 213 7 8 13 17 6 13 2 8v8l-4 13-7 11-11 12-9 7-9 4-14 3-16-4-13-7-11-10-8-7-105-105-8-7-15-13-19-13-17-9-15-5-22-4-7-1h-20l-25 4-18 6-15 8-15 11-10 9-13 16-7 11-9 17-6 20-4 24v13l3 20 5 17 11 23 10 15 13 16 15 16 338 338h2l2 4h2l2 4h2l2 4 21 21 9 11 10 15 4 11 1 5v7l-4 13-9 14-11 12-7 5-14 4h-17l-12-4-11-6-15-13-102-102-8-6h-4l1 44v29l2 31 4 34 6 29 11 37 8 21 12 26 12 22 9 14 8 11 10 13 12 14 7 8 9 10 12 11 11 9 14 12 19 13 13 8 21 12 27 13 25 9 29 9 31 6 36 4 33 2 55 1h367l76-1 40-2 46-4 28-4 24-6 45-14 27-11 37-19 27-16 15-10 16-12 14-11 15-13 13-11 14-13 8-7 168-168v-2l4-2 9-11 9-10 7-8 9-11 8-9 11-14 8-10 10-13 12-19 9-16 6-10 6-11 22-44 9-23 9-28 12-41 6-26 5-30 3-29 3-43v-32l-5-52-5-38-6-27-10-35-15-47-16-35-12-23-13-23-9-16-14-21-7-9-11-14-11-13-9-11-11-13-8-10-10-11-7-8-23-23-6-7-6-5-2-3h-2l-2-4h-2l-2-4h-2l-2-4-4-4h-2l-2-4h-2l-2-4h-2l-2-4-4-4h-2l-2-4h-2l-2-4-8-7-354-354-6-7-8-7-4-5-6-5-6-7h-2l-2-4h-2l-2-4-4-4h-2l-2-4h-2l-2-4-15-14-7-7-11-9-10-8-14-9-10-6-17-7-17-4-13-2zm-1139 871m2040 41m0 2 1 3zm2 0m0 16v5h1v-5zm2 13m-2 99m-1 4m-2 16m0 2 1 2z" />
                                                    <path transform="translate(2047,1058)" d="m0 0h1v7l-2-4z" />
                                                    <path transform="translate(2047,1066)" d="m0 0v3l-2-2z" />
                                                    <path transform="translate(2045,1082)" d="m0 0v3z" />
                                                    <path transform="translate(2047,1254)" d="m0 0" />
                                                    <path transform="translate(2047,1055)" d="m0 0" />
                                                    <path transform="translate(2047,1044)" d="m0 0" />
                                                    <path transform="translate(352,1446)" d="m0 0" />
                                                    <path transform="translate(2047,1083)" d="m0 0" />
                                                    <path transform="translate(2047,1071)" d="m0 0" />
                                                    <path transform="translate(2047,1049)" d="m0 0" />
                                                    <path transform="translate(2047,1041)" d="m0 0" />
                                                    <path transform="translate(4,1041)" d="m0 0" />
                                                    <path transform="translate(2047,1037)" d="m0 0" />
                                                    <path transform="translate(0,929)" d="m0 0" />
                                                </svg>
                                                <p className="ml10">Drag your  image here</p>
                                            </>
                                    }
                                </div>

                                <input onChange={(e) => setImg_files(e.target.files[0])} type="file" name="profile_pic" style={{ display: "none" }} id="profile_pic" accept="image/*" />
                                <motion.label
                                    initial={{
                                        y: 100
                                    }}
                                    animate={{
                                        y: 0
                                    }}
                                    htmlFor="profile_pic" className="cr p10 mt50 wmia">
                                    <svg version="1.1" viewBox="0 0 2048 2048" className="w30 h30" xmlns="http://www.w3.org/2000/svg">
                                        <path transform="translate(1034,215)" d="m0 0h30l38 2 37 4 42 8 30 8 36 12 20 8 28 12 33 17 25 15 27 18 19 14 16 13 11 9 10 9 8 7 32 32 7 8 11 13 13 17 11 15 14 21 12 19 10 18 16 32 9 20 11 29 8 24 10 37 7 35 5 35 2 18 2 35 26 2 34 4 29 5 27 7 29 10 24 10 25 12 21 12 17 11 12 8 21 16 14 12 13 12 18 18 9 11 9 10 9 12 12 17 11 18 10 17 14 28 16 39 6 18 10 37 6 25h2v120l-4 1 3 2 1 7v16h-2l1-7h-5l-2 6-10 38-7 20-6 16-8 19-8 15-8 16-6 10-10 17-11 16-7 9-8 10-11 13-11 12-6 7h-2l-1 3-8 7-14 13-11 9-18 14-19 13-24 14-23 12-23 10-25 9-30 9-28 6-26 4-31 3-50 2-261 1h-60l-22-2-7-3-7-5-8-10-8-16-1-11 2-9 4-8 8-11 8-8 7-4 4-1 367-2 33-2 29-4 29-6 30-10 24-10 19-10 22-13 19-13 16-13 11-9 11-11h2l2-4 10-10 1-2h2l2-4 9-11 10-13 10-15 10-17 14-29 7-18 8-26 5-21 4-23 2-20v-53l-2-21-5-27-6-25-12-33-8-18-10-20-14-23-13-18-9-11-10-11v-2h-2l-7-8-7-7-8-7-16-13-18-13-19-12-16-9-27-13-30-11-23-6-22-4-24-3-33-2h-47l-9-2-9-6-8-9-5-7-3-10-1-66-4-40-5-33-8-34-7-25-13-35-14-30-8-16-12-21-11-17-14-20-9-12-9-11-11-13-28-28-8-7-13-11-10-8-18-13-13-9-21-13-21-12-28-14-34-14-37-12-25-6-43-7-30-3-17-1h-28l-29 2-34 4-30 6-28 7-38 13-26 11-19 9-22 12-16 10-15 10-14 10-16 12-14 12-8 7-7 6-16 16-7 8-7 7-8 10-10 11-8 11-8 10-7 11-10 16-16 29-8 17-7 15-10 24-7 21-8 29-7 30-5 22-5 15-9 13-9 6-9 3-17 1h-49l-32 2-30 4-24 5-27 8-22 8-17 7-16 8-24 13-9 6-17 12-11 8-10 8-15 13-13 12-12 12-9 11-4 5h-2l-2 4-11 15-7 10-7 11-9 14-12 23-8 16-9 23-10 30-6 22-4 21-4 34-1 20v26l2 26 4 29 5 24 8 27 8 24 13 29 8 16 11 19 15 22 9 12 11 14 10 11 7 8 14 14 8 7 14 12 12 9 14 10 17 11 25 14 27 13 26 10 30 9 25 5 33 4 41 3 59 1h234l53 1 10 3 10 6 7 7 6 10 3 12v9l-2 10-5 10-6 7-8 6-8 4-8 2-14 1h-328l-46-2-19-2-35-6-39-9-29-10-21-8-29-13-20-10-20-12-11-7-16-11-17-13-30-26-29-29-7-8-10-11-13-17-11-15-17-26-12-21-10-19-12-27-8-21-9-27-11-42-1-8-2-1-2-11-2-2v-144l2 1 13-52 11-36 10-26 11-24 8-16 12-22 8-13 7-10 7-11 24-32 14-15 9-10 21-21 8-7 14-12 14-11 19-13 10-7 20-12 22-12 25-12 27-11 27-9 31-8 22-5 37-5 28-2 20-1 10-2 6-29 8-26 9-26 9-22 7-16 7-15 10-18 6-12 8-13 10-16 8-12 10-14 9-12 11-13 8-10 5-6h2l2-4 14-15 4-5h2v-2h2v-2l8-7 8-8 8-7 10-9 25-20 17-12 15-10 19-12 27-15 28-14 26-11 19-7 31-10 27-7 23-5 39-6 32-3zm1009 1063 1 2z" />
                                        <path transform="translate(1033,1119)" d="m0 0h16l16 4 16 8 11 8 14 11 15 14 8 7 15 13 36 33 10 9 8 7 11 10 8 7 15 13 9 9 8 7 10 13 4 8 1 4v15l-4 11-7 9-7 7-12 9-8 2h-8l-13-4-12-7-16-13-15-13-14-12-11-9-17-16-11-10-8-7-10-9-4-3v44l-1 67v417l-2 20-5 9-11 11-14 9-5 1-14-1-14-5-11-8-7-10-4-9-1-8-1-19v-509l-1-6-9 6-10 9-15 13-8 7-13 12-14 11-14 13-14 11-12 9-12 7-8 2h-10l-11-5-6-4-10-10-8-15-4-11 3-12 9-14 8-10 8-7 12-11 8-7 10-9 8-7 12-11 8-7 16-15 15-14 10-9 8-7 12-11 11-9 16-13 15-10 14-7zm-35 135m-1 1m1 1 1 3z" />
                                        <path transform="translate(1019,421)" d="m0 0h40l10 3 10 6 7 8 6 12 2 11v10l-3 9-6 10-5 6-10 6-13 4-52 6-26 6-36 12-31 15-15 10-17 12-11 9-15 14-8 8-9 11-7 8-16 24-12 22-11 25-9 27-9 35-7 16-6 9-7 6-11 4-4 1h-15l-10-3-10-6-8-8-6-10-2-7-1-12 4-29 7-27 11-31 11-25 11-21 6-10 7-11 13-19 8-10 12-14 15-16 14-14 14-11 10-9 19-13 18-11 16-9 23-11 23-9 27-8 27-6 27-4z" />
                                        <path transform="translate(2047,1123)" d="m0 0h1v5h-3v-3h2z" />
                                        <path transform="translate(2041,1291)" d="m0 0" />
                                        <path transform="translate(0,1081)" d="m0 0" />
                                    </svg>

                                    Pick from device
                                </motion.label>

                            </>
                    }

                </form>
            </Dev>
        </div>, document.getElementById("portals")
    )
}


