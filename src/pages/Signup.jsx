import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormContext } from "../context/FormContext";
import axios from "axios";
import toast from "react-hot-toast";
import validateEmail from "../utils/vaildateEmail.js";
import validatePassword from "../utils/validatePassword.js";
import validateUsername from "../utils/validateUsername.js";
import validatePictureSize from "../utils/validatePictureSize.js";

export default function Signup() {
    const [loading, setLoading] = useState(false);

    const { formData, setFormData } = useFormContext();
    const [availability, setAvailability] = useState("Check Availability");

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        if (name === "username") setAvailability("Check Availability");
    };

    const handleProfilePicChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setFormData({ ...formData, profilePic: reader.result });
        };
        reader.readAsDataURL(file);
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
        if (!validateEmail(formData.email)) {
            toast.error("Email format is incorrect.");
            valid = false;
        }
        if (!validatePictureSize(formData.profilePic)) {
            toast.error("The size of the Picture cannot be more than 15 mb.");
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
            const res = await axios.post(
                `${import.meta.env.VITE_API_SERVER}/user/signup`,
                formData
            );
            toast.success(res.data.message);
            navigate("/verify");
        } catch (error) {
            toast.error(error.response.data.error);
        }
        setLoading(false);
    };

    const checkAvailability = async () => {
        const res = await axios.post(
            `${import.meta.env.VITE_API_SERVER}/user/check-username-availability`,
            { username: formData.username }
        );
        if (res.data.available) setAvailability("✅Available");
        else setAvailability("❌Not Available");
    };

    return (
        <div>
            <h1>Signup</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Full Name:
                    <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                    />
                </label>
                <br />
                <label>
                    Email:
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                    />
                </label>
                <br />
                <label>
                    Gender:
                    <label>
                        <input
                            type="radio"
                            name="gender"
                            value="male"
                            checked={formData.gender === "male"}
                            onChange={handleInputChange}
                        />{" "}
                        Male
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="gender"
                            value="female"
                            checked={formData.gender === "female"}
                            onChange={handleInputChange}
                        />{" "}
                        Female
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="gender"
                            value="other"
                            checked={formData.gender === "other"}
                            onChange={handleInputChange}
                        />{" "}
                        Other
                    </label>
                </label>
                <br />
                <label>
                    Profile Picture:
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleProfilePicChange}
                    />
                </label>
                <br />
                <label>
                    Bio:
                    <textarea
                        name="bio"
                        value={formData.bio}
                        onChange={handleInputChange}
                    />
                </label>
                <br />
                <label>
                    Choose Username:
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                    />
                </label>
                {formData.username === "" || formData.username === null ? (
                    ""
                ) : (
                    <p onClick={checkAvailability}>{availability}</p>
                )}
                <br />
                <label>
                    Set Password:
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                    />
                </label>
                <br />
                {loading ? (
                    <button className="my-submit-button" disabled>
                        Loading...
                    </button>
                ) : (
                    <button className="my-submit-button" type="submit">
                        Submit
                    </button>
                )}
            </form>
            <br />
            {/* image (profilePic) div below */}
            <div>
                {formData.profilePic == null || formData.profilePic == "" ? (
                    ""
                ) : (
                    <img src={formData.profilePic} />
                )}
            </div>
        </div>
    );
}
