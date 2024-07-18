import React from 'react'
import { CiSearch } from "react-icons/ci";
import { SearchBar, EntryBox, PersonDetails } from '../index';



const EmpContent = () => {
    return (
        <>
            <div className='h-[92vh] w-[100%] bg-white lg:rounded-tl-[50px] px-5 overflow-y-auto pb-10'>
                <SearchBar placeholder={"Search Employee"} icon={<CiSearch className='h-[20px] w-[20px]' />} />
                <div className=' w-[100%]  mt-8 flex gap-4 flex-wrap justify-center pb-5 mb-5'>
                    <EntryBox />
                    {/* <div className='w-full h-full flex md:gap-5 flex-wrap my-5'>
                        <PersonDetails />
                    </div> */}
                </div>
            </div>
        </>
    )
}

export default EmpContent