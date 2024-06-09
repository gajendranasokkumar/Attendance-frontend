import React, { useEffect } from 'react'

const MainOptions = ({ background, boxName, value, icon }) => {

    return (
        <>
            <div id='parentBG' className={`h-[120px] w-[30%] flex justify-end rounded-lg shadow-[2px_2px_10px_-1px_rgba(0,0,0,0.33)] ${background} bg-scroll group`}>
                <div className='h-full w-[95%] bg-white rounded-e-lg rounded-s-lg group-hover:w-[92%] transition-2 cursor-pointer flex'>
                    <div className='w-[70%] h-full p-5 text-deepLightBlack font-mono font-medium'>
                        <p className='text-[20px]'>{boxName}</p>
                        <p className='text-[25px] mt-3'>{value}</p>
                    </div>
                    <div className='min-w-[30%] h-full grid place-content-center'>
                        <span className='text-[50px] text-grey'>{icon}</span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MainOptions