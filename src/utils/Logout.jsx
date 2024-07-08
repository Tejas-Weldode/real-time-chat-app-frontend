import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Logout = () => {
    const { setUserData } = useAuthContext();
    const navigate = useNavigate();
    useEffect(() => {
        localStorage.removeItem("userData");
        setUserData(null);
        navigate("/");
    }, []);
};

export default Logout;
