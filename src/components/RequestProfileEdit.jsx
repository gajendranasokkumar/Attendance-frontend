import React, { useContext, useEffect, useState } from 'react';
import { RxCross2 } from "react-icons/rx";
import Input from './Input';
import Textarea from './Textarea';
import SubmitButton from './SubmitButton';
import CancelButton from './CancelButton';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { AuthContext } from '../context/AuthContext';

const RequestProfileEdit = () => {
    const { userData } = useContext(AuthContext);
    const [requestDetails, setRequestDetails] = useState({
        id: userData?.id,
        name: userData?.name,
        previousdetail: '',
        newdetails: '',
        description: '',
    });

    const navigate = useNavigate();

    useEffect(() => {
        const getLeaveCount = async () => {
            await api.post("/currentleavecount", { id: requestDetails.id })
                .then((response) => {
                    console.log(response);
                    setRequestDetails(prevDetails => ({ ...prevDetails, leavetaken: response.data.count }));
                })
                .catch((error) => {
                    console.log("🚀 ~ applyLeave ~ error:", error);
                });
        };

        getLeaveCount();
    }, [requestDetails.id]);

    const goBack = () => {
        navigate(-1);
    };

    const applyLeave = async (e) => {
        e.preventDefault();
        console.log(requestDetails);
        await api.post("/leaveform", requestDetails)
            .then((response) => {
                console.log("🚀 ~ .then ~ response:", response);
                navigate(-1);
            })
            .catch((error) => {
                console.log("🚀 ~ applyLeave ~ error:", error);
            });
    };

    return (
        <>
            <div className='w-[100vw] left-0 h-[100vh] backdrop-blur-sm bg-white/47 border border-gray-300/30 grid place-content-center top-0 absolute z-50'>
                <div className='w-[60vw] h-[90vh] bg-white rounded-2xl border-2 border-grey shadow-allBox overflow-y-auto'>
                    <div className='flex justify-between w-[100%] h-[80px] items-center bg-white top-0 z-10 relative'>
                        <div className='text-[25px] text-bgGreen font-bold pl-8'>Request Profile Edit</div>
                        <div className='text-[40px] bg-shadeWhite w-[80px] h-[100%] rounded-tr-lg grid place-content-center rounded-bl-[35px] text-deepLightBlack hover:cursor-pointer' onClick={goBack}><RxCross2 /></div>
                    </div>
                    <div className='p-5 flex flex-col justify-center z-0'>
                        <form onSubmit={applyLeave}>
                            <div className='w-[50%] mx-auto'>
                                <Input readonly={true} type={"text"} placeholder={"Employee ID"} name={'id'} state={requestDetails} setState={setRequestDetails} />
                                <Input readonly={true} type={"text"} placeholder={"Name"} name={'name'} state={requestDetails} setState={setRequestDetails} />
                            </div>
                            <div className='w-[50%] mx-auto'>
                                <Input readonly={false} type={"text"} placeholder={"Previous Detail"} name={'previousdetail'} state={requestDetails} setState={setRequestDetails} />
                                <Input readonly={false} type={"text"} placeholder={"new Detail"} name={'newdetails'} state={requestDetails} setState={setRequestDetails} />
                            </div>
                            <div className='w-[50%] mx-auto'>
                                <Textarea placeholder={"Description"} name={'description'} state={requestDetails} setState={setRequestDetails} />
                            </div>
                            <div className='flex justify-end gap-2 w-[50%] mx-auto'>
                                <CancelButton onClick={goBack} />
                                <SubmitButton />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default RequestProfileEdit;
