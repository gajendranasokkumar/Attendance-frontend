import React from 'react'
import image from "./assets/login.png"
import LoginOptionBtn from './LoginOptionBtn'
import Input from "./Input"
import { MdPersonAdd } from "react-icons/md";
import { BsPersonFillGear } from "react-icons/bs";
import LoginButton from './LoginButton';
import LoginCancelBtn from './LoginCancelBtn';




const Login = () => {
    return (
        <>
            <div className='w-[100vw] h-[100vh] bg-white flex'>
                <div className='h-full w-[50%] bg-loginBack grid place-items-center'>
                    <img src={image} className='h-[70%] w-[70%]' />
                </div>
                <div className='h-full w-[50%] bg-loginBack grid place-items-center relative'>
                    <h2 className='absolute rotate-[-90deg] left-[-120px] text-[100px] px-16 py-0 text-white shadow-[2px_2px_10px_-1px_rgba(0,0,0,0.33)] font-[600] rounded'>LOGIN</h2>
                    <div className='bg-white w-[60%] h-[70%] rounded flex flex-col justify-center'>
                        <div className='flex justify-center mb-10'>
                            <LoginOptionBtn icon={<MdPersonAdd />} person={"Admin"} />
                            <LoginOptionBtn icon={<BsPersonFillGear />} person={"Employee"} />
                        </div>
                        <div className='w-[100%]  px-14'>
                            <Input type={"text"} placeholder={"Employee ID"} /> 
                            <Input type={"password"} placeholder={"Password"} />
                        </div>
                        <div className='w-[100%] px-14 flex justify-end gap-5'>
                            <LoginCancelBtn />
                            <LoginButton />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login