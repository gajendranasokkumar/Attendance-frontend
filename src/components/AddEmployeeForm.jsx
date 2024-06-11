import React from 'react'
import { RxCross2 } from "react-icons/rx";
import Input from './Input';
import Radio from './Radio';
import Date from './Date';
import Textarea from './Textarea';
import SubmitButton from './SubmitButton';
import CancelButton from './CancelButton';
import { useNavigate } from 'react-router-dom';

const AddEmployeeForm = () => {

    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    };

    return (
        <>
            <div className='w-[100vw] h-[100vh] backdrop-blur-sm bg-white/47 border border-gray-300/30 grid place-content-center top-0 absolute z-50 animate-moveUp'>
                <div className='w-[60vw] h-[90vh] bg-white rounded-2xl border-2 border-grey shadow-allBox overflow-y-auto'>
                    <div className='flex justify-between bg-shadeWhite w-[100%] h-[80px] items-center top-0 z-10 relative mb-5'>
                        <div className='text-[25px]  text-bgGreen font-bold pl-8'>ADD NEW EMPLOYEE</div>
                        <button className='text-[40px] bg-shadeWhite w-[80px] h-[100%] rounded-tr-lg grid place-content-center rounded-bl-[35px] text-deepLightBlack hover:cursor-pointer' onClick={goBack}><RxCross2 /></button>
                    </div>
                    <p className='pl-6 text-bgGreen font-bold text-xl text-nowrap'>Personal Details</p>
                    <hr className='mx-6 border-dashed border-2 border-bgGreen' />
                    <div className='flex w-[100%] mt-5'>
                        <div className='p-5 flex flex-col justify-center z-0 w-[50%]'>
                            <div className='w-[100%] mx-auto'>
                                <Input type={"text"} placeholder={"Employee ID"} />
                                <Input type={"text"} placeholder={"Name"} />
                                <Input type={"email"} placeholder={"Email"} />
                                <Input type={"number"} placeholder={"Phone Number"} />
                            </div>

                            <div className='flex gap-2 w-[50%]'>
                                <Date placeholder={"Date Of Birth"} />
                            </div>
                        </div>
                        <div className='p-5 flex flex-col  z-0 w-[50%]'>
                            <div className='w-[100%] mx-auto'>
                                <Textarea placeholder={"Address"} />
                            </div>
                            <div className='w-[100%]'>
                                <Radio option1={"Male"} option2={"Female"} placeholder={'Gender'} />
                                <Radio option1={"Single"} option2={"Married"} placeholder={"Marital Status"} />
                            </div>
                        </div>
                    </div>

                    <p className='pl-6 text-bgGreen font-bold text-xl text-nowrap'>Rules Details</p>
                    <hr className='mx-6 border-dashed border-2 border-bgGreen' />
                    <div className='flex w-[100%] mt-5'>
                        <div className='p-5 flex flex-col justify-center z-0 w-[50%]'>
                            <div className='w-[100%] mx-auto'>
                                <Input type={"text"} placeholder={"HR Policy"} />
                                <Input type={"text"} placeholder={"Punch ID"} />
                            </div>
                        </div>
                        <div className='p-5 flex flex-col z-0 w-[50%]'>
                            <div className='flex gap-2 w-[50%]'>
                                <Date placeholder={"Date Of Joining"} />
                            </div>
                        </div>
                    </div>


                    <p className='pl-6 text-bgGreen font-bold text-xl text-nowrap'>Allocation Details</p>
                    <hr className='mx-6 border-dashed border-2 border-bgGreen' />
                    <div className='flex w-[100%] mt-5'>
                        <div className='p-5 flex flex-col  z-0 w-[50%]'>
                            <div className='w-[100%] mx-auto'>
                                <Input type={"text"} placeholder={"Company"} />
                                <Input type={"text"} placeholder={"Branch"} />
                                <Input type={"text"} placeholder={"Designation"} />
                                <Input type={"number"} placeholder={"Mobile Number"} />
                                <Input type={"text"} placeholder={"Shift"} />
                                <Input type={"text"} placeholder={"Punch Type"} />
                            </div>
                        </div>
                        <div className='p-5 flex flex-col  z-0 w-[50%]'>
                            <div className='w-[100%] mx-auto'>
                                <Input type={"text"} placeholder={"Reporting Person"} />
                                <Input type={"text"} placeholder={"Department"} />
                                <Input type={"text"} placeholder={"Role"} />
                                <Input type={"number"} placeholder={"Multiple Branch Attendance"} />
                                <Input type={"text"} placeholder={"Shift Group"} />
                            </div>
                            <div className='w-[100%]'>
                                <Radio option1={"Enable"} option2={"Disable"} placeholder={"Geo Location"} />
                            </div>
                        </div>
                    </div>


                    <div className='flex justify-end gap-2 w-[100%] mx-auto mb-7 pr-6'>
                        <CancelButton />
                        <SubmitButton name={"Create"} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddEmployeeForm