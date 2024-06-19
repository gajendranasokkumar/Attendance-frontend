import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const PrivateRoute = ({ children, role }) => {
    const { auth, userData } = useContext(AuthContext);

    if (!auth) {
        return <Navigate to="/" />;
    }

    if (role && userData.person !== role) {
        return <Navigate to="/" />;
    }

    return children;    
};

export default PrivateRoute;
