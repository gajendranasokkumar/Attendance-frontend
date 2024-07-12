import React from 'react'

const SubmitButton = ({name = "Submit", click = ()=> {}}) => {
    return (
        <button className='h-[40px] w-[150px] bg-white text-bgGreen border-bgGreen border-2 font-semibold rounded-md hover:text-white focus:text-white active:text-white hover:bg-bgGreen focus:bg-bgGreen active:bg-bgGreen flex justify-center items-center text-[20px] focus:outline-none'
                onClick={click}>
            {name}
        </button>
    )
}

// SubmitButton.defaultProps = {name : "Submit"}

export default SubmitButton