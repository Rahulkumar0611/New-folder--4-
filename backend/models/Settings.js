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
    type: String, // Store the path or URL to the logo file
  },
  description: {
    type: String,
  }
}, { timestamps: true });

module.exports = mongoose.model('Settings', SettingsSchema);
