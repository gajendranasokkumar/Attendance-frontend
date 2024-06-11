import React from 'react'
import { TiTick } from "react-icons/ti";
import { HiX } from "react-icons/hi";
   

const ActionBtns = () => {
  return (
    <div className=' flex justify-evenly '>
        <button type='button' className='px-2 py-1 bg-lightGreen text-white rounded'><TiTick /></button>
        <button type='button' className='px-2 py-1 bg-txtLRed text-white rounded'><HiX /></button>
    </div>
  )
}

export default ActionBtns