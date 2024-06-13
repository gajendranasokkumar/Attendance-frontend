import React from 'react'
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";


const NewButton = () => {
    return (
        <>
            <div className=' relative w-[50%] h-[50px] bg-white ml-8 mb-5 rounded-2xl shadow-[3px_2px_10px_-1px_rgba(0,0,0,0.33)] shadow-2xl hover:cursor-pointer flex justify-center items-center text-[20px] text-deepLightBlack group'>
                <FaPlus className='mr-2' /> New
                <div className='absolute w-[200px] h-auto bg-white  top-12 left-8 invisible group-hover:visible transition-all shadow-lightGrey shadow-[7px_8px_20px_-1px_rgba(0,0,0,0.33)] rounded z-10'>
                    <ul className='flex justify-center flex-col text-[15px] font-semibold rounded'>
                        <Link to='addEmployee'><li className='text-center odd:border-b-[1px] border-lightGrey h-[40px] flex justify-center items-center hover:bg-bgGreen hover:text-white rounded-t'>Add Employee</li></Link>
                        <li className='text-center h-[40px] flex justify-center items-center hover:bg-bgGreen hover:text-white rounded-b'>Add Manager</li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default NewButton