import React, { useContext } from 'react'
import { TiTick } from "react-icons/ti";
import { HiX } from "react-icons/hi";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import api from '../../utils/api'
import { AuthContext } from '../../context/AuthContext';


const ActionBtns = ({ formId }) => {

  const { setLoading, showLoader } = useContext(AuthContext)

  const navigate = useNavigate();

  const updateStatus = async (currentStatus) => {
    setLoading(true)
    console.log("🚀 ~ updateStatus ~ formId:", formId, currentStatus)
    await api.post("/updateleave", { formId, currentStatus })
      .then((res) => {
        console.log("🚀 ~ .then ~ res:", res)
        showLoader(1000)
        navigate(0);
      })
      .catch((err) => {
        console.log("🚀 ~ updateStatus ~ err:", err)
      })
  }

  return (
    <div className=' flex justify-evenly '>
      <button type='button' className='px-2 py-1 bg-lightGreen text-white rounded' onClick={() => updateStatus("permitted")}><TiTick /></button>
      <button type='button' className='px-2 py-1 bg-txtLRed text-white rounded' onClick={() => updateStatus("denied")}><HiX /></button>
    </div>
  )
}

export default ActionBtns