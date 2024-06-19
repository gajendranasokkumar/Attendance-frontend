import React, { createContext, useState, useEffect, useRef } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(false);
    const [userData, setUserDataState] = useState(null);
    const userDataRef = useRef(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const storedUserData = localStorage.getItem('userData');
        if (token && storedUserData) {
            setAuth(true);
            const parsedUserData = JSON.parse(storedUserData);
            setUserDataState(parsedUserData);
            userDataRef.current = parsedUserData;
        }
    }, []);

    useEffect(() => {
        if (userData) {
            localStorage.setItem('userData', JSON.stringify(userData));
            userDataRef.current = userData;
        }
    }, [userData]);

    const setUserData = (data) => {
        setUserDataState(data);
        userDataRef.current = data;
    };

    return (
        <AuthContext.Provider value={{ auth, setAuth, userData, setUserData, userDataRef }}>
            {children}
        </AuthContext.Provider>
    );
};
