// import React, { createContext, useState, useEffect, useRef } from 'react';
// import Loader from '../components/Loader';

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//     const [auth, setAuth] = useState(() => {
//         const token = localStorage.getItem('token');
//         return token ? true : false;
//     });

//     const [userData, setUserDataState] = useState(() => {
//         const storedUserData = localStorage.getItem('userData');
//         return storedUserData ? JSON.parse(storedUserData) : null;
//     });

//     const [loading, setLoading] = useState(true);

//     const userDataRef = useRef(null);

//     useEffect(() => {
//         const token = localStorage.getItem('token');
//         const storedUserData = localStorage.getItem('userData');
//         if (token && storedUserData) {
//             setAuth(true);
//             const parsedUserData = JSON.parse(storedUserData);
//             setUserDataState(parsedUserData);
//             userDataRef.current = parsedUserData;
//         }
//         setLoading(false);
//     }, []);

//     useEffect(() => {
//         if (userData) {
//             localStorage.setItem('userData', JSON.stringify(userData));
//             userDataRef.current = userData;
//         }
//     }, [userData]);

//     const setUserData = (data) => {
//         setUserDataState(data);
//         userDataRef.current = data;
//     };

//     const logout = () => {
//         localStorage.removeItem('token');
//         localStorage.removeItem('userData');
//         setAuth(false);
//         setUserDataState(null);
//     };

//     if (loading) {
//         return <Loader />; 
//     }

//     return (
//         <AuthContext.Provider value={{ auth, setAuth, userData, setUserData, userDataRef, logout, loading, setLoading }}>
//             {children}
//         </AuthContext.Provider>
//     );
// };




import React, { createContext, useState, useEffect, useRef } from 'react';
import Loader from '../components/homecomponents/Loader';

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

    const [loading, setLoading] = useState(false);

    const [isManager, setIsManager] = useState(false);

    useEffect(()=>{
        if(userData?.ismanager && userData?.ismanager.toLowerCase() == "yes")
            setIsManager(true)
    }, [userData])

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

    const showLoader = (seconds) => {
        setLoading(true);
        setTimeout(() => setLoading(false), seconds);
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userData');
        setAuth(false);
        setUserDataState(null);
    };

    // if(loading)
    // {
    //     return <Loader />
    // }

    return (
        <AuthContext.Provider value={{ auth, setAuth, userData, setUserData, userDataRef, logout, loading, showLoader, setLoading, isManager }}>
            {children}
            {loading && <Loader />}
        </AuthContext.Provider>
    );
};
