import React from 'react'
import { SmallInput, SmallDate, SmallCheckBox } from './SmallInput'
import ActionBtns from './ActionBtns'

const LeaveList = () => {
    return (
        <>
            <div className='h-[92vh] w-[84vw] bg-white lg:rounded-tl-[50px] px-5 overflow-y-auto pb-10'>
                <div className='h-[10%] w-[100%] mt-8 border-l-4 border-l-bgGreen flex justify-center'>
                    <div className='w-[80%] px-5 flex items-center gap-3 h-full'>
                        <SmallDate placeholder={"From Date"} />
                        <SmallDate placeholder={"To Date"} />
                        <SmallInput type={"text"} placeholder={"Status"} />
                        <button type='button' className='px-3 py-1 bg-bgLBlue rounded-md font-bold text-txtLBlue border-2 border-txtLBlue'>Search</button>
                    </div>
                    <div className='w-[20%] grid place-content-center gap-3 grid-flow-col'>
                        <button type='button' className='px-3 py-1 bg-bgLGreen rounded-md font-bold text-txtLGreen border-2 border-txtLGreen'>Approve</button>
                        <button type='button' className='px-3 py-1 bg-bgLRed rounded-md font-semibold text-txtLRed border-2 border-x-txtLRed'>Reject</button>
                    </div>
                </div>
                <div className='h-[90%] w-[100%] mt-5 overflow-x-auto'>
                    <table className='min-w-full table-auto border-2 border-bgGreen'>
                        <thead>
                            <tr>
                                <th><SmallCheckBox /></th>
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
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className='max-w-[5px] p-0'><SmallCheckBox /></td>
                                <td className='px-1 min-w-[120px] max-w-[200px] whitespace-normal'>Gajendran</td>
                                <td className='px-1 min-w-[100px] max-w-[200px] whitespace-normal'>29/08/2004</td>
                                <td className='px-1 min-w-[100px] max-w-[200px] whitespace-normal'>00/00/0000</td>
                                <td className='px-1 min-w-[100px] max-w-[200px] whitespace-normal'>Leave</td>
                                <td className='px-1 min-w-[200px] max-w-[200px] whitespace-normal'>Going to Native hgvuyiu hiuh iuuhiuh</td>
                                <td className='px-1 min-w-[120px] max-w-[200px] whitespace-normal'>Pending</td>
                                <td className='px-1 min-w-[100px] max-w-[200px] whitespace-normal'>Paid</td>
                                <td className='px-1 min-w-[100px] max-w-[200px] whitespace-normal'>Yes</td>
                                <td className='px-1 min-w-[100px] max-w-[200px] whitespace-normal'>P215</td>
                                <td className='px-1 min-w-[150px] max-w-[200px] whitespace-normal'>09/06/2024</td>
                                <td className='px-1 min-w-[150px] max-w-[200px] whitespace-normal'>Usman</td>
                                <td className='px-1 min-w-[100px] max-w-[100px] whitespace-normal'><ActionBtns /></td>
                            </tr>
                            <tr>
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
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default LeaveList
