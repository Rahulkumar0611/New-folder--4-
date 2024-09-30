const mongoose = require('mongoose');

const SettingsSchema = new mongoose.Schema({
  schoolName: {
    type: String,
    required: true,
  },
  address: {
    type: String,
  },
  contactInfo: {
    type: String,
  },
  schoolYear: {
    type: String,
  },
  logo: {
    type: String, 
  },
  description: {
    type: String,
  }
}, { timestamps: true });

module.exports = mongoose.model('Settings', SettingsSchema);
