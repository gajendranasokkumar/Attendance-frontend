import React from 'react'
import ExpandBox from './ExpandBox'
import NewButton from './NewButton'
import { MdCoPresent } from "react-icons/md";
import { MdDateRange } from "react-icons/md";
import { TbLayoutDashboardFilled } from "react-icons/tb";


const Sidebar = () => {
    return (
        <>
            <div className='h-[92vh] w-[18%] bg-shadeWhite pt-[30px]'>
                <div className='h-[12%]'>
                    <NewButton />
                </div>
                <div className='h-[88%] overflow-y-auto'>
                    <ExpandBox number={1} name={"Dashboard"} icon={<TbLayoutDashboardFilled />}/>
                    <ExpandBox number={2} name={"Attendance"} icon={<MdCoPresent />}/>
                    <ExpandBox number={3} name={"Leave"} icon={<MdDateRange />}/>
                </div>
            </div>
        </>
    )
}

export default Sidebar