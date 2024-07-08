// CHANGE NOTHING IN THIS CODE EXCEPT THE NAVBAR CONTNET
import React, { useContext } from "react";
import OffCanvasToggleContext from "../context/OffcanvasMenuContext.jsx";
import { useAuthContext } from "../context/AuthContext.jsx";
import { Link } from "react-router-dom";

export default function OffCanvasMenu() {
    document.body.classList.add("overflow-x-hidden");
    const { isMenuOpen, toggleMenu } = useContext(OffCanvasToggleContext);
    const { userData } = useAuthContext();

    return (
        <>
            {/* the navbar-group */}
            <div
                className={`absolute right-0 z-20 h-screen w-4/5 md:w-1/2 flex transition duration-500 ${
                    isMenuOpen ? "" : "translate-x-full"
                }`}
            >
                {/* close button */}
                <button
                    className="h-fit bg-zinc-200 hover:bg-zinc-300 active:bg-zinc-500 active:text-zinc-50 transform duration-300 text-zinc-950 font-semibold p-2 m-2 rounded-full flex justify-center items-center"
                    onClick={toggleMenu}
                >
                    <span className="material-symbols-outlined">close</span>
                </button>
                {/* the navbar */}
                <div
                    className={`flex bg-zinc-50 text-zinc-950 overflow-auto w-full`}
                >
                    <div className="flex flex-col">
                        <Link
                            to="/"
                            className="font-semibold p-4 pb-0 md:p-10 md:pb-0 text-zinc-500 hover:text-zinc-950"
                        >
                            Home
                        </Link>
                        {userData ? (
                            <>
                                <Link
                                    to="/logout"
                                    className="font-semibold p-4 pb-0 md:p-10 md:pb-0 text-zinc-500 hover:text-zinc-950"
                                >
                                    Logout
                                </Link>
                                <Link
                                    to="/update"
                                    className="font-semibold p-4 pb-0 md:p-10 md:pb-0 text-zinc-500 hover:text-zinc-950"
                                >
                                    Edit Personal Info
                                </Link>
                                <Link
                                    to="/chat"
                                    className="font-semibold p-4 pb-0 md:p-10 md:pb-0 text-zinc-500 hover:text-zinc-950"
                                >
                                    Chat
                                </Link>
                                <Link
                                    to="/chat/discover-people"
                                    className="font-semibold p-4 pb-0 md:p-10 md:pb-0 text-zinc-500 hover:text-zinc-950"
                                >
                                    Discover People
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    className="font-semibold p-4 pb-0 md:p-10 md:pb-0 text-zinc-500 hover:text-zinc-950"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/signup"
                                    className="font-semibold p-4 pb-0 md:p-10 md:pb-0 text-zinc-500 hover:text-zinc-950"
                                >
                                    Signup
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
            {/* the cover */}
            <div
                className={`bg-zinc-50 fixed z-10 w-screen h-screen transition  ${
                    isMenuOpen ? "opacity-25" : "hidden"
                }`}
                onClick={toggleMenu}
            ></div>
            {/* the button */}
            <button
                className=" hover:bg-zinc-300 active:bg-zinc-500 active:text-zinc-50 transform duration-300 text-zinc-950 font-semibold p-2 m-2 rounded-full flex justify-center items-center"
                onClick={toggleMenu}
            >
                <span className="material-symbols-outlined">menu</span>
            </button>
        </>
    );
}
