import React, { useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import '../style/payments.css';

const PaymentForm = () => {
  const [studentId, setStudentId] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Cash');
  const [amountPaid, setAmountPaid] = useState('');
  const [discount, setDiscount] = useState('');
  const [discountType, setDiscountType] = useState('fixed'); 
  const [additionalFeeType, setAdditionalFeeType] = useState('');
  const [additionalFeeAmount, setAdditionalFeeAmount] = useState('');
  const [receipt, setReceipt] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  // Handle payment submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const paymentResponse = await axios.post('http://localhost:5000/payments/registerPayment', {
        studentId,
        paymentMethod,
        amountPaid: Number(amountPaid),
        discount: Number(discount),
        discountType,
      });
      setReceipt(paymentResponse.data.payment);

      // Add the additional fee if applicable
      if (additionalFeeType && additionalFeeAmount) {
        await axios.post('http://localhost:5000/payments/addStudentSpecificFee', {
          studentId,
          feeType: additionalFeeType,
          amount: Number(additionalFeeAmount),
        });
      }

      setErrorMessage('');
    } catch (error) {
      setReceipt(null);
      setErrorMessage(error.response?.data?.message || 'Error registering payment');
    }
  };

  // Handle printing of the receipt
  const handlePrintReceipt = () => {
    const doc = new jsPDF();
    doc.text('Payment Receipt', 20, 10);

    doc.autoTable({
      head: [['Field', 'Value']],
      body: [
        ['Student ID', receipt.studentId],
        ['Student Name', receipt.studentName],
        ['Class', receipt.class],
        ['Payment Method', receipt.paymentMethod],
        ['Amount Paid', `₹${receipt.amountPaid}`],
        ['Discount', discountType === 'percentage' ? `${discount}%` : `₹${discount}`],
        ['Balance Amount', `₹${receipt.balanceAmount}`],
      ],
    });

    doc.save('receipt.pdf'); // Save the PDF
  };

  return (
    <div className="payment-form-container">
      <h2 className="form-heading">Student Payment Form</h2>
      <form onSubmit={handleSubmit} className="payment-form">
        {/* Student Details Section */}
        <div className="form-section">
          <h3 className="section-title">Student Information</h3>
          <label>
            Student ID:
            <input
              type="text"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              required
              className="form-input"
            />
          </label>
        </div>

        {/* Payment Details Section */}
        <div className="form-section">
          <h3 className="section-title">Payment Details</h3>
          <label>
            Payment Method:
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="form-input"
            >
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
              className="form-input"
              placeholder="Enter amount"
            />
          </label>
          <label>
            Discount:
            <input
              type="number"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
              className="form-input"
              placeholder="Enter discount"
            />
          </label>
          <label>
            Discount Type:
            <select
              value={discountType}
              onChange={(e) => setDiscountType(e.target.value)}
              className="form-input"
            >
              <option value="fixed">Fixed Amount</option>
              <option value="percentage">Percentage</option>
            </select>
          </label>
        </div>

        {/* Additional Fee Section */}
        <div className="form-section">
          <h3 className="section-title">Additional Fee (Optional)</h3>
          <label>
            Fee Type:
            <input
              type="text"
              value={additionalFeeType}
              onChange={(e) => setAdditionalFeeType(e.target.value)}
              className="form-input"
              placeholder="Enter fee type (e.g. Uniform)"
            />
          </label>
          <label>
            Fee Amount:
            <input
              type="number"
              value={additionalFeeAmount}
              onChange={(e) => setAdditionalFeeAmount(e.target.value)}
              className="form-input"
              placeholder="Enter fee amount"
            />
          </label>
        </div>

        <button type="submit" className="submit-button">Submit Payment</button>
      </form>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      {receipt && (
        <div className="receipt-container">
          <h3 className="receipt-title">Payment Receipt</h3>
          <p><strong>Student ID:</strong> {receipt.studentId}</p>
          <p><strong>Student Name:</strong> {receipt.studentName}</p>
          <p><strong>Class:</strong> {receipt.class}</p>
          <p><strong>Payment Method:</strong> {receipt.paymentMethod}</p>
          <p><strong>Amount Paid:</strong> ₹{receipt.amountPaid}</p>
          <p><strong>Discount:</strong> {discountType === 'percentage' ? `${discount}%` : `₹${discount}`}</p>
          <p><strong>Balance Amount:</strong> ₹{receipt.balanceAmount}</p>

          {/* Add Print Button */}
          <button className="print-button" onClick={handlePrintReceipt}>Print Receipt</button>
        </div>
      )}
    </div>
  );
};

export default PaymentForm;
