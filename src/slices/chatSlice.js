import { createAsyncThunk, createSlice, isRejected } from "@reduxjs/toolkit";
import api from "../config/axios";
import { getSocket } from "../config/socket";
import { AddToRequestLocal, friend_blocked_me, friend_unblocked_me, identificat_user } from './userSlice.jsx'
import { BlockUser } from './userSlice.jsx'
import { push_notf } from "./new_notifications.js";
import { add_notification } from "./NotificationSlice.js";
export const Bringchats_ref = createAsyncThunk(
    "Bringchats_ref",
    async (_, { getState, rejectWithValue }) => {
        try {
            const { contacts, requestsContact, _id } = getState().User;
            const req = await api.get('/users/', { params: { users: [...contacts, ...requestsContact], withLastChat: true } });
            return { ...req.data, _id };

        } catch (error) {
            return rejectWithValue();
        }
    }
)

export const Message_Tracker = createAsyncThunk(
    'Message_Tracker',
    async (_, { dispatch, getState }) => {
        const socket = getSocket();
        const { _id } = getState().User;
        if (socket) {

            socket.on('friend-connected', f => {
                console.log('user connected => ', f);

                dispatch(friend_connected(f));
            })

            socket.on('friend-disconnected', f => {
                dispatch(friend_disconnected(f))
            })

            socket.on('message-recieved', async m => {
                const { contacts, blockersList, blockedList } = getState().User;
                if (blockedList.some(f => f.Blocked_person == m.senderId)) return socket.emit('user-blocked-me', { _id })
                if (contacts.includes(m.senderId)) {
                    dispatch(add_message({ ...m, me: _id }));
                    dispatch(push_notf({ ...m, isMessage: true }))
                    socket.emit('message-added', {
                        reciverId: m.senderId,
                        friendId: _id,
                        _id: m._id
                    });
                } else {
                    const newUserReq = await identificat_user(m.senderId);
                    const payl = { ...m, newUser: { ...newUserReq.data } };
                    await dispatch(AddToRequestLocal(m.senderId))
                    await dispatch(add_unknown_message(payl));
                    dispatch(push_notf({ ...m, isMessage: true }))
                    socket.emit('message-added', {
                        reciverId: m.senderId,
                        friendId: _id,
                        _id: m._id
                    });
                }

            });

            socket.on('massage-added-on-friend', m => {
                const { blockedList } = getState().User;
                if (blockedList.some(f => f.Blocked_person == m.senderId)) return socket.emit('user-blocked-me', { _id });

                dispatch(set_message_recived_by_friend(m))
            });

            socket.on('friendviewedmymessages', m => {
                const { blockedList } = getState().User;
                if (blockedList.some(f => f.Blocked_person == m.senderId)) return socket.emit('user-blocked-me', { _id })
                dispatch(Set_chat_viewed({ ...m, me: _id, fromFriend: true }))
            });

            socket.on('friend-typing-message', m => {
                const { blockedList } = getState().User;
                if (blockedList.some(f => f.Blocked_person == m.senderId)) return socket.emit('user-blocked-me', { _id })
                dispatch(set_user_typing(m))
            });

            socket.on('friend-cancel-typing-message', m => {
                const { blockedList } = getState().User;
                if (blockedList.some(f => f.Blocked_person == m.senderId)) return socket.emit('user-blocked-me', { _id })
                dispatch(set_user_cancel_typing(m))
            });

            socket.on('friend-blocked-me', doc => {
                console.log('blocked', doc);
                dispatch(friend_blocked_me(doc))
            });

            socket.on('friend-unblocked-me', doc => {
                console.log('Unblocked', doc);
                dispatch(friend_unblocked_me(doc))
            });

            socket.on('message-saved-in-db', m => {
                dispatch(replace_message_from_db({ ...m, me: _id }))
            });

            // ---------------
            socket.on('new-notification', doc => {
                const { contacts, blockedList } = getState().User;
                // if (contacts.includes(n.senderId) && n.type == "new-contact-req") return
                // if (blockedList.some(b => b.Blocked_person == n.senderId)) return
                // console.log('new not => ', doc);
                dispatch(add_notification(doc));
            })
        }
    }
)

export const SyncMessages = createAsyncThunk(
    "SyncMessages",
    async (_, { rejectWithValue, getState }) => {
        try {
            let Allchats = getState().ChatReducer.All_chatsAndContents;
            let stoff = [];

            for (var i in Allchats) {
                Allchats[i].map(e => {
                    if (e.savedInDb == false) {
                        stoff.push(e);
                    }
                }
                )
            }
            if (stoff.length == 0) {
                return []
            } else {
                await api.post('/messages/sync', { stoff });
                return stoff.map(e => e._id)
            }
        } catch (error) {
            return rejectWithValue(error);
        }

    }
)



export const OpenContact = createAsyncThunk(
    "OpenContact",
    async (id, { dispatch, getState, rejectWithValue }) => {

        const {_id} = getState().User;
        const chats_refs = getState().ChatReducer.chats_refs;
        if (!chats_refs.some(c => c._id == id)) {
            await dispatch(SyncMessages())
            await dispatch(Bringchats_ref());
        }

        if (chats_refs.some(c => c._id == id)) {
            dispatch(focusOnUser(chats_refs.find(c => c._id == id)));
            dispatch(Set_chat_viewed({ I_Read_friend_msg: true, me: _id, id}))
            return true;
        }

        return rejectWithValue()

    }
)

// export const get_single_chat = createAsyncThunk(
//     "get_single_chat",
//     async (friendId, { rejectWithValue }) => {
//         try {
//             const chatData = await api.get("/users/get_single_chat", { params: { friendId } });
//             const sortedChat = chatData.data.MessagesFound.sort((a, b) => new Date(a.createAt) - new Date(b.createAt))
//             return { chat: sortedChat, friendId }
//         } catch (error) {
//             return rejectWithValue(error);

//         }
//     }
// );

const chatSlice = createSlice({
    name: "chatSlice",
    initialState: {
        socket: null,
        focused_data: null,
        isLoadingChat: false,
        isLoadingRefs: false,
        chatsLoadedFromDb: [],
        chats_refs: [],
        chat_content: [],
        All_chatsAndContents: {},
        connected_friends: [],
        // -------------
        isAllSaved: false,
        isSyncingMessages: false,
    },
    reducers: {
        setSocket: (state, action) => {
            state.socket = action.payload
        },
        add_message: (state, action) => {
            const messageFromFriend = action.payload.senderId != action.payload.me;
            if (messageFromFriend) {
                let friendId = action.payload.senderId
                const viewed = state.focused_data?._id == friendId || false;
                // ------
                //this line mean that i get message from friend and i am already on chat 
                if (viewed) {
                    const socket = getSocket();
                    socket.emit('friend-viewed-messages', { senderId: action.payload.me, recieverId: friendId })
                    delete action.payload['me'];
                }
                if (state.All_chatsAndContents[friendId]) {
                    state.All_chatsAndContents[friendId].push({ ...action.payload, viewed, savedInDb: !viewed })
                } else {
                    state.All_chatsAndContents[friendId] = [{ ...action.payload, viewed, savedInDb: !viewed }]
                };
            } else {
                let friendId = action.payload.recieverId
                if (state.All_chatsAndContents[friendId]) {
                    state.All_chatsAndContents[friendId].push({ ...action.payload, savedInDb: false })
                } else {
                    state.All_chatsAndContents[friendId] = [{ ...action.payload, savedInDb: false }]
                };
                if (action.payload.newRequest) {
                    if (!state.chats_refs.some(e => e._id == action.payload.newUser._id)) {
                        state.chats_refs.push(action.payload.newUser);
                    }
                }
            }
            state.chats_refs = state.chats_refs.sort((a, b) => {
                let lastDateChatFor_a = state.All_chatsAndContents[a._id];
                let lastDateChatFor_b = state.All_chatsAndContents[b._id];
                if (!lastDateChatFor_a.length > 0 && lastDateChatFor_b.length > 0) {
                    return 1
                }
                if (lastDateChatFor_a.length > 0 && !lastDateChatFor_b.length > 0) {
                    return -1
                }
                let letDateFora = lastDateChatFor_a[lastDateChatFor_a.length - 1]?.createAt;
                let letDateForB = lastDateChatFor_b[lastDateChatFor_b.length - 1]?.createAt;

                if (letDateFora && letDateForB) {
                    return new Date(letDateForB) - new Date(letDateFora)
                }
                return 0

            });
            state.isAllSaved = false;

        },
        add_unknown_message: (state, action) => {
            let friendId = action.payload.senderId

            const viewed = (state.focused_data?._id == friendId && friendId != undefined) || false;
            if (viewed) {
                const socket = getSocket();
                socket.emit('friend-viewed-messages', { senderId: action.payload.me, recieverId: friendId })
            }

            if (!state.All_chatsAndContents[friendId]) {
                state.All_chatsAndContents[friendId] = [{ ...action.payload, viewed, savedInDb: true }]
            } else if (state.All_chatsAndContents[friendId]) {
                state.All_chatsAndContents[friendId].push({ ...action.payload, viewed, savedInDb: true })

            }
            if (!state.chats_refs.some(e => e._id == action.payload.newUser?._id)) {
                state.chats_refs.push(action.payload.newUser);
            }
            delete action.payload['newUser'];
            state.chats_refs = state.chats_refs.sort((a, b) => {
                let lastDateChatFor_a = state.All_chatsAndContents[a._id];
                let lastDateChatFor_b = state.All_chatsAndContents[b._id];
                if (!lastDateChatFor_a.length > 0 && lastDateChatFor_b.length > 0) {
                    return 1
                }
                if (lastDateChatFor_a.length > 0 && !lastDateChatFor_b.length > 0) {
                    return -1
                }
                let letDateFora = lastDateChatFor_a[lastDateChatFor_a.length - 1]?.createAt;
                let letDateForB = lastDateChatFor_b[lastDateChatFor_b.length - 1]?.createAt;

                if (letDateFora && letDateForB) {
                    return new Date(letDateForB) - new Date(letDateFora)
                }
                return 0

            });

            state.isAllSaved = false;

        },

        focusOnUser: (state, action) => {
            state.focused_data = action.payload;
        },
        set_user_typing: (state, action) => {
            state.chats_refs = state.chats_refs.map(e => e._id == action.payload.senderId ? { ...e, isTyping: true } : e)
        },
        set_user_cancel_typing: (state, action) => {
            state.chats_refs = state.chats_refs.map(e => e._id == action.payload.senderId ? { ...e, isTyping: false } : e)
        },

        set_message_recived_by_friend: (state, action) => {
            state.All_chatsAndContents[action.payload.friendId] = state.All_chatsAndContents[action.payload.friendId]?.map(e => (e._id == action.payload._id && !e.received) ? { ...e, received: true, savedInDb: false } : e)
        },

        Set_chat_viewed: (state, action) => {
            if (action.payload.fromFriend) {
                state.All_chatsAndContents[action.payload.id] = state.All_chatsAndContents[action.payload.id]?.map(e => e.senderId == action.payload.me ? ({ ...e, viewed: true, savedInDb: false }) : e)
            }
            if (action.payload.I_Read_friend_msg) {
                state.All_chatsAndContents[action.payload.id] = state.All_chatsAndContents[action.payload.id]?.map(e => e.senderId != action.payload.me ? ({ ...e, viewed: true, savedInDb: false }) : e)
            }

        },
        friend_connected: (state, action) => {
            state.connected_friends.push(action.payload.friendId)
        },
        friend_disconnected: (state, action) => {
            state.connected_friends = state.connected_friends.filter(f => f != action.payload.friendId)
        },
    }
    , extraReducers: b => {
        b
            .addCase(Bringchats_ref.pending, state => {
                state.isLoadingRefs = true
            })
            .addCase(Bringchats_ref.fulfilled, (state, action) => {
                const socket = getSocket();
                state.chats_refs = action.payload.users;
                action.payload.chats.map(f => {
                    if (!state.All_chatsAndContents[f.friendId]) {
                        state.All_chatsAndContents[f.friendId] = f.messages.sort((a, b) => new Date(a.createAt) - new Date(b.createAt));
                    }
                });
                action.payload.chats.map(f => {
                    f.messages.map(m => {
                        if (!m.received == true && m.recieverId == action.payload._id) {
                            if (socket) {
                                socket.emit('message-added', {
                                    reciverId: m.senderId,
                                    friendId: action.payload._id,
                                    _id: m._id
                                })
                            }

                            m.received = true;
                            m.savedInDb = false
                        }
                        return m
                    }
                    )
                });
                state.chats_refs = state.chats_refs.sort((a, b) => {
                    let lastDateChatFor_a = state.All_chatsAndContents[a._id];
                    let lastDateChatFor_b = state.All_chatsAndContents[b._id];
                    if (!lastDateChatFor_a.length > 0 && lastDateChatFor_b.length > 0) {
                        return 1
                    }
                    if (lastDateChatFor_a.length > 0 && !lastDateChatFor_b.length > 0) {
                        return -1
                    }
                    let letDateFora = lastDateChatFor_a[lastDateChatFor_a.length - 1]?.createAt;
                    let letDateForB = lastDateChatFor_b[lastDateChatFor_b.length - 1]?.createAt;

                    if (letDateFora && letDateForB) {
                        return new Date(letDateForB) - new Date(letDateFora)
                    }
                    return 0

                });


                state.isLoadingRefs = false;
            })
            .addCase(Bringchats_ref.rejected, state => {
                state.isLoadingRefs = false
            })
            // -----------
            .addCase(SyncMessages.pending, state => {
                state.isSyncingMessages = true;
                state.isAllSaved = false
            })
            .addCase(SyncMessages.fulfilled, (state, action) => {
                state.isSyncingMessages = false;
                state.isAllSaved = true;
                if (action.payload.length > 0) {
                    for (var i in state.All_chatsAndContents) {
                        state.All_chatsAndContents[i] = state.All_chatsAndContents[i].map(e => {
                            if (action.payload.includes(e._id)) {
                                return { ...e, savedInDb: true }
                            } else {
                                return e
                            }
                        })
                    }
                }

            })
            .addCase(SyncMessages.rejected, state => {
                state.isSyncingMessages = false
            });
    }
});


export const {
    add_message,
    add_unknown_message,
    setSocket,
    focusOnUser,
    set_user_typing,
    set_user_cancel_typing,
    set_message_recived_by_friend,
    Set_chat_viewed,
    friend_connected,
    friend_disconnected,
} = chatSlice.actions
export default chatSlice.reducer