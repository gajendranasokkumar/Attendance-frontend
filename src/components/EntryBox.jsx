import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../utils/api';
import { useNavigate } from 'react-router-dom';

const EntryBox = () => {
    const [dateTime, setDateTime] = useState({
        time: '',
        date: '',
        day: '',
        remainingTime: '00 : 00 : 00'
    });

    const [checkINDetails, setCheckINDetails] = useState({
        id: "",
        name: "",
        person: "",
        punchid: "",
        company: "",
        branch: "",
        status: "permitted",
        designation: "",
        multibranchattendance: "",
        shiftgroup: "",
        shift: "",
        punchtype: "",
        geolocation: "",
        checkintime: "",
        checkouttime: "",
        location: "",
        date: "",
        ischeckedin: false,
        ischeckedout: false,
        totalWorkedTime: "",
        hoursofwork: ""
    });

    const [isCheckedInOrOut, setIsCheckedInOrOut] = useState({
        ischeckedin: false,
        ischeckedout: false,
    });

    const [checkInOutTime, setCheckInOutTime] = useState({
        checkintime: '',
        checkouttime: '',
        totalWorkedTime: ''
    });

    const navigate = useNavigate();

    const { userData } = useContext(AuthContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const now = new Date();
                const day = String(now.getDate()).padStart(2, '0');
                const month = String(now.getMonth() + 1).padStart(2, '0');
                const year = now.getFullYear();
                const formattedDate = `${day}-${month}-${year}`;

                console.log("🚀 ~ fetchData ~ formattedDate:", formattedDate)
                const response = await api.post("/getCheckInDetails", { id: userData?.id, date: formattedDate });
                setIsCheckedInOrOut({ ...isCheckedInOrOut, ischeckedin: response.data.ischeckedin, ischeckedout: response.data.ischeckedout })
                setCheckInOutTime({ ...checkInOutTime, checkintime: response.data.checkintime[response.data.checkintime.length - 1], checkouttime: response.data.checkouttime[response.data.checkouttime.length - 1], totalWorkedTime: response.data.totalWorkedTime })
                console.log("🚀 ~ .then ~ First Fetch:", response);
            } catch (error) {
                console.log("🚀 ~ EntryBox ~ error:", error);
            }
        }

        fetchData();
    }, [userData])

    useEffect(() => {
        if (userData) {
            console.log("🚀 ~ EntryBox ~ userData:", userData);
            setCheckINDetails(prevDetails => ({
                ...prevDetails,
                id: userData.id,
                name: userData.name,
                person: userData.person,
                punchid: userData.punchid,
                company: userData.company,
                branch: userData.branch,
                designation: userData.designation,
                multibranchattendance: userData.multibranchattendance,
                shiftgroup: userData.shiftgroup,
                shift: userData.shift,
                punchtype: userData.punchtype,
                geolocation: userData.geolocation,
                hoursofwork: userData.hoursofwork
            }));
        }
    }, [userData]);

    useEffect(() => {
        function updateClock() {
            const now = new Date();
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const seconds = String(now.getSeconds()).padStart(2, '0');
            const timeString = `${hours}:${minutes}:${seconds}`;

            const date = String(now.getDate()).padStart(2, '0');

            const months = [
                'January', 'February', 'March', 'April', 'May', 'June',
                'July', 'August', 'September', 'October', 'November', 'December'
            ];
            const month = months[now.getMonth()];
            const year = now.getFullYear();
            const dateString = `${date} - ${month}`;

            const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            const dayString = days[now.getDay()];

            setDateTime(prevDateTime => ({
                ...prevDateTime,
                time: timeString,
                date: dateString,
                day: dayString
            }));
        }

        updateClock();
        const intervalId = setInterval(updateClock, 1000);

        return () => {
            clearInterval(intervalId)
        };
    }, []);

    // useEffect(() => {
    //     if (isCheckedInOrOut.ischeckedin && !isCheckedInOrOut.ischeckedout) {
    //         function updateRemainingTime() {
    //             const now = new Date();
    //             const [hours1, minutes1, seconds1] = checkInOutTime.totalWorkedTime.split(':').map(Number);
    //             now.setHours(hours1, minutes1, seconds1);

    //             const checkInDateTime = new Date();
    //             const [hours, minutes, seconds] = checkInOutTime.checkintime.split(':').map(Number);
    //             checkInDateTime.setHours(hours, minutes, seconds);

    //             const endTime = new Date(checkInDateTime.getTime() + userData?.hoursofwork * 60 * 60 * 1000);
    //             const remainingTimeMs = endTime - now;

    //             const isNegative = remainingTimeMs < 0;
    //             const absRemainingTimeMs = Math.abs(remainingTimeMs);

    //             const remainingHours = Math.floor(absRemainingTimeMs / (1000 * 60 * 60));
    //             const remainingMinutes = Math.floor((absRemainingTimeMs % (1000 * 60 * 60)) / (1000 * 60));
    //             const remainingSeconds = Math.floor((absRemainingTimeMs % (1000 * 60)) / 1000);

    //             const remainingTimeString = `${isNegative ? '-' : ''}${String(remainingHours).padStart(2, '0')} : ${String(remainingMinutes).padStart(2, '0')} : ${String(remainingSeconds).padStart(2, '0')}`;

    //             setDateTime(prevDateTime => ({
    //                 ...prevDateTime,
    //                 remainingTime: remainingTimeString
    //             }));
    //         }

    //         const intervalId = setInterval(updateRemainingTime, 1000);
    //         return () => clearInterval(intervalId);
    //     }
    // }, [isCheckedInOrOut, checkInOutTime]);

    const enterCheckIn = async (e) => {
        e.preventDefault();

        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        const timeString = `${hours}:${minutes}:${seconds}`;


        if (userData?.entrytime < timeString && isCheckedInOrOut.ischeckedin != true && isCheckedInOrOut.ischeckedout != true) {
            userData?.person == "employee" ? navigate("/employee/requestattendance") : navigate("/admin/requestattendance")
        }
        else {
            const day = String(now.getDate()).padStart(2, '0');
            const month = String(now.getMonth() + 1).padStart(2, '0');
            const year = now.getFullYear();
            const formattedDate = `${day}-${month}-${year}`;

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

                const location = await getLocation();
                // console.log(location)

                const response = await api.post("/checkin", {
                    ...checkINDetails,
                    checkintime: timeString,
                    date: formattedDate,
                    ischeckedin: true,
                    ischeckedout: false,
                    location: location,
                    totalWorkedTime: checkInOutTime.totalWorkedTime
                    // remainingtime: dateTime.remainingTime,
                });

                console.log("🚀 ~ .then ~ response:", response);
                setIsCheckedInOrOut({ ...isCheckedInOrOut, ischeckedin: true, ischeckedout: false });
                setCheckInOutTime({ ...checkInOutTime, checkintime: response.data.checkintime[response.data.checkintime.length - 1] });
            } catch (error) {
                console.log("🚀 ~ EntryBox ~ error:", error);
            }
        }
    };

    const enterCheckout = async (e) => {
        e.preventDefault();

        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        const timeString = `${hours}:${minutes}:${seconds}`;

        const day = String(now.getDate()).padStart(2, '0');
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const year = now.getFullYear();
        const formattedDate = `${day}-${month}-${year}`;


        try {
            const response = await api.post("/checkout", {
                id: checkINDetails?.id,
                date: formattedDate,
                checkouttime: timeString,
                ischeckedout: true,
                ischeckedin: false,
                // remainingtime: dateTime.remainingTime,
            });
            console.log("🚀 ~ .then ~ response:", response);
            setIsCheckedInOrOut({ ...isCheckedInOrOut, ischeckedout: true, ischeckedin: false });
            setCheckInOutTime({ ...checkInOutTime, checkouttime: response.data.checkouttime[response.data.checkouttime.length - 1], totalWorkedTime: response.data.totalWorkedTime })
        } catch (error) {
            console.log("🚀 ~ EntryBox ~ error:", error);
        }
    }


    function secondsToTimeString(seconds) {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = seconds % 60;
        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
    }

    return (
        <div className='xs:w-[100%] lg:w-[45%] border-l-4 border-l-txtLBlue bg-shadeWhite h-[50%] rounded shadow-goodShadow flex flex-col justify-center items-center px-5'>
            <div className='w-[80%] h-[60px] flex rounded-lg'>
                <div className='w-[50%] h-full rounded-s-lg bg-txtLBlue text-white grid place-content-center text-2xl'>
                    <p>{dateTime.date}</p>
                </div>
                <div className='w-[50%] h-full rounded-e-lg bg-bgLBlue border-2 border-txtLBlue font-bold text-txtLBlue grid place-content-center text-2xl'>
                    {dateTime.day}
                </div>
            </div>
            <div className='font-mono text-4xl my-5 text-txtLBlue font-bold' id='clock'>
                {dateTime.time}
            </div>
            <div className='flex gap-5'>
                <button
                    type='button'
                    className={`bg-txtLBlue w-[150px] h-[50px] text-white rounded-md text-xl border-2 border-white ${isCheckedInOrOut.ischeckedin ? 'opacity-50 cursor-not-allowed' : ''}`}
                    onClick={enterCheckIn}
                    disabled={isCheckedInOrOut.ischeckedin}
                >
                    Check IN
                </button>
                <button type='button' className={`bg-txtLBlue w-[150px] h-[50px] text-white rounded-md text-xl border-2 border-white ${isCheckedInOrOut.ischeckedout ? 'opacity-50 cursor-not-allowed' : ''}`}
                    onClick={enterCheckout}
                    disabled={isCheckedInOrOut.ischeckedout}
                >
                    Check OUT
                </button>
            </div>
            <div className='flex gap-8 mt-5 font-semibold text-grey'>
                <div>
                    <p>Check IN Time</p>
                    <p>{checkInOutTime.checkintime || "00 : 00 : 00"}</p>
                </div>
                <div>
                    <p>Worked Time</p>
                    <p>{checkInOutTime.totalWorkedTime || "00 : 00 : 00"}</p>
                </div>
                <div>
                    <p>Check OUT Time</p>
                    <p>{checkInOutTime.checkouttime || "00 : 00 : 00"}</p>
                </div>
                {/* <div>                        
                    <p>Remaining Time</p>
                    <p>{dateTime.remainingTime == "NaN : NaN : NaN" ? "00 : 00 : 00" : dateTime.remainingTime}</p>
                </div> */}
                {/* <div className='text-end'>
                    {
                        isCheckedInOrOut.ischeckedout ?
                            <>
                                <p>Check OUT Time</p>
                                <p>{checkInOutTime.checkouttime || "00 : 00 : 00"}</p>
                            </>
                            :
                            <>
                                <p>Remaining Time</p>
                                <p>{dateTime.remainingTime == "NaN : NaN : NaN" ? "00 : 00 : 00" : dateTime.remainingTime}</p>
                            </>
                    }
                </div> */}
            </div>
        </div>
    );
}

export default EntryBox;
