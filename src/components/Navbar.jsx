import React, { useContext } from 'react'
import { GoBellFill } from "react-icons/go";
import { HiMiniBars3 } from "react-icons/hi2";
import { HiX } from "react-icons/hi";
import {AuthContext} from '../context/AuthContext'


const Navbar = ({ toggleSidebar, isSidebarVisible = false }) => {

    const { userData } = useContext(AuthContext);

    return (
        <>
            <div className='bg-shadeWhite w-[100%] h-[8vh] flex items-center xs:px-4 lg:px-8 '>
                <button className='border-none focus:outline-none h-full' type='button' onClick={toggleSidebar}>
                    {isSidebarVisible ? (
                        <HiX className='text-bgGreen font-[600] mr-4 text-[25px] xs:block lg:hidden' />
                    ) : (
                        <HiMiniBars3 className='text-bgGreen font-[600] mr-4 text-[25px] xs:block lg:hidden' />
                    )}
                </button>
                <div className='xs:text-[25px] xs:font-[500] lg:text-[20px] w-[100%] text-bgGreen lg:font-[700] '>PresentMarker</div>
                <div className='xs:w-[25%] lg:w-[20%] h-[100%] flex justify-end items-center'>
                    <div className='flex '>
                        <GoBellFill className='xs:h-[20px] xs:w-[20px] lg:h-[25px] lg:w-[25px] text-deepLightBlack' />
                        <span className='ping xs:text-sm'></span>
                    </div>
                    <div className='bg-grey xs:h-[30px] xs:w-[30px] lg:h-[35px] lg:w-[35px] rounded-[100%] ml-6 grid place-content-center'>G</div>
                    {/* <div className='h-[300px] w-[250px] absolute right-5 top-16 border-2 border-grey rounded-xl bg-white'>

                    </div> */}
                </div>

            </div>
        </>
    )
}

export default Navbar