// ChangeProfileInfo

import React, { useState } from "react";
import { useAuthContext } from "../context/AuthContext.jsx";
import axios from "axios";
import toast from "react-hot-toast";
import validateUsername from "../utils/validateUsername.js";
import validatePictureSize from "../utils/validatePictureSize.js";

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
                `${import.meta.env.VITE_API_SERVER}/user/update`,
                formData,
                { headers: { Authorization: `Bearer ${userData.token}` } }
            );
            toast.success(res.data.message);
            localStorage.setItem("userData", JSON.stringify(res.data.userData));
            setUserData(res.data.userData);
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.error);
        }
        setLoading(false);
    };

    const checkAvailability = async () => {
        const res = await axios.post(
            `${import.meta.env.VITE_API_SERVER}/user/check-username-availability`,
            { username: formData.username }
        );
        if (formData.username === userData.username)
            setAvailability("😅This is your Current username");
        else if (res.data.available) setAvailability("✅Available");
        else setAvailability("❌Not Available");
    };

    return (
        <div>
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
                <label>Gender:</label>
                <div className="flex">
                    <label className="font-normal">
                        <input
                            type="radio"
                            name="gender"
                            value="male"
                            checked={formData.gender === "male"}
                            onChange={handleInputChange}
                        />
                        Male
                    </label>
                    <label className="font-normal">
                        <input
                            type="radio"
                            name="gender"
                            value="female"
                            checked={formData.gender === "female"}
                            onChange={handleInputChange}
                        />
                        Female
                    </label>
                    <label className="font-normal">
                        <input
                            type="radio"
                            name="gender"
                            value="other"
                            checked={formData.gender === "other"}
                            onChange={handleInputChange}
                        />
                        Other
                    </label>
                </div>

                <label>
                    Profile Picture:
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleProfilePicChange}
                    />
                </label>

                {/* image (profilePic) div below --- start*/}
                <p className="font-semibold">Preview:</p>
                <div className="overflow-hidden size-64 rounded-full">
                    {formData.profilePic == null ||
                    formData.profilePic == "" ? (
                        ""
                    ) : (
                        <img
                            className="w-full h-full object-cover"
                            src={formData.profilePic}
                        />
                    )}
                </div>
                {/* image (profilePic) div below --- end*/}

                <label>
                    Bio:
                    <textarea
                        name="bio"
                        value={formData.bio}
                        onChange={handleInputChange}
                    />
                </label>

                <label className="">
                    Choose Username:
                    <div className="flex justify-center items-center space-x-2">
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleInputChange}
                        />
                        {formData.username === "" ||
                        formData.username === null ? (
                            ""
                        ) : (
                            <p
                                className="bg-zinc-200 p-3 text-xs "
                                onClick={checkAvailability}
                            >
                                {availability}
                            </p>
                        )}
                    </div>
                </label>

                {loading ? (
                    <button
                        className="my-submit-button block"
                        type="submit"
                        disabled
                    >
                        Loading...
                    </button>
                ) : (
                    <button className="my-submit-button block" type="submit">
                        Submit
                    </button>
                )}
            </form>
        </div>
    );
}
