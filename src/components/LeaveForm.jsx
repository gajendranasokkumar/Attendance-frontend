import React from 'react'
import { RxCross2 } from "react-icons/rx";
import Input from './Input';
import Radio from './Radio';
import Date from './Date';
import Textarea from './Textarea';
import SubmitButton from './SubmitButton';
import CancelButton from './CancelButton';
import { useNavigate } from 'react-router-dom';


const LeaveForm = () => {

    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    };
    return (
        <>
            <div className='w-[100vw] left-0 h-[100vh] backdrop-blur-sm bg-white/47 border border-gray-300/30 grid place-content-center top-0 absolute z-50'>
                <div className='w-[60vw] h-[90vh] bg-white rounded-2xl border-2 border-grey shadow-allBox overflow-y-auto'>
                    <div className='flex justify-between w-[100%] h-[80px] items-center bg-white top-0 z-10 relative'>
                        <div className='text-[25px] text-bgGreen font-bold pl-8'>Leave Form</div>
                        <div className='text-[40px] bg-shadeWhite w-[80px] h-[100%] rounded-tr-lg grid place-content-center rounded-bl-[35px] text-deepLightBlack hover:cursor-pointer' onClick={goBack}><RxCross2 /></div>
                    </div>
                    <div className='p-5 flex flex-col justify-center z-0'>
                        <div className='w-[50%] mx-auto'>
                            <Input type={"text"} placeholder={"Employee ID"} />
                            <Input type={"text"} placeholder={"Name"} />
                        </div>
                        <div className='w-[50%] mx-auto'>
                            <Radio option1={"Leave"} option2={"On Duty"} placeholder={'Leave Type'} />
                            <Radio option1={"Yes"} option2={"No"} placeholder={"Is it Half leave ?"} />
                            <Radio option1={"Paid"} option2={"Unpaid"} placeholder={"Paid or Unpaid"} />
                        </div>
                        <div className='flex justify-around gap-2 w-[50%] mx-auto'>
                            <Date placeholder={"From Date"} />
                            <Date placeholder={"To Date"} />
                        </div>
                        <div className='w-[50%] mx-auto'>
                            <Textarea placeholder={"Reason"} />
                        </div>
                        <div className='flex justify-end gap-2 w-[50%] mx-auto'>
                            <CancelButton />
                            <SubmitButton />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LeaveForm