import React, { useState, useEffect } from 'react';

const AttendanceCalendar = ({ month, leavedata }) => {
    const [selectedDate, setSelectedDate] = useState(month);
    const [calendarDays, setCalendarDays] = useState([]);
    const [attendanceData, setAttendanceData] = useState({});

    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    useEffect(() => {
        generateCalendarDays();
        fetchAttendanceData();
    }, [selectedDate, leavedata]);

    useEffect(() => {
        setSelectedDate(month);
    }, [month]);

    const generateCalendarDays = () => {
        const [year, month] = selectedDate.split('-');
        const firstDay = new Date(year, month - 1, 1);
        const lastDay = new Date(year, month, 0);
        const daysInMonth = lastDay.getDate();
        const startingDay = firstDay.getDay();

        let days = [];
        for (let i = 0; i < (startingDay === 0 ? 6 : startingDay - 1); i++) {
            days.push(null);
        }
        for (let i = 1; i <= daysInMonth; i++) {
            days.push(i);
        }

        setCalendarDays(days);
    };

    const fetchAttendanceData = async () => {
        // const data = [
        //     { date: "2024-07-16", status: "Present" },
        //     { date: "2024-07-17", status: "Present" },
        //     { date: "2024-07-18", status: "Present" },
        //     { date: "2024-07-19", status: "Present" },
        //     { date: "2024-07-23", status: "Present" },
        //     { date: "2024-07-24", status: "Absent" },
        //     { date: "2024-07-25", status: "Present" },
        //     { date: "2024-07-26", status: "Present" },
        //     { date: "2024-07-30", status: "Leave" },
        //     { date: "2024-07-31", status: "Present" }
        // ];

        const formattedData = leavedata.reduce((acc, item) => {
            acc[item.date] = item.status;
            return acc;
        }, {});

        setAttendanceData(formattedData);
    };

    const getStatusStyle = (status) => {
        switch (status) {
            case 'Present':
                return 'bg-[#d1f7d6] border-[#a3e4b8]';
            case 'Absent':
                return 'bg-[#ffd1d1] border-[#ff9999]';
            case 'Leave':
                return 'bg-[#e6d1f7] border-[#c4a3e4]';
            default:
                return 'bg-[#e0e0e0] border-[#b0b0b0]';
        }
    };

    const formatDate = (day) => {
        const [year, month] = selectedDate.split('-');
        return `${year}-${month}-${String(day).padStart(2, '0')}`;
    };

    return (
        <div className="w-full mx-auto p-4 font-sans">
            <div className="grid grid-cols-7 gap-2">
                {days.map(day => (
                    <div key={day} className="text-center font-semibold text-sm text-gray-600 pb-2">{day}</div>
                ))}
                {calendarDays.map((day, index) => {
                    const date = formatDate(day);
                    const status = attendanceData[date];
                    // console.log(`Date: ${date}, Status: ${status}`); // Debugging line
                    return (
                        <div
                            key={index}
                            className={`
                p-2 rounded-lg  ${day ? `${getStatusStyle(status)} border-l-2` : 'bg-white'}
                transition-colors duration-200 h-24 `}
                        >
                            {day && (
                                <>
                                    <div className={`text-xl font-semibold ${status === 'Absent' ? 'text-txtLRed' :
                                        status === 'Leave' ? 'text-[#8e1eff]' :
                                        status === 'Present' ? 'text-txtLGreen' : 'text-[#b0b0b0]'
                                        }`}>{day}</div>
                                    <div className={`text-xs mt-1 font-semibold ${status === 'Absent' ? 'text-txtLRed' :
                                        status === 'Leave' ? 'text-[#8e1eff]' :
                                            'text-txtLGreen'
                                        }`}>
                                        {status || ''}
                                    </div>
                                </>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default AttendanceCalendar;
