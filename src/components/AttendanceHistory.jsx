import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext';
import api from '../utils/api';

const AttendanceHistory = () => {

    const [allAttendance, setAllAttendance] = useState([]);
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
                const response = await api.post("/getAttendanceHistory", { id: userData?.id });
                console.log("🚀 ~ .then ~ All Day Attendance:", response);
                setAllAttendance(response.data.reverse())
            } catch (error) {
                console.log("🚀 ~ EntryBox ~ error:", error);
            }
        }

        fetchData();
    }, [userData])
    return (
        <>
            <div className='h-[92vh] w-[84vw] bg-white lg:rounded-tl-[50px] px-5 overflow-y-auto pb-10'>
                <h1 className='text-txtLBlue text-3xl text-center mb-10 mt-10 font-bold font-sans'>Attendance History</h1>
                <div className='h-[100%] w-[100%] mt-5 overflow-x-auto'>
                    <table className='min-w-full table-auto border-2 border-bgGreen'>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Punch ID</th>
                                <th>Company</th>
                                <th>Branch</th>
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
                                allAttendance.map((one) => (
                                    <tr key={one._id}>
                                        <td className='px-1 min-w-[100px] max-w-[200px] whitespace-normal'>{one.date}</td>
                                        <td className='px-1 min-w-[120px] max-w-[200px] whitespace-normal'>{one.id}</td>
                                        <td className='px-1 min-w-[100px] max-w-[200px] whitespace-normal'>{one.name}</td>
                                        <td className='px-1 min-w-[100px] max-w-[200px] whitespace-normal'>{one.punchid}</td>
                                        <td className='px-1 min-w-[200px] max-w-[200px] whitespace-normal'>{one.company}</td>
                                        <td className='px-1 min-w-[120px] max-w-[200px] whitespace-normal'>{one.branch}</td>
                                        <td className='px-1 min-w-[100px] max-w-[200px] whitespace-normal'>{one.ischeckedin ? "YES" : "NO"}</td>
                                        <td className='px-1 min-w-[100px] max-w-[200px] whitespace-normal'>{one.checkintime}</td>
                                        <td className='px-1 min-w-[100px] max-w-[200px] whitespace-normal'>{one.ischeckedout ? "YES" : "NO"}</td>
                                        <td className='px-1 min-w-[150px] max-w-[200px] whitespace-normal'>{one.checkouttime}</td>
                                        <td className='px-1 min-w-[150px] max-w-[200px] whitespace-normal'>{one.location}</td>
                                        <td className='px-1 min-w-[150px] max-w-[200px] whitespace-normal'>{one.multibranchattendance}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default AttendanceHistory
