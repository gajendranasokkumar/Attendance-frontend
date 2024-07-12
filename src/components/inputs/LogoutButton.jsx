import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { LuLogOut } from "react-icons/lu";

const LogoutButton = () => {
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <>
            <button onClick={handleLogout} className='h-12 w-full cursor-pointer hover:bg-bgLRed px-5 flex justify-center items-center text-lg rounded-md mt-auto text-txtLRed'>Logout<span className='ml-3'><LuLogOut /></span></button>
        </>
    );
};

export default LogoutButton;
