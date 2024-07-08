import { React } from "react";
import { useAuthContext } from "../context/AuthContext";

export default function Home() {
    const { userData } = useAuthContext();

    return (
        <>
            {userData ? (
                <div>
                    <h1>Home</h1>
                    <p>Hello {userData.fullName}</p>
                    <br />
                </div>
            ) : (
                <h1>Home</h1>
            )}
        </>
    );
}
