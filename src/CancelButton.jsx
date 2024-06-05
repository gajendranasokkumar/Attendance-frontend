import React from 'react'

const CancelButton = () => {
    return (
        <button className='  border-2 border-inputBorder h-[40px] w-[150px] bg-white text-lightBlack font-semibold rounded-md hover:text-black focus:text-black active:text-black hover:bg-inputBorder focus:bg-inputBorder active:bg-inputBorder flex justify-center items-center text-[20px] focus:outline-none'>
            Clear
        </button>
    )
}

export default CancelButton