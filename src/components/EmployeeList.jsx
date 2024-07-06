import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../utils/api';
import AddEmployeeForm from './AddEmployeeForm';
import SearchBar from './SearchBar';
import { CiSearch } from 'react-icons/ci';

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [editingEmployee, setEditingEmployee] = useState(null);

    const { setLoading, showLoader } = useContext(AuthContext)

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        try {
            setLoading(true)
            const response = await api.get('/getAllEmployees');
            setEmployees(response.data);
            showLoader(1000)
        } catch (error) {
            console.error('Error fetching employees:', error);
        }
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredEmployees = employees.filter(employee =>
        Object.values(employee).some(value =>
            value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    const handleEdit = (employee) => {
        setEditingEmployee(employee);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this employee?')) {
            try {
                setLoading(true)
                const response = await api.delete(`/deleteEmployee/${id}`);
                console.log('Delete response:', response);
                showLoader(1000)
                fetchEmployees();
            } catch (error) {
                console.error('Error deleting employee:', error.response ? error.response.data : error.message);
            }
        }
    };

    const handleUpdateEmployee = async (e, updatedEmployee) => {
        e.preventDefault()
        try {
            setLoading(true)
            console.log("comming")
            await api.post('/updateEmployee', updatedEmployee);
            setEditingEmployee(null);
            showLoader(500)
            fetchEmployees();
        } catch (error) {
            console.error('Error updating employee:', error);
        }
    };

    return (
        <>
        <div className='h-[92vh] w-[84vw] bg-white lg:rounded-tl-[50px] px-5 overflow-y-auto pb-10'>
            <h1 className='text-txtLBlue text-3xl text-center mb-10 mt-10 font-bold font-sans'>Employee List</h1>
            {/* <input
                type="text"
                placeholder="Search employees..."
                className="w-full p-2 mb-4 border rounded"
                value={searchTerm}
                onChange={handleSearch}
            /> */}
            <SearchBar placeholder={"Search Employee"} icon={<CiSearch className='h-[20px] w-[20px]' />} value={searchTerm} onchange={handleSearch} />
            <div className='h-[85%] w-[100%] mt-5 overflow-x-auto'>
                <table className='min-w-full table-auto border-2 border-bgGreen'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Role</th>
                            <th>Punch ID</th>
                            <th>Reporting Person</th>
                            <th>Department</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredEmployees.map(employee => (
                            <tr key={employee.id} className='h-12 min-h-12 max-h-20 impo'>
                                <td className='px-1 min-w-[120px] max-w-[200px] whitespace-normal'>{employee.id}</td>
                                <td className='px-1 min-w-[150px] max-w-[200px] whitespace-normal'>{employee.name}</td>
                                <td className='px-1 min-w-[100px] max-w-[200px] whitespace-normal'>{employee.role}</td>
                                <td className='px-1 min-w-[100px] max-w-[200px] whitespace-normal'>{employee.punchid}</td>
                                <td className='px-1 min-w-[150px] max-w-[200px] whitespace-normal'>{employee.reportingperson}</td>
                                <td className='px-1 min-w-[150px] max-w-[200px] whitespace-normal'>{employee.department}</td>
                                <td className='px-1 min-w-[200px] max-w-[200px] whitespace-normal'>
                                    <button
                                        className="px-2 py-1 bg-lightGreen text-white rounded mr-2"
                                        onClick={() => handleEdit(employee)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="px-2 py-1 bg-txtLRed text-white rounded ml-2"
                                        onClick={() => {
                                            console.log(employee._id)
                                            handleDelete(employee._id)
                                        }}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
        {editingEmployee && (
            <AddEmployeeForm 
                receivedEmployee={editingEmployee}
                onSubmit={handleUpdateEmployee}
                mode={"update"}
            />
        )}
        </>
    );
};

export default EmployeeList;