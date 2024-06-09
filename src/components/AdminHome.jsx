import React from 'react'
import Sidebar from './Sidebar'
import Content from './Content'
import Navbar from './Navbar'

const AdminHome = () => {
    return (
        <>
            <Navbar />
            <div className="flex w-[100vw]">
                <Sidebar />
                <Content />
            </div>
        </>

    )
}

export default AdminHome