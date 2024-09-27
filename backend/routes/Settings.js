const express = require('express');
const router = express.Router();
const SchoolSettings = require('../models/Settings');

// Route to update or create school settings
router.post('/update', async (req, res) => {
  try {
    const { schoolName, address, contactInfo, schoolYear, logo, description } = req.body;

    // Check if school settings already exist
    let settings = await SchoolSettings.findOne();

    if (settings) {
      // Update existing settings
      settings.schoolName = schoolName || settings.schoolName;
      settings.address = address || settings.address;
      settings.contactInfo = contactInfo || settings.contactInfo;
      settings.schoolYear = schoolYear || settings.schoolYear;
      settings.logo = logo || settings.logo;
      settings.description = description || settings.description;

      await settings.save();
    } else {
      // Create new settings if none exist
      settings = new SchoolSettings({
        schoolName,
        address,
        contactInfo,
        schoolYear,
        logo,
        description,
      });
      await settings.save();
    }

    res.status(200).json({ message: 'School settings updated successfully', settings });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update school settings', error: error.message });
  }
});

// Route to get current school settings
router.get('/get', async (req, res) => {
  try {
    const settings = await SchoolSettings.findOne();
    if (!settings) {
      return res.status(404).json({ message: 'No school settings found' });
    }
    res.status(200).json(settings);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch school settings', error: error.message });
  }
});

module.exports = router;
