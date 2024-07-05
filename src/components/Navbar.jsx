import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <div>
            <h1>Navbar</h1>
            <ul>
                <li>
                    <Link to="/login">/login</Link>
                </li>
                <li>
                    <Link to="/signup">/signup</Link>
                </li>
                <li>
                    <Link to="/">home</Link>
                </li>
                <li>
                    <Link to="/update">/update</Link>
                </li>
                <li>
                    <Link to="/verify">/verify</Link>
                </li>
                <li>
                    <Link to="/chat">/chat</Link>
                </li>
                <li>
                    <Link to="/chat/discover-people">
                        /chat/discover-people
                    </Link>
                </li>
            </ul>
        </div>
    );
}
