import React from 'react'

const MainOptions = ({ background, boxName, value, icon }) => {
    return (
        <>
            <div id='parentBG' className={`h-[clamp(90px,15vw,120px)] md:w-[30%] flex justify-end rounded-lg shadow-[2px_2px_10px_-1px_rgba(0,0,0,0.33)] ${background} bg-scroll group`}>
                <div className='h-full w-[95%] bg-white rounded-e-lg rounded-s-lg group-hover:w-[92%] transition-2 cursor-pointer flex'>
                    <div className='w-[70%] h-full p-3 sm:p-5 text-deepLightBlack font-mono font-medium'>
                        <p className='text-[clamp(16px,2.5vw,20px)]'>{boxName}</p>
                        <p className='text-[clamp(20px,3vw,25px)] mt-2 sm:mt-3'>{value}</p>
                    </div>
                    <div className='min-w-[30%] h-full grid place-content-center'>
                        <span className='text-[clamp(35px,5vw,50px)] text-grey'>{icon}</span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MainOptions