import React from 'react'
import SearchBar from './SearchBar'
import { CiSearch } from "react-icons/ci";

const Content = () => {
    return (
        <>
            <div className='h-[92vh] w-[100%] bg-white rounded-tl-[50px]'>
                <SearchBar placeholder={"Search Employee"} icon={<CiSearch className='h-[20px] w-[20px]' />} />
            </div>
        </>
    )
}

export default Content