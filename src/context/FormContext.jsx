/**
 * editable names:
 * FormContext
 * useFormContext
 * FormContextProvider
 */

import { createContext, useContext } from "react";
import { useState } from "react";

export const FormContext = createContext();

export const useFormContext = () => {
    return useContext(FormContext);
};

export const FormContextProvider = ({ children }) => {
    //
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        email: "",
        fullName: "",
        profilePic: "",
        gender: "",
        bio: "",
    });
    //
    return (
        <FormContext.Provider value={{ formData, setFormData }}>
            {children}
        </FormContext.Provider>
    );
};
