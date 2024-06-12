import React from 'react'
import { RxCross2 } from "react-icons/rx";


export const Success = ({message}) => {
    const hideBar = () =>{
        const successBar = document.getElementById('successBar')
        successBar.classList.add('hidden')
    }

    setTimeout(hideBar, 2000);

  return (
    <div id='successBar' className='absolute right-10 bottom-10 z-50 w-[300px] h-[50px] bg-[#23C552] flex justify-between items-center px-5 text-white font-semibold text-xl'>
        {message}
    </div>
  )
}

export const Failure = ({message}) => {
    return (
      <div className='absolute right-10 bottom-10 z-50 w-[300px] h-[50px] bg-[#F84F31] flex justify-between items-center px-5 text-white font-semibold text-lg'>
          Failed
      </div>
    )
  }