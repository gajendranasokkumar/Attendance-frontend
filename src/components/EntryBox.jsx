import React, { useState, useEffect } from 'react';

const EntryBox = () => {
    const [dateTime, setDateTime] = useState({
        time: '',
        date: '',
        day: '',
        remainingTime: ''
    });

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

            // Calculate remaining time
            const startTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 7, 0, 0); // 8:00 AM today
            const endTime = new Date(startTime.getTime() + 8 * 60 * 60 * 1000); // 8 hours from start time
            const remainingTimeMs = endTime - now;

            const isNegative = remainingTimeMs < 0;
            const absRemainingTimeMs = Math.abs(remainingTimeMs);

            const remainingHours = Math.floor(absRemainingTimeMs / (1000 * 60 * 60));
            const remainingMinutes = Math.floor((absRemainingTimeMs % (1000 * 60 * 60)) / (1000 * 60));
            const remainingSeconds = Math.floor((absRemainingTimeMs % (1000 * 60)) / 1000);

            const remainingTimeString = `${isNegative ? '-' : ''}${String(remainingHours).padStart(2, '0')} : ${String(remainingMinutes).padStart(2, '0')} : ${String(remainingSeconds).padStart(2, '0')}`;

            setDateTime({
                time: timeString,
                date: dateString,
                day: dayString,
                remainingTime: remainingTimeString
            });
        }

        updateClock();
        const intervalId = setInterval(updateClock, 1000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className='xs:w-[100%] lg:w-[45%] border-l-4 border-l-grey bg-shadeWhite h-[50%] rounded shadow-goodShadow flex flex-col justify-center items-center px-5'>
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
                <button type='button' className='bg-txtLBlue w-[150px] h-[50px] text-white rounded-md text-xl border-2 border-white'>
                    Check IN
                </button>
                <button type='button' className='bg-txtLBlue w-[150px] h-[50px] text-white rounded-md text-xl border-2 border-white'>
                    Check OUT
                </button>
            </div>
            <div className='flex gap-16 mt-5 font-semibold text-grey'>
                <div>
                    <p>Check IN Time</p>
                    <p>08 : 00 : 00</p>
                </div>
                <div className='text-end'>
                    <p>Remaining Time</p>
                    <p>{dateTime.remainingTime}</p>
                </div>
            </div>
        </div>
    );
}

export default EntryBox;
