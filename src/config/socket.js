import io from 'socket.io-client';
let socket;
const API_RL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const connectTOSocket = async (_id, freinds = []) => {
    if (_id) {
        if (!window.socket) {
            const FriendsJs = JSON.stringify([...freinds])
            socket = await io(API_RL, {
                query: {
                    userId: _id,
                    freinds: FriendsJs
                },

            });
        }
    }
}

export const getSocket = () => socket;

