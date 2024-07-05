// ChangePassword

import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext.jsx";
import validatePassword from "../utils/validatePassword.js";

export default function ChangePassword() {
    const [loading, setLoading] = useState(false);

    const { userData, setUserData } = useAuthContext();
    const [formData, setFormData] = useState({
        newPassword: "",
        oldPassword: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const isValid = () => {
        let valid = true;
        if (!validatePassword(formData.password)) {
            toast.error("The password should be 4 to 32 characters long.");
            valid = false;
        }
        return valid;
    };

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
        } catch (error) {
            if (error.response && error.response.data.error)
                toast.error(error.response.data.error);
            else toast.error("Some error occured");
        }
        setLoading(false);
    };

    return (
        <div>
            <h1>ChangePassword</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Enter Your current Password:
                    <input
                        type="password"
                        name="oldPassword"
                        value={formData.oldPassword}
                        onChange={handleInputChange}
                    />
                </label>
                <br />
                <label>
                    Set a new Password:
                    <input
                        type="password"
                        name="newPassword"
                        value={formData.newPassword}
                        onChange={handleInputChange}
                    />
                </label>
                <br />

                {loading ? (
                    <button disabled>Loading...</button>
                ) : (
                    <button type="submit">Submit</button>
                )}
            </form>
        </div>
    );
}
