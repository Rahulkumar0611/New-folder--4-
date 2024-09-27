import React, { useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import '../style/payments.css';

const PaymentForm = () => {
  const [studentId, setStudentId] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Cash');
  const [amountPaid, setAmountPaid] = useState('');
  const [discount, setDiscount] = useState('');
  const [discountType, setDiscountType] = useState('fixed'); // Default is fixed discount
  const [receipt, setReceipt] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  // Handle payment submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/payments/registerPayment', {
        studentId,
        paymentMethod,
        amountPaid: Number(amountPaid),
        discount: Number(discount),
        discountType,
      });
      setReceipt(response.data.payment);
      setErrorMessage('');
    } catch (error) {
      setReceipt(null);
      setErrorMessage(error.response?.data?.message || 'Error registering payment');
    }
  };

  // Print receipt functionality
  const printReceipt = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Payment Receipt', 20, 20);
    
    // Draw a border box
    doc.setLineWidth(0.5);
    doc.rect(10, 10, 190, 140);

    // Payment details
    doc.setFontSize(12);
    doc.text(`Student ID: ${receipt.studentId}`, 20, 40);
    doc.text(`Student Name: ${receipt.studentName}`, 20, 50);
    doc.text(`Class: ${receipt.class}`, 20, 60);
    doc.text(`Payment Method: ${receipt.paymentMethod}`, 20, 70);
    doc.text(`Amount Paid: ₹${receipt.amountPaid}`, 20, 80);

    // Display discount correctly based on type
    const discountText = discountType === 'percentage' ? `${discount}%` : `₹${discount}`;
    doc.text(`Discount: ${discountText}`, 20, 90);

    doc.text(`Balance Amount: ₹${receipt.balanceAmount}`, 20, 100); // Use balance from backend

    // Add a thank you message
    doc.setFontSize(14);
    doc.text('Thank you for your payment!', 20, 130);

    doc.save('PaymentReceipt.pdf');
  };

  return (
    <div className="payment-form-container">
      <h2>Register Payment</h2>
      <form onSubmit={handleSubmit} className="payment-form">
        <label>
          Student ID:
          <input
            type="text"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            required
          />
        </label>
        <label>
          Payment Method:
          <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
            <option value="Cash">Cash</option>
            <option value="Bank Transfer">Bank Transfer</option>
            <option value="Credit Card">Credit Card</option>
            <option value="UPI">UPI</option>
          </select>
        </label>
        <label>
          Amount Paid:
          <input
            type="number"
            value={amountPaid}
            onChange={(e) => setAmountPaid(e.target.value)}
            required
          />
        </label>
        <label>
          Discount:
          <input
            type="number"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
            placeholder="Enter discount"
          />
        </label>
        <label>
          Discount Type:
          <select value={discountType} onChange={(e) => setDiscountType(e.target.value)}>
            <option value="fixed">Fixed Amount</option>
            <option value="percentage">Percentage</option>
          </select>
        </label>
        <button type="submit">Submit Payment</button>
      </form>

      {errorMessage && <p className="error">{errorMessage}</p>}

      {receipt && (
        <div className="receipt-container">
          <h3>Payment Receipt</h3>
          <p><strong>Student ID:</strong> {receipt.studentId}</p>
          <p><strong>Student Name:</strong> {receipt.studentName}</p>
          <p><strong>Class:</strong> {receipt.class}</p>
          <p><strong>Payment Method:</strong> {receipt.paymentMethod}</p>
          <p><strong>Amount Paid:</strong> ₹{receipt.amountPaid}</p>
          <p><strong>Discount:</strong> {discountType === 'percentage' ? `${discount}%` : `₹${discount}`}</p>
          <p><strong>Balance Amount:</strong> ₹{receipt.balanceAmount}</p> {/* Corrected balance display */}
          <button onClick={printReceipt}>Print/Download Receipt</button>
        </div>
      )}
    </div>
  );
};

export default PaymentForm;
