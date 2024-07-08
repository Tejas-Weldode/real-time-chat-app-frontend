import React, { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import validateUsername from "../utils/validateUsername.js";
import validatePassword from "../utils/validatePassword.js";

export default function Login() {
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });
    const { setUserData } = useAuthContext();
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const isValid = () => {
        let valid = true;
        if (!validateUsername(formData.username)) {
            toast.error(
                "The username should not be more than 20 characters long."
            );
            valid = false;
        }
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
            const res = await axios.post(
                "http://localhost:3000/user/login",
                formData
            );
            toast.success(res.data.message);
            localStorage.setItem("userData", JSON.stringify(res.data.userData));
            setUserData(res.data.userData);
            navigate("/");
        } catch (error) {
            toast.error(error.response.data.error);
        }
        setLoading(false);
    };

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Username:
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                    />
                </label>
                <br />
                <label>
                    Password:
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                    />
                </label>
                <br />
                {loading ? (
                    <button className="my-submit-button" disabled>Loading...</button>
                ) : (
                    <button className="my-submit-button" type="submit">Login</button>
                )}
            </form>
            <Link to="/forgot-password">Forgot password?</Link>
        </div>
    );
}
