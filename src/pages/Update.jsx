import React, { useState } from "react";
import ChangeProfileInfo from "../components/ChangeProfileInfo.jsx";
import ChangeEmail from "../components/ChangeEmail.jsx";
import ChangePassword from "../components/ChangePassword.jsx";

export default function Update() {
    // step 1
    const [componentKey, setComponentKey] = useState("profile");

    // step 4
    const changeComponent = () => {
        switch (componentKey) {
            case "profile":
                return <ChangeProfileInfo />;

            case "email":
                return <ChangeEmail />;

            case "password":
                return <ChangePassword />;

            default:
                return <ChangeProfileInfo />;
        }
    };

    return (
        <div>
            {/* step 2 */}
            <h1>Update Info</h1>
            <div className="flex overflow-x-scroll">
                <button
                    className={`${
                        componentKey === "profile"
                            ? "my-option-button-active"
                            : ""
                    } my-option-button`}
                    onClick={() => setComponentKey("profile")}
                >
                    Change Profile
                </button>
                <button
                    className={`${
                        componentKey === "email"
                            ? "my-option-button-active"
                            : ""
                    } my-option-button`}
                    onClick={() => setComponentKey("email")}
                >
                    Change Email
                </button>
                <button
                    className={`${
                        componentKey === "password"
                            ? "my-option-button-active"
                            : ""
                    } my-option-button`}
                    onClick={() => setComponentKey("password")}
                >
                    Change Password
                </button>
            </div>
            {/* step 3 */}
            {changeComponent()}
        </div>
    );
}
