import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const IncomeAndExpenditure = () => {
    const [entries, setEntries] = useState([]);

    // Fetch the entries from the backend
    useEffect(() => {
        const fetchEntries = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/incomeandexpenditure/get`);
                setEntries(response.data.data);
            } catch (error) {
                console.error('Error fetching data', error);
            }
        };

        fetchEntries();
    }, []);

    return (
        <div className="container">
            <h2>Income and Expenditure</h2>

            <div>
                <Link to="/individual">Add Individual Entry</Link> | 
                <Link to="/bulk">Add Bulk Entries</Link>
            </div>

            {/* Display income and expenditure data */}
            <h3>Entries</h3>
            <table className="table">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Description</th>
                        <th>Income Amount</th>
                        <th>Payment Amount</th>
                        <th>Balance Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {entries.map((entry) => (
                        <tr key={entry._id}>
                            <td>{entry.date}</td>
                            <td>{entry.description}</td>
                            <td>{entry.IncomeAmount}</td>
                            <td>{entry.PaymentAmount}</td>
                            <td>{entry.BalanceAmount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default IncomeAndExpenditure;
