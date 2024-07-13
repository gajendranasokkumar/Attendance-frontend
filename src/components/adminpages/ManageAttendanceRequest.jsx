import React, { useContext, useEffect, useState } from 'react';
import {
    SmallInput,
    SmallDate,
    SmallTime,
    SmallCheckBox,
    ActionBtns,
    ActionBtnsForAttendance
} from '../index';
import axios from 'axios';
import api from '../../utils/api';
import { useNavigate } from 'react-router-dom';
import { VscDebugRestart } from 'react-icons/vsc';
import { parseISO } from 'date-fns';
import { AuthContext } from '../../context/AuthContext';
import toast from 'react-hot-toast';



const ManageAttendanceRequest = () => {
    const [requestList, setRequestList] = useState([]);
    const [searchList, setSearchList] = useState([]);
    const [searchQuery, setSearchQuery] = useState({
        date: '',
        time: '',
        content: ''
    });
    const [selectedIds, setSelectedIds] = useState([]);
    const [selectAll, setSelectAll] = useState(false);

    const navigate = useNavigate();

    const { setLoading, showLoader } = useContext(AuthContext)

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) navigate('/');

        const fetchList = async () => {
            setLoading(true)
            await api.get("/getrequestforms")
                .then((response) => {
                    let result = response.data.filter(one => one.status.toUpperCase() === "PENDING");
                    setRequestList(result);
                    setSearchList(result);
                    setLoading(false)
                    console.log(result)
                })
                .catch((error) => {
                    console.log("🚀 ~ useEffect ~ error:", error);
                });
        };

        fetchList();
    }, [navigate]);

    const updateStatus = async (currentStatus) => {
        const toastId = toast.loading("Loading...Please wait!")

        try {
            setLoading(true)
            await Promise.all(selectedIds.map(formId =>
                api.post("/updateattendancerequest", { formId, currentStatus })
            ));
            setLoading(false)
            navigate(0);
            toast.success('Successfully Updated!',{id: toastId})
        } catch (err) {
            console.log("🚀 ~ updateStatus ~ err:", err);
            toast.error('Couldn\'t Update!',{id: toastId})

        }
    };

    const showFilteredResult = () => {
        setSearchList(
            requestList.filter((one) => {
                // const today = new Date(searchQuery.date).toISOString().split('T')[0];
                // const reversedDate = today.split('-').reverse().join('-');
                // const searchDate = reversedDate;
                // const formDate = one.date;

                let formDate;
                let searchDate;
                if (searchQuery.date) {
                    const today = new Date(searchQuery.date).toISOString().split('T')[0];
                    const reversedDate = today.split('-').reverse().join('-');
                    searchDate = reversedDate;
                    formDate = one.date;
                }
                console.log(formDate, searchDate);

                const matchesDate = !searchDate || formDate == searchDate;

                const matchesTime = !searchQuery.time || one.time >= searchQuery.time;

                const matchesContent = !searchQuery.content ||
                    one.name.toLowerCase().includes(searchQuery.content.toLowerCase()) ||
                    one.reason.toLowerCase().includes(searchQuery.content.toLowerCase()) ||
                    one.status.toLowerCase().includes(searchQuery.content.toLowerCase()) ||
                    one.id.toLowerCase().includes(searchQuery.content.toLowerCase()) ||
                    one.reportingperson.toLowerCase().includes(searchQuery.content.toLowerCase());

                return matchesDate && matchesTime && matchesContent;
            })
        );
    };


    const clearFilter = () => {
        setSearchList(requestList);
        setSearchQuery({
            date: '',
            time: '',
            content: ''
        });
    };

    const handleCheckboxChange = (id) => {
        if (id === 'selectAll') {
            const newSelectAll = !selectAll;
            setSelectAll(newSelectAll);
            if (newSelectAll) {
                setSelectedIds(searchList.map(each => each._id));
            } else {
                setSelectedIds([]);
            }
        } else {
            setSelectedIds(prevSelectedIds => {
                if (prevSelectedIds.includes(id)) {
                    return prevSelectedIds.filter(selectedId => selectedId !== id);
                } else {
                    return [...prevSelectedIds, id];
                }
            });
        }
    };


    return (
        <>
            <div className='h-[92vh] sm:w-full md:w-[84vw] bg-white lg:rounded-tl-[50px] xs:px-1 md:px-5 overflow-y-auto pb-10'>
                <div className='md:h-[10%] w-[100%] mt-8 border-l-4 border-l-bgGreen flex'>
                    {/* <div className='w-[80%] px-5 flex items-center gap-3 h-full'>
                        <SmallDate placeholder={"Date"} name={'date'} state={searchQuery} setState={setSearchQuery} />
                        <SmallTime placeholder={"Time"} name={'time'} state={searchQuery} setState={setSearchQuery} />
                        <SmallInput type={"text"} placeholder={"Search for anything"} name={'content'} state={searchQuery} setState={setSearchQuery} />
                        <button type='button' className='px-3 py-1 bg-bgLBlue rounded-md font-bold text-txtLBlue border-2 border-txtLBlue' onClick={showFilteredResult}>Search</button>
                        <button type='button' className='bg-shadeWhite px-1 py-1 rounded-md font-bold text-xl' onClick={clearFilter}><VscDebugRestart /></button>
                    </div> */}
                    <div className='w-full md:w-[80%] px-2 sm:px-5 flex flex-col sm:flex-row items-center gap-3'>
                        <div className='flex xs:flex-row w-full gap-3'>
                        <SmallDate placeholder={"Date"} name={'date'} state={searchQuery} setState={setSearchQuery} />
                        <SmallTime placeholder={"Time"} name={'time'} state={searchQuery} setState={setSearchQuery} />
                        </div>
                        <SmallInput type={"text"} placeholder={"Search for anything"} name={'content'} state={searchQuery} setState={setSearchQuery} />
                        <div className='flex gap-2 justify-end  w-full'>
                            <button type='button' className='xs:order-2 md:order-1 px-3 py-1 bg-bgLBlue rounded-md font-bold text-txtLBlue border-2 border-txtLBlue' onClick={showFilteredResult}>Search</button>
                            <button type='button' className='xs:order-1 md:order-2 bg-shadeWhite px-1 py-1 rounded-md font-bold text-xl' onClick={clearFilter}><VscDebugRestart /></button>
                            <button type='button' className='order-3 px-3 py-1 bg-bgLGreen rounded-md font-bold text-txtLGreen border-2 border-txtLGreen' onClick={() => updateStatus('PERMITTED')}>Approve</button>
                            <button type='button' className='order-4 px-3 py-1 bg-bgLRed rounded-md font-semibold text-txtLRed border-2 border-x-txtLRed' onClick={() => updateStatus('DENIED')}>Reject</button>
                        </div>
                    </div>
                </div>
                <div className='h-[85%] w-[100%] mt-5 overflow-x-auto'>
                    <table className='min-w-full table-auto border-2 border-bgGreen'>
                        <thead>
                            <tr className='sticky top-0'>
                                <th><SmallCheckBox
                                    checked={selectAll}
                                    onChange={() => handleCheckboxChange('selectAll')}
                                /></th>
                                <th>Emp Code</th>
                                <th>Name</th>
                                <th>Date</th>
                                <th>Check In Time</th>
                                <th>Reason</th>
                                <th>Status</th>
                                <th>Reporting Person</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                searchList.map((each) => (
                                    <tr key={each._id}>
                                        <td className='max-w-[5px] p-0'><SmallCheckBox checked={selectedIds.includes(each._id)} onChange={() => handleCheckboxChange(each._id)} /></td>
                                        <td className='px-1 min-w-[100px] max-w-[200px] whitespace-normal'>{each.id}</td>
                                        <td className='px-1 min-w-[120px] max-w-[200px] whitespace-normal'>{each.name}</td>
                                        <td className='px-1 min-w-[100px] max-w-[200px] whitespace-normal'>{each.date}</td>
                                        <td className='px-1 min-w-[100px] max-w-[200px] whitespace-normal'>{each.time}</td>
                                        <td className='px-1 min-w-[200px] max-w-[200px] whitespace-normal'>{each.reason}</td>
                                        <td className={`px-1 min-w-[120px] max-w-[200px] whitespace-normal font-bold 
                                            ${each.status.toUpperCase() === "PENDING" ? "text-txtLYellow" : ""}
                                            ${each.status.toUpperCase() === "PERMITTED" ? "text-txtLGreen" : ""}
                                            ${each.status.toUpperCase() === "DENIED" ? "text-txtLRed" : ""}`}>{each.status.toUpperCase()}</td>
                                        <td className='px-1 min-w-[150px] max-w-[200px] whitespace-normal'>{each.reportingperson}</td>
                                        <td className='px-1 py-2 min-w-[100px] max-w-[100px] whitespace-normal'><ActionBtnsForAttendance formId={each._id} /></td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default ManageAttendanceRequest;
