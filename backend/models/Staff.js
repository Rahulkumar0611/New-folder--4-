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
  alternatePhone: {
    type: String
  },
  department: {
    type: String,
    required: true
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
