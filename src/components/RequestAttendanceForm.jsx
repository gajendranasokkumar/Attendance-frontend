import React, { useContext, useEffect, useState } from 'react';
import { RxCross2 } from "react-icons/rx";
import Input from './Input';
import Radio from './Radio';
import DatePicker from './Date'; // Renamed from Date to DatePicker
import Textarea from './Textarea';
import SubmitButton from './SubmitButton';
import CancelButton from './CancelButton';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { AuthContext } from '../context/AuthContext';

const RequestAttendanceForm = () => {
    const { userData, setLoading } = useContext(AuthContext);

    const today = new Date().toISOString().split('T')[0];
    const reversedDate = today.split('-').reverse().join('-');
    console.log(reversedDate)

    const [requestDetails, setRequestDetails] = useState({
        id: userData?.id,
        name: userData?.name,
        reportingperson: userData?.reportingperson,
        date: today,
        time: '',
        reason: '',
        status: "Pending",
        person: userData?.person,
        punchid: userData?.punchid,
        company: userData?.company,
        branch: userData?.branch,
        designation: userData?.designation,
        multibranchattendance: userData?.multibranchattendance,
        shiftgroup: userData?.shiftgroup,
        shift: userData?.shift,
        punchtype: userData?.punchtype,
        geolocation: userData?.geolocation,
        checkintime: "",
        checkouttime: "",
        location: "",
        ischeckedin: true,
        ischeckedout: false
    });

    const navigate = useNavigate();

    useEffect(() => {
        const getLeaveCount = async () => {
            setLoading(true)
            await api.post("/currentleavecount", { id: requestDetails.id })
                .then((response) => {
                    console.log(response);
                    setRequestDetails(prevDetails => ({ ...prevDetails, leavetaken: response.data.count }));
                    setLoading(false)
                })
                .catch((error) => {
                    console.log("🚀 ~ applyLeave ~ error:", error);
                });
        };

        getLeaveCount();
    }, [requestDetails.id]);

    useEffect(() => {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        const timeString = `${hours}:${minutes}:${seconds}`;
        console.log(timeString)
        if (userData?.entrytime < timeString) {
            setRequestDetails({ ...requestDetails, time: timeString })
        }
    }, [userData])


    const goBack = () => {
        navigate(-1);
    };

    const requestAttendanceFun = async (e) => {
        e.preventDefault();
        let location = ""
        try {
            const getLocation = () => {
                return new Promise((resolve, reject) => {
                    if (navigator.geolocation) {
                        navigator.geolocation.getCurrentPosition(
                            (position) => {
                                const location = `${position.coords.latitude} ${position.coords.longitude}`;
                                resolve(location);
                            },
                            (error) => {
                                reject(error);
                            }
                        );
                    } else {
                        reject(new Error("Geolocation is not supported by this browser."));
                    }
                });
            };

            location = await getLocation();
            // console.log(location)

            setRequestDetails({ ...requestDetails, location: location });


        } catch (error) {
            console.log("🚀 ~ EntryBox ~ error:", error);
        }

        setLoading(true)
        await api.post("/requestattendance", { ...requestDetails, location: location, date: reversedDate })
            .then((response) => {
                console.log("🚀 ~ .then ~ response:", response.data);
                setLoading(false)
                navigate(-1);
            })
            .catch((error) => {
                console.log("🚀 ~ requestattendance ~ error:", error);
            });
    };

    return (
        <>
            <div className='w-[100vw] left-0 h-[100vh] backdrop-blur-sm bg-white/47 border border-gray-300/30 grid place-content-center top-0 absolute z-[9999]'>
                <div className='w-full md:w-[60vw] h-[90vh] bg-white rounded-2xl border-2 border-grey shadow-allBox overflow-y-auto'>
                    {/* <div className='flex justify-between w-[100%] h-[80px] items-center bg-white top-0 z-10 relative'>
                        <div className='text-[25px] text-bgGreen font-bold pl-8'>Request Attendance Form</div>
                        <div className='text-[40px] bg-shadeWhite w-[80px] h-[100%] rounded-tr-lg grid place-content-center rounded-bl-[35px] text-deepLightBlack hover:cursor-pointer' onClick={goBack}><RxCross2 /></div>
                    </div> */}
                    <div className='flex justify-between w-[100%] h-[clamp(4rem,5vw,6rem)] items-center bg-white top-0 z-10 relative'>
                        <div className=' text-bgGreen font-bold xs:pl-2 md:pl-8 text-[clamp(1.2rem,4vw,2rem)]'>Request Attendance Form</div>
                        <div className=' bg-shadeWhite w-[80px] h-[100%] rounded-tr-lg grid place-content-center rounded-bl-[35px] text-deepLightBlack hover:cursor-pointer text-[clamp(1.5rem,4vw,2rem)]' onClick={goBack}><RxCross2 /></div>
                    </div>
                    <div className='p-5 flex flex-col justify-center z-0'>
                        <form onSubmit={requestAttendanceFun}>
                            <div className='xs:w-full md:w-[50%] mx-auto'>
                                <Input readonly={true} type={"text"} placeholder={"Employee ID"} name={'id'} state={requestDetails} setState={setRequestDetails} />
                                <Input readonly={true} type={"text"} placeholder={"Name"} name={'name'} state={requestDetails} setState={setRequestDetails} />
                            </div>
                            <div className='flex justify-around gap-2 xs:w-full md:w-[50%] mx-auto'>
                                <DatePicker readonly={true} placeholder={"Date"} name={'date'} state={requestDetails} setState={setRequestDetails} />
                            </div>
                            <div className='xs:w-full md:w-[50%] mx-auto'>
                                <Input readonly={false} type={"time"} placeholder={"Entry Time"} name={'time'} state={requestDetails} setState={setRequestDetails} />
                            </div>
                            <div className='xs:w-full md:w-[50%] mx-auto'>
                                <Textarea placeholder={"Reason"} name={'reason'} state={requestDetails} setState={setRequestDetails} />
                            </div>
                            <div className='flex justify-end gap-2 xs:w-full md:w-[50%] mx-auto'>
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

export default RequestAttendanceForm;
