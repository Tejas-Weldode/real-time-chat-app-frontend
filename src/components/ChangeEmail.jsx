// ChangeEmail

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext.jsx";
import axios from "axios";
import toast from "react-hot-toast";
import validateEmail from "../utils/vaildateEmail.js";

export default function ChangeEmail() {
    const [loading, setLoading] = useState(false);

    const { userData, setUserData } = useAuthContext();
    
    const [formData, setFormData] = useState({
        email: userData.email || "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const isValid = () => {
        let valid = true;
        if (!validateEmail(formData.email)) {
            toast.error("Email format is incorrect.");
            valid = false;
        }
        return valid;
    };

    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        try {
            // validation
            if (!isValid()) {
                setLoading(false);
                return;
            }
            //
            const res = await axios.put(
                "http://localhost:3000/user/update",
                formData,
                { headers: { Authorization: `Bearer ${userData.token}` } }
            );
            toast.success(res.data.message);
            localStorage.setItem("userData", JSON.stringify(res.data.userData));
            setUserData(res.data.userData);
            navigate("/verify");
        } catch (error) {
            toast.error(error.response.data.error);
        }
        setLoading(false);
    };

    return (
        <div>
            <h1>ChangeEmail</h1>
            {userData.isEmailVerified ? "" : <h2>Please Verify you Email</h2>}
            <form onSubmit={handleSubmit}>
                <label>
                    Email:
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                    />
                </label>
                {loading ? (
                    <button disabled>Loading...</button>
                ) : (
                    <button type="submit">Submit</button>
                )}
            </form>
        </div>
    );
}
