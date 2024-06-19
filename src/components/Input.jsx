import React from 'react'

const Input = ({ type, placeholder, name, state = '', setState = ()=>{}, readonly = false }) => {

    return (
        <>
            <div className='relative h-[45px] flex justify-center group mb-8'>
                <p className='absolute left-7 top-[-15px] bg-white px-2 text-inputBorder font-semibold group-focus-within:bg-bgGreen group-focus-within:text-white rounded-2xl'>{placeholder}</p>
                <input className='input px-3 h-[50px] w-[100%] focus:outline-2 focus:outline-bgGreen text-black group font-semibold'
                    type={type}
                    name={name}
                    value={state[name]}
                    readOnly={readonly}
                    onChange={(e) => { setState({ ...state, [name]: e.target.value }) }}
                />
            </div>
        </>
    )
}

export default Input