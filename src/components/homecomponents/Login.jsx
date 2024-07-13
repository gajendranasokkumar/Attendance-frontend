// import React, { createContext, useContext, useState } from 'react'
// import image from "../assets/login.png"
// import LoginOptionBtn from './LoginOptionBtn'
// import Input from "../components/Input"
// import { MdPersonAdd } from "react-icons/md";
// import { BsPersonFillGear } from "react-icons/bs";
// import LoginButton from '../components/LoginButton';
// import LoginCancelBtn from '../components/LoginCancelBtn';
// import axios from 'axios';
// import { Link, useNavigate } from 'react-router-dom';
// import { Failure, Success } from './Notification';
// import * as ReactDOM from 'react-dom/client';
// import { AuthContext } from '../context/AuthContext.jsx';
// import api from '../utils/api.js';




// const Login = () => {
//     const [loginDetails, setLoginDetails] = useState({
//         des: '',
//         id: '',
//         password: ''
//     })
//     const navigate = useNavigate();
//     const { setAuth, setUserData } = useContext(AuthContext);



//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         console.log("🚀 ~ handleSubmit ~ loginDetails:", loginDetails)

//         await api.post('/', loginDetails)
//             .then((response) => {
//                 console.log("🚀 ~ .then ~ response:", response)
//                 // root.render(<Success message={"Login Success"} />);
//                 const token = response.data.jwtToken;
//                 const userData = response.data.data;
//                 localStorage.setItem('token', token);
//                 setAuth(true);
//                 setUserData(userData);
//                 if (response.data.person == 'Admin') {
//                     navigate('/admin')
//                 }
//                 else if (response.data.person == 'Employee') {
//                     navigate('/employee')
//                 }
//                 else {
//                     navigate('/opps')
//                 }
//             })
//             .catch((error) => {
//                 console.log("🚀 ~ handleSubmit ~ error.response:", error.response)
//                 const root = ReactDOM.createRoot(document.getElementById('root'));
//                 root.render(<Failure message={"Incorrect Password"} />);
//                 setTimeout(() => { location.reload() }, 700);
//             })
//     }




//     return (
//         <>
//             <div className='w-[100vw] h-[100vh] bg-white flex'>
//                 <div className='h-full w-[50%] bg-loginBack grid place-items-center'>
//                     <img src={image} className='h-[70%] w-[70%]' />
//                 </div>
//                 <div className='h-full w-[50%] bg-loginBack grid place-items-center relative'>
//                     <h2 className='absolute rotate-[-90deg] left-[-110px] text-[100px] px-16 py-0 text-white shadow-[2px_2px_10px_-1px_rgba(0,0,0,0.33)] font-[600] rounded'>LOGIN</h2>
//                     <div className='bg-white w-[60%] h-[70%] rounded flex flex-col justify-center'>
//                         <form onSubmit={handleSubmit}>
//                             <div className='flex justify-center mb-10'>
//                                 <LoginOptionBtn state={loginDetails} setState={setLoginDetails} icon={<MdPersonAdd />} person={"Admin"} />
//                                 <LoginOptionBtn state={loginDetails} setState={setLoginDetails} icon={<BsPersonFillGear />} person={"Employee"} />
//                             </div>
//                             <div className='w-[100%]  px-14'>
//                                 <Input name='id' state={loginDetails} setState={setLoginDetails} type={"text"} placeholder={"Employee ID"} />
//                                 <Input name='password' state={loginDetails} setState={setLoginDetails} type={"password"} placeholder={"Password"} />
//                             </div>
//                             <div className='w-[100%] px-14 flex justify-end gap-5'>
//                                 <LoginCancelBtn />
//                                 <LoginButton handleSubmit={handleSubmit} />
//                             </div>
//                         </form>
//                         <Link to={"/forgotpassword"}><p className='ml-14 mt-5 text-txtLBlue underline cursor-pointer'>Forgot Password?</p></Link>
//                     </div>
//                 </div>
//             </div>
//         </>
//     )
// }

// export default Login




import React, { useState, useContext } from 'react';
import image from '../../assets/login.png';
import { LoginOptionBtn, LoginButton, LoginCancelBtn } from '../index';
import { Input } from '../index';
import { MdPersonAdd } from 'react-icons/md';
import { BsPersonFillGear } from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import api from '../../utils/api';
import { Failure } from '../index';
import * as ReactDOM from 'react-dom/client';
import toast from 'react-hot-toast';


const Login = () => {
    const [loginDetails, setLoginDetails] = useState({
        des: '',
        id: '',
        password: ''
    });
    const navigate = useNavigate();
    const { setAuth, setUserData, showLoader, setLoading } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("🚀 ~ handleSubmit ~ loginDetails:", loginDetails);
        setLoading(true)
        await api.post('/', loginDetails)
            .then((response) => {
                console.log("🚀 ~ .then ~ response:", response);
                const token = response.data.jwtToken;
                const userData = response.data.data;
                localStorage.setItem('token', token);
                setAuth(true);
                setUserData(userData);
                showLoader(2000);
                setTimeout(() => {
                    if (response.data.person === 'Admin') {
                        navigate('/admin');
                    } else if (response.data.person === 'Employee') {
                        navigate('/employee');
                    } else {
                        navigate('/opps');
                    }
                }, 2000);
            })
            .catch((error) => {
                console.log("🚀 ~ handleSubmit ~ error.response:", error.response);
                const root = ReactDOM.createRoot(document.getElementById('root'));
                root.render(<Failure message={"Incorrect Password"} />);
                setTimeout(() => { location.reload(); }, 700);
            });
    };

    return (
        // <>
        //     <div className='w-[100vw] h-[100vh] bg-white flex'>
        //         <div className='h-full w-[50%] bg-loginBack grid place-items-center'>
        //             <img src={image} className='h-[70%] w-[70%]' />
        //         </div>
        //         <div className='h-full w-[50%] bg-loginBack grid place-items-center relative'>
        //             <h2 className='absolute rotate-[-90deg] left-[-110px] text-[100px] px-16 py-0 text-white shadow-[2px_2px_10px_-1px_rgba(0,0,0,0.33)] font-[600] rounded'>LOGIN</h2>
        //             <div className='bg-white w-[60%] h-[70%] rounded flex flex-col justify-center'>
        //                 <form onSubmit={handleSubmit}>
        //                     <div className='flex justify-center mb-10'>
        //                         <LoginOptionBtn state={loginDetails} setState={setLoginDetails} icon={<MdPersonAdd />} person={"Admin"} />
        //                         <LoginOptionBtn state={loginDetails} setState={setLoginDetails} icon={<BsPersonFillGear />} person={"Employee"} />
        //                     </div>
        //                     <div className='w-[100%]  px-14'>
        //                         <Input name='id' state={loginDetails} setState={setLoginDetails} type={"text"} placeholder={"Employee ID"} />
        //                         <Input name='password' state={loginDetails} setState={setLoginDetails} type={"password"} placeholder={"Password"} />
        //                     </div>
        //                     <div className='w-[100%] px-14 flex justify-end gap-5'>
        //                         <LoginCancelBtn />
        //                         <LoginButton handleSubmit={handleSubmit} />
        //                     </div>
        //                 </form>
        //                 <Link to={"/forgotpassword"}><p className='ml-14 mt-5 text-txtLBlue underline cursor-pointer'>Forgot Password?</p></Link>
        //             </div>
        //         </div>
        //     </div>
        // </>
        <>
            <div className='w-full min-h-screen bg-white flex flex-col md:flex-row h-[100vh] justify-center items-center'>
                <div className='hidden md:grid md:h-full md:w-1/2 bg-loginBack place-items-center'>
                    <img src={image} className='h-[70%] w-[70%]' alt="Login" />
                </div>
                <div className='h-full w-full md:w-1/2 bg-loginBack grid place-items-center relative py-10 md:py-0'>
                    <h2 className='xs:hidden md:block md:absolute bottom-[-100px] md:bottom-auto md:rotate-[-90deg] md:left-[-110px] text-[clamp(2rem,6vw,8rem)] px-4 md:px-16 md:py-5 text-white shadow-[2px_2px_10px_-1px_rgba(0,0,0,0.33)] font-[600] rounded xs:mb-[-25%] xs:z-10 xs:py-4 md:mb-0'>LOGIN</h2>
                    <div className='bg-white w-[90%] md:w-[60%] h-auto md:h-[70%] rounded flex flex-col justify-center p-6 md:p-0'>
                        <h1 className='xs:block md:hidden text-[clamp(3rem,6vw,8rem)] mb-7 text-center font-bold text-loginBack border-b-2 border-loginBack '>LOGIN</h1>
                        <form onSubmit={handleSubmit} className='text-[clamp(0.875rem,1.5vw,1rem)]'>
                            <div className='flex justify-center mb-6 md:mb-10'>
                                <LoginOptionBtn state={loginDetails} setState={setLoginDetails} icon={<MdPersonAdd />} person={"Admin"} />
                                <LoginOptionBtn state={loginDetails} setState={setLoginDetails} icon={<BsPersonFillGear />} person={"Employee"} />
                            </div>
                            <div className='w-full px-4 md:px-14'>
                                <Input name='id' state={loginDetails} setState={setLoginDetails} type={"text"} placeholder={"Employee ID"} />
                                <Input name='password' state={loginDetails} setState={setLoginDetails} type={"password"} placeholder={"Password"} />
                            </div>
                            <div className='w-full px-4 md:px-14 flex flex-row sm:justify-center md:justify-end gap-3 md:gap-5 mt-6'>
                                <LoginCancelBtn />
                                <LoginButton handleSubmit={handleSubmit} />
                            </div>
                        </form>
                        <Link to={"/forgotpassword"}>
                            <p className='mt-5 text-txtLBlue underline cursor-pointer text-center md:text-left md:ml-14 text-[clamp(0.75rem,1.5vw,0.875rem)]'>Forgot Password?</p>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
