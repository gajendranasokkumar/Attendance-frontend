import React from 'react'

const CheckOutBtn = ({ onClick }) => {
    return (
        <button onClick={onClick} className='h-[40px] w-[120px] bg-white text-inputBorder border-inputBorder border-2 font-semibold rounded-md hover:text-lightBlack focus:text-lightBlack active:text-lightBlack hover:bg-inputBorder hover:border-inputBorder focus:bg-inputBorder active:bg-inputBorder flex justify-center items-center text-[20px] focus:outline-none'>
            Check Out
        </button>
    )
}

export default CheckOutBtn