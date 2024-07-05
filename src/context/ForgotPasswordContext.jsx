/**
 * editable names:
 * ForgotPasswordContext
 * useForgotPasswordContext
 * ForgotPasswordContextProvider
 */

import { createContext, useContext } from "react";
import { useState } from "react";

export const ForgotPasswordContext = createContext();

export const useForgotPasswordContext = () => {
    return useContext(ForgotPasswordContext);
};

export const ForgotPasswordContextProvider = ({ children }) => {
    //
    const [email, setEmail] = useState("");
    //
    return (
        <ForgotPasswordContext.Provider value={{ email, setEmail }}>
            {children}
        </ForgotPasswordContext.Provider>
    );
};
