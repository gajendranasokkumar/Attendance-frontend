import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import api from '../../utils/api';


const AttendanceList = () => {

    const [todayAttendance, setTodayAttendance] = useState({});
    const { userData, setLoading, showLoader } = useContext(AuthContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const now = new Date();
                const day = String(now.getDate()).padStart(2, '0');
                const month = String(now.getMonth() + 1).padStart(2, '0');
                const year = now.getFullYear();
                const formattedDate = `${day}-${month}-${year}`;
                setTodayAttendance({ ...todayAttendance, date: formattedDate });

                console.log("🚀 ~ fetchData ~ formattedDate:", formattedDate)
                const response = await api.post("/getCheckInDetails", { id: userData?.id, date: formattedDate });
                console.log("🚀 ~ .then ~ Today's Attendance:", response);
                showLoader(500)
                setTodayAttendance(response.data)
            } catch (error) {
                console.log("🚀 ~ EntryBox ~ error:", error);
            }
        }

        fetchData();
    }, [userData])
    return (
        <>
            <div className='h-[92vh] sm:w-full md:w-[84vw] bg-white lg:rounded-tl-[50px] px-5 overflow-y-auto pb-10'>
                <h1 className='text-txtLBlue text-3xl text-center mb-10 mt-10 font-bold font-sans text-[clamp(1rem,4vw,1.5rem)]'>Today's Attendance  ( {todayAttendance?.date} )</h1>
                <div className='h-[85%] w-[100%] mt-5 overflow-x-auto flex justify-evenly flex-wrap '>
                    <div className='xs:w-[100%] lg:w-[45%] border-t-4 border-txtLBlue bg-shadeWhite h-fit py-5 rounded shadow-goodShadow flex flex-col justify-center items-center px-5'>
                        <div className='parent'>
                            <div className='left text-sm'>ID</div>
                            <div className='right text-sm'>: {todayAttendance?.id}</div>
                        </div>
                        <div className='parent'>
                            <div className='left text-sm'>Name</div>
                            <div className='right text-sm'>: {todayAttendance?.name}</div>
                        </div>
                        <div className='parent'>
                            <div className='left text-sm'>Date</div>
                            <div className='right text-sm'>: {todayAttendance?.date}</div>
                        </div>
                        <div className='parent'>
                            <div className='left text-sm'>Punch ID</div>
                            <div className='right text-sm'>: {todayAttendance?.punchid}</div>
                        </div>
                        <div className='parent'>
                            <div className='left text-sm'>Company</div>
                            <div className='right text-sm'>: {todayAttendance?.company}</div>
                        </div>
                        <div className='parent'>
                            <div className='left text-sm'>Branch</div>
                            <div className='right text-sm'>: {todayAttendance?.branch}</div>
                        </div>
                        {/* <div className='parent'>
                            <div className='left text-sm'>Status</div>
                            <div className='right text-sm'>: {todayAttendance?.status}</div>
                        </div> */}
                        <div className='parent'>
                            <div className='left text-sm'>Entry time</div>
                            <div className='right text-sm'>: {userData?.entrytime}</div>
                        </div>
                        <div className='parent'>
                            <div className='left text-sm'>Hours of Work</div>
                            <div className='right text-sm'>: {todayAttendance?.hoursofwork}</div>
                        </div>
                        {/* <div className='parent'>
                            <div className='left'>Is Check In</div>
                            <div className='right'>: {todayAttendance?.ischeckedin ? "YES" : "NO"}</div>
                        </div> */}
                        {/* <div className='parent'>
                            <div className='left'>Check In Time</div>
                            <div className='right'>: {todayAttendance?.checkintime}</div>
                        </div> */}
                        {/* <div className='parent'>
                            <div className='left'>Is Check Out</div>
                            <div className='right'>: {todayAttendance?.ischeckedout ? "YES" : "NO"}</div>
                        </div> */}
                        {/* <div className='parent'>
                            <div className='left'>Check Out Time</div>
                            <div className='right'>: {todayAttendance?.checkouttime}</div>
                        </div> */}
                        {/* <div className='parent'>
                            <div className='left'>Location</div>
                            <div className='right'>: {todayAttendance?.location}</div>
                        </div> */}
                        <div className='parent'>
                            <div className='left text-sm'>Multi Branch Attendance</div>
                            <div className='right text-sm'>: {todayAttendance?.multibranchattendance}</div>
                        </div>
                    </div>
                    <div className='xs:w-[100%] lg:w-[45%] border-t-4 border-txtLBlue bg-shadeWhite h-fit py-5 rounded shadow-goodShadow flex flex-col justify-center items-center px-5 xs:mt-5 md:mt-0'>
                        <div className='parent'>
                            <div className='left text-sm'>Status</div>
                            {/* <div className='right'>: {todayAttendance?.status}</div> */}
                            <div className={`right font-bold text-sm
                                            ${todayAttendance?.status?.toUpperCase() === "PENDING" ? "text-txtLYellow" : ""}
                                            ${todayAttendance?.status?.toUpperCase() === "PERMITTED" ? "text-txtLGreen" : ""}
                                            ${todayAttendance?.status?.toUpperCase() === "DENIED" ? "text-txtLRed" : ""}`}>
                                : {todayAttendance?.status?.toUpperCase()}
                            </div>
                        </div>
                        <div className='parent'>
                            <div className='left text-sm'>Location</div>
                            <div className='right text-sm'>: {todayAttendance?.location}</div>
                        </div>
                        <div className='parent'>
                            <div className='left text-sm'>Is Check In</div>
                            <div className='right font-semibold text-black text-sm'>: {todayAttendance?.ischeckedin ? "YES" : "NO"}</div>
                        </div>
                        <div className='parent '>
                            <div className='left text-sm'>Is Check Out</div>
                            <div className='right font-semibold text-black text-sm'>: {todayAttendance?.ischeckedout ? "YES" : "NO"}</div>
                        </div>
                        {/* <div className='parent'>
                            <div className='left'>Check In Time</div>
                            <div className='right'>: {todayAttendance?.checkintime}</div>
                        </div>
                        <div className='parent'>
                            <div className='left'>Check Out Time</div>
                            <div className='right'>: {todayAttendance?.checkouttime}</div>
                        </div> */}
                        <div className='flex justify-between w-full'>
                            <div className='w-[50%]'>
                                <div className=' border-x-2 border-white text-txtLBlue font-semibold border-b-2 pl-2 bg-bgLBlue text-sm'>Check In Time</div>
                                <div className='border-x-2 border-white'>
                                    {todayAttendance?.checkintime?.map((time, index) => (
                                        <div key={index} className='pl-2 border-b-2 py-1 font-semibold border-white text-sm'> {time}</div>
                                    ))}
                                </div>
                            </div>
                            <div className='w-[50%]'>
                                <div className=' border-x-2 border-white text-txtLBlue font-semibold border-b-2 pl-2 bg-bgLBlue text-sm'>Check Out Time</div>
                                <div className='border-x-2 border-white'>
                                    {todayAttendance?.checkouttime?.map((time, index) => (
                                        <div key={index} className='pl-2  border-b-2 py-1 font-semibold border-white text-sm'> {time}</div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <table className='min-w-full table-auto border-2 border-bgGreen'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Date</th>
                                <th>Punch ID</th>
                                <th>Company</th>
                                <th>Branch</th>
                                <th>Status</th>
                                <th>Hours of Work</th>
                                <th>Is Check In</th>
                                <th>Check In Time</th>
                                <th>Is Check Out</th>
                                <th>Check Out Time</th>
                                <th>Location</th>
                                <th>Multi Branch Attendance</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                (todayAttendance && todayAttendance.status) ? (
                                    <tr>
                                        <td className='px-1 min-w-[120px] max-w-[200px] whitespace-normal'>{todayAttendance.id}</td>
                                        <td className='px-1 min-w-[150px] max-w-[200px] whitespace-normal'>{todayAttendance.name}</td>
                                        <td className='px-1 min-w-[100px] max-w-[200px] whitespace-normal'>{todayAttendance.date}</td>
                                        <td className='px-1 min-w-[100px] max-w-[200px] whitespace-normal'>{todayAttendance.punchid}</td>
                                        <td className='px-1 min-w-[200px] max-w-[200px] whitespace-normal'>{todayAttendance.company}</td>
                                        <td className='px-1 min-w-[120px] max-w-[200px] whitespace-normal'>{todayAttendance.branch}</td>
                                        <td className={`px-1 min-w-[120px] max-w-[200px] whitespace-normal font-bold 
                                            ${todayAttendance.status.toUpperCase() === "PENDING" ? "text-txtLYellow bg-bgLYellow" : ""}
                                            ${todayAttendance.status.toUpperCase() === "PERMITTED" ? "text-txtLGreen bg-bgLGreen" : ""}
                                            ${todayAttendance.status.toUpperCase() === "DENIED" ? "text-txtLRed bg-bgLRed" : ""}`}>
                                            {todayAttendance.status.toUpperCase()}
                                        </td>
                                        <td className='px-1 min-w-[150px] max-w-[200px] whitespace-normal'>{todayAttendance.hoursofwork}</td>
                                        <td className='px-1 min-w-[100px] max-w-[200px] whitespace-normal font-bold'>
                                            {todayAttendance.ischeckedin ? "YES" : "NO"}
                                        </td>
                                        <td className='px-1 min-w-[150px] max-w-[200px] whitespace-normal'>{todayAttendance.checkintime}</td>
                                        <td className='px-1 min-w-[100px] max-w-[200px] whitespace-normal font-bold'>
                                            {todayAttendance.ischeckedout ? "YES" : "NO"}
                                        </td>
                                        <td className='px-1 min-w-[150px] max-w-[200px] whitespace-normal'>{todayAttendance.checkouttime}</td>
                                        <td className='px-1 min-w-[150px] max-w-[200px] whitespace-normal'>{todayAttendance.location}</td>
                                        <td className='px-1 min-w-[150px] max-w-[200px] whitespace-normal'>{todayAttendance.multibranchattendance}</td>
                                    </tr>
                                ) : (
                                    <></>
                                )
                            }

                        </tbody>
                    </table> */}
                </div>
            </div>
        </>
    )
}

export default AttendanceList
