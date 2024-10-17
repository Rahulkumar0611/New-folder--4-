import React, { useState } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';
import '../style/Bulkadmission.css';

const BulkAdmission = () => {
  const [file, setFile] = useState(null); // State to hold the uploaded file

  // Function to download the Excel template
  const downloadTemplate = () => {
    const data = [
      ['_id', 'studentName', 'dob', 'address', 'city', 'state', 'class', 'section', 'gender', 'email', 'phone', 'aadhaarNumber', 'emergencyNumber']
    ];

    const ws = XLSX.utils.aoa_to_sheet(data); // Create a worksheet from data array
    const wb = XLSX.utils.book_new(); // Create a new workbook
    XLSX.utils.book_append_sheet(wb, ws, 'Students'); // Append the worksheet

    XLSX.writeFile(wb, 'Student_Import_Template.xlsx'); // Write and download the Excel file
  };

  // Function to handle file selection
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Function to read Excel file and submit the data to the backend
  const importExcel = () => {
    if (!file) {
      alert('Please choose a file first.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: '' }); // Convert sheet to JSON

      // Post the extracted data to the backend
      axios.post(`http://localhost:5000/auth/addStudentbulk`, jsonData)
        .then((res) => {
          console.log('API Response:', res);
          alert("Data Imported Successfully");
        })
        .catch((err) => {
          console.error(err);
          alert("Error in importing data");
        });
    };

    reader.readAsArrayBuffer(file); // Read the file as ArrayBuffer
  };

  return (
    <div className="BulkAdmission">
      <form className="formBulkAdmission">
        <h2 className="titleBulk">Bulk Student Registration</h2>
        <div className='mainBulk'>
          <div className="groupforBulk">
            <label className="labelforBulk">Bulk upload of student details</label>

            <button type="button" className="buttonforBulk" onClick={downloadTemplate}>
              Download Template
            </button>
          </div>
          <div className="vertical-line"></div>

          <div className='Bulkdiv2'>
            <input
              type="file"
              accept=".xlsx, .xls"
              onChange={handleFileChange}
              className="filesimport"
            />

            <button
              type="button"
              className="buttonforbulk"
              onClick={importExcel}
            >
              Import & Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default BulkAdmission;
