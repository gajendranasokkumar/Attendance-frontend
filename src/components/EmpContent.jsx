import React from 'react'
import SearchBar from './SearchBar'
import { CiSearch } from "react-icons/ci";
import EntryBox from './EntryBox';


const EmpContent = () => {
    return (
        <>
            <div className='h-[92vh] w-[100%] bg-white lg:rounded-tl-[50px] px-5 overflow-y-auto pb-10'>
                <SearchBar placeholder={"Search Employee"} icon={<CiSearch className='h-[20px] w-[20px]' />} />
                <div className='h-[100%] w-[100%] px-5 mt-8 flex gap-4 flex-wrap justify-center'>
                    <EntryBox />
                    {/* <div className='xs:w-[100%] lg:w-[45%] bg-bgGreen h-[50%]'></div> */}
                </div>
            </div>
        </>
    )
}

export default EmpContent