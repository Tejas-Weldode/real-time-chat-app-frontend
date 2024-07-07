import React, { useState, useEffect } from "react";
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
    const { userData } = useAuthContext();
    const { socket } = useSocketContext();

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:3000/message/get/${id}`,
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

        fetchMessages();
    }, [id, userData.token]);

    // listen messages
    useEffect(() => {
        if (!socket) return;

        socket.on("newMessage", (newMessage) => {
            setMessages((prevMessages) => [...prevMessages, newMessage]);
        });

        return () => {
            socket.off("newMessage");
        };
    }, [socket]);

    const handleSendMessage = async (event) => {
        event.preventDefault();
        try {
            setSending(true);
            const response = await axios.post(
                "http://localhost:3000/message/send",
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
        <div>
            <h1>Chat with {id}</h1>
            <div>
                {messages.map((message, index) => (
                    <div key={index}>
                        <p>
                            <strong>
                                {message.senderId === id ? "Other" : "You"}:
                            </strong>{" "}
                            {message.text}
                        </p>
                    </div>
                ))}
            </div>
            <form onSubmit={handleSendMessage}>
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message"
                />
                {sending ? (
                    <button disabled>Sending</button>
                ) : (
                    <button type="submit">Send</button>
                )}
            </form>
        </div>
    );
}
