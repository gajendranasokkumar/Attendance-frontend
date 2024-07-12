import React, { useContext } from 'react';
import { MdCoPresent, MdManageHistory, MdDateRange, MdOutlineSpaceDashboard, MdHistory, MdManageAccounts } from 'react-icons/md';
import { TbLayoutDashboardFilled, TbListDetails } from 'react-icons/tb';
import { FiPlus } from 'react-icons/fi';
import { AiFillThunderbolt } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { VscGitPullRequestNewChanges } from 'react-icons/vsc';
import { IoPeopleCircleOutline } from 'react-icons/io5';
import { FaPeopleGroup } from 'react-icons/fa6';
import { ExpandBox } from '../index';





const EmpSidebar = () => {
    const { userData, isManager } = useContext(AuthContext);

    const dashboardOptions = [{ icon: <MdOutlineSpaceDashboard />, title: 'Employee Dashboard', link: '/employee' }];
    const employeeOptions = [{ icon: <IoPeopleCircleOutline />, title: 'Team List', link: 'employeelist' }]
    const attendanceOptions = [{ icon: <TbListDetails />, title: 'Today\'s Attendance', link: 'attendanceList' }, { icon: <MdHistory />, title: 'Attendance History', link: 'attendanceHistory' }, { icon: <VscGitPullRequestNewChanges />, title: 'Request Attendance', link: 'requestattendance' }];
    const leaveOptions = [{ icon: <FiPlus />, title: 'New Leave', link: 'leaveForm' }, { icon: <AiFillThunderbolt />, title: 'Current Leave Status', link: "leaveStatus" }, { icon: <MdHistory />, title: "Past Leave", link: 'leaveList' }];

    if (isManager) {
        attendanceOptions.push({ icon: <MdManageHistory />, title: 'Team\'s Attendance', link: 'teamattendance' });
        leaveOptions.push({ icon: <MdManageAccounts />, title: 'Manage Team\'s Leave', link: 'teamleave' })
    }

    return (
        <>
            <div className=' h-[92vh] xs:min-w-[100%] bg-shadeWhite lg:pt-[30px] z-[999] xs:shadow-[11px_0px_13px_-10px_rgba(0,0,0,0.75)] md:shadow-[none]'>
                <div className='h-[50px] xs:py-10 md:py-0 p-2 text-lg border-l-2 border-l-bgGreen ml-2 flex justify-center flex-col'>
                    <p className='font-semibold text-inputBorder text-[clamp(1rem,4vw,1.2rem)]'>Emp ID: <span className='text-bgGreen'>{userData?.id}</span></p>
                    <p className='font-semibold text-inputBorder text-[clamp(1rem,4vw,1.2rem)]'>Name: <span className='text-bgGreen text-sm'>{userData?.name}</span></p>
                </div>
                <div className='h-[88%] overflow-y-auto  overflow-x-hidden lg:mt-5 '>
                    <ExpandBox key={1} number={1} name={"Dashboard"} icon={<TbLayoutDashboardFilled />} options={dashboardOptions} />
                    {
                        isManager ?
                            <ExpandBox key={2} number={2} name={"Team"} icon={<FaPeopleGroup />} options={employeeOptions} />
                            :
                            <></>
                    }
                    <ExpandBox key={3} number={3} name={"Attendance"} icon={<MdCoPresent />} options={attendanceOptions} />
                    <ExpandBox key={4} number={4} name={"Leave"} icon={<MdDateRange />} options={leaveOptions} />
                </div>
            </div>
        </>
    )
}

export default EmpSidebar