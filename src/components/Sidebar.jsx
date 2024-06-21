import React from 'react'
import ExpandBox from './ExpandBox'
import NewButton from './NewButton'
import { MdCoPresent } from "react-icons/md";
import { MdDateRange } from "react-icons/md";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { RxDashboard } from "react-icons/rx";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { TbListDetails } from "react-icons/tb";
import { MdHistory } from "react-icons/md";
import { FiPlus } from "react-icons/fi";
import { MdOutlineWorkOff } from "react-icons/md";



const Sidebar = () => {

    const dashboardOptions = [{icon: <RxDashboard />, title: 'Admin Dashboard', link: '/admin'},{icon: <MdOutlineSpaceDashboard />, title: 'Employee Dashboard'}];
    const attendanceOptions = [ {icon: <TbListDetails />, title: 'Attendance Details', link: 'attendancelist'}, {icon: <MdHistory />, title: 'Attendance History', link: 'attendancehistory'}];
    const leaveOptions = [ {icon: <FiPlus />, title: 'New Leave', link: 'leaveform'}, {icon: <MdOutlineWorkOff />, title: "Employee's Leave", link: 'leavelist'}, {icon: <MdHistory />, title: "Past Leave", link: 'pastleave'}];

    return (
        <>
            <div className='h-[92vh] min-w-[15%] max-w-[15%] bg-shadeWhite pt-[30px] '>
                <div className='h-[12%]'>
                    <NewButton />
                </div>
                <div className='h-[88%] overflow-y-auto overflow-x-hidden lg:mt-5'>
                    <ExpandBox number={1} name={"Dashboard"} icon={<TbLayoutDashboardFilled />} options={dashboardOptions} />
                    <ExpandBox number={2} name={"Attendance"} icon={<MdCoPresent />} options={attendanceOptions} />
                    <ExpandBox number={3} name={"Leave"} icon={<MdDateRange />} options={leaveOptions} />
                </div>
            </div>
        </>
    )
}

export default Sidebar