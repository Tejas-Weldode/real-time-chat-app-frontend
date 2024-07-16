import React from "react";
import { useAuthContext } from "../context/AuthContext";

export default function VerifyEmail() {
    const { userData } = useAuthContext();
    return (
        <div>
            <h1>VerifyEmail</h1>
            <p className="mt-10">
                A verification link has been sent to your email address:{" "}
                {userData.email ? userData.email : ""}. If not found in the
                inbox, please check your spam folder.
            </p>
            <p className="my-2 text-2xl font-light">
                Please <span className="font-semibold">Login again</span> after
                verification.
            </p>
        </div>
    );
}
