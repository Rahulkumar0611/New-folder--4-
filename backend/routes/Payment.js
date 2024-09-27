const express = require('express');
const router = express.Router();
const Payment = require('../models/Payment');
const Student = require('../models/Student');
const CourseFee = require('../models/CourseFee');

// Register a new payment
router.post('/registerPayment', async (req, res) => {
  try {
    const { studentId, paymentMethod, amountPaid, discount = 0, discountType = 'fixed' } = req.body;

    // Fetch student details
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Fetch course fee details for the student's class
    const courseFee = await CourseFee.findOne({ Class: student.Class });
    if (!courseFee) {
      return res.status(404).json({ message: 'Course fee details not found for the specified class' });
    }

    // Calculate discounted fee
    let discountAmount = 0;
    const totalFee = courseFee.totalAmount;
    
    if (discountType === 'percentage') {
      discountAmount = (discount / 100) * totalFee; // Percentage discount
    } else {
      discountAmount = discount; // Fixed discount
    }

    const payableAmount = totalFee - discountAmount; // Total after applying the discount

    // Fetch all previous payments by the student
    const payments = await Payment.find({ studentId });
    const totalPaid = payments.reduce((acc, payment) => acc + payment.amountPaid, 0);
    
    // Calculate balance amount
    const balanceAmount = payableAmount - totalPaid - amountPaid;

    // Create a new payment record
    const payment = new Payment({
      studentId: student._id,
      studentName: `${student.Firstname} ${student.Lastname}`,
      class: student.Class,
      paymentMethod,
      amountPaid,
      balanceAmount: balanceAmount >= 0 ? balanceAmount : 0, // Prevent negative balance
      discountAmount,
    });

    // Save payment to database
    await payment.save();

    res.status(201).json({ message: 'Payment registered successfully', payment });
  } catch (error) {
    console.error('Error registering payment:', error);
    res.status(500).json({ message: 'Failed to register payment', error });
  }
});

// Get payments and balance for a student
router.get('/payments/:studentId', async (req, res) => {
  try {
    const { studentId } = req.params; // Correctly using req.params to get studentId
    const payments = await Payment.find({ studentId });
    
    if (!payments.length) {
      return res.status(404).json({ message: 'No payments found for this student' });
    }

    // Fetch student details
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Fetch course fee details for the student's class
    const courseFee = await CourseFee.findOne({ Class: student.Class });
    if (!courseFee) {
      return res.status(404).json({ message: 'Course fee details not found for the specified class' });
    }

    // Calculate the total amount paid and balance
    const totalFee = courseFee.totalAmount;
    const totalPaid = payments.reduce((acc, payment) => acc + payment.amountPaid, 0);
    const balanceAmount = totalFee - totalPaid;

    res.status(200).json({
      payments,
      balanceAmount,
    });
  } catch (error) {
    console.error('Error fetching payments:', error);
    res.status(500).json({ message: 'Failed to fetch payments', error });
  }
});

module.exports = router;
