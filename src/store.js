import { configureStore } from "@reduxjs/toolkit";


//  Here import  all slices in the frontend app 

import { ThemSlice } from "./settings";
import loaderReducer from "./slices/loader"
import PostsReducer from "./slices/sections/postsSlices.jsx"
import ReelsReducer from "./slices/sections/reelsSlices.jsx"
import BlogsReducer from "./slices/sections/blogsSlice.jsx"
import UserReducer from "./slices/userSlice.jsx"
import ProfileReducer from './slices/profileSlice.jsx'
import AlertNotReducer from './slices/alert_cmp.jsx'
import ZoomerReducer from "./slices/zoomer.jsx";
import CommentReducers from './slices/comments.jsx'
import RepliesReducer from "./slices/media/replies.jsx";
import TenReducer from "./slices/ten_slice.jsx";
import NewsSlice from './slices/sections/news.jsx'
import ImgsSliderReducer from './slices/ImgsSlider.jsx'
import MomentsReducer from './slices/Moments_sideBare.jsx'
import ViewUserReducer from "./slices/viewUser.js";
import ReportReducer from "./slices/ReportSlice.js";
import NotificationReducer from './slices/NotificationSlice.js'
import ChatReducer from './slices/chatSlice.js'
import NewNotfReducer from './slices/new_notifications.js'
import CheckNotReducer from './slices/CheckNotif.js'
import ScrollReels from './slices/ScrollReels.js'
import searchSlice from './slices/search.js'
import SharePostReducer from './slices/SahrePosSlice.js'
import WindowSizeSlice from './slices/WnidowSize.js'





// -----    ---------



const store = configureStore({
    reducer: {
        Theme: ThemSlice.reducer,
        loader: loaderReducer,
        Posts: PostsReducer,
        Reels: ReelsReducer,
        Blogs: BlogsReducer,
        User: UserReducer,
        News: NewsSlice,
        Comments: CommentReducers,
        Replies: RepliesReducer,
        Profile: ProfileReducer,
        Zoomer: ZoomerReducer,
        Alert_Not: AlertNotReducer,
        Ten: TenReducer,
        ImgsSlider: ImgsSliderReducer,
        Moments: MomentsReducer,
        ViewUser: ViewUserReducer,
        Report: ReportReducer,
        Notifications: NotificationReducer,
        ChatReducer,
        NewNotfReducer,
        CheckNotReducer,
        ScrollReels,
        searchSlice,
        SharePostReducer,
        WindowSizeSlice,

    }
})


export default store