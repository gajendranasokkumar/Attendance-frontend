import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext';

const PersonDetails = () => {
    const { userData } = useContext(AuthContext);


    return (
        <div className='xs:w-[100%] lg:w-[45%] border-l-4 border-txtLGreen bg-shadeWhite h-fit py-5 rounded shadow-goodShadow flex flex-col justify-center items-center px-5'>
            <h3 className='text-txtLGreen font-semibold text-2xl mb-3'>Personal Details</h3>
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
                <div className='right'>: {userData?.email}</div>
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
    )
}

export default PersonDetails
