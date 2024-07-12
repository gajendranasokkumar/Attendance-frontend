import React from 'react'

const LoginButton = ({ handleSubmit }) => {
    return (
        <button className='h-[40px] w-[100px] bg-white text-inputBorder border-inputBorder border-2 font-semibold rounded-md hover:text-white focus:text-white active:text-white hover:bg-bgGreen hover:border-bgGreen focus:bg-bgGreen active:bg-bgGreen flex justify-center items-center text-[20px] focus:outline-none'
            onClick={handleSubmit}>
            Login
        </button>
    )
}

export default LoginButton