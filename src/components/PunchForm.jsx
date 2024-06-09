import React from 'react'
import setting from "../assets/setting.png"
import CheckINbtn from '../components/CheckINbtn';
import CheckOutBtn from '../components/CheckOutBtn';
import Input from './Input';

const PunchForm = () => {
    return (
        <>
            <div className='w-[100vw] h-[100vh] bg-white flex'>
                <div className='h-full w-[100%] bg-loginBack grid place-items-center relative'>
                        <h2 className='z-10 top-16 absolute text-[100px] px-16 py-0 text-white shadow-allBox font-[600] rounded'>PUNCH</h2>
                        <img src={setting} className='h-[250px] w-[250px] absolute top-10 right-96  grayscale' />
                    <div className='absolute bg-white w-[40%] h-[50%] rounded flex flex-col justify-center'>
                        <div className='w-[100%]  px-14'>
                            <Input type={"text"} placeholder={"Punch ID"} />
                        </div>
                        <div className='w-[100%] px-14 flex justify-end gap-5'>  
                            <CheckOutBtn />
                            <CheckINbtn />
                        </div>
                        <img src={setting} className='h-[200px] w-[200px]  absolute bottom-[-50px] left-[-100px] animate-spin-slow grayscale' />
                    </div>
                </div>
            </div>
        </>
    )
}

export default PunchForm