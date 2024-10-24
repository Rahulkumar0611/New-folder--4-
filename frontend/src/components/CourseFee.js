import React, { useState } from 'react';
import axios from 'axios';
import "../style/coursefee.css";

const AddCourseFee = () => {
  const [className, setClassName] = useState('');
  const [feeType, setFeeType] = useState('');
  const [amount, setAmount] = useState('');
  const [fees, setFees] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  const currencyFormatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
  });

  // Handler to add fee type and amount to the list
  const addFee = () => {
    if (!feeType || !amount) {
      alert('Please enter both Fee Type and Amount');
      return;
    }

    const newFee = { feeType, amount: Number(amount) };
    setFees([...fees, newFee]);
    setTotalAmount(totalAmount + Number(amount));

    // Reset input fields
    setFeeType('');
    setAmount('');
  };

  // Handler to submit the course fee
  const submitCourseFee = () => {
    if (!className || fees.length === 0) {
      alert('Please enter class name and at least one fee type.');
      return;
    }

    const data = { class: className, fees }; // Change Class to class

    axios.post('http://localhost:5000/auth/addCourseFee', data)
      .then(() => {
        alert('Course Fee added successfully');
        // Reset the form
        setClassName('');
        setFees([]);
        setTotalAmount(0);
      })
      .catch((error) => {
        console.error('Error adding course fee:', error); // Log the error
        alert('Failed to add course fee');
      });
  };

  return (
    <div className="Main">
      <h2 className='heading22'>Course Fee Details</h2>

      <div>
        <label className='feess'>Class Name: </label>
        <input
          type="text"
          value={className}
          onChange={(e) => setClassName(e.target.value)}
          placeholder="Enter class name"
        />
      </div>

      <div>
        <label className='feess'>Fee Type: </label>
        <input
          type="text"
          value={feeType}
          onChange={(e) => setFeeType(e.target.value)}
          placeholder="Enter fee type"
        />
      </div>

      <div>
        <label className='feess'>Amount (₹): </label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
        />
      </div>

      <button className='buttonforfee' onClick={addFee}>Add Fee</button>

      {fees.length > 0 && (
        <div>
          <h3>Fees List</h3>
          <table className="fees-list">
            <thead>
              <tr>
                <th>Fee Type</th>
                <th>Amount (₹)</th>
              </tr>
            </thead>
            <tbody>
              {fees.map((fee, index) => (
                <tr key={index}>
                  <td>{fee.feeType}</td>
                  <td>{currencyFormatter.format(fee.amount)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <h4 className="total-amount">Total Amount: {currencyFormatter.format(totalAmount)}</h4>
        </div>
      )}

      <button className='buttonforfee' onClick={submitCourseFee}>Submit Course Fee</button>
    </div>
  );
};

export default AddCourseFee;
