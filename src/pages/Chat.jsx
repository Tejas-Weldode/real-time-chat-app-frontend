import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext.jsx";
import { useSocketContext } from "../context/SocketContext.jsx";

export default function Chat() {
    const { id } = useParams();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [loading, setLoading] = useState(true);
    const [sending, setSending] = useState(false);
    const [otherUser, setOtherUser] = useState(null);
    const { userData } = useAuthContext();
    const { socket } = useSocketContext();
    const messagesEndRef = useRef(null);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                setLoading(true);
                const response = await axios.get(
                    `${import.meta.env.VITE_API_SERVER}/message/get/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${userData.token}`,
                        },
                    }
                );
                setMessages(response.data.messages);
                setLoading(false);
            } catch (error) {
                toast.error(
                    error.response?.data?.error || "Error fetching messages"
                );
                setLoading(false);
            }
        };

        const fetchOtherUser = async () => {
            try {
                setLoading(true);
                const res = await axios.get(
                    `${import.meta.env.VITE_API_SERVER}/user/info/${id}`
                );
                setOtherUser(res.data.user);
                setLoading(false);
            } catch (error) {
                toast.error(
                    error.response?.data?.error || "Error fetching user info"
                );
                setLoading(false);
            }
        };

        fetchMessages();
        fetchOtherUser();
    }, [id, userData.token]);

    // listening messages
    useEffect(() => {
        if (!socket) return;

        socket.on("newMessage", (newMessage) => {
            setMessages((prevMessages) => [...prevMessages, newMessage]);
        });

        return () => {
            socket.off("newMessage");
        };
    }, [socket]);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    const handleSendMessage = async (event) => {
        event.preventDefault();
        try {
            setSending(true);
            const response = await axios.post(
                `${import.meta.env.VITE_API_SERVER}/message/send`,
                {
                    receiverId: id,
                    text: newMessage,
                },
                {
                    headers: {
                        Authorization: `Bearer ${userData.token}`,
                    },
                }
            );
            setMessages([...messages, response.data.newMessage]);
            setNewMessage("");
            toast.success("Message sent successfully");
            setSending(false);
        } catch (error) {
            toast.error(error.response?.data?.error || "Error sending message");
            setSending(false);
        }
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div className="p-4 bg-zinc-100 mt-8 rounded-lg">
            <div className="flex items-center">
                {/* image (profilePic) div below --- start*/}
                <div className="overflow-hidden size-10 rounded-full">
                    {otherUser?.profilePic ? (
                        <img
                            className="w-full h-full object-cover"
                            src={otherUser.profilePic}
                        />
                    ) : (
                        ""
                    )}
                </div>
                {/* image (profilePic) div below --- end*/}
                <p className="font-semibold text-2xl mx-2">
                    {otherUser?.fullName}
                </p>
                <p className="font-light italic mx-2">
                    ({otherUser?.username})
                </p>
            </div>
            <div className="overflow-y-scroll max-h-[50vh]">
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`flex flex-col w-full ${
                            message.senderId === id
                                ? "items-start"
                                : "items-end"
                        }`}
                    >
                        <div
                            className={`w-8 h-8 rounded-2xl flex overflow-hidden ${
                                message.senderId === id
                                    ? "rounded-bl-none "
                                    : "rounded-br-none right-0"
                            } `}
                        >
                            {/* image (profilePic) div below --- start*/}
                            <img
                                className="w-full h-full object-cover"
                                src={
                                    message.senderId === id
                                        ? otherUser?.profilePic || ""
                                        : userData.profilePic
                                }
                            />
                            {/* image (profilePic) div below --- end*/}
                        </div>
                        <div
                            className={`p-4 mb-2 rounded-2xl w-fit ${
                                message.senderId === id
                                    ? "bg-red-200 rounded-tl-none "
                                    : "bg-blue-200 rounded-tr-none right-0"
                            } `}
                        >
                            <p className="font-medium">{message.text}</p>
                            <p className="text-xs font-thin font-mono">
                                {formatTimestamp(message.timestamp)}
                            </p>
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
            <form onSubmit={handleSendMessage} className="mt-4">
                <div className="w-full">
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type your message"
                    />
                </div>
                {sending ? (
                    <button disabled className="flex justify-end w-full">
                        Sending
                    </button>
                ) : (
                    <button type="submit" className="flex justify-end w-full">
                        <span className="material-symbols-outlined text-4xl font-thin">
                            send
                        </span>
                    </button>
                )}
            </form>
        </div>
    );
}
