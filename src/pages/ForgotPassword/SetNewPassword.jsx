import React, { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useForgotPasswordContext } from "../../context/ForgotPasswordContext";
import validatePassword from "../../utils/validatePassword.js";

export default function SetNewPassword() {
    const [loading, setLoading] = useState(false);

    const { email } = useForgotPasswordContext();

    const [formData, setFormData] = useState({
        otp: "",
        newPassword: "",
        email,
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const isValid = () => {
        let valid = true;
        if (!validatePassword(formData.newPassword)) {
            toast.error("The password should be 4 to 32 characters long.");
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
                `${import.meta.env.VITE_API_SERVER}/user/set-new-password`,
                formData
            );
            toast.success(res.data.message);
            navigate("/login");
        } catch (error) {
            console.log("the error ->", error);
            toast.error(error.response.data.error);
        }
        setLoading(false);
    };

    return (
        <div>
            <h1>Set a New Password</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    OTP:
                    <input
                        type="text"
                        name="otp"
                        value={formData.otp}
                        onChange={handleInputChange}
                    />
                </label>
                <br />
                <label>
                    New Password:
                    <input
                        type="password"
                        name="newPassword"
                        value={formData.newPassword}
                        onChange={handleInputChange}
                    />
                </label>
                {loading ? (
                    <button disabled>Loading...</button>
                ) : (
                    <button type="submit">Set New Password</button>
                )}
            </form>
        </div>
    );
}
