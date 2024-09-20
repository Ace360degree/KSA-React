'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import nookies from 'nookies';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const cookies = nookies.get();
        setIsLoggedIn(!!cookies.isLogin); // Adjust the key based on your cookie
    }, []);

    return (
        <AuthContext.Provider value={{ isLoggedIn }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};