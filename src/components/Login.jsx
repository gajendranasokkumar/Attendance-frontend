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
import image from "../assets/login.png";
import LoginOptionBtn from './LoginOptionBtn';
import Input from "../components/Input";
import { MdPersonAdd } from "react-icons/md";
import { BsPersonFillGear } from "react-icons/bs";
import LoginButton from '../components/LoginButton';
import LoginCancelBtn from '../components/LoginCancelBtn';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.jsx';
import api from '../utils/api.js';
import { Failure } from './Notification';
import * as ReactDOM from 'react-dom/client';

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
                        <Link to={"/forgotpassword"}><p className='ml-14 mt-5 text-txtLBlue underline cursor-pointer'>Forgot Password?</p></Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
