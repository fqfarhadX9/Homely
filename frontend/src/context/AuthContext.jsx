import { useState } from "react";
import { AuthDataContext } from "./AuthDataContext"; 

function AuthContext({ children }) {
    const serverUrl = "https://homely-backend-eptt.onrender.com";
    const [loading, setLoading] = useState(false);
    const value = {
        serverUrl,
        loading,
        setLoading
    };
    return (
        <AuthDataContext.Provider value={value}>
            {children}
        </AuthDataContext.Provider>
    );
};

export default AuthContext;