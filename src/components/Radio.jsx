import React from 'react'
import { TiTick } from "react-icons/ti";


const Radio = ({option1, option2, placeholder}) => {
    return (
        <>
            <div className='relative h-[45px] flex justify-center mb-8'>
                <p className='absolute left-60 top-[-15px] bg-white px-2 text-inputBorder font-semibold rounded-2xl'>{placeholder}</p>
                <div className='input w-[50%] h-[50px] flex items-center justify-end'>
                    <label className="control control-radio ml-40 w-[40%]">
                        <input type="radio" name={placeholder} value={option1} />
                        {option1}
                        <div className="control_indicator flex justify-center items-center text-white"><TiTick /></div>
                    </label>
                    <label className="control control-radio ml-8 w-[40%]">
                        <input type="radio" name={placeholder} value={option2} />
                        {option2}
                        <div className="control_indicator flex justify-center items-center text-white"><TiTick /></div>
                    </label>
                </div>
            </div>
        </>
    )
}

export default Radio