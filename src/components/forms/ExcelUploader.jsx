import React, { useState, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import * as XLSX from 'xlsx';
import axios from 'axios';
import { SiMicrosoftexcel } from "react-icons/si";


const ExcelUploader = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [successCount, setSuccessCount] = useState(0);
  const cancelTokenSource = useRef(null);

  // Hardcoded field names
  const fieldNames = [
    'id',
    'name',
    'person',
    'email',
    'phonenumber',
    'dob',
    'address',
    'gender',
    'maritalstatus',
    'hrpolicy',
    'dateofjoining',
    'punchid',
    'company',
    'branch',
    'designation',
    'mobilenumber',
    'reportingperson',
    'department',
    'role',
    'multibranchattendance',
    'shiftgroup',
    'shift',
    'punchtype',
    'geolocation',
    'leavetaken',
    'leavepermitted',
    'hoursofwork',
    'ismanager',
    'entrytime'
  ];

  const sampleValues = [
    '12345',                // id
    'John Doe',             // name
    'Employee | Manager | Admin',// person
    'john.doe@example.com', // email
    '123-456-7890',         // phonenumber
    '1980-01-01',           // dob
    '123 Main St, City, Country', // address
    'Male | Female',        // gender
    'Single | Married',     // maritalstatus
    'Standard',             // hrpolicy
    '2023-01-06',           // dateofjoining
    'P12345',               // punchid
    'ABC Corp',             // company
    'Head Office',          // branch
    'Software Engineer',    // designation
    '098-765-4321',         // mobilenumber
    'ID of reporting person',// reportingperson
    'IT',                   // department
    'Developer',            // role
    'true | false',         // multibranchattendance
    'A',                    // shiftgroup
    'Morning',              // shift
    'Biometric',            // punchtype
    'true | false',         // geolocation
    '5',                    // leavetaken
    '10',                   // leavepermitted
    '40',                   // hoursofwork
    'Yes | No',             // ismanager
    '09:00:00 | 14:00:00'   // entrytime
  ];



  const onDrop = (acceptedFiles) => {
    setFile(acceptedFiles[0]);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: '.xlsx, .xls',
    multiple: false,
  });

  const handleUpload = async () => {
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      setUploading(true);
      setProgress(0);
      setSuccessCount(0);

      cancelTokenSource.current = axios.CancelToken.source();

      // Skip the header row
      for (let i = 1; i < jsonData.length - 1; i++) {
        if (cancelTokenSource.current.token.reason) {
          // Upload was cancelled
          break;
        }

        try {
          const rowData = {};
          fieldNames.forEach((field, index) => {
            rowData[field] = jsonData[i][index];
          });

          await axios.post('http://localhost:3000/uploadexcel', rowData, {
            cancelToken: cancelTokenSource.current.token
          });
          setSuccessCount(prev => prev + 1);
          setProgress(((i) / (jsonData.length - 2)) * 100);
        } catch (error) {
          if (axios.isCancel(error)) {
            console.log('Upload cancelled');
          } else {
            console.error('Error uploading row:', error.response ? error.response.data : error.message);
          }
        }
      }

      setUploading(false);
      setFile(null);
    };

    reader.readAsArrayBuffer(file);
  };

  const handleCancel = () => {
    if (cancelTokenSource.current) {
      cancelTokenSource.current.cancel('Upload cancelled by user');
    }
    setUploading(false);
    setProgress(0);
  };

  return (
    <>
      <div className='h-[92vh] sm:w-full md:w-[84vw] bg-white lg:rounded-tl-[50px] xs:px-1 md:px-5 overflow-y-auto pb-16'>
        <h1 className='text-txtLBlue text-3xl text-center mb-10 mt-10 font-bold font-sans text-[clamp(1rem,4vw,1.5rem)]'>Upload excel to create employees</h1>
        <div className="excel-uploader ">
          <div {...getRootProps()} className={`dropzone ${isDragActive ? 'active' : ''}`}>
            <input {...getInputProps()} />
            {file ? (
              <p>File selected: {file.name}</p>
            ) : (
              <p>Drag and drop an Excel file here, or click to select one</p>
            )}
          </div>
          <div className="button-group">
            <button onClick={handleUpload} disabled={!file || uploading} className="upload-button">
              Upload
            </button>
            {uploading && (
              <button onClick={handleCancel} className="cancel-button">
                Cancel
              </button>
            )}
            <a href="assets/download.png" download>
              <button title='Click to download' className='border-2 border-txtLGreen text-txtLGreen bg-bgLGreen p-2 rounded-lg flex items-center gap-2'><SiMicrosoftexcel />Sample Excel</button>
            </a>
          </div>
          {uploading && (
            <div className="progress-container">
              <div className="progress-bar">
                <div className="progress" style={{ width: `${progress}%` }}></div>
              </div>
              <p>Uploading... {Math.round(progress)}%</p>
            </div>
          )}
          {successCount > 0 && (
            <p className="success-count">Successfully created employees: {successCount}</p>
          )}
          <div className="field-names">
            <h3 className='text-xl text-center text-txtLBlue underline font-semibold'>Please make sure your excel has the data in this order:</h3>

          </div>
        </div>
        <ul className='flex gap-5 flex-wrap text-lightBlack'>
          {fieldNames.map((field, index) => (
            <li key={index} className='bg-bgLBlue pl-3 rounded-xl py-0.5 pr-0.5'>{index + 1 + ". " + field} <span className='bg-bgLRed px-2 ml-2 h-full my-0 rounded-lg'>{sampleValues[index]}</span></li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default ExcelUploader;