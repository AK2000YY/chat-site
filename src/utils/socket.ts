import { io, Socket } from "socket.io-client";

let socket: Socket;

export const connectSocket = (userId: string) => {
    socket = io("http://localhost:5000", {
        withCredentials: true,
        transports: ["websocket"],
        query: { id: userId },
    });

    return socket;
};

export const getSocket = () => socket;