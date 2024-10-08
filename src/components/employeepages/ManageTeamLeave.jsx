import React, { useContext, useEffect, useState } from 'react';
import { SmallInput, SmallDate, SmallCheckBox, ActionBtns } from '../index';
import axios from 'axios';
import api from '../../utils/api';
import { useNavigate } from 'react-router-dom';
import { VscDebugRestart } from 'react-icons/vsc';
import { AuthContext } from '../../context/AuthContext';
import toast from 'react-hot-toast';



const ManageTeamLeave = () => {
    const [leaveList, setLeaveList] = useState([]);
    const [searchList, setSearchList] = useState([]);
    const [searchQuery, setSearchQuery] = useState({
        fromdate: '',
        todate: '',
        content: ''
    });
    const [selectedIds, setSelectedIds] = useState([]);
    const [selectAll, setSelectAll] = useState(false);

    const { userData } = useContext(AuthContext)

    const { setLoading, showLoader } = useContext(AuthContext)

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) navigate('/');

        const fetchList = async () => {
            setLoading(true)
            await api.get("/leavelist")
                .then((response) => {
                    let result = response.data.filter(one => {
                        if (one.status.toUpperCase() === "PENDING" && userData?.employeelist.includes(one.id))
                            return one
                    });
                    setLeaveList(result);
                    setSearchList(result);
                    setLoading(false)
                    console.log(result)
                })
                .catch((error) => {
                    console.log("🚀 ~ useEffect ~ error:", error);
                    toast.error('An error occured :(')
                });
        };

        fetchList();
    }, [navigate]);

    const updateStatus = async (currentStatus) => {
        const toastId = toast.loading("Loading...Please wait!")
        try {
            setLoading(true)
            await Promise.all(selectedIds.map(formId =>
                api.post("/updateleave", { formId, currentStatus })
            ));
            setLoading(false)
            navigate(0);
            toast.success('Successfully Updated!', { id: toastId })
        } catch (err) {
            console.log("🚀 ~ updateStatus ~ err:", err);
            toast.error('Couldn\'t Update!', { id: toastId })
        }
    };

    const showFilteredResult = () => {
        setSearchList(
            leaveList.filter((one) => {
                const matchesFromDate = !searchQuery.fromdate || new Date(one.fromdate) >= new Date(searchQuery.fromdate);
                const matchesToDate = !searchQuery.todate || new Date(one.todate) <= new Date(searchQuery.todate);
                const matchesContent = !searchQuery.content ||
                    one.name.toLowerCase().includes(searchQuery.content.toLowerCase()) ||
                    one.leavetype.toLowerCase().includes(searchQuery.content.toLowerCase()) ||
                    one.reason.toLowerCase().includes(searchQuery.content.toLowerCase()) ||
                    one.status.toLowerCase().includes(searchQuery.content.toLowerCase()) ||
                    one.id.toLowerCase().includes(searchQuery.content.toLowerCase()) ||
                    one.reportingperson.toLowerCase().includes(searchQuery.content.toLowerCase());

                return matchesFromDate && matchesToDate && matchesContent;
            })
        );
    };

    const clearFilter = () => {
        setSearchList(leaveList);
        setSearchQuery({
            fromdate: '',
            todate: '',
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
            <div className='h-[92vh] w-[84vw] bg-white lg:rounded-tl-[50px] px-5 overflow-y-auto pb-10'>
                <div className='h-[10%] w-[100%] mt-8 border-l-4 border-l-bgGreen flex justify-center'>
                    <div className='w-[80%] px-5 flex items-center gap-3 h-full'>
                        <SmallDate placeholder={"From Date"} name={'fromdate'} state={searchQuery} setState={setSearchQuery} />
                        <SmallDate placeholder={"To Date"} name={'todate'} state={searchQuery} setState={setSearchQuery} />
                        <SmallInput type={"text"} placeholder={"Search for anyone"} name={'content'} state={searchQuery} setState={setSearchQuery} />
                        <button type='button' className='px-3 py-1 bg-bgLBlue rounded-md font-bold text-txtLBlue border-2 border-txtLBlue' onClick={showFilteredResult}>Search</button>
                        <button type='button' className='bg-shadeWhite px-1 py-1 rounded-md font-bold text-xl' onClick={clearFilter}><VscDebugRestart /></button>
                    </div>
                    <div className='w-[20%] grid place-content-center gap-3 grid-flow-col'>
                        <button type='button' className='px-3 py-1 bg-bgLGreen rounded-md font-bold text-txtLGreen border-2 border-txtLGreen' onClick={() => updateStatus('PERMITTED')}>Approve</button>
                        <button type='button' className='px-3 py-1 bg-bgLRed rounded-md font-semibold text-txtLRed border-2 border-x-txtLRed' onClick={() => updateStatus('DENIED')}>Reject</button>
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
                                <th>Name</th>
                                <th>From Date</th>
                                <th>To Date</th>
                                <th>Leave Type</th>
                                <th>Reason</th>
                                <th>Leave Permitted</th>
                                <th>Leave Taken Already</th>
                                <th>Leave Status</th>
                                <th>Leave Paid</th>
                                <th>Is Half Leave</th>
                                <th>Emp Code</th>
                                <th>Approval Date</th>
                                <th>Reporting Person</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                searchList.map((each) => (
                                    <tr key={each._id}>
                                        <td className='max-w-[5px] p-0'><SmallCheckBox checked={selectedIds.includes(each._id)} onChange={() => handleCheckboxChange(each._id)} /></td>
                                        <td className='px-1 min-w-[120px] max-w-[200px] whitespace-normal'>{each.name}</td>
                                        <td className='px-1 min-w-[100px] max-w-[200px] whitespace-normal'>{each.fromdate}</td>
                                        <td className='px-1 min-w-[100px] max-w-[200px] whitespace-normal'>{each.todate}</td>
                                        <td className='px-1 min-w-[100px] max-w-[200px] whitespace-normal'>{each.leavetype}</td>
                                        <td className='px-1 min-w-[200px] max-w-[200px] whitespace-normal'>{each.reason}</td>
                                        <td className='px-1 min-w-[200px] max-w-[200px] whitespace-normal font-semibold'>{each.leavepermitted || "0"} Days</td>
                                        <td className='px-1 min-w-[200px] max-w-[200px] whitespace-normal font-semibold'>{each.leavetaken || "0"} Days</td>
                                        <td className={`px-1 min-w-[120px] max-w-[200px] whitespace-normal font-bold 
                                            ${each.status.toUpperCase() === "PENDING" ? "text-txtLYellow" : ""}
                                            ${each.status.toUpperCase() === "PERMITTED" ? "text-txtLGreen" : ""}
                                            ${each.status.toUpperCase() === "DENIED" ? "text-txtLRed" : ""}`}>{each.status.toUpperCase()}</td>
                                        <td className='px-1 min-w-[100px] max-w-[200px] whitespace-normal'>{each.paidleave}</td>
                                        <td className='px-1 min-w-[100px] max-w-[200px] whitespace-normal'>{each.halfleave}</td>
                                        <td className='px-1 min-w-[100px] max-w-[200px] whitespace-normal'>{each.id}</td>
                                        <td className='px-1 min-w-[150px] max-w-[200px] whitespace-normal'>{each.approvaldate}</td>
                                        <td className='px-1 min-w-[150px] max-w-[200px] whitespace-normal'>{each.reportingperson}</td>
                                        <td className='px-1 py-2 min-w-[100px] max-w-[100px] whitespace-normal'><ActionBtns formId={each._id} /></td>
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

export default ManageTeamLeave;
