import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(false);
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setAuth(true);  
        }
    }, []);

    return (
        <AuthContext.Provider value={{ auth, setAuth, userData, setUserData }}>
            {children}
        </AuthContext.Provider>
    );
};
