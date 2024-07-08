import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import PersonCard from "../components/ChatComponents/PersonCard.jsx";
import axios from "axios";
import { useAuthContext } from "../context/AuthContext.jsx";

export default function DiscoverPeople() {
    const [people, setPeople] = useState([]);
    const [loading, setLoading] = useState(false);
    const { userData } = useAuthContext();
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await axios.get(
                    "http://localhost:3000/chat/discover-people",
                    {
                        headers: { Authorization: `Bearer ${userData.token}` },
                    }
                );
                setPeople(response.data.people);
                setLoading(false);
            } catch (error) {
                console.log(error);
                toast.error(
                    error.response?.data?.error || "Some error occured"
                );
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading)
        return (
            <>
                <h1>Loading...</h1>
            </>
        );
    return (
        <>
            <h1>Discover People</h1>
            <ul>
                {people.map((i) => {
                    return (
                        <li key={i._id}>
                            <PersonCard
                                fullName={i.fullName}
                                username={i.username}
                                profilePic={i.profilePic}
                                _id={i._id}
                            />
                        </li>
                    );
                })}
            </ul>
        </>
    );
}
