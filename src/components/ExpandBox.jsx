import React, { useEffect } from 'react'
import { RiArrowDropDownLine } from "react-icons/ri";


const ExpandBox = ({ number, name, icon }) => {

    useEffect(() => {
        const toggleButton = document.getElementById(`toggleButton${number}`);
        const box = document.getElementById(`box${number}`);
        const arrow = document.getElementById(`arrow${number}`)

        const toggleBox = () => {
            toggleButton.classList.toggle('dropDownButton')
            box.classList.toggle('hidden');
            arrow.classList.toggle('rotate')
        };

        if (toggleButton && box) {
            toggleButton.addEventListener('click', toggleBox);
        }

        return () => {
            if (toggleButton) {
                toggleButton.removeEventListener('click', toggleBox);
            }
        };
    }, [number]);

    return (
        <>
            <div className='hover:cursor-pointer border-t-2 border-t-white text-deepLightBlack hover:bg-bgGreen'>
                <button id={"toggleButton" + number} className='w-[100%] hover:bg-bgGreen h-[40px] flex items-center px-3 hover:text-white text-lg'>
                    <span className='mr-3'>{icon}</span>{name} <RiArrowDropDownLine id={'arrow' + number} className='h-[60px] w-[35px] ml-auto' />
                </button>
                <div id={'box' + number} className='w-[100%] h-auto bg-white transition-all hidden'>
                    <ul className='flex justify-center flex-col text-[15px] font-semibold '>
                        <li className='text-center h-[40px] flex items-center hover:bg-lightGrey text-deepLightBlack pl-5 border-t-2 border-t-white'>Add Employee</li>
                        <li className='text-center h-[40px] flex items-center hover:bg-lightGrey text-deepLightBlack pl-5 border-t-2 border-t-white'>Add Manager</li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default ExpandBox