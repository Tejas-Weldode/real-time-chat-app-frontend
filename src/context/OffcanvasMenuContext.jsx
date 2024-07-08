/* CHANGE NOTHING IN THIS FILE */

import React, { useState, createContext } from "react";

const OffCanvasToggleContext = createContext();

export function OffCanvasToggleProvider({ children }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => {
        document.body.classList.toggle("overflow-hidden");
        setIsMenuOpen(!isMenuOpen);
    };
    return (
        <OffCanvasToggleContext.Provider value={{ isMenuOpen, toggleMenu }}>
            {children}
        </OffCanvasToggleContext.Provider>
    );
}

export default OffCanvasToggleContext;
