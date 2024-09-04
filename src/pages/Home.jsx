import { React } from "react";
import { useAuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function Home() {
    const { userData } = useAuthContext();

    return (
        <>
            {userData ? (
                <div>
                    <h1>Hello {userData.fullName}</h1>
                    <Link
                        className="bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded"
                        to="/chat"
                    >
                        Chat
                    </Link>
                    <Link
                        className="bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded"
                        to="/chat/discover-people"
                    >
                        Discover People
                    </Link>
                    <br />
                </div>
            ) : (
                <>
                    <h1>Welcome to the Chat App</h1>
                    <Link
                        className="bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded"
                        to="/login"
                    >
                        Login
                    </Link>
                    <Link
                        className="bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded"
                        to="/signup"
                    >
                        Signup
                    </Link>
                </>
            )}
        </>
    );
}
