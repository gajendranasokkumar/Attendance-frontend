import React, { useContext, useEffect, useState, useRef, useCallback } from 'react';
import { SearchBar, MainOptions, PersonDetails, EntryBox } from '../index';
import { CiSearch } from 'react-icons/ci';
import { HiMiniUserGroup } from 'react-icons/hi2';
import { BsPersonWorkspace } from 'react-icons/bs';
import { PiCakeBold, PiPersonSimpleRunBold } from 'react-icons/pi';
import { RiTimerFlashFill } from 'react-icons/ri';
import { MdOutlineDevicesOther } from 'react-icons/md';
import api from '../../utils/api';
import { AuthContext } from '../../context/AuthContext';
import toast from 'react-hot-toast';

const Content = () => {
    const [optionsDetails, setOptionsDetails] = useState({});
    const previousOptionsDetails = useRef({});
    const { setLoading } = useContext(AuthContext);

    const getOptionsDetails = useCallback(async () => {
        setLoading(true);
        try {
            const res = await api.get('/getOptionsDetails');
            if (JSON.stringify(res.data) !== JSON.stringify(previousOptionsDetails.current)) {
                console.log("comming")
                setOptionsDetails(res.data);
                previousOptionsDetails.current = res.data;
            }
            setLoading(false);
            console.log(res.data)
        } catch (err) {
            toast.error('Something went wrong :(');
            setLoading(false);
        }
    }, [setLoading]);

    useEffect(() => {
        getOptionsDetails();
    }, [getOptionsDetails]);

    return (
        <>
            <div className='h-[92vh] w-[100%] bg-white md:rounded-tl-[50px] px-5 overflow-y-auto'>
                <SearchBar placeholder={"Search Employee"} icon={<CiSearch className='h-[20px] w-[20px]' />} />
                <div className='h-auto w-[100%] px-5 mt-8 flex xs:flex-col md:flex-row gap-4 flex-wrap justify-center'>
                    <MainOptions value={optionsDetails.strength} boxName={"Strength"} background={"violetSvg"} icon={<HiMiniUserGroup />} />
                    <MainOptions value={optionsDetails.atwork} boxName={"At Work"} background={"orangeSvg"} icon={<BsPersonWorkspace />} />
                    <MainOptions value={optionsDetails.birthday} boxName={"Birthday"} background={"lightBlueSvg"} icon={<PiCakeBold />} />
                    <MainOptions value={optionsDetails.latein} boxName={"Late In"} background={"redSvg"} icon={<PiPersonSimpleRunBold />} />
                    <MainOptions value={10} boxName={"Early Out"} background={"greenSvg"} icon={<RiTimerFlashFill />} />
                    <MainOptions value={5} boxName={"Device"} background={"pinkSvg"} icon={<MdOutlineDevicesOther />} />
                </div>
                <div className='w-full h-full flex gap-5 flex-wrap mt-10'>
                    {/* <EntryBox />
                    <PersonDetails /> */}
                </div>
            </div>
        </>
    );
}

export default Content;
