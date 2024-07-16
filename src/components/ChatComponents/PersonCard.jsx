import React, { useEffect, useState } from "react";
import { useAuthContext } from "../../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

export default function PersonCard({ fullName, username, profilePic, _id }) {
    // here _id belongs to the user
    const [loading, setLoading] = useState(false);
    const { userData } = useAuthContext();
    const navigate = useNavigate();

    const openFunc = async () => {
        try {
            setLoading(true);
            await axios.get(
                `${import.meta.env.VITE_API_SERVER}/chat/open-chat/${_id}`,
                {
                    headers: { Authorization: `Bearer ${userData.token}` },
                }
            );
            navigate(`/chat/${_id}`);
            setLoading(false);
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.error || "Some error occured");
            setLoading(false);
        }
    };
    if (loading) return <h3>Loading...</h3>;
    return (
        <>
            <div
                onClick={openFunc}
                className="bg-zinc-200 p-4 flex items-center space-x-4"
            >
                {/* image (profilePic) div below --- start*/}
                <span className="overflow-hidden size-10 rounded-full">
                    {profilePic == null || profilePic == "" ? (
                        ""
                    ) : (
                        <img
                            className="w-full h-full object-cover"
                            src={profilePic}
                        />
                    )}
                </span>
                {/* image (profilePic) div below --- end*/}
                <div>
                    <p className="font-semibold">{fullName}</p>
                    <p className="italic">{username}</p>
                </div>
            </div>
        </>
    );
}
