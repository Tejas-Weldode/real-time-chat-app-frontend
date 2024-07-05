/**
 * editable names:
 * AuthContext
 * useAuthContext
 * AuthContextProvider
 */

import { createContext, useContext } from "react";
import { useState } from "react";

export const AuthContext = createContext();

export const useAuthContext = () => {
    return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
    //
    const [userData, setUserData] = useState(
        JSON.parse(localStorage.getItem("userData" || null))
    );
    //
    return (
        <AuthContext.Provider value={{ userData, setUserData }}>
            {children}
        </AuthContext.Provider>
    );
};
