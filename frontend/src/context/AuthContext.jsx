import { useState } from "react";
import { AuthDataContext } from "./AuthDataContext"; 

function AuthContext({ children }) {
    const serverUrl = "http://localhost:8000";
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