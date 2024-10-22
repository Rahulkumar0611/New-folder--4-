const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  _id: { type: String, required: true, unique: true },
  studentName: { type: String, required: true },
  dob: { type: Date, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  class: { type: String, required: true },
  section: { type: String, required: true },
  gender: { type: String, required: true, enum: ['Male', 'Female', 'Other'] },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true },
  aadhaarNumber: { type: String, required: true, unique: true },
  emergencyNumber: { type: String, required: true },
}, { versionKey: false });

module.exports = mongoose.model('Student', studentSchema);
