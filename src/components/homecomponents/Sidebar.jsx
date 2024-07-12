// import React from 'react'
// import ExpandBox from './ExpandBox'
// import NewButton from './NewButton'
// import { MdCoPresent } from "react-icons/md";
// import { MdDateRange } from "react-icons/md";
// import { TbLayoutDashboardFilled } from "react-icons/tb";
// import { RxDashboard } from "react-icons/rx";
// import { MdOutlineSpaceDashboard } from "react-icons/md";
// import { TbListDetails } from "react-icons/tb";
// import { MdHistory } from "react-icons/md";
// import { FiPlus } from "react-icons/fi";
// import { MdOutlineWorkOff } from "react-icons/md";
// import { FaPeopleGroup } from "react-icons/fa6";
// import { IoPeopleCircleOutline } from "react-icons/io5";
// import { MdManageHistory } from "react-icons/md";





// const Sidebar = () => {

//     const employeeOptions = [{icon: <IoPeopleCircleOutline />, title: 'Employees List', link: 'employeelist'}]
//     const dashboardOptions = [{icon: <RxDashboard />, title: 'Admin Dashboard', link: '/admin'},{icon: <MdOutlineSpaceDashboard />, title: 'Employee Dashboard', link: '/admin/dashboard'}];
//     const attendanceOptions = [ {icon: <TbListDetails />, title: 'Attendance Details', link: 'attendancelist'}, {icon: <MdHistory />, title: 'Attendance History', link: 'attendancehistory'}, {icon: <MdManageHistory />, title: 'Manage Request', link: 'manageattendancerequest'}];
//     const leaveOptions = [ {icon: <FiPlus />, title: 'New Leave', link: 'leaveform'}, {icon: <MdOutlineWorkOff />, title: "Employee's Leave", link: 'leavelist'}, {icon: <MdHistory />, title: "Past Leave", link: 'pastleave'}];

//     return (
//         <>
//             <div className='h-[92vh] min-w-[15%] max-w-[15%] bg-shadeWhite pt-[30px] '>
//                 <div className='h-[12%]'>
//                     <NewButton />
//                 </div>
//                 <div className='h-[88%] overflow-y-auto overflow-x-hidden lg:mt-5'>
//                     <ExpandBox number={1} name={"Dashboard"} icon={<TbLayoutDashboardFilled />} options={dashboardOptions} />
//                     <ExpandBox number={2} name={"Employees"} icon={<FaPeopleGroup />} options={employeeOptions} />
//                     <ExpandBox number={3} name={"Attendance"} icon={<MdCoPresent />} options={attendanceOptions} />
//                     <ExpandBox number={4} name={"Leave"} icon={<MdDateRange />} options={leaveOptions} />
//                 </div>
//             </div>
//         </>
//     )
// }

// export default Sidebar


import React, { useContext } from 'react';
import { ExpandBox, NewButton } from '../index';
import {
    MdCoPresent,
    MdDateRange,
    MdHistory,
    MdOutlineSpaceDashboard,
    MdOutlineWorkOff,
    MdManageHistory
} from 'react-icons/md';
import { TbLayoutDashboardFilled, TbListDetails } from 'react-icons/tb';
import { RxDashboard } from 'react-icons/rx';
import { FiPlus } from 'react-icons/fi';
import { FaPeopleGroup } from 'react-icons/fa6';
import { IoPeopleCircleOutline } from 'react-icons/io5';
import { AuthContext } from '../../context/AuthContext';


const Sidebar = () => {
    const { userData } = useContext(AuthContext);

    const employeeOptions = [{ icon: <IoPeopleCircleOutline />, title: 'Employees List', link: 'employeelist' }]
    const dashboardOptions = [{ icon: <RxDashboard />, title: 'Admin Dashboard', link: '/admin' }, { icon: <MdOutlineSpaceDashboard />, title: 'Employee Dashboard', link: '/admin/dashboard' }];
    const attendanceOptions = [{ icon: <TbListDetails />, title: 'Attendance Details', link: 'attendancelist' }, { icon: <MdHistory />, title: 'Attendance History', link: 'attendancehistory' }, { icon: <MdManageHistory />, title: 'Manage Request', link: 'manageattendancerequest' }];
    const leaveOptions = [{ icon: <FiPlus />, title: 'New Leave', link: 'leaveform' }, { icon: <MdOutlineWorkOff />, title: "Employee's Leave", link: 'leavelist' }, { icon: <MdHistory />, title: "Past Leave", link: 'pastleave' }];

    return (
        <>
            <div className='h-[92vh] xs:min-w-[100%] bg-shadeWhite lg:pt-[30px] z-[999] xs:shadow-[11px_0px_13px_-10px_rgba(0,0,0,0.75)] md:shadow-[none]'>
                <div className='h-[50px] xs:py-10 md:py-0 p-2 text-lg border-l-2 border-l-bgGreen ml-2 flex justify-center flex-col'>
                    <p className='font-semibold text-inputBorder text-[clamp(1rem,4vw,1.2rem)]'>Admin ID: <span className='text-bgGreen'>{userData?.id}</span></p>
                    <p className='font-semibold text-inputBorder text-[clamp(1rem,4vw,1.2rem)]'>Name: <span className='text-bgGreen text-sm'>{userData?.name}</span></p>
                </div>
                <div className='xs:mt-5 md:mt-7'>
                    <NewButton />
                </div>
                <div className='h-[88%] overflow-y-auto overflow-x-hidden lg:mt-5 '>
                    <ExpandBox number={1} name={"Dashboard"} icon={<TbLayoutDashboardFilled />} options={dashboardOptions} />
                    <ExpandBox number={2} name={"Employees"} icon={<FaPeopleGroup />} options={employeeOptions} />
                    <ExpandBox number={3} name={"Attendance"} icon={<MdCoPresent />} options={attendanceOptions} />
                    <ExpandBox number={4} name={"Leave"} icon={<MdDateRange />} options={leaveOptions} />
                </div>
            </div>
        </>
    )
}

export default Sidebar