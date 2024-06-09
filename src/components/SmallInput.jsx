import React from 'react'


export const SmallInput = ({ type, placeholder }) => {
    return (
        <>
            <input className='input px-3 h-[35px] flex items-center w-[30%] focus:outline-2 focus:outline-bgGreen text-black group font-semibold z-0' type={type} placeholder={placeholder} />
        </>
    )
}


export const SmallDate = ({ placeholder }) => {
    return (
        <>
            <div className='relative z-0'>
                <p className='absolute left-2 top-[-15px] bg-white px-2 text-inputBorder font-semibold group-focus-within:bg-bgGreen group-focus-within:text-white rounded-2xl text-sm'>{placeholder}</p>
                <input className='input px-3 h-[35px] w-[100%] focus:outline-2 focus:outline-bgGreen text-black group font-semibold' type='date' />
            </div>
        </>
    )
}

export const SmallCheckBox = () => {
    return (
        <input type="checkbox" className='h-4 w-4' />
    )
}