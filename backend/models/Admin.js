const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

// Admin schema definition
const AdminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: Date },
});

// Static method to generate a simple initial password
AdminSchema.statics.generateInitialPassword = function () {
  return crypto.randomBytes(8).toString('hex'); // Generate an 8-byte random password
};

// Static method to generate password reset token
AdminSchema.statics.generatePasswordResetOTP = function () {
  // Generate a 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  // Hash the OTP (you can store the hashed version in the database)
  const hashedOTP = crypto.createHash('sha256').update(otp).digest('hex');

  return { otp, hashedOTP };
};

// Middleware to hash the password before saving
AdminSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
module.exports = mongoose.model('Admin', AdminSchema);
