import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import api from "../config/axios";

export const BringNotifications = createAsyncThunk(
    "BringNotifications",
    async (_, { rejectWithValue }) => {
        try {
            const res = await api.get("/interaction/get_new_notifications");
            return res.data.AllNotification
        } catch (error) {
            return rejectWithValue(error);
        }
    }
)

// const BringMoreCurrentsNot = createAsyncThunk(
//     'BringMoreCurrentsNot',
//     () => {
//         const oldNots = JSON.parse(localStorage.getItem('n')) || [];
//     }
// )

const NotificationSlice = createSlice({
    name: "NotificationSlice",
    initialState: {
        isLoading: false,
        data: [],
        isVisible: false
    },
    reducers: {
        open_notif_bare: state => {
            state.isVisible = true
        },
        close_notif_bare: state => {
            state.isVisible = false
        },
        add_notification: (state, action) => {
            state.data.unshift(action.payload)
        }
    },
    extraReducers: builder => {
        builder
            .addCase(BringNotifications.pending, state => {
                state.isLoading = true
            })
            .addCase(BringNotifications.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload
            })
            .addCase(BringNotifications.rejected, (state, action) => {
                state.isLoading = false
            })
    }
})
export const { open_notif_bare, close_notif_bare, add_notification } = NotificationSlice.actions
export default NotificationSlice.reducer