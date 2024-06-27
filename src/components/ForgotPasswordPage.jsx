import React, { useContext, useEffect, useState } from 'react'
import { RxCross2 } from "react-icons/rx";
import Input from './Input';
import Radio from './Radio';
import Date from './Date';
import Textarea from './Textarea';
import SubmitButton from './SubmitButton';
import CancelButton from './CancelButton';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import OTPInput from './OTPInput';




const ForgotPasswordPage = () => {

    const [details, setDetails] = useState({
        id: "",
        code: "",
        passwordcheck: false
    });

    const [password, setPassword] = useState({
        id: "",
        password: "",
        confirmpassword: ""
    })

    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [message, setMessage] = useState('');

    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    };

    const checkuser = async (e) => {
        e.preventDefault();
        await api.post("/checkuser", { id: details.id })
            .then((response) => {
                setDetails({ ...details, code: response.data.code })
                console.log(response)
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const handleVerify = async (e) => {
        e.preventDefault();
        const otpString = otp.join('');

        try {
            const response = await api.post('/verifyotp', {
                id: details.id,
                otp: otpString
            });

            if (response.data.code === 200 && response.data.message === 'OTP verified successfully') {
                setMessage('OTP verified successfully!');
            } else {
                setMessage('Invalid OTP');
            }
        } catch (error) {
            if (error.response) {
                setMessage(error.response.data.message || 'OTP verification failed');
            } else if (error.request) {
                setMessage('No response from server. Please try again.');
            } else {
                setMessage('An error occurred. Please try again.');
            }
            console.error('Error:', error);
        }
    };

    const updatePassword = async (e) => {
        e.preventDefault();
        setDetails({ ...details, passwordcheck: false })
        if (password.password === password.confirmpassword) {
            await api.post("/updatepassword", { id: details?.id, password: password.password })
                .then((response) => {
                    console.log(response)
                    navigate(-1)
                })
                .catch((error) => {
                    console.log(error)
                })
        }
        else {
            setDetails({ ...details, passwordcheck: true })
        }
    }

    return (
        <>
            <div className='w-[100vw] left-0 h-[100vh] backdrop-blur-sm bg-white/47 border border-gray-300/30 grid place-content-center top-0 absolute z-50'>
                <div className='w-[60vw] h-[60vh] bg-white rounded-2xl border-2 border-grey shadow-allBox overflow-y-auto'>
                    <div className='flex justify-between w-[100%] h-[80px] items-center bg-white top-0 z-10 relative'>
                        <div className='text-[25px] text-bgGreen font-bold pl-8'>Reset Your Password</div>
                        <div className='text-[40px] bg-shadeWhite w-[80px] h-[100%] rounded-tr-lg grid place-content-center rounded-bl-[35px] text-deepLightBlack hover:cursor-pointer' onClick={goBack}><RxCross2 /></div>
                    </div>
                    <div className='p-5 flex flex-col justify-center z-0'>
                        <form onSubmit={checkuser}>
                            {
                                (details.code !== 200) ?
                                    <div className='w-[50%] mx-auto'>
                                        <Input readonly={false} type={"text"} placeholder={"Employee ID"} name={'id'} state={details} setState={setDetails} />
                                    </div> : <></>
                            }
                            {
                                (details.code === 400) ?
                                    <div className='w-[50%] mx-auto'>
                                        <p className='text-txtLRed'>*Invalid Employee ID</p>
                                    </div> : <></>
                            }
                            {
                                (details.code !== 200) ?
                                    <div className='flex justify-end gap-2 w-[50%] mx-auto'>
                                        <SubmitButton />
                                    </div>
                                    : <></>
                            }
                        </form>
                        {
                            (details.code === 200 && message !== 'OTP verified successfully!') ?
                                <div className='w-[50%] mx-auto'>
                                    <form onSubmit={handleVerify}>
                                        <Input readonly={true} type={"text"} placeholder={"Employee ID"} name={'id'} state={details} setState={setDetails} />
                                        <OTPInput otp={otp} setOtp={setOtp} />
                                        {
                                            message === 'Invalid OTP' &&
                                            <div className='w-[100%] mb-3 mx-auto'>
                                                <p className='text-txtLRed text-right mt-2'>* Wrong OTP!</p>
                                            </div>
                                        }
                                        <div className='flex justify-end gap-2 w-[100%] mx-auto mt-5'>
                                            <SubmitButton />
                                        </div>
                                    </form>
                                </div>
                                : <></>
                        }
                        {
                            (message == "OTP verified successfully!") ?
                                <form onSubmit={updatePassword}>
                                    <div className='w-[50%] mx-auto'>
                                        <Input readonly={true} type={"text"} placeholder={"Employee ID"} name={'id'} state={details} setState={setDetails} />
                                        <Input readonly={false} type={"password"} placeholder={"Enter Password"} name={'password'} state={password} setState={setPassword} />
                                        <Input readonly={false} type={"password"} placeholder={"Confirm Password"} name={'confirmpassword'} state={password} setState={setPassword} />
                                    </div>
                                    {
                                        details.passwordcheck ?
                                            <div className='w-[50%] mt-[-10px] mb-3 mx-auto'>
                                                <p className='text-txtLRed'>* Check the password</p>
                                            </div>
                                            : <></>
                                    }
                                    <div className='flex justify-end gap-2 w-[50%] mx-auto'>
                                        <CancelButton onClick={goBack} />
                                        <SubmitButton />
                                    </div>

                                </form> : <></>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default ForgotPasswordPage