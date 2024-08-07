import React, { useContext, useEffect, useState } from 'react';
import { RxCross2 } from 'react-icons/rx';
import { Input, Radio, Date, Textarea, SubmitButton, CancelButton, OTPInput } from '../index';
import { useNavigate } from 'react-router-dom';
import api from '../../utils/api';
import { AuthContext } from '../../context/AuthContext';
import toast from 'react-hot-toast';





const ForgotPasswordPage = () => {

    const { setLoading, showLoader } = useContext(AuthContext);

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
        setLoading(true)
        const toastId = toast.loading("Loading...Please wait!")
        await api.post("/checkuser", { id: details.id })
            .then((response) => {
                setDetails({ ...details, code: response.data.code })
                console.log(response)
                showLoader(500)
                toast.success('OTP sent successfully to your registered email.')
            })
            .catch((error) => {
                console.log(error);
                showLoader(200)
                toast.error('User doesn\'t exists', { id: toastId })
            })
    }

    const handleVerify = async (e) => {
        e.preventDefault();
        const otpString = otp.join('');
        const toastId = toast.loading("Loading...Please wait!")
        try {
            setLoading(true)
            const response = await api.post('/verifyotp', {
                id: details.id,
                otp: otpString
            });

            if (response.data.code === 200 && response.data.message === 'OTP verified successfully') {
                setMessage('OTP verified successfully!');
                showLoader(800)
                toast.success('OTP verified successfully!', { id: toastId })
            } else {
                setMessage('Invalid OTP');
                showLoader(200)
                toast.error('Invalid OTP', { id: toastId })
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
            showLoader(200)
            toast.error('An error occurred. Please try again.', { id: toastId })
        }
    };

    const updatePassword = async (e) => {
        e.preventDefault();
        setDetails({ ...details, passwordcheck: false })
        const toastId = toast.loading("Loading...Please wait!")
        if (password.password === password.confirmpassword) {
            setLoading(true)
            await api.post("/updatepassword", { id: details?.id, password: password.password })
                .then((response) => {
                    console.log(response)
                    showLoader(800)
                    navigate(-1)
                    toast.success('Password Updated Successfully!', { id: toastId })
                })
                .catch((error) => {
                    console.log(error)
                    toast.error('Couldn\'t update the password!', { id: toastId })
                })
        }
        else {
            setDetails({ ...details, passwordcheck: true })
            toast.error('Please check the password!', { id: toastId })
        }
    }

    return (
        <>
            <div className='w-[100vw] left-0 h-[100vh] backdrop-blur-sm bg-white/47 border border-gray-300/30 flex justify-center items-center top-0 absolute z-[9999] px-3'>
                <div className='w-full md:w-[60vw] h-[60vh] bg-white rounded-2xl border-2 border-grey shadow-allBox overflow-y-auto'>
                    <div className='flex justify-between w-full h-[clamp(4rem,5vw,6rem)] items-center bg-white top-0 z-10 relative'>
                        <div className=' text-bgGreen font-bold pl-8 text-[clamp(1.3rem,4vw,2rem)]'>Reset Your Password</div>
                        <div className=' bg-shadeWhite w-[80px] h-[100%] rounded-tr-lg grid place-content-center rounded-bl-[35px] text-deepLightBlack hover:cursor-pointer text-[clamp(1.5rem,4vw,2rem)]' onClick={goBack}><RxCross2 /></div>
                    </div>
                    <div className='p-5 flex flex-col justify-center z-0'>
                        <form onSubmit={checkuser}>
                            {
                                (details.code !== 200) ?
                                    <div className='xs:w-full md:w-[50%] mx-auto'>
                                        <Input readonly={false} type={"text"} placeholder={"Employee ID"} name={'id'} state={details} setState={setDetails} />
                                    </div> : <></>
                            }
                            {
                                (details.code === 400) ?
                                    <div className='xs:w-full md:w-[50%] mx-auto'>
                                        <p className='text-txtLRed'>*Invalid Employee ID</p>
                                    </div> : <></>
                            }
                            {
                                (details.code !== 200) ?
                                    <div className='flex justify-end gap-2 xs:w-full md:w-[50%] mx-auto'>
                                        <SubmitButton />
                                    </div>
                                    : <></>
                            }
                        </form>
                        {
                            (details.code === 200 && message !== 'OTP verified successfully!') ?
                                <div className='xs:w-full md:w-[50%] mx-auto'>
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
                                    <div className='xs:w-full md:w-[50%] mx-auto'>
                                        <Input readonly={true} type={"text"} placeholder={"Employee ID"} name={'id'} state={details} setState={setDetails} />
                                        <Input readonly={false} type={"password"} placeholder={"Enter Password"} name={'password'} state={password} setState={setPassword} />
                                        <Input readonly={false} type={"password"} placeholder={"Confirm Password"} name={'confirmpassword'} state={password} setState={setPassword} />
                                    </div>
                                    {
                                        details.passwordcheck ?
                                            <div className='xs:w-full md:w-[50%] mt-[-10px] mb-3 mx-auto'>
                                                <p className='text-txtLRed'>* Check the password</p>
                                            </div>
                                            : <></>
                                    }
                                    <div className='flex justify-end gap-2 xs:w-full md:w-[50%] mx-auto'>
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