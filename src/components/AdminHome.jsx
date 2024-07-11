import React, { useState, useEffect } from 'react'
import Sidebar from './Sidebar'
import Navbar from './Navbar'
import { Outlet, useLocation } from 'react-router-dom'

const AdminHome = () => {
    const [isSidebarVisible, setSidebarVisible] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleRouteChange = () => {
            if (window.innerWidth < 640) {
                setSidebarVisible(false);
            }
        };

        handleRouteChange();
    }, [location]);

    const toggleSidebar = () => {
        if (window.innerWidth < 1024) {
            setSidebarVisible(!isSidebarVisible);
        }
    };

    return (
        <>
            <Navbar toggleSidebar={toggleSidebar} isSidebarVisible={isSidebarVisible} />
            <div className="flex w-[100vw]">
                <div className={`lg:inline-block ${isSidebarVisible ? 'absolute' : 'hidden'} xs:w-[60%] lg:w-[18%] z-[999]`}>
                    <Sidebar />
                </div>
                <div className='w-[100%]'>
                    <Outlet />
                </div>
            </div>
        </>
    )
}

export default AdminHome