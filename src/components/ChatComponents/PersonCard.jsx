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
    useEffect(() => {
        console.log({ fullName, username, profilePic, _id });
    }, []);

    const openFunc = async () => {
        try {
            setLoading(true);
            const res = await axios.get(
                `http://localhost:3000/chat/open-chat/${_id}`,
                { headers: { Authorization: `Bearer ${userData.token}` } }
            );
            console.log(res.data.chat);
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
            <div onClick={openFunc}>
                <h3>{fullName}</h3>
                <p>{username}</p>
                <p>{_id}</p>
            </div>
        </>
    );
}
