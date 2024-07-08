import { React } from "react";
import { Routes, Route } from "react-router-dom";
// pages
import PageNotFound from "./pages/PageNotFound.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Logout from "./utils/Logout.jsx";
import Update from "./pages/Update.jsx";
import VerifyEmail from "./pages/VerifyEmail.jsx";
import ListOfChats from "./pages/ListOfChats.jsx";
import DiscoverPeople from "./pages/DiscoverPeople.jsx";
import Chat from "./pages/Chat.jsx";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword.jsx";
import SetNewPassword from "./pages/ForgotPassword/SetNewPassword.jsx";
// components
import Navbar from "./components/Navbar.jsx";
//context
import { useAuthContext } from "./context/AuthContext.jsx";
//
function App() {
    const { userData } = useAuthContext();
    return (
        <>
            <Navbar />
            <div className="container mx-auto px-4">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route
                        path="/login"
                        element={userData ? <Home /> : <Login />}
                    />
                    <Route path="/logout" element={<Logout />} />

                    <Route
                        path="/signup"
                        element={userData ? <Home /> : <Signup />}
                    />
                    <Route
                        path="/update"
                        element={userData ? <Update /> : <Home />}
                    />
                    <Route
                        path="/verify"
                        element={userData ? <VerifyEmail /> : <Home />}
                    />
                    <Route
                        path="/chat"
                        element={userData ? <ListOfChats /> : <Home />}
                    />
                    <Route
                        path="/chat/:id"
                        element={userData ? <Chat /> : <Home />}
                    />
                    <Route
                        path="/chat/discover-people"
                        element={userData ? <DiscoverPeople /> : <Home />}
                    />

                    <Route
                        path="/forgot-password"
                        element={<ForgotPassword />}
                    />
                    <Route
                        path="/set-new-password"
                        element={<SetNewPassword />}
                    />
                    <Route path="*" element={<PageNotFound />} />
                </Routes>
            </div>
        </>
    );
}

export default App;
