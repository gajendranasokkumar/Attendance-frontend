import React from 'react'

const CancelButton = ({onClick}) => {
    return (
        <button onClick={onClick} className='  border-2 border-grey h-[40px] w-[150px] bg-white text-lightBlack font-semibold rounded-md hover:text-black focus:text-black active:text-black hover:bg-grey focus:bg-grey active:bg-grey flex justify-center items-center text-[20px] focus:outline-none'>
            Clear
        </button>
    )
}

export default CancelButton