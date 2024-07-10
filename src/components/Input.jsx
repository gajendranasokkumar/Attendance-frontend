import React from 'react';

const Input = ({ type, placeholder, name, state = {}, setState = () => { }, readonly = false }) => {

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
        }
    };

    return (
        <div className='relative h-[45px] flex justify-center group xs:mb-5 md:mb-8 '>
            <p className='absolute left-7 top-[-15px] bg-white px-2 text-inputBorder font-semibold group-focus-within:bg-bgGreen group-focus-within:text-white rounded-2xl text-[clamp(0.7rem,4vw,1rem)]'>{placeholder}</p>
            <input
                className='input px-3 h-[clamp(2.5rem,4vw,3rem)] w-[100%] focus:outline-2 focus:outline-bgGreen text-black group font-semibold text-[clamp(0.7rem,4vw,1rem)]'
                type={type}
                name={name}
                autoFocus
                value={state[name] || ''}
                readOnly={readonly}
                onChange={(e) => { setState({ ...state, [name]: e.target.value }) }}
                onKeyDown={handleKeyDown}
            />
        </div>
    );
};

export default Input;
