import React, { useState } from 'react';
import axios from 'axios';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx'; // Import XLSX

const BulkEntry = ({ setEntries }) => {
    const [message, setMessage] = useState('');

    // Download template
    const downloadTemplate = () => {
        const templateData = [
            ['Date', 'Description', 'IncomeAmount', 'PaymentAmount', 'BalanceAmount'],
        ];
        const worksheet = XLSX.utils.aoa_to_sheet(templateData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Template');
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
        saveAs(blob, 'Income_Expenditure_Template.xlsx');
    };

    // Handle file upload
    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post('http://localhost:5000/incomeandexpenditure/bulk-upload', formData);
            setMessage(response.data.message);
            setEntries(response.data.data); // Update entries
        } catch (error) {
            setMessage('Error uploading file');
        }
    };

    return (
        <div className="container">
            <h2>Bulk Entry</h2>
            {message && <div className="alert">{message}</div>}
            <button onClick={downloadTemplate}>Download Excel Template</button>
            <div className="form-group">
                <label>Upload Filled Excel File</label>
                <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
            </div>
        </div>
    );
};

export default BulkEntry;
