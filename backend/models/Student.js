const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  _id: { type: String, required: true, unique: true },
  Firstname: { type: String, required: true },
  Middlename: { type: String },
  Lastname: { type: String, required: true },
  Class: { type: String, required: true },
  Section: { type: String, required: true },
  Fathersname: { type: String, required: true },
  Mothersname: { type: String, required: true },
  Phone: { type: Number, required: true, unique: true },
  AlternatePhone: { type: Number, required: true, unique: true },
  AadhaarNumber: { type: Number, required: true, unique: true },
  Gender: { type: String, required: true, enum: ['Male', 'Female', 'Other'] }, // Restricts gender to specific values
  Address: { type: String, required: true }
}, { versionKey: false });

// Export the model
module.exports = mongoose.model('Student', studentSchema);
