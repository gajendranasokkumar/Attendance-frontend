import React, { useState } from 'react';
import setting from '../../assets/setting.png';
import { CheckINbtn, CheckOutBtn, Input } from '../index';
import api from '../../utils/api';


const PunchForm = () => {
    const [formState, setFormState] = useState({ punchid: '' });
    const [message, setMessage] = useState('');

    const handleCheckIn = async () => {
        try {
            const response = await api.post('/punchcheckin', { punchid: formState.punchid });
            setMessage(response.data.message || 'Checked in successfully');
            setFormState({ punchid: '' }); // Clear the input field
            setTimeout(() => setMessage(''), 2000); 
        } catch (error) {
            console.error('Error:', error);
            setMessage('Error checking in');
            setTimeout(() => setMessage(''), 2000); 
        }
    };

    const handleCheckOut = async () => {
        try {
            const response = await api.post('/punchcheckout', { punchid: formState.punchid });
            setMessage(response.data.message || 'Checked out successfully');
            setFormState({ punchid: '' }); // Clear the input field
            setTimeout(() => setMessage(''), 2000); 
        } catch (error) {
            console.error('Error:', error);
            setMessage('Error checking out');
            setTimeout(() => setMessage(''), 2000); 
        }
    };

    return (
        <div className='w-[100vw] h-[100vh] bg-white flex'>
            <div className='h-full w-[100%] bg-loginBack grid place-items-center relative'>
                <h2 className='z-10 top-16 absolute text-[100px] px-16 py-0 text-white shadow-allBox font-[600] rounded'>PUNCH</h2>
                <img src={setting} className='h-[250px] w-[250px] absolute top-10 right-96 grayscale' />
                <div className='absolute bg-white w-[40%] h-[50%] rounded flex flex-col justify-center'>
                    <div className='w-[100%] px-14'>
                        <Input
                            type="text"
                            placeholder="Punch ID"
                            name="punchid"
                            state={formState}
                            setState={setFormState}
                        />
                    </div>
                    <div className='w-[100%] px-14 flex justify-end gap-5'>
                        <CheckOutBtn onClick={handleCheckOut} />
                        <CheckINbtn onClick={handleCheckIn} />
                    </div>
                    <img src={setting} className='h-[200px] w-[200px] absolute bottom-[-50px] left-[-100px] animate-spin-slow grayscale' />
                    {
                        message === "Checked in successfully" &&
                            <p className='absolute bottom-1 right-1 rounded-sm mt-5 mx-auto bg-success h-[50px] px-5 flex justify-center items-center text-3xl text-white'>Checked in successfully</p>
                    }
                    {
                        message === "Error checking in" &&
                            <p className='absolute bottom-1 right-1 rounded-sm mt-5 mx-auto bg-failure h-[50px] px-5 flex justify-center items-center text-3xl text-white'>Error checking in</p>
                    }
                    {
                        message === "Checked out successfully" &&
                            <p className='absolute bottom-1 right-1 rounded-sm mt-5 mx-auto bg-success h-[50px] px-5 flex justify-center items-center text-3xl text-white'>Checked out successfully</p>
                    }
                    {
                        message === "Error checking out" &&
                            <p className='absolute bottom-1 right-1 rounded-sm mt-5 mx-auto bg-failure h-[50px] px-5 flex justify-center items-center text-3xl text-white'>Error checking out</p>
                    }
                </div>
            </div>
        </div>
    );
};

export default PunchForm;
