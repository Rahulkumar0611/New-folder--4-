import React, { useState } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx'; // Import XLSX

const BulkEntry = ({ setEntries }) => {
  const [file, setFile] = useState(null); // State to hold the uploaded file
  const [message, setMessage] = useState(''); // Message state to show success or error messages

  // Function to download the Excel template
  const downloadTemplate = () => {
    const templateData = [
      ['Date', 'Description', 'IncomeAmount', 'PaymentAmount', 'BalanceAmount'],
    ];

    const worksheet = XLSX.utils.aoa_to_sheet(templateData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Template');
    XLSX.writeFile(workbook, 'Income_Expenditure_Template.xlsx');
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
      axios.post('http://localhost:5000/incomeandexpenditure/bulk-upload', jsonData)
        .then((res) => {
          setMessage('Data Imported Successfully');
          setEntries(res.data.data); // Update the entries state
        })
        .catch((err) => {
          setMessage('Error in importing data');
          console.error(err);
        });
    };

    reader.readAsArrayBuffer(file); // Read the file as ArrayBuffer
  };

  return (
    <div className="container">
      <h2>Bulk Entry</h2>
      {message && <div className="alert">{message}</div>}
      <button onClick={downloadTemplate}>Download Excel Template</button>
      <div className="form-group">
        <label>Upload Filled Excel File</label>
        <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} />
        <button type="button" onClick={importExcel}>Import & Save</button>
      </div>
    </div>
  );
};

export default BulkEntry;
