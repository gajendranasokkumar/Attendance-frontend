import React, { useState } from 'react'
import image from "../assets/login.png"
import LoginOptionBtn from './LoginOptionBtn'
import Input from "../components/Input"
import { MdPersonAdd } from "react-icons/md";
import { BsPersonFillGear } from "react-icons/bs";
import LoginButton from '../components/LoginButton';
import LoginCancelBtn from '../components/LoginCancelBtn';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



const Login = () => {
    const [loginDetails, setLoginDetails] = useState({
        user: '',
        id: '',
        password: ''
    })
    const navigate = useNavigate();


    const handleSubmit = (e) => {

        e.preventDefault();
        console.log("🚀 ~ handleSubmit ~ loginDetails:", loginDetails)

        axios.post('http://localhost:3000/', loginDetails)
            .then((response) => {
                console.log("🚀 ~ .then ~ response:", response)
                navigate('/employee')
            })
            .catch((error) => {
                console.log("🚀 ~ handleSubmit ~ error.response:", error.response)
            })
                
    }




    return (
        <>
            <div className='w-[100vw] h-[100vh] bg-white flex'>
                <div className='h-full w-[50%] bg-loginBack grid place-items-center'>
                    <img src={image} className='h-[70%] w-[70%]' />
                </div>
                <div className='h-full w-[50%] bg-loginBack grid place-items-center relative'>
                    <h2 className='absolute rotate-[-90deg] left-[-110px] text-[100px] px-16 py-0 text-white shadow-[2px_2px_10px_-1px_rgba(0,0,0,0.33)] font-[600] rounded'>LOGIN</h2>
                    <div className='bg-white w-[60%] h-[70%] rounded flex flex-col justify-center'>
                        <form onSubmit={handleSubmit}>
                            <div className='flex justify-center mb-10'>
                                <LoginOptionBtn state={loginDetails} setState={setLoginDetails} icon={<MdPersonAdd />} person={"Admin"} />
                                <LoginOptionBtn state={loginDetails} setState={setLoginDetails} icon={<BsPersonFillGear />} person={"Employee"} />
                            </div>
                            <div className='w-[100%]  px-14'>
                                <Input name='id' state={loginDetails} setState={setLoginDetails} type={"text"} placeholder={"Employee ID"} />
                                <Input name='password' state={loginDetails} setState={setLoginDetails} type={"password"} placeholder={"Password"} />
                            </div>
                            <div className='w-[100%] px-14 flex justify-end gap-5'>
                                <LoginCancelBtn />
                                <LoginButton handleSubmit={handleSubmit} />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login