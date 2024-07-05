import React, { useState } from "react";
import { useAuthContext } from "../../context/AuthContext.jsx";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

export default function ContactCard({ name, id, unread, saved }) {
    // id -> this id belongs to the user not the chat
    const [isSaved, setIsSaved] = useState(saved);
    const [loading, setLoading] = useState(false);
    const { userData } = useAuthContext();

    // Handle the change event
    const handleCheckboxChange = async (event) => {
        const newSaveStatus = event.target.checked;
        setLoading(true);

        try {
            const response = await axios.put(
                "http://localhost:3000/chat/save",
                {
                    id: id,
                    save: newSaveStatus,
                },
                {
                    headers: {
                        Authorization: `Bearer ${userData.token}`,
                    },
                }
            );
            console.log("response.data", response);
            setIsSaved(newSaveStatus);
            toast.success(response.data.message);
        } catch (error) {
            toast.error(error.response?.data?.error || "Some error occured");
        } finally {
            setLoading(false);
        }
    };

    if (loading)
        return (
            <>
                <h3>Loading</h3>
            </>
        );
    return (
        <>
            <h2>ContactCard</h2>
            <Link to={`/chat/${id}`}>
                <h3>
                    {name} ({unread})
                </h3>
            </Link>
            <label>
                <input
                    type="checkbox"
                    checked={isSaved}
                    onChange={handleCheckboxChange}
                />
                {isSaved ? "Saved" : "Not saved"}
            </label>
        </>
    );
}
