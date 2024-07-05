import React, { useState } from "react";
import RecentChats from "../components/ChatComponents/RecentChats.jsx";
import SavedChats from "../components/ChatComponents/SavedChats.jsx";

export default function ListOfChats() {
    const [componentKey, setComponentKey] = useState("recent"); // or saved
    const changeComponent = () => {
        switch (componentKey) {
            case "recent":
                return <RecentChats />;

            case "saved":
                return <SavedChats />;

            default:
                return <RecentChats />;
        }
    };
    return (
        <>
            <h1>List of Chats</h1>
            <button onClick={() => setComponentKey("recent")}>Recent</button>
            <button onClick={() => setComponentKey("saved")}>Saved</button>
            {changeComponent()}
        </>
    );
}
