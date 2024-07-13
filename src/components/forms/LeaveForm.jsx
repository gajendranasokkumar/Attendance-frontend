import React, { useContext, useEffect, useState } from 'react';
import { RxCross2 } from 'react-icons/rx';
import { Input, Radio, Date, Textarea, SubmitButton, CancelButton } from '../index';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import api from '../../utils/api';
import { AuthContext } from '../../context/AuthContext';
import toast from 'react-hot-toast';




const LeaveForm = () => {
    const { userData, setLoading } = useContext(AuthContext);
    const [leaveDetails, setLeaveDetails] = useState({
        id: userData?.id,
        name: userData?.name,
        approvaldate: '',
        leavetype: '',
        halfleave: '',
        paidleave: '',
        fromdate: '',
        todate: '',
        reason: '',
        status: "Pending",
        reportingperson: userData?.reportingperson,
        leavepermitted: userData?.leavepermitted,
        leavetaken: ''
    })

    const navigate = useNavigate();

    useEffect(() => {
        const getLeaveCount = async () => {
            setLoading(true)
            await api.post("/currentleavecount", { id: leaveDetails.id })
                .then((response) => {
                    console.log(response)
                    setLeaveDetails({ ...leaveDetails, leavetaken: response.data.count })
                    setLoading(false)
                })
                .catch((error) => {
                    toast.error('An error occured!')
                    console.log("🚀 ~ applyLeave ~ error:", error)
                })
        }

        getLeaveCount();
    }, [])

    const goBack = () => {
        navigate(-1);
    };


    const applyLeave = async (e) => {
        e.preventDefault();
        setLoading(true)
        console.log(leaveDetails)
        const toastId = toast.loading("Loading...Please wait!")
        await api.post("/leaveform", leaveDetails)
            .then((respose) => {
                console.log("🚀 ~ .then ~ respose:", respose)
                setLoading(false)
                navigate(-1);
                toast.success('Leave Applied Successfully!', { id: toastId })
            })
            .catch((error) => {
                console.log("🚀 ~ applyLeave ~ error:", error)
                toast.error('Couldn\'t apply leave!', { id: toastId })
            })
    }


    return (
        <>
            <div className='w-[100vw] left-0 h-[100vh] backdrop-blur-sm bg-white/47 border border-gray-300/30 grid place-content-center top-0 absolute z-[99999]'>
                <div className='w-full md:w-[60vw] h-[90vh] bg-white rounded-2xl border-2 border-grey shadow-allBox overflow-y-auto'>
                    <div className='flex justify-between w-[100%] h-[clamp(4rem,5vw,6rem)] items-center bg-white top-0 z-10 relative'>
                        <div className=' text-bgGreen font-bold pl-8 text-[clamp(1.3rem,4vw,2rem)]'>Leave Form</div>
                        <div className=' bg-shadeWhite w-[80px] h-[100%] rounded-tr-lg grid place-content-center rounded-bl-[35px] text-deepLightBlack hover:cursor-pointer text-[clamp(1.5rem,4vw,2rem)]' onClick={goBack}><RxCross2 /></div>
                    </div>
                    <div className='flex justify-center mt-5 mb-5 xs:flex-col md:flex-row gap-5 w-full text-center'>
                        <div className='text-lg text-txtLYellow font-semibold'>Total leave permitted for this month : <span className='bg-grey text-black px-2 py-1 rounded-lg'>{leaveDetails.leavepermitted}</span></div>
                        <div className='text-lg text-txtLYellow font-semibold'>Leave taken : <span className='bg-grey text-black px-2 py-1 rounded-lg'>{leaveDetails.leavetaken}</span></div>
                    </div>
                    <div className='p-5 flex flex-col justify-center z-0'>
                        <form onSubmit={applyLeave}>
                            <div className='sm:w-full md:w-[50%] mx-auto'>
                                <Input readonly={true} type={"text"} placeholder={"Employee ID"} name={'id'} state={leaveDetails} setState={setLeaveDetails} />
                                <Input readonly={true} type={"text"} placeholder={"Name"} name={'name'} state={leaveDetails} setState={setLeaveDetails} />
                            </div>
                            <div className='sm:w-full md:w-[50%] mx-auto'>
                                <Radio option1={"Leave"} option2={"On Duty"} placeholder={'Leave Type'} name={'leavetype'} state={leaveDetails} setState={setLeaveDetails} />
                                <Radio option1={"Yes"} option2={"No"} placeholder={"Is it Half leave ?"} name={'halfleave'} state={leaveDetails} setState={setLeaveDetails} />
                                <Radio option1={"Paid"} option2={"Unpaid"} placeholder={"Paid or Unpaid"} name={'paidleave'} state={leaveDetails} setState={setLeaveDetails} />
                            </div>
                            <div className='flex justify-around gap-2 sm:w-full md:w-[50%] mx-auto'>
                                <Date placeholder={"From Date"} name={'fromdate'} state={leaveDetails} setState={setLeaveDetails} />
                                <Date placeholder={"To Date"} name={'todate'} state={leaveDetails} setState={setLeaveDetails} />
                            </div>
                            <div className='sm:w-full md:w-[50%] mx-auto'>
                                <Textarea placeholder={"Reason"} name={'reason'} state={leaveDetails} setState={setLeaveDetails} />
                            </div>
                            <div className='flex justify-end gap-2 sm:w-full md:w-[50%] mx-auto'>
                                <CancelButton onClick={goBack} />
                                <SubmitButton />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LeaveForm