// import React, { useContext, useState } from 'react'
// import Navbar from './Navbar'
// import EmpSidebar from './EmpSidebar'
// import EmpContent from './EmpContent'
// import LeaveList from './LeaveList'
// import { Outlet } from 'react-router-dom'
// import { AuthContext } from '../context/AuthContext';


// const EmployeeHome = () => {
//     const [isSidebarVisible, setSidebarVisible] = useState(false);
//     const { userData } = useContext(AuthContext);


//     const toggleSidebar = () => {
//         setSidebarVisible(!isSidebarVisible);
//     };

//     return (
//         <>
//         {console.log("🚀 ~ EmployeeHome ~ userData:", userData)}
            
//             <Navbar toggleSidebar={toggleSidebar} isSidebarVisible={isSidebarVisible} />
//             <div className="flex w-[100vw]">
//                 <div className={`lg:inline-block ${isSidebarVisible ? 'absolute' : 'hidden'} xs:w-[60%] lg:w-[18%] z-[999]`}>
//                     <EmpSidebar />
//                 </div>
//                 <div className='w-[100%] '>
//                     {/* <EmpContent />
//                     <LeaveList /> */}
//                     <Outlet />
//                 </div>
//             </div>
//         </>
//     )
// }

// export default EmployeeHome





import React, { useContext, useState, useEffect } from 'react';
import { Navbar, EmpSidebar } from '../index';
import { Outlet, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';


const EmployeeHome = () => {
    const [isSidebarVisible, setSidebarVisible] = useState(false);
    const { userData } = useContext(AuthContext);
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
            {console.log("🚀 ~ EmployeeHome ~ userData:", userData)}
            
            <Navbar toggleSidebar={toggleSidebar} isSidebarVisible={isSidebarVisible} />
            <div className="flex w-[100vw]">
                <div className={`lg:inline-block ${isSidebarVisible ? 'absolute' : 'hidden'} xs:w-[60%] lg:w-[18%] z-[999]`}>
                    <EmpSidebar />
                </div>
                <div className='w-[100%] '>
                    <Outlet />
                </div>
            </div>
        </>
    )
}

export default EmployeeHome