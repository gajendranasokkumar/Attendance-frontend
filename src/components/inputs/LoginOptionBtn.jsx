import React from 'react'
import { TiTick } from "react-icons/ti";


const LoginOptionBtn = ({ icon, person, state, setState }) => {

    
    return (
        <>
            <label className='relative'>
                <input type="radio" name="options" className='absolute opacity-0 w-0 h-0 peer' onChange={() => setState({ ...state, des: person })}/>
                <p className='absolute top-[-13px] right-6 text-2xl border-inputBorder border-2 bg-white rounded-full text-inputBorder peer-checked:border-bgGreen peer-checked:text-white peer-checked:bg-bgGreen'>
                    <TiTick />
                </p>
                <div className='h-[100px] w-[100px] bg-white text-inputBorder border-inputBorder border-2 shadow-lightBox mx-5 rounded-xl flex justify-center items-center flex-col  group focus-within:border-bgGreen focus-within:bg-white focus-within:text-white cursor-pointer peer-checked:border-bgGreen peer-checked:text-bgGreen'>
                    <span className='text-4xl '>
                        {icon}
                    </span>
                    <span className='text-lg '>
                        {person}
                    </span>
                </div>
            </label>

        </>
    )
}

export default LoginOptionBtn