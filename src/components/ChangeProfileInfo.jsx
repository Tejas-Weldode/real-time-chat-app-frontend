// ChangeProfileInfo

import React, { useState } from "react";
import { useAuthContext } from "../context/AuthContext.jsx";
import axios from "axios";
import toast from "react-hot-toast";

export default function ChangeProfileInfo() {
    const [loading, setLoading] = useState(false);

    const { userData, setUserData } = useAuthContext();
    const [formData, setFormData] = useState({
        username: userData.username || "",
        fullName: userData.fullName || "",
        profilePic: userData.profilePic || "",
        gender: userData.gender || "",
        bio: userData.bio || "",
    });

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
        if (!validatePictureSize(formData.profilePic)) {
            toast.error("The size of the Picture cannot be more than 15 mb.");
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
            toast.error(error.response.data.error);
        }
        setLoading(false);
    };

    const checkAvailability = async () => {
        const res = await axios.post(
            "http://localhost:3000/user/check-username-availability",
            { username: formData.username }
        );
        if (formData.username === userData.username)
            setAvailability("😅This is your Current username");
        else if (res.data.available) setAvailability("✅Available");
        else setAvailability("❌Not Available");
    };

    return (
        <div>
            <h1>ChangeProfileInfo</h1>
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

                {loading ? (
                    <button disabled>Loading...</button>
                ) : (
                    <button type="submit">Submit</button>
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
