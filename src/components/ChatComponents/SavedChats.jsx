import axios from "axios";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import ContactCard from "./ContactCard.jsx";
import { useAuthContext } from "../../context/AuthContext.jsx";



export default function RecentChats() {
    const [loading, setLoading] = useState(false);
    const [chats, setChats] = useState([]);
    const { userData } = useAuthContext();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await axios.get(
                    "http://localhost:3000/chat/saved",
                    {
                        headers: {
                            Authorization: `Bearer ${userData.token}`,
                        },
                    }
                );
                console.log(response.data.savedChats);
                setChats(response.data.savedChats);
                setLoading(false);
            } catch (error) {
                toast.error(error.response.data.error);
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) return <h1>Loading...</h1>;
    else
        return (
            <>
                <h2>SavedChats</h2>
                <ul>
                    {chats.map((chat) => (
                        <li key={chat.id}>
                            <ContactCard
                                name={chat.name}
                                id={chat.id}
                                saved={chat.saved}
                                unread={chat.unread}
                            />
                        </li>
                    ))}
                </ul>
            </>
        );
}
