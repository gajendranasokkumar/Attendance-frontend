import React from 'react'

const SearchBar = ({ placeholder, icon, value= "", onchange = ()=>{} }) => {
    return (
        <>
            <div className='flex input p-0 items-center pl-2 mx-auto mt-8 xs:w-[100%] lg:w-[60%] text-lightBlack'>
                {icon}
                <input type="text" className="w-[100%] h-[100%] css-input" placeholder={placeholder} value={value} onChange={onchange} />
            </div>
        </>
    )
}

export default SearchBar 