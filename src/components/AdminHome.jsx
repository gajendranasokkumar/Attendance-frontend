import React from 'react'
import Sidebar from './Sidebar'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'

const AdminHome = () => {
    return (
        <>
            <Navbar />
            <div className="flex w-[100vw]">
                <Sidebar />
                <Outlet />
                
            </div>
        </>

    )
}

export default AdminHome