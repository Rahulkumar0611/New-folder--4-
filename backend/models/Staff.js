const mongoose = require('mongoose');

const staffSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
    unique: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true,
    enum: ['teacher', 'administrator', 'accountant', 'support'],
    default: 'teacher'
  },
  department: {
    type: String,
    required: true
  },
  aadhaarnumber:{
    type:String,
    required:true
  },
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String
  },
  dateOfJoining: {
    type: Date,
    default: Date.now
  }
});

const Staff = mongoose.model('Staff', staffSchema);
module.exports = Staff;
