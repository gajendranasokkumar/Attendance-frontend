import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { RxCross2 } from 'react-icons/rx';

const PersonDetails = () => {
    const { userData } = useContext(AuthContext);
    const navigate = useNavigate();
    
    
    const goBack = () => {
        navigate(-1);
    };

    return (
        <div className='w-[100vw] left-0 h-[100vh] backdrop-blur-sm bg-white/47 border border-gray-300/30 grid place-content-center top-0 absolute z-[99999]'>
            <div className='w-full md:w-[60vw] h-[90vh] bg-white rounded-2xl border-2 border-grey shadow-allBox overflow-y-auto'>
                <div className='flex justify-between bg-shadeWhite w-[100%] h-[80px] items-center top-0 z-10 relative mb-5'>
                    <div className='text-[25px]  text-bgGreen font-bold pl-8'>{"Profile"}</div>
                    <button className='text-[40px] bg-shadeWhite w-[80px] h-[100%] rounded-tr-lg grid place-content-center rounded-bl-[35px] text-deepLightBlack hover:cursor-pointer' onClick={goBack}><RxCross2 /></button>
                </div>
                <div className='personaldetails mx-auto xs:w-[100vw] lg:w-[60%] border-l-4 border-txtLGreen bg-shadeWhite h-fit py-5 rounded shadow-goodShadow flex flex-col justify-center items-center px-5 '>
                    <h3 className='text-txtLGreen font-semibold text-2xl mb-3 personaldetails'>Personal Details</h3>
                    <div className='parent'>
                        <div className='left'>ID</div>
                        <div className='right'>: {userData?.id}</div>
                    </div>
                    <div className='parent'>
                        <div className='left'>Name</div>
                        <div className='right'>: {userData?.name}</div>
                    </div>
                    <div className='parent'>
                        <div className='left'>Email</div>
                        <div className='right break-words'>: {userData?.email}</div>
                    </div>
                    <div className='parent'>
                        <div className='left'>DOB</div>
                        <div className='right'>: {userData?.dob}</div>
                    </div>
                    <div className='parent'>
                        <div className='left'>Phone Number</div>
                        <div className='right'>: {userData?.phonenumber}</div>
                    </div>
                    <div className='parent'>
                        <div className='left'>Punch ID</div>
                        <div className='right'>: {userData?.punchid}</div>
                    </div>
                    <div className='parent'>
                        <div className='left'>Punch Type</div>
                        <div className='right'>: {userData?.punchtype}</div>
                    </div>
                    <div className='parent'>
                        <div className='left'>Role</div>
                        <div className='right'>: {userData?.role}</div>
                    </div>
                    <div className='parent'>
                        <div className='left'>Reporting Person</div>
                        <div className='right'>: {userData?.reportingperson}</div>
                    </div>
                    <div className='parent'>
                        <div className='left'>Department</div>
                        <div className='right'>: {userData?.department}</div>
                    </div>
                    <div className='parent'>
                        <div className='left'>Company</div>
                        <div className='right'>: {userData?.company}</div>
                    </div>
                    <div className='parent'>
                        <div className='left'>Gender</div>
                        <div className='right'>: {userData?.gender}</div>
                    </div>
                    <div className='parent'>
                        <div className='left'>Date Of Joining</div>
                        <div className='right'>: {userData?.dateofjoining}</div>
                    </div>
                    <div className='parent'>
                        <div className='left'>Multi Branch Attendance</div>
                        <div className='right'>: {userData?.multibranchattendance}</div>
                    </div>
                    <div className='parent'>
                        <div className='left'>Branch</div>
                        <div className='right'>: {userData?.branch}</div>
                    </div>
                    <div className='parent'>
                        <div className='left'>Address</div>
                        <div className='right'>: {userData?.address}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PersonDetails
