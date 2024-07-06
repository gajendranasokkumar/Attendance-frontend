import React, { useContext, useEffect, useState } from 'react'
import { RxCross2 } from "react-icons/rx";
import Input from './Input';
import Radio from './Radio';
import Date from './Date';
import Textarea from './Textarea';
import SubmitButton from './SubmitButton';
import CancelButton from './CancelButton';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api'
import Select from './Select';
import { AuthContext } from '../context/AuthContext';

const AddEmployeeForm = ({ receivedEmployee = null, onSubmit = null, mode = "create" }) => {


    const [employee, setEmployee] = useState({
        id: "",
        name: "",
        person: "Employee",
        email: "",
        phonenumber: "",
        dob: "",
        address: "",
        gender: "",
        maritalstatus: "",
        hrpolicy: "",
        dateofjoining: "",
        punchid: "",
        company: "",
        branch: "",
        designation: "",
        mobilenumber: "",
        reportingperson: "",
        department: "",
        role: "",
        multibranchattendance: "",
        shiftgroup: "",
        shift: "",
        punchtype: "",
        geolocation: "",
        leavetaken: "",
        leavepermitted: "",
        hoursofwork: "",
        ismanager: ""
    });

    const [managerList, setManagerList] = useState([]);

    const navigate = useNavigate();

    const { setLoading } = useContext(AuthContext);

    useEffect(() => {
        if (receivedEmployee != null) {
            setEmployee(receivedEmployee)
        }
    }, [receivedEmployee]);

    useEffect(() => {
        const fetManagerList = async () => {
            await api.get("/fetchmanager")
                .then((response) => {
                    const managerArray = response.data.map(one => one.id);  
                    // console.log("Manager List", managerArray);
                    setManagerList(["nil", ...managerArray])
                })
                .catch((error) => {
                    console.log(error)
                })
        }

        fetManagerList();
    }, [])

    const goBack = () => {
        navigate(-1);
    };

    const submitForm = async (e) => {
        e.preventDefault();
        setLoading(true);
        console.log("🚀 ~ submitForm ~ employee:", employee)
        await api.post("/addemployee", employee)
            .then((respose) => {
                console.log("🚀 ~ .then ~ respose:", respose)
                setLoading(false)
                navigate(-1);
            })
            .catch((error) => {
                console.log("🚀 ~ applyleave ~ error:", error)
            })
    }


    const handleSubmit = (e) => {
        if (mode == 'create')
            submitForm(e)
        else if (mode == 'update')
            onSubmit(e, employee);
    }

    return (
        <>
            <div className='w-[100vw] h-[100vh] backdrop-blur-sm bg-white/47 border border-gray-300/30 grid place-content-center top-0 absolute left-0  animate-moveUp'>
                <div className='w-[60vw] h-[90vh] bg-white rounded-2xl border-2 border-grey shadow-allBox overflow-y-auto'>
                    <div className='flex justify-between bg-shadeWhite w-[100%] h-[80px] items-center top-0 z-10 relative mb-5'>
                        <div className='text-[25px]  text-bgGreen font-bold pl-8'>{mode == 'create' ? "ADD NEW EMPLOYEE" : "UPDATE EMPLOYEE"}</div>
                        <button className='text-[40px] bg-shadeWhite w-[80px] h-[100%] rounded-tr-lg grid place-content-center rounded-bl-[35px] text-deepLightBlack hover:cursor-pointer' onClick={goBack}><RxCross2 /></button>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <p className='pl-6 text-bgGreen font-bold text-xl text-nowrap'>Personal Details</p>
                        <hr className='mx-6 border-dashed border-2 border-bgGreen' />
                        <div className='flex w-[100%] mt-5'>
                            <div className='p-5 flex flex-col justify-center z-0 w-[50%]'>
                                <div className='w-[100%] mx-auto'>
                                    <Input type={"text"} placeholder={"Employee ID"} name={'id'} state={employee} setState={setEmployee} readonly={mode == 'update'} />
                                    <Input type={"text"} placeholder={"Name"} name={'name'} state={employee} setState={setEmployee} />
                                    <Input type={"email"} placeholder={"Email"} name={'email'} state={employee} setState={setEmployee} />
                                    <Input type={"number"} placeholder={"Phone Number"} name={'phonenumber'} state={employee} setState={setEmployee} />
                                </div>

                                <div className='flex gap-2 w-[50%]'>
                                    <Date placeholder={"Date Of Birth"} name={'dob'} state={employee} setState={setEmployee} />
                                </div>
                            </div>
                            <div className='p-5 flex flex-col  z-0 w-[50%]'>
                                <div className='w-[100%] mx-auto'>
                                    <Textarea placeholder={"Address"} name={'address'} state={employee} setState={setEmployee} />
                                </div>
                                <div className='w-[100%]'>
                                    <Radio option1={"Male"} option2={"Female"} placeholder={'Gender'} name={'gender'} state={employee} setState={setEmployee} />
                                    <Radio option1={"Single"} option2={"Married"} placeholder={"Marital Status"} name={'maritalstatus'} state={employee} setState={setEmployee} />
                                </div>
                            </div>
                        </div>

                        <p className='pl-6 text-bgGreen font-bold text-xl text-nowrap'>Rules Details</p>
                        <hr className='mx-6 border-dashed border-2 border-bgGreen' />
                        <div className='flex w-[100%] mt-5 items-start'>
                            <div className='p-5 flex flex-col justify-center z-0 w-[50%]'>
                                <div className='w-[100%] mx-auto'>
                                    <Input type={"text"} placeholder={"HR Policy"} name={'hrpolicy'} state={employee} setState={setEmployee} />
                                    <Input type={"text"} placeholder={"Punch ID"} name={'punchid'} state={employee} setState={setEmployee} />
                                    <Input type={"number"} placeholder={"Allowed Leave Count"} name={'leavepermitted'} state={employee} setState={setEmployee} />
                                    <div className='flex gap-2 w-[50%]'>
                                        <Date placeholder={"Date Of Joining"} name={'dateofjoining'} state={employee} setState={setEmployee} />
                                    </div>
                                </div>
                            </div>
                            <div className='p-5 flex flex-col z-0 w-[50%]'>
                                <Input type={"number"} placeholder={"Working Hours"} name={'hoursofwork'} state={employee} setState={setEmployee} />
                                <Input type={"time"} placeholder={"Entry Time"} name={'entrtime'} state={employee} setState={setEmployee} />
                                <Radio option1={"Yes"} option2={"No"} placeholder={"is Manager ?"} name={'ismanager'} state={employee} setState={setEmployee} />
                            </div>
                        </div>


                        <p className='pl-6 text-bgGreen font-bold text-xl text-nowrap'>Allocation Details</p>
                        <hr className='mx-6 border-dashed border-2 border-bgGreen' />
                        <div className='flex w-[100%] mt-5'>
                            <div className='p-5 flex flex-col  z-0 w-[50%]'>
                                <div className='w-[100%] mx-auto'>
                                    <Input type={"text"} placeholder={"Company"} name={'company'} state={employee} setState={setEmployee} />
                                    <Input type={"text"} placeholder={"Branch"} name={'branch'} state={employee} setState={setEmployee} />
                                    <Input type={"text"} placeholder={"Designation"} name={'designation'} state={employee} setState={setEmployee} />
                                    <Input type={"number"} placeholder={"Mobile Number"} name={'mobilenumber'} state={employee} setState={setEmployee} />
                                    {/* <Input type={"text"} placeholder={"Punch Type"} name={'punchtype'} state={employee} setState={setEmployee} /> */}
                                    <Select options={["web", "physical"]} placeholder={"Punch Type"} name={'punchtype'} state={employee} setState={setEmployee} />
                                </div>
                            </div>
                            <div className='p-5 flex flex-col  z-0 w-[50%]'>
                                <div className='w-[100%] mx-auto'>
                                    <Select options={managerList} placeholder={"Reporting Person"} name={'reportingperson'} state={employee} setState={setEmployee} />
                                    {/* <Input type={"text"} placeholder={"Reporting Person"} name={'reportingperson'} state={employee} setState={setEmployee} /> */}
                                    <Input type={"text"} placeholder={"Department"} name={'department'} state={employee} setState={setEmployee} />
                                    <Input type={"text"} placeholder={"Role"} name={'role'} state={employee} setState={setEmployee} />
                                    <Input type={"number"} placeholder={"Multiple Branch Attendance"} name={'multibranchattendance'} state={employee} setState={setEmployee} />
                                    <Input type={"text"} placeholder={"Shift Group"} name={'shiftgroup'} state={employee} setState={setEmployee} />
                                </div>
                                <div className='w-[100%]'>
                                    <Radio option1={"Enable"} option2={"Disable"} placeholder={"Geo Location"} name={'geolacation'} state={employee} setState={setEmployee} />
                                </div>
                            </div>
                        </div>


                        <div className='flex justify-end gap-2 w-[100%] mx-auto mb-7 pr-6'>
                            <CancelButton />
                            <SubmitButton name={mode.toUpperCase()} />
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default AddEmployeeForm