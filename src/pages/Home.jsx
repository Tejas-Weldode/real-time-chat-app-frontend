import { React } from "react";
import { useAuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function Home() {
    const { userData, setUserData } = useAuthContext();

    const logout = () => {
        localStorage.removeItem("userData");
        setUserData(null);
    };

    return (
        <>
            {userData ? (
                <div>
                    <h1>Home</h1>
                    <p>Hello {userData.fullName}</p>
                    <p>{userData.token}</p>
                    <button onClick={logout}>Logout</button>
                    <br />
                    <Link to='/update'>Update</Link>
                </div>
            ) : (
                <h1>Home</h1>
            )}
        </>
    );
}
