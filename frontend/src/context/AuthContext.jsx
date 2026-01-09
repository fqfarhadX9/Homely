import { AuthDataContext } from "./AuthDataContext"; 

function AuthContext({ children }) {
    const serverUrl = "http://localhost:8000";
    const value = {
        serverUrl,
    };
    return (
        <AuthDataContext.Provider value={value}>
            {children}
        </AuthDataContext.Provider>
    );
};

export default AuthContext;