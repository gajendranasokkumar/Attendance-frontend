import React, { useEffect, useState } from 'react'
import { SmallInput, SmallDate, SmallCheckBox } from './SmallInput'
import ActionBtns from './ActionBtns'
import axios from 'axios';

const CurrentLeavePage = () => {

    const [leaveList, setLeaveList] = useState([]);

    useEffect(() => {
        const fetchList = async () => {
            await axios.get("http://localhost:3000/leavelist")
                .then((response) => {
                    console.log("🚀 ~ .then ~ respose:", response.data)
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    let result = response.data.filter(one => {
                        const specificDate = new Date(one.todate);
                        specificDate.setHours(0, 0, 0, 0);
                        if (today < specificDate){
                            return one;
                        }
                    })
                    setLeaveList(result)
                })
                .catch((error) => {
                    console.log("🚀 ~ useEffect ~ error:", error)
                })
        }

        fetchList();

    }, [])

    return (
        <>
            <div className='h-[92vh] w-[84vw] bg-white lg:rounded-tl-[50px] px-5 overflow-y-auto pb-10'>
                <h1 className='text-txtLBlue text-3xl text-center mb-10 mt-10 font-bold font-sans'>Current Leave</h1>
                <div className='h-[100%] w-[100%] mt-10 overflow-x-auto'>
                    <table className='min-w-full table-auto border-2 border-bgGreen'>
                        <thead>
                            <tr className='sticky top-0'>
                                <th>Emp Code</th>
                                <th>Name</th>
                                <th>From Date</th>
                                <th>To Date</th>
                                <th>Leave Type</th>
                                <th>Reason</th>
                                <th>Leave Status</th>
                                <th>Leave Paid</th>
                                <th>Is Half Leave</th>
                                <th>Reporting Person</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                leaveList.map((each) => (
                                    <tr key={each._id}>
                                        <td className='px-1 min-w-[100px] max-w-[200px] whitespace-normal'>{each.id}</td>
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
                                        <td className='px-1 min-w-[150px] max-w-[200px] whitespace-normal'>{each.reportingperson}</td>
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

export default CurrentLeavePage
