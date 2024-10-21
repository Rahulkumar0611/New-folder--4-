import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const IndividualEntry = ({ setEntries, entries }) => {
    const [formData, setFormData] = useState({
        date: '',
        description: '',
        IncomeAmount: '',
        PaymentAmount: '',
        BalanceAmount: ''
    });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    // Handle form input changes
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`http://localhost:5000/incomeandexpenditure/save`, formData);
            setMessage(response.data.message);

            // Clear form
            setFormData({
                date: '',
                description: '',
                IncomeAmount: '',
                PaymentAmount: '',
                BalanceAmount: ''
            });

            // Refresh the list of entries
            setEntries([...entries, response.data.data]);

            // Redirect to the main page
            navigate('/');
        } catch (error) {
            setMessage('Error saving data');
        }
    };

    return (
        <div className="container">
            <h2>Add Individual Entry</h2>
            {message && <div className="alert">{message}</div>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Date</label>
                    <input type="date" name="date" value={formData.date} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <input type="text" name="description" value={formData.description} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Income Amount</label>
                    <input type="number" name="IncomeAmount" value={formData.IncomeAmount} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Payment Amount</label>
                    <input type="number" name="PaymentAmount" value={formData.PaymentAmount} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Balance Amount</label>
                    <input type="number" name="BalanceAmount" value={formData.BalanceAmount} onChange={handleChange} required />
                </div>
                <button type="submit">Save Entry</button>
            </form>
        </div>
    );
};

export default IndividualEntry;
