import React from 'react'

const Date = ({placeholder, name, state='', setState=()=>{}, readonly = false}) => {
    return (
        <>
            <div className='relative h-[45px] flex justify-center group mb-8 w-[100%]'>
                <p className='absolute left-5 top-[-15px] bg-white px-2 text-inputBorder font-semibold group-focus-within:bg-bgGreen group-focus-within:text-white rounded-2xl'>{placeholder}</p>
                <input readOnly={readonly} className='input px-3 h-[50px] w-[100%] focus:outline-2 focus:outline-bgGreen text-black group font-semibold' type='date' value={state[name]} onChange={(e)=>setState({...state, [name]: e.target.value})}/>
            </div>
        </>
    )
}

export default Date