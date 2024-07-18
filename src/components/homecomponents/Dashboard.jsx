// import React, { useState } from 'react';
// import { SearchBar, EntryBox, PersonDetails, WorkingHours, AttendanceCalendar } from '../index';
// import { CiSearch } from 'react-icons/ci';



// const Dashboard = () => {
//     const [selectedMonth, setSelectedMonth] = useState('');

//     return (
//         <>
//             <div className='h-[92vh] w-[100%] bg-white lg:rounded-tl-[50px] px-5 overflow-y-auto pb-10'>
//                 <SearchBar placeholder={"Search Employee"} icon={<CiSearch className='h-[20px] w-[20px]' />} />
//                 <div className='w-[100%]  mt-8 flex gap-4 flex-wrap justify-center pb-5 mb-5'>
//                     {/* <EntryBox /> */}
//                     {/* <div className='w-full h-full flex md:gap-5 flex-wrap my-5'>
//                         <PersonDetails />
//                     </div> */}
//                     <div className='flex items-center'>
//                         <p className='text-inputBorder text-lg'>Select the month : </p>
//                         <input
//                             className='ml-5 input px-3 h-[35px] flex items-center  focus:outline-2 focus:outline-bgGreen text-black group font-semibold z-0 xs:text-xs md:text-lg'
//                             type="month"
//                             value={selectedMonth}
//                             onChange={(e) => setSelectedMonth(e.target.value)}
//                         />  
//                     </div>
//                     <div className=' xs:w-[100%] md:w-[100%] flex gap-5 xs:flex-wrap md:flex-nowrap'>
//                         {
//                             selectedMonth ?
//                                 <>
//                                     <div className=' xs:w-[100%] md:w-[50%] border-t-4 border-txtLBlue bg-white h-fit py-5 rounded shadow-goodShadow flex flex-col justify-center items-center px-5 xs:mt-5 md:mt-5 my-5'>
//                                         <WorkingHours key={1} id={'p215'} month={selectedMonth} />
//                                     </div>
//                                     <div className=' xs:w-[100%] md:w-[50%] border-t-4 border-txtLBlue bg-white h-fit py-5 rounded shadow-goodShadow flex flex-col justify-center items-center px-5 xs:mt-5 md:mt-5 my-5'>
//                                         <AttendanceCalendar key={2} month={selectedMonth} />
//                                     </div>
//                                 </>
//                                 : ""
//                         }
//                     </div>
//                 </div>
//             </div>
//         </>
//     )
// }

// export default Dashboard


import React, { useState } from 'react';
import { SearchBar, EntryBox, PersonDetails, WorkingHours, AttendanceCalendar } from '../index';
import { CiSearch } from 'react-icons/ci';

const Dashboard = () => {
    const [selectedMonth, setSelectedMonth] = useState('');

    return (
        <>
            <div className='h-[92vh] w-[100%] bg-white lg:rounded-tl-[50px] px-5 overflow-y-auto pb-10'>
                <SearchBar placeholder={"Search Employee"} icon={<CiSearch className='h-[20px] w-[20px]' />} />
                <div className='w-[100%] mt-8 flex gap-4 flex-wrap justify-center pb-5 mb-5'>
                    <div className='flex items-center'>
                        <p className='text-inputBorder text-lg'>Select the month : </p>
                        <input
                            className='ml-5 input px-3 h-[35px] flex items-center focus:outline-2 focus:outline-bgGreen text-black group font-semibold z-0 xs:text-xs md:text-lg'
                            type="month"
                            value={selectedMonth}
                            onChange={(e) => setSelectedMonth(e.target.value)}
                        />
                    </div>
                    <div className='xs:w-[100%] md:w-[100%] flex gap-5 xs:flex-wrap md:flex-nowrap'>
                        {selectedMonth && (
                            <>
                                <div className='xs:w-[100%] md:w-[50%] border-t-4 border-txtLBlue bg-white h-fit py-5 rounded shadow-goodShadow flex flex-col justify-center items-center px-5 xs:mt-5 md:mt-5 my-5'>
                                    <WorkingHours key={1} id={'p215'} month={selectedMonth} />
                                </div>
                                <div className='xs:w-[100%] md:w-[50%] border-t-4 border-txtLBlue bg-white h-fit py-5 rounded shadow-goodShadow flex flex-col justify-center items-center px-5 xs:mt-5 md:mt-5 my-5'>
                                    <AttendanceCalendar key={2} month={selectedMonth} />
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Dashboard;
