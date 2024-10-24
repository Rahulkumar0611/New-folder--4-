const mongoose = require('mongoose');
const CourseFeeSchema = new mongoose.Schema({
  class: { type: String, required: true },
  fees: [
    {
      feeType: { type: String, required: true },
      amount: { type: Number, required: true },
    },
  ],
  totalAmount: { type: Number, default: 0 }, // Adding totalAmount field
});

// Pre-save hook to calculate the total amount before saving
CourseFeeSchema.pre('save', function (next) {
  this.totalAmount = this.fees.reduce((acc, fee) => acc + fee.amount, 0);
  next();
});

module.exports = mongoose.model('CourseFee', CourseFeeSchema);
