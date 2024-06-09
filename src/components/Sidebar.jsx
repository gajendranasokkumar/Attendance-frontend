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

    const dashboardOptions = [{icon: <RxDashboard />, title: 'Admin Dashboard'},{icon: <MdOutlineSpaceDashboard />, title: 'Employee Dashboard'}];
    const attendanceOptions = [ {icon: <TbListDetails />, title: 'Attendance Details'}, {icon: <MdHistory />, title: 'Attendance History'}];
    const leaveOptions = [ {icon: <FiPlus />, title: 'New Leave'}, {icon: <MdOutlineWorkOff />, title: "Employee's Leave"}, {icon: <MdHistory />, title: "Past Leave"}];

    return (
        <>
            <div className='h-[92vh] w-[18%] bg-shadeWhite pt-[30px]'>
                <div className='h-[12%]'>
                    <NewButton />
                </div>
                <div className='h-[88%] overflow-y-auto'>
                    <ExpandBox number={1} name={"Dashboard"} icon={<TbLayoutDashboardFilled />} options={dashboardOptions} />
                    <ExpandBox number={2} name={"Attendance"} icon={<MdCoPresent />} options={attendanceOptions} />
                    <ExpandBox number={3} name={"Leave"} icon={<MdDateRange />} options={leaveOptions} />
                </div>
            </div>
        </>
    )
}

export default Sidebar