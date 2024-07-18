import React, { useState, useEffect, useContext } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { AuthContext } from '../../context/AuthContext';
import api from '../../utils/api';
import toast from 'react-hot-toast';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const WorkingHours = ({ id, month }) => {
    const [selectedWeek, setSelectedWeek] = useState('');
    const [workingHours, setWorkingHours] = useState({});
    const [weekDates, setWeekDates] = useState([]);
    // const [debugInfo, setDebugInfo] = useState('');

    useEffect(() => {
        generateWeeksForMonth(month);
        console.log(month)
    }, [month]);

    useEffect(() => {
        if (selectedWeek && id) {
            const { start, end } = weekDates[selectedWeek];
            fetchWorkingHours(start, end, id);
        }
    }, [selectedWeek, id, weekDates]);

    const fetchWorkingHours = async (weekStart, weekEnd, id) => {
        const toastId = toast.loading("Loading...Please wait!", {
            duration: Infinity,
        })
        try {
            const response = await api.get(`/getworkinghours?weekStart=${weekStart}&weekEnd=${weekEnd}&id=${id}`);
            console.log('API Response:', response.data);
            setWorkingHours(response.data);
            // setDebugInfo(JSON.stringify(response.data, null, 2));
            toast.dismiss("",{id: toastId})
        } catch (error) {
            console.error('Error fetching working hours:', error);
            toast.error("Error fetching data :(",{id: toastId})
            // setDebugInfo(`Error fetching data: ${error.message}`);
        }
    };

    const generateWeeksForMonth = (monthStr) => {
        const [year, month] = monthStr.split('-');
        const date = new Date(year, month - 1, 1);
        const weeks = [];
        const dates = [];

        while (date.getMonth() === month - 1) {
            const weekStart = new Date(date);
            weekStart.setDate(date.getDate() - date.getDay());
            const weekEnd = new Date(weekStart);
            weekEnd.setDate(weekStart.getDate() + 6);

            weeks.push({
                start: weekStart.toISOString().split('T')[0],
                end: weekEnd.toISOString().split('T')[0]
            });

            const formattedDates = [];
            for (let i = 0; i < 7; i++) {
                const currentDate = new Date(weekStart);
                currentDate.setDate(weekStart.getDate() + i);
                formattedDates.push(currentDate.toISOString().split('T')[0]);
            }
            dates.push(formattedDates);

            date.setDate(date.getDate() + 7);
        }

        setWeekDates(weeks.map((week, index) => ({ ...week, dates: dates[index] })));
        setSelectedWeek(''); // Reset selected week when month changes
    };


    const getChartData = () => {
        if (!selectedWeek || selectedWeek === '' || !weekDates[selectedWeek]) {
            return null;
        }

        const dates = weekDates[selectedWeek].dates;
        const hours = dates.map(date => {
            const formattedDate = formatDateForBackend(date);
            return workingHours[formattedDate] || 0;
        });

        // console.log('Chart Data - Dates:', dates);
        // console.log('Chart Data - Hours:', hours);

        return {
            labels: dates,
            datasets: [
                {
                    data: hours,
                    backgroundColor: [
                        'rgba(255, 206, 86, 0.5)',
                        'rgba(255, 206, 86, 0.5)',
                        'rgba(75, 192, 192, 0.5)',
                        'rgba(173, 216, 230, 0.5)',
                        'rgba(255, 206, 86, 0.5)',
                        'rgba(75, 192, 192, 0.5)',
                        'rgba(255, 206, 86, 0.5)',
                    ],
                    borderColor: [
                        'rgba(255, 206, 86, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(173, 216, 230, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(255, 206, 86, 1)',
                    ],
                    borderWidth: 1,
                },
            ],
        };
    };

    const formatDateForBackend = (dateString) => {
        const [year, month, day] = dateString.split('-');
        return `${day}-${month}-${year}`;
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Working Hours'
                }
            },
            x: {
                title: {
                    display: true,
                    text: 'Dates of the Selected Week'
                }
            }
        },
        plugins: {
            legend: {
                display: false
            },
            title: {
                display: true,
                text: `Working Hours of ${id}`
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        const decimalHours = context.parsed.y;
                        const hours = Math.floor(decimalHours);
                        const minutes = Math.round((decimalHours - hours) * 60);
                        return `${hours}h ${minutes}m`;
                    }
                }
            }
        }
    };

    const chartData = getChartData();

    return (
        <div className='w-full'>
            <div className='flex w-full'>

                <select
                    className='input px-3 h-[35px] xs:w-[100%] md:w-[60%] focus:outline-2 focus:outline-bgGreen text-black group font-semibold'
                    value={selectedWeek}
                    onChange={(e) => setSelectedWeek(e.target.value)}
                    disabled={!month}
                >
                    <option value="">Select a week</option>
                    {weekDates.map((week, index) => (
                        <option key={index} value={index}>
                            {`Week ${index + 1}: ${week.start} to ${week.end}`}
                        </option>
                    ))}
                </select>
            </div>
            <div style={{ width: '100%', height: '100%' }}>
                {chartData ? (
                    <Bar data={chartData} options={options} />
                ) : (
                    <p className='text-center text-lightGrey py-5'>No data available for the selected week.</p>
                )}
            </div>
        </div>
    );
};

export default WorkingHours;