import io from 'socket.io-client';
let socket;
export const connectTOSocket = async (_id, freinds=[]) => {
    if (_id) {
        if (!window.socket) {
            const FriendsJs = JSON.stringify([...freinds])
            socket = await io('http://localhost:5000', {
                query: {
                    userId: _id,
                    freinds: FriendsJs
                },

            });
        }
    }
}

export const getSocket = () => socket;

