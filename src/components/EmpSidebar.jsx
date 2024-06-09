import React from 'react'
import ExpandBox from './ExpandBox'
import { MdCoPresent } from "react-icons/md";
import { MdDateRange } from "react-icons/md";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { TbListDetails } from "react-icons/tb";
import { MdHistory } from "react-icons/md";
import { FiPlus } from "react-icons/fi";
import { AiFillThunderbolt } from "react-icons/ai";


const EmpSidebar = () => {


    const dashboardOptions = [{icon: <MdOutlineSpaceDashboard />, title: 'Employee Dashboard'}];
    const attendanceOptions = [ {icon: <TbListDetails />, title: 'Attendance Details'}, {icon: <MdHistory />, title: 'Attendance History'}];
    const leaveOptions = [ {icon: <FiPlus />, title: 'New Leave'},{icon: <AiFillThunderbolt />, title: 'Current Leave Status'},  {icon: <MdHistory />, title: "Past Leave"}];

    return (
        <>
            <div className=' h-[92vh] w-[100%] bg-shadeWhite lg:pt-[30px]'>
                <div className='h-[88%] overflow-y-auto  overflow-x-hidden lg:mt-5 '>
                    <ExpandBox number={1} name={"Dashboard"} icon={<TbLayoutDashboardFilled />} options={dashboardOptions} />
                    <ExpandBox number={2} name={"Attendance"} icon={<MdCoPresent />} options={attendanceOptions} />
                    <ExpandBox number={3} name={"Leave"} icon={<MdDateRange />} options={leaveOptions} />
                </div>
            </div>
        </>
    )
}

export default EmpSidebar