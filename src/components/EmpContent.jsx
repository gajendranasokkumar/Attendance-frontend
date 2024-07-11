import React from 'react'
import SearchBar from './SearchBar'
import { CiSearch } from "react-icons/ci";
import EntryBox from './EntryBox';
import PersonDetails from './PersonDetails';


const EmpContent = () => {
    return (
        <>
            <div className='h-[92vh] w-[100%] bg-white lg:rounded-tl-[50px] px-5 overflow-y-auto pb-10'>
                <SearchBar placeholder={"Search Employee"} icon={<CiSearch className='h-[20px] w-[20px]' />} />
                <div className='h-[100%] w-[100%]  mt-8 flex gap-4 flex-wrap justify-center pb-5 mb-5'>
                    <EntryBox />
                    <div className='w-full h-full flex md:gap-5 flex-wrap my-5'>
                        <PersonDetails />
                    </div>
                </div>
            </div>
        </>
    )
}

export default EmpContent