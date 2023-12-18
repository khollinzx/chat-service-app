import { createContext, useState } from 'react';

export const AuthContext = createContext({
    token: '',
    user: {},
    isAuthenticated: false,
    authenticate: (token, user) => {},
    // userProfile: (user) => {},
    logout: () => {},
});

function AuthContextProvider({ children }) {
    const [authToken, setAuthToken] = useState();
    const [getUser, setAuthUser] = useState({});

    function authenticate(data) {
        setAuthToken(data.accessToken);
        setAuthUser(data.profile);
    }

    function logout() {
        setAuthToken(null);
        setAuthUser(null);
    }

    const value = {
        token: authToken,
        user: getUser,
        isAuthenticated: !!authToken,
        authenticate: authenticate,
        // userProfile: userProfile,
        logout: logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;