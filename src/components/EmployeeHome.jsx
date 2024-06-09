import React, { useState } from 'react'
import Navbar from './Navbar'
import EmpSidebar from './EmpSidebar'
import EmpContent from './EmpContent'
import LeaveList from './LeaveList'

const EmployeeHome = () => {

    const [isSidebarVisible, setSidebarVisible] = useState(false);

    const toggleSidebar = () => {
        setSidebarVisible(!isSidebarVisible);
    };

    return (
        <>
            <Navbar toggleSidebar={toggleSidebar} isSidebarVisible={isSidebarVisible} />
            <div className="flex w-[100vw]">
                <div className={`lg:block ${isSidebarVisible ? 'absolute' : 'hidden'} lg:w-[18%]`}>
                    <EmpSidebar />
                </div>
                <div className='w-[100%]'>
                    {/* <EmpContent /> */}
                    <LeaveList />
                </div>
            </div>
        </>
    )
}

export default EmployeeHome