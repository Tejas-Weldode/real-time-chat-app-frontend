import React from "react";
import { useAuthContext } from "../context/AuthContext";

export default function VerifyEmail() {
    const { userData } = useAuthContext();
    return (
        <div>
            <h1>VerifyEmail</h1>
            <p>
                A verification link has been sent to your email address:{" "}
                {userData.email}. If not found in the inbox, please check your
                spam folder.
            </p>
        </div>
    );
}
