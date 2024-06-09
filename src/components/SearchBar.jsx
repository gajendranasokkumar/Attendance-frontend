import React from 'react'

const SearchBar = ({ placeholder, icon }) => {
    return (
        <>
            <div className='flex input p-0 items-center pl-2 mx-auto mt-8 xs:w-[80%] lg:w-[60%] text-lightBlack'>
                {icon}
                <input type="text" className="w-[100%] h-[100%] css-input" placeholder={placeholder} />
            </div>
        </>
    )
}

export default SearchBar 