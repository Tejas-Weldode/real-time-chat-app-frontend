import { createContext, useState, useEffect, useContext } from "react";
import { useAuthContext } from "./AuthContext.jsx";
import io from "socket.io-client";

const SocketContext = createContext();

export const useSocketContext = () => {
    return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const { userData } = useAuthContext();
    useEffect(() => {
        if (userData) {
            const socket = io(`${import.meta.env.VITE_API_SERVER}`, {
                query: {
                    userId: userData._id,
                },
            });
            setSocket(socket);

            socket.on("getOnlineUsers", (users) => {
                setOnlineUsers(users);
            });

            socket.on("connect", () => {
                console.log("Connected to Socket.IO server");
            });

            socket.on("disconnect", () => {
                console.log("Disconnected from Socket.IO server");
            });

            return () => {
                socket.close();
                setSocket(null);
            };
        } else {
            if (socket) {
                socket.close();
                setSocket(null);
            }
        }
    }, [userData]);

    return (
        <SocketContext.Provider value={{ socket, onlineUsers }}>
            {children}
        </SocketContext.Provider>
    );
};
