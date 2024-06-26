import React, { createContext, useState, useEffect, useRef } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(() => {
        const token = localStorage.getItem('token');
        return token ? true : false;
    });
    const [userData, setUserDataState] = useState(() => {
        const storedUserData = localStorage.getItem('userData');
        return storedUserData ? JSON.parse(storedUserData) : null;
    });
    const [loading, setLoading] = useState(true);
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
        setLoading(false);
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

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userData');
        setAuth(false);
        setUserDataState(null);
    };

    if (loading) {
        return <div>Loading...</div>; 
    }

    return (
        <AuthContext.Provider value={{ auth, setAuth, userData, setUserData, userDataRef, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
