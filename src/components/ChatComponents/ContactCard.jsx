import React, { useEffect, useState } from "react";
import { useAuthContext } from "../../context/AuthContext.jsx";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

export default function ContactCard({ name, id, unread, saved, profilePic, username }) {
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
            <Link to={`/chat/${id}`}>
                <div className="flex items-center space-x-4 bg-zinc-200 p-4">
                    {/* image (profilePic) div below --- start*/}
                    <span className="overflow-hidden size-12 rounded-full">
                        {profilePic == null ||
                        profilePic == "" ? (
                            ""
                        ) : (
                            <img
                                className="w-full h-full object-cover"
                                src={profilePic}
                            />
                        )}
                    </span>
                    {/* image (profilePic) div below --- end*/}
                    <span className="font-semibold text-lg">{name}</span>
                    {unread == 0 ? (
                        ""
                    ) : (
                        <span className="font-normal text-xs text-white bg-zinc-900 p-1 size-6 flex items-center justify-center rounded-full">
                            {unread}
                        </span>
                    )}
                    <p className="italic">{username}</p>
                </div>
            </Link>

            <div className="flex items-center w-fit space-x-2 bg-zinc-100 p-2 mb-4 rounded-b-xl">
                <input
                    type="checkbox"
                    checked={isSaved}
                    onChange={handleCheckboxChange}
                    className="size-fit"
                />
                <label className="font-normal text-sm">
                    {isSaved ? "Saved" : "Not saved"}
                </label>
            </div>
        </>
    );
}
