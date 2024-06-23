import React, { useContext, useState } from 'react'
import { RxCross2 } from "react-icons/rx";
import Input from './Input';
import Radio from './Radio';
import Date from './Date';
import Textarea from './Textarea';
import SubmitButton from './SubmitButton';
import CancelButton from './CancelButton';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import api from '../utils/api';
import { AuthContext } from '../context/AuthContext';




const LeaveForm = () => {
    const { userData } = useContext(AuthContext);
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

    const goBack = () => {
        navigate(-1);
    };


    const applyLeave = async (e) => {
        e.preventDefault();
        console.log(leaveDetails)
        await api.post("/leaveform", leaveDetails)
            .then((respose) => {
                console.log("🚀 ~ .then ~ respose:", respose)
                navigate(-1);
            })
            .catch((error) => {
                console.log("🚀 ~ applyLeave ~ error:", error)
            })
    }


    return (
        <>
            <div className='w-[100vw] left-0 h-[100vh] backdrop-blur-sm bg-white/47 border border-gray-300/30 grid place-content-center top-0 absolute z-50'>
                <div className='w-[60vw] h-[90vh] bg-white rounded-2xl border-2 border-grey shadow-allBox overflow-y-auto'>
                    <div className='flex justify-between w-[100%] h-[80px] items-center bg-white top-0 z-10 relative'>
                        <div className='text-[25px] text-bgGreen font-bold pl-8'>Leave Form</div>
                        <div className='text-[40px] bg-shadeWhite w-[80px] h-[100%] rounded-tr-lg grid place-content-center rounded-bl-[35px] text-deepLightBlack hover:cursor-pointer' onClick={goBack}><RxCross2 /></div>
                    </div>
                    <div className='flex justify-center gap-5 mt-5 mb-5'>
                        <div className='text-lg text-txtLYellow font-semibold'>Total leave permitted for this month : <span className='bg-grey text-black px-2 py-1 rounded-lg'>{leaveDetails.leavepermitted}</span></div>
                        <div className='text-lg text-txtLYellow font-semibold'>Leave taken : <span className='bg-grey text-black px-2 py-1 rounded-lg'>{leaveDetails.leavepermitted}</span></div>
                    </div>
                    <div className='p-5 flex flex-col justify-center z-0'>
                        <form onSubmit={applyLeave}>
                            <div className='w-[50%] mx-auto'>
                                <Input readonly={true} type={"text"} placeholder={"Employee ID"} name={'id'} state={leaveDetails} setState={setLeaveDetails} />
                                <Input readonly={true} type={"text"} placeholder={"Name"} name={'name'} state={leaveDetails} setState={setLeaveDetails} />
                            </div>
                            <div className='w-[50%] mx-auto'>
                                <Radio option1={"Leave"} option2={"On Duty"} placeholder={'Leave Type'} name={'leavetype'} state={leaveDetails} setState={setLeaveDetails} />
                                <Radio option1={"Yes"} option2={"No"} placeholder={"Is it Half leave ?"} name={'halfleave'} state={leaveDetails} setState={setLeaveDetails} />
                                <Radio option1={"Paid"} option2={"Unpaid"} placeholder={"Paid or Unpaid"} name={'paidleave'} state={leaveDetails} setState={setLeaveDetails} />
                            </div>
                            <div className='flex justify-around gap-2 w-[50%] mx-auto'>
                                <Date placeholder={"From Date"} name={'fromdate'} state={leaveDetails} setState={setLeaveDetails} />
                                <Date placeholder={"To Date"} name={'todate'} state={leaveDetails} setState={setLeaveDetails} />
                            </div>
                            <div className='w-[50%] mx-auto'>
                                <Textarea placeholder={"Reason"} name={'reason'} state={leaveDetails} setState={setLeaveDetails} />
                            </div>
                            <div className='flex justify-end gap-2 w-[50%] mx-auto'>
                                <CancelButton />
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