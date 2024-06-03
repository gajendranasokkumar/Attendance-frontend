import React from 'react'
import { GoBellFill } from "react-icons/go";


const Navbar = () => {
    return (
        <>
            <div className='bg-shadeWhite w-[100%] h-[8vh] flex items-center px-8 '>
                <div className='text-[20px] w-[20%] text-bgGreen font-[700]'>PresentMarker</div>
                <div className='text-[20px] w-[60%] flex justify-center items-center'>
                </div>
                <div className='w-[20%] h-[100%] flex justify-end items-center'>
                    <div className='flex '>
                        <GoBellFill className='h-[25px] w-[25px] text-deepLightBlack'/>
                        <span className='ping'></span>
                    </div>
                    <div className='bg-grey h-[35px] w-[35px] rounded-[100%] ml-6'></div>
                </div>

            </div>
        </>
    )
}

export default Navbar