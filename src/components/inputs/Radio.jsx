import React from 'react'
import { TiTick } from "react-icons/ti";


const Radio = ({option1, option2, placeholder, name, state, setState }) => {
    return (
        <>
            <div className='relative h-[45px] flex justify-center mb-8'>
                <p className='absolute left-6 top-[-15px] bg-white px-2 text-inputBorder font-semibold rounded-2xl text-[clamp(0.7rem,4vw,1rem)]'>{placeholder}</p>
                <div className='input w-[100%] h-[50px] flex items-center xs:justify-center md:justify-end'>
                    <label className="control control-radio xs:ml-20 md:ml-40 w-[50%] text-[clamp(0.7rem,4vw,1rem)]">
                        <input type="radio" name={placeholder} value={option1} onChange={() => setState({ ...state, [name]: option1 })}/>
                        {option1}
                        <div className="control_indicator flex justify-center items-center text-white"><TiTick /></div>
                    </label>
                    <label className="control control-radio xs:ml-2 md:ml-8 w-[50%] text-[clamp(0.7rem,4vw,1rem)]">
                        <input type="radio" name={placeholder} value={option2} onChange={() => setState({ ...state, [name]: option2 })}/>
                        {option2}
                        <div className="control_indicator flex justify-center items-center text-white"><TiTick /></div>
                    </label>
                </div>
            </div>
        </>
    )
}

export default Radio