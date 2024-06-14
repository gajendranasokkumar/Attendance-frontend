import React from 'react'
import { TiTick } from "react-icons/ti";
import { HiX } from "react-icons/hi";
import axios from 'axios';
   

const ActionBtns = ({formId}) => {

  const updateStatus = async (currentStatus) =>{
    console.log("🚀 ~ updateStatus ~ formId:", formId)
    await axios.post("/updateleave",{formId, currentStatus})
    .then((res)=>{
      console.log("🚀 ~ .then ~ res:", res)
    })
    .catch((err)=>{
      console.log("🚀 ~ updateStatus ~ err:", err)
    })
  }

  return (
    <div className=' flex justify-evenly '>
        <button type='button' className='px-2 py-1 bg-lightGreen text-white rounded' onClick={()=>updateStatus("permitted")}><TiTick /></button>
        <button type='button' className='px-2 py-1 bg-txtLRed text-white rounded' onClick={()=>updateStatus("denied")}><HiX /></button>
    </div>
  )
}

export default ActionBtns