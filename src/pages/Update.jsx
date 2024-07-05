import React, { useState } from "react";
import { useAuthContext } from "../context/AuthContext.jsx";
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
            <h1>Update</h1>
            <button onClick={() => setComponentKey("profile")}>
                Change Profile
            </button>
            <button onClick={() => setComponentKey("email")}>
                Change Email
            </button>
            <button onClick={() => setComponentKey("password")}>
                Change Password
            </button>
            {/* step 3 */}
            {changeComponent()}
        </div>
    );
}
