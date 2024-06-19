import React, { useContext } from 'react'
import { CgProfile } from "react-icons/cg";
import { BiSolidEditAlt } from "react-icons/bi";
import { LuLogOut } from "react-icons/lu";
import { AuthContext } from '../context/AuthContext';



const SmallProfileBox = () => {
    const { userData } = useContext(AuthContext);

    return (
        <>
            <div className='h-[300px] w-[250px] absolute right-5 top-12 border-1 border-grey rounded-lg bg-white flex flex-col items-center p-5 shadow-allBox'>
                <div className='flex w-full h-[60px] mb-10'>
                    <div className='w-[60px] bg-grey rounded-full grid place-content-center text-2xl'>
                        G
                    </div>
                    <div className='pl-5 font-sans text-lg h-auto'>
                        <p className='text-[18px]'>{userData?.name}</p>
                        <p className='underline'>{userData?.id}</p>
                    </div>
                </div>
                <div className='h-12 w-full cursor-pointer hover:bg-optionsHover px-5 flex items-center text-lg rounded-md'><span className='mr-3'><CgProfile /></span>Profile</div>
                <div className='h-12 w-full cursor-pointer hover:bg-optionsHover px-5 flex items-center text-lg rounded-md'><span className='mr-3'><BiSolidEditAlt /></span>Request Edit</div>
                <div className='h-12 w-full cursor-pointer hover:bg-bgLRed px-5 flex justify-center items-center text-lg rounded-md mt-auto text-txtLRed'>Logout<span className='ml-3'><LuLogOut /></span></div>
            </div>
        </>
    )
}

export default SmallProfileBox