import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { saveAs } from 'file-saver';
import '../style/PaymentReports.css';

const PaymentReports = () => {
    const [payments, setPayments] = useState([]);
    const [totalPaid, setTotalPaid] = useState(0);
    const [totalBalance, setTotalBalance] = useState(0);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [studentClass, setStudentClass] = useState('');
    const [exportType, setExportType] = useState(''); // New state for export type

    // Fetch payments report based on filter criteria
    const fetchReport = async () => {
        try {
            const response = await axios.get('http://localhost:5000/reports/payments', {
                params: { startDate, endDate, class: studentClass }
            });
            const filteredPayments = response.data.payments;
            setPayments(filteredPayments);
            setTotalPaid(response.data.totalPaid);
            setTotalBalance(response.data.totalBalance); // Ensure this is filtered
        } catch (error) {
            console.error('Error fetching reports', error);
        }
    };

    // Fetch all transactions for export
    const fetchAllTransactions = async () => {
        try {
            const response = await axios.get('http://localhost:5000/reports/payments', {
                params: { startDate, endDate, class: studentClass }
            });
            return response.data.payments;
        } catch (error) {
            console.error('Error fetching all transactions', error);
            return [];
        }
    };

    // Export report based on the selected format
    const exportReport = async () => {
        const allTransactions = await fetchAllTransactions();

        if (exportType === 'csv') {
            const csvData = allTransactions.map(payment => ({
                studentName: payment.studentName,
                class: payment.class,
                paymentDate: new Date(payment.paymentDate).toLocaleDateString(),
                amountPaid: payment.amountPaid,
                balanceAmount: payment.balanceAmount,
                paymentMethod: payment.paymentMethod
            }));
            const csvString = [
                ['Student Name', 'Class', 'Payment Date', 'Amount Paid', 'Balance Amount', 'Payment Method'],
                ...csvData.map(item => Object.values(item))
            ]
                .map(e => e.join(','))
                .join('\n');
            const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
            saveAs(blob, 'Detailed_Student_Payment_Report.csv');
        } else if (exportType === 'print') {
            printReport();
        }
    };

    // Print a professional report
    const printReport = () => {
        const printContent = document.getElementById('printable-report').innerHTML;
        const originalContent = document.body.innerHTML;
        document.body.innerHTML = printContent;
        window.print();
        document.body.innerHTML = originalContent;
    };

    useEffect(() => {
        fetchReport(); // Fetch report on page load
    }, [startDate, endDate, studentClass]);

    return (
        <div className='payment-reports-container'>
            <h2 className='heading44'>Payment Reports</h2>

            <div className='filter-section'>
               <div>
               <label id='labelfilter'>Date: </label>
                <input
                    className='inputsec'
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                />
               </div>
                <div>
                <label id='labelfilter'>To </label>
                <input
                    className='inputsec'
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                />
                </div>
            </div>

            <div className='classsection'>

                <div className='CLass_container'>
                    <label id='classid'>Class: </label>
                    <input
                        id='classinput'
                        type="text"
                        value={studentClass}
                        onChange={(e) => setStudentClass(e.target.value)}
                        placeholder="Enter class"
                    />
                </div>
                <div className='btn'>
                    {/* Removed Generate Report button */}
                </div>
            </div>

            <h3>Total Paid: ₹{totalPaid}</h3>
            <h3>Total Balance: ₹{totalBalance}</h3>

            {/* Export Type Selection */}
            <div className='export-buttons'>
                <label>Select Export Format: </label>
                <select value={exportType} onChange={(e) => setExportType(e.target.value)}>
                    <option value="">Select</option>
                    <option value="csv">CSV</option>
                    <option value="print">Print</option>
                </select>
                <button id='buttonforexport' onClick={exportReport}>Export Report</button>
            </div>

            <div id="printable-report">
                <table className='tableforreport'>
                    <thead id='heading'>
                        <tr>
                            <th>Student Name</th>
                            <th>Class</th>
                            <th>Payment Date</th>
                            <th>Amount Paid</th>
                            <th>Balance Amount</th>
                            <th>Payment Method</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.map((payment) => (
                            <tr id='tabledata' key={payment._id}>
                                <td>{payment.studentName}</td>
                                <td>{payment.class}</td>
                                <td>{new Date(payment.paymentDate).toLocaleDateString()}</td>
                                <td>₹{payment.amountPaid}</td>
                                <td>₹{payment.balanceAmount}</td>
                                <td>{payment.paymentMethod}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PaymentReports;
