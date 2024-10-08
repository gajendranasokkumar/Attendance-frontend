import React, { useContext } from 'react';
import { CgProfile } from 'react-icons/cg';
import { BiSolidEditAlt } from 'react-icons/bi';
import { RiLockPasswordFill } from 'react-icons/ri';
import { AuthContext } from '../../context/AuthContext';
import { LogoutButton } from '../index';
import { Link } from 'react-router-dom';




const SmallProfileBox = () => {
    const { userData } = useContext(AuthContext);

    const person = userData?.person?.toLowerCase()

    return (
        <>
            <div className='z-50 h-auto w-auto absolute right-5 top-12 border-1 border-grey rounded-lg bg-white flex flex-col items-center p-5 shadow-allBox'>
                <div className='flex w-full h-[60px] mb-10'>
                    <div className='w-[60px] bg-grey rounded-full grid place-content-center text-2xl'>
                        {userData?.name[0]}
                    </div>
                    <div className='pl-5 font-sans text-sm h-auto my-auto'>
                        <p className='text-[18px]'>{userData?.name}</p>
                        <p className='underline'>{userData?.id}</p>
                    </div>
                </div>
                <Link to={`/${person}/profile`} className='m-0 w-full'><div className='h-12 w-full cursor-pointer px-5 flex items-center text-lg rounded-md hover:border-b-2 border-black hover:shadow-allBox text-[clamp(1rem,4vw,1.2rem)]'><span className='mr-3'><CgProfile /></span>Profile</div></Link>
                <Link to={`/${person}/forgotpassword`} className='m-0 w-full'><div className='h-12 w-full cursor-pointer  px-5 flex items-center text-lg rounded-md hover:border-b-2 border-black hover:shadow-allBox text-[clamp(1rem,4vw,1.2rem)]'><span className='mr-3'><RiLockPasswordFill /></span>Change Password</div></Link>
                <Link to={`/${person}/requestprofileedit`} className='m-0 w-full'><div className='h-12 w-full cursor-pointer hover:border-b-2 border-black hover:shadow-allBox  px-5 m-0 flex items-center text-lg rounded-md text-[clamp(1rem,4vw,1.2rem)]'><span className='mr-3'><BiSolidEditAlt /></span>Request Edit</div></Link>
                <LogoutButton />
            </div>
        </>
    )
}

export default SmallProfileBox