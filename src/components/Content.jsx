import React from 'react'
import SearchBar from './SearchBar'
import { CiSearch } from "react-icons/ci";
import MainOptions from './MainOptions';
import { HiMiniUserGroup } from "react-icons/hi2";
import { BsPersonWorkspace } from "react-icons/bs";
import { PiCakeBold } from "react-icons/pi";
import { PiPersonSimpleRunBold } from "react-icons/pi";
import { RiTimerFlashFill } from "react-icons/ri";
import { MdOutlineDevicesOther } from "react-icons/md";
import PersonDetails from './PersonDetails';
import EntryBox from './EntryBox';




const Content = () => {
    return (
        <>
            <div className='h-[92vh] w-[100%] bg-white rounded-tl-[50px] px-5 overflow-y-auto'>
                <SearchBar placeholder={"Search Employee"} icon={<CiSearch className='h-[20px] w-[20px]' />} />
                <div className='h-auto w-[100%] px-5 mt-8 flex gap-4 flex-wrap justify-center'>
                    <MainOptions value={45} boxName={"Strength"} background={"violetSvg"} icon={<HiMiniUserGroup />} />
                    <MainOptions value={30} boxName={"At Work"} background={"orangeSvg"} icon={<BsPersonWorkspace />} />
                    <MainOptions value={2} boxName={"Birthday"} background={"lightBlueSvg"} icon={<PiCakeBold />} />
                    <MainOptions value={5} boxName={"Late In"} background={"redSvg"} icon={<PiPersonSimpleRunBold />} />
                    <MainOptions value={10} boxName={"Early Out"} background={"greenSvg"} icon={<RiTimerFlashFill />} />
                    <MainOptions value={5} boxName={"Device"} background={"pinkSvg"} icon={<MdOutlineDevicesOther />} />
                </div>
                <div className='w-full h-full flex gap-5 flex-wrap mt-10'>
                    {/* <EntryBox />
                    <PersonDetails /> */}
                </div>
            </div>
        </>
    )
}

export default Content