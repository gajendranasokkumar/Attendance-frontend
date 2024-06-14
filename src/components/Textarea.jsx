import React from 'react'

const Textarea = ({placeholder, name, state, setState}) => {
    return (
        <>
            <div className='relative h-[150px] flex justify-center group mb-8'>
                <p className='absolute left-6 top-[-15px] bg-white px-2 text-inputBorder font-semibold group-focus-within:bg-bgGreen group-focus-within:text-white rounded-2xl'>{placeholder}</p>
                <textarea className='input p-3 min-h-[150px] w-[100%] focus:outline-2 focus:outline-bgGreen text-black group font-semibold' value={state[name]} onChange={(e)=>setState({...state, [name]: e.target.value})} />
            </div>
        </>
    )
}

export default Textarea