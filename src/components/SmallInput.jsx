import React from 'react'


export const SmallInput = ({ type, placeholder, name, state = '', setState = () => { } }) => {
    return (
        <>
            <input className='input px-3 h-[35px] flex items-center xs:w-full md:w-[100%] focus:outline-2 focus:outline-bgGreen text-black group font-semibold z-0'
                type={type}
                placeholder={placeholder}
                name={name}
                value={state[name]}
                onChange={(e) => { setState({ ...state, [name]: e.target.value }) }}
            />
        </>
    )
}


export const SmallDate = ({ placeholder, name, state = '', setState = () => { } }) => {
    return (
        <div className='relative z-0 w-full'>
            <p className='absolute left-2 top-[-15px] bg-white px-2 text-inputBorder font-semibold group-focus-within:bg-bgGreen group-focus-within:text-white rounded-2xl text-[clamp(0.7rem,4vw,1rem)]'>{placeholder}</p>
            <input 
                className='input px-3 h-[35px] w-[100%] focus:outline-2 focus:outline-bgGreen text-black group font-semibold' 
                type='date' 
                value={state[name]} 
                onChange={(e) => setState({ ...state, [name]: e.target.value })} 
            />
        </div>
    )
}

export const SmallTime = ({ placeholder, name, state = '', setState = () => { } }) => {
    return (
        <>
            <div className='relative z-0'>
                <p className='absolute left-2 top-[-15px] bg-white px-2 text-inputBorder font-semibold group-focus-within:bg-bgGreen group-focus-within:text-white rounded-2xl text-sm'>{placeholder}</p>
                <input className='input px-3 h-[35px] w-[100%] focus:outline-2 focus:outline-bgGreen text-black group font-semibold' type='time' value={state[name]} onChange={(e) => setState({ ...state, [name]: e.target.value })} />
            </div>
        </>
    )
}

export const SmallCheckBox = ({ checked, onChange }) => {
    return (
        <input 
            type="checkbox" 
            className='h-4 w-4' 
            checked={checked} 
            onChange={onChange} 
        />
    );
}
