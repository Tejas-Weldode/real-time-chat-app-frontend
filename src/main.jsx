import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import { FormContextProvider } from "./context/FormContext.jsx";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import { ForgotPasswordContextProvider } from "./context/ForgotPasswordContext.jsx";
import { Toaster } from "react-hot-toast";
import { SocketContextProvider } from "./context/SocketContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <AuthContextProvider>
            <FormContextProvider>
                <ForgotPasswordContextProvider>
                    <BrowserRouter>
                        <SocketContextProvider>
                            <Toaster />
                            <App />
                        </SocketContextProvider>
                    </BrowserRouter>
                </ForgotPasswordContextProvider>
            </FormContextProvider>
        </AuthContextProvider>
    </React.StrictMode>
);
