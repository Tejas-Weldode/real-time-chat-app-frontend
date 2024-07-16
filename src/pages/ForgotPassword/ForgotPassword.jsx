import React, { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useForgotPasswordContext } from "../../context/ForgotPasswordContext";
import validateEmail from "../../utils/vaildateEmail.js";

export default function ForgotPassword() {
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const { email, setEmail } = useForgotPasswordContext();

    const handleInputChange = (e) => {
        setEmail(e.target.value);
    };

    const isValid = () => {
        let valid = true;
        if (!validateEmail(email)) {
            toast.error("Email format is incorrect.");
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
            const res = await axios.post(
                `${import.meta.env.VITE_API_SERVER}/user/forgot-password`,
                { email }
            );
            toast.success(res.data.message);
            navigate("/set-new-password");
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.error);
        }
        setLoading(false);
    };

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Email:
                    <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={handleInputChange}
                    />
                </label>
                <br />
                {loading ? (
                    <button disabled>Loading...</button>
                ) : (
                    <button type="submit">Send OTP</button>
                )}
            </form>
        </div>
    );
}
