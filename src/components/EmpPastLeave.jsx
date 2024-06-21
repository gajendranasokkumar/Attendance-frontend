import React, { useContext, useEffect, useState } from 'react'
import { SmallInput, SmallDate, SmallCheckBox } from './SmallInput'
import ActionBtns from './ActionBtns'
import axios from 'axios';
import api from '../utils/api';
import { useNavigate } from 'react-router-dom';
import { VscDebugRestart } from "react-icons/vsc";
import { AuthContext } from '../context/AuthContext';


const EmpPastLeave = () => {
    const [leaveList, setLeaveList] = useState([]);
    const [searchList, setSearchList] = useState([]);
    const [searchQuery, setSearchQuery] = useState({
        fromdate: '',
        todate: '',
        content: ''
    })
    const navigate = useNavigate();
    const { userData } = useContext(AuthContext);


    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token)
            navigate('/');
        const fetchList = async () => {
            await api.get("/leavelist", { withCredentials: true })
                .then((response) => {
                    console.log("🚀 ~ .then ~ respose:", response.data)
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    let result = response.data.filter(one => {
                        const specificDate = new Date(one.todate);
                        specificDate.setHours(0, 0, 0, 0);
                        if (today > specificDate) {
                            return one;
                        }
                    })
                    setLeaveList(result)
                    setSearchList(result)
                })
                .catch((error) => {
                    console.log("🚀 ~ useEffect ~ error:", error)
                })
        }

        fetchList();

    }, [])


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
    }

    const clearFilter = () => {
        setSearchList(leaveList);
        setSearchQuery({
            fromdate: '',
            todate: '',
            content: ''
        })
    }



    return (
        <>
            <div className='h-[92vh] w-[84vw] bg-white lg:rounded-tl-[50px] px-5 overflow-y-hidden pb-10'>
                <div className='h-[10%] w-[100%] mt-8 border-l-4 border-l-bgGreen flex'>
                    <div className='w-[80%] px-5 flex items-center gap-3 h-full'>
                        <SmallDate placeholder={"From Date"} name={'fromdate'} state={searchQuery} setState={setSearchQuery} />
                        <SmallDate placeholder={"To Date"} name={'todate'} state={searchQuery} setState={setSearchQuery} />
                        <SmallInput type={"text"} placeholder={"Search for anyone"} name={'content'} state={searchQuery} setState={setSearchQuery} />
                        <button type='button' className='px-3 py-1 bg-bgLBlue rounded-md font-bold text-txtLBlue border-2 border-txtLBlue' onClick={showFilteredResult}>Search</button>
                        <button type='button' className='bg-shadeWhite px-1 py-1 rounded-md font-bold text-xl' onClick={clearFilter}><VscDebugRestart /></button>
                    </div>
                    {/* <div className='w-[20%] grid place-content-center gap-3 grid-flow-col'>
                        <button type='button' className='px-3 py-1 bg-bgLGreen rounded-md font-bold text-txtLGreen border-2 border-txtLGreen'>Approve</button>
                        <button type='button' className='px-3 py-1 bg-bgLRed rounded-md font-semibold text-txtLRed border-2 border-x-txtLRed'>Reject</button>
                    </div> */}
                </div>
                <div className='h-[85%] w-[100%] mt-5 overflow-x-auto'>
                    <table className='min-w-full table-auto border-2 border-bgGreen'>
                        <thead>
                            <tr className='sticky top-0'>
                                <th>Name</th>
                                <th>From Date</th>
                                <th>To Date</th>
                                <th>Leave Type</th>
                                <th>Reason</th>
                                <th>Leave Status</th>
                                <th>Leave Paid</th>
                                <th>Is Half Leave</th>
                                <th>Emp Code</th>
                                <th>Approval Date</th>
                                <th>Reporting Person</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                searchList.filter((one)=>one.id == userData?.id).map((each) => (
                                    <tr key={each._id}>
                                        <td className='px-1 min-w-[120px] max-w-[200px] whitespace-normal'>{each.name}</td>
                                        <td className='px-1 min-w-[100px] max-w-[200px] whitespace-normal'>{each.fromdate}</td>
                                        <td className='px-1 min-w-[100px] max-w-[200px] whitespace-normal'>{each.todate}</td>
                                        <td className='px-1 min-w-[100px] max-w-[200px] whitespace-normal'>{each.leavetype}</td>
                                        <td className='px-1 min-w-[200px] max-w-[200px] whitespace-normal'>{each.reason}</td>
                                        <td className={`px-1 min-w-[120px] max-w-[200px] whitespace-normal font-bold 
                                            ${each.status.toUpperCase() === "PENDING" ? "text-txtLYellow" : ""}
                                            ${each.status.toUpperCase() === "PERMITTED" ? "text-txtLGreen" : ""}
                                            ${each.status.toUpperCase() === "DENIED" ? "text-txtLRed" : ""}`}>{each.status.toUpperCase()}</td>
                                        <td className='px-1 min-w-[100px] max-w-[200px] whitespace-normal'>{each.paidleave}</td>
                                        <td className='px-1 min-w-[100px] max-w-[200px] whitespace-normal'>{each.halfleave}</td>
                                        <td className='px-1 min-w-[100px] max-w-[200px] whitespace-normal'>{each.id}</td>
                                        <td className='px-1 min-w-[150px] max-w-[200px] whitespace-normal'>{each.approvaldate}</td>
                                        <td className='px-1 min-w-[150px] max-w-[200px] whitespace-normal'>{each.reportingperson}</td>
                                    </tr>
                                ))
                            }
                            {/* <tr>
                                <td className='max-w-[5px] p-0'><SmallCheckBox /></td>
                                <td className='px-1 min-w-[120px] max-w-[200px] whitespace-normal'>Gajendran Asokkumar</td>
                                <td className='px-1 min-w-[100px] max-w-[200px] whitespace-normal'>29/08/2004</td>
                                <td className='px-1 min-w-[100px] max-w-[200px] whitespace-normal'>00/00/0000</td>
                                <td className='px-1 min-w-[100px] max-w-[200px] whitespace-normal'>Leave</td>
                                <td className='px-1 min-w-[200px] max-w-[200px] whitespace-normal'>Going to Native pona na varave matn hgvuyiu hiuh iuuhiuh</td>
                                <td className='px-1 min-w-[120px] max-w-[200px] whitespace-normal'>Pending</td>
                                <td className='px-1 min-w-[100px] max-w-[200px] whitespace-normal'>Paid</td>
                                <td className='px-1 min-w-[100px] max-w-[200px] whitespace-normal'>Yes</td>
                                <td className='px-1 min-w-[100px] max-w-[200px] whitespace-normal'>P215</td>
                                <td className='px-1 min-w-[150px] max-w-[200px] whitespace-normal'>09/06/2024</td>
                                <td className='px-1 min-w-[150px] max-w-[200px] whitespace-normal'>Usman</td>
                                <td className='px-1 min-w-[100px] max-w-[100px] whitespace-normal'><ActionBtns /></td>
                            </tr> */}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default EmpPastLeave
