import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import api from '../../utils/api';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';



const AttendanceHistory = () => {
    const [allAttendance, setAllAttendance] = useState([]);
    const { userData, showLoader, setLoading } = useContext(AuthContext);
    const [openDropdowns, setOpenDropdowns] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const now = new Date();
                const day = String(now.getDate()).padStart(2, '0');
                const month = String(now.getMonth() + 1).padStart(2, '0');
                const year = now.getFullYear();
                const formattedDate = `${day}-${month}-${year}`;

                console.log("🚀 ~ fetchData ~ formattedDate:", formattedDate)
                const response = await api.post("/getAttendanceHistory", { id: userData?.id });
                console.log("🚀 ~ .then ~ All Day Attendance:", response);
                setAllAttendance(response.data.reverse())
                showLoader(500)
            } catch (error) {
                console.log("🚀 ~ EntryBox ~ error:", error);
            }
        }

        fetchData();
    }, [userData])

    const toggleDropdown = (id, type) => {
        setOpenDropdowns(prev => ({
            ...prev,
            [id]: {
                ...prev[id],
                [type]: !prev[id]?.[type]
            }
        }));
    };

    const renderTimeDropdown = (times, id, type) => {
        if (!times || times.length === 0 || times == "") return "N/A";
        
        const isOpen = openDropdowns[id]?.[type];
        const latestTime = times[times.length - 1];

        return (
            <div className="relative text-sm">
                <button 
                    onClick={() => toggleDropdown(id, type)}
                    className="bg-gray-200 px-2 py-1 rounded w-full flex justify-center items-center"
                >
                    {latestTime} <span className='ml-3 text-sm'>{!isOpen ? <IoIosArrowDown /> : <IoIosArrowUp />}</span>
                </button>
                {isOpen && (
                    <ul className="absolute z-10 border border-gray-300 mt-1 rounded shadow-lg p-2 shadow-allBox bg-bgLGreen w-full">
                        {[...times].reverse().map((time, index) => (
                            <li key={index} className="px-2 py-1 text-sm font-semibold hover:bg-lightGrey w-full">
                                {time}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        );
    };

    return (
        <>
            <div className='h-[92vh] sm:w-full md:w-[84vw] bg-white lg:rounded-tl-[50px] xs:px-[0.5px] md:px-5 overflow-y-auto pb-10'>
                <h1 className='text-txtLBlue text-3xl text-center mb-10 mt-10 font-bold font-sans text-[clamp(1rem,4vw,1.5rem)]'>Attendance History</h1>
                <div className='h-[85%] w-[100%] mt-5 overflow-x-auto'>
                    <table className='min-w-full table-auto border-2 border-bgGreen text-sm'>
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
                                    <tr key={one._id} >
                                        <td className='px-1 min-w-[100px] max-w-[200px] whitespace-normal'>{one.date}</td>
                                        <td className='px-1 min-w-[120px] max-w-[200px] whitespace-normal'>{one.id}</td>
                                        <td className='px-1 min-w-[150px] max-w-[200px] whitespace-normal'>{one.name}</td>
                                        <td className='px-1 min-w-[100px] max-w-[200px] whitespace-normal'>{one.punchid}</td>
                                        <td className='px-1 min-w-[200px] max-w-[200px] whitespace-normal'>{one.company}</td>
                                        <td className='px-1 min-w-[120px] max-w-[200px] whitespace-normal'>{one.branch}</td>
                                        <td className='px-1 min-w-[100px] max-w-[200px] whitespace-normal'>{one.ischeckedin ? "YES" : "NO"}</td>
                                        <td className='px-1 min-w-[150px] max-w-[200px] whitespace-normal'>
                                            {renderTimeDropdown(one.checkintime, one._id, 'checkin')}
                                        </td>
                                        <td className='px-1 min-w-[100px] max-w-[200px] whitespace-normal'>{one.ischeckedout ? "YES" : "NO"}</td>
                                        <td className='px-1 min-w-[150px] max-w-[200px] whitespace-normal'>
                                            {renderTimeDropdown(one.checkouttime, one._id, 'checkout')}
                                        </td>
                                        <td className='px-1 min-w-[150px] max-w-[200px] whitespace-normal h-12'>{one.location}</td>
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