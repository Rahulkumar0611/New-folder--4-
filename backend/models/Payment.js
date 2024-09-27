const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
  studentId: { type: String, required: true, ref: 'Student' }, // Reference to the Student model
  studentName: { type: String, required: true },
  class: { type: String, required: true },
  paymentDate: { type: Date, default: Date.now },
  paymentMethod: { type: String, required: true }, // E.g., "Cash", "Bank Transfer", "Credit Card"
  amountPaid: { type: Number, required: true },
  balanceAmount: { type: Number, default: 0 }, // Add balance amount
});

module.exports = mongoose.model('Payment', PaymentSchema);
