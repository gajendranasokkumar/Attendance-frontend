import React, { useContext } from 'react'
import { GoBellFill } from "react-icons/go";
import { HiMiniBars3 } from "react-icons/hi2";
import { HiX } from "react-icons/hi";
import { AuthContext } from '../context/AuthContext'
import SmallProfileBox from './SmallProfileBox';


const Navbar = ({ toggleSidebar, isSidebarVisible = false }) => {

    const { userData } = useContext(AuthContext);

    return (
        <>
            <div className='bg-shadeWhite w-[100%] min-h-[8vh] flex items-center xs:px-4 lg:px-8 intro'>
                <button className='border-none focus:outline-none h-full' type='button' onClick={toggleSidebar}>
                    {isSidebarVisible ? (
                        <HiX className='text-bgGreen font-[600] mr-4 text-[25px] xs:block lg:hidden' />
                    ) : (
                        <HiMiniBars3 className='text-bgGreen font-[600] mr-4 text-[25px] xs:block lg:hidden' />
                    )}
                </button>
                <div className=' xs:font-[500] lg:text-[20px] w-[100%] text-bgGreen lg:font-[700] text-[clamp(1rem,4vw,6rem)]'>PresentMarker</div>
                <div className='xs:w-[25%] lg:w-[20%] h-[100%] flex justify-end items-center'>
                    <div className='flex '>
                        <GoBellFill className='xs:h-[20px] xs:w-[20px] lg:h-[25px] lg:w-[25px] text-deepLightBlack' />
                        <span className='ping xs:text-sm'></span>
                    </div>
                    {/* <div className='bg-grey xs:h-[30px] xs:w-[30px] lg:h-[35px] lg:w-[35px] rounded-[100%] ml-6 grid place-content-center peer cursor-pointer'>G</div>
                    <div className='invisible peer-hover:visible hover:visible'><S  mallProfileBox /></div> */}
                    <div className='group'>
                        <div className='bg-grey xs:h-[30px] xs:w-[30px] lg:h-[35px] lg:w-[35px] rounded-[100%] ml-6 grid place-content-center cursor-pointer step-1'>{userData?.name.charAt(0).toUpperCase()}</div>
                        <div className='invisible group-hover:visible hover:visible '><SmallProfileBox /></div>
                    </div>

                </div>

            </div>
        </>
    )
}

export default Navbar