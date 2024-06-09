import React from 'react'

const EntryBox = () => {
    return (
        <div className='xs:w-[100%] lg:w-[45%] border-l-4 border-l-grey bg-shadeWhite h-[50%] rounded shadow-goodShadow flex flex-col justify-center items-center px-5'>
            <div className='w-[80%] h-[60px] flex rounded-lg'>
                <div className='w-[50%] h-full rounded-s-lg bg-txtLBlue text-white grid place-content-center text-2xl'><p>1 - June</p></div>
                <div className='w-[50%] h-full rounded-e-lg bg-bgLBlue border-2 border-txtLBlue font-bold text-txtLBlue grid place-content-center text-2xl'>Monday</div>
            </div>
            <div className='font-mono text-4xl my-5 text-txtLBlue font-bold'>
                29:08:04
            </div>
            <div className='flex gap-5'>
                <button type='button' className='bg-txtLBlue w-[150px] h-[50px] text-white rounded-md text-xl border-2 border-white'>Check IN</button>
                <button type='button' className='bg-txtLBlue w-[150px] h-[50px] text-white rounded-md text-xl border-2 border-white'>Check OUT</button>
            </div>
            <div className='flex gap-16 mt-5 font-semibold text-grey'>
                <div>
                    <p>Check IN Time</p>
                    <p>00 : 00 : 00</p>
                </div>
                <div className='text-end'>
                    <p>Remaining Time</p>
                    <p>00 : 00 : 00</p>
                </div>
            </div>
        </div>
    )
}

export default EntryBox