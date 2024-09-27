const express = require('express');
const router = express.Router();
const Staff = require('../models/Staff');

// Add new staff
router.post('/add', async (req, res) => {
  try {
    const newStaff = new Staff(req.body);
    await newStaff.save();
    res.status(201).json({ message: 'Staff added successfully!', staff: newStaff });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all staff
router.get('/all', async (req, res) => {
  try {
    const staffList = await Staff.find();
    res.status(200).json(staffList);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get staff by ID
router.get('/getById/:id', async (req, res) => {
  try {
    const staff = await Staff.findById(req.params.id);
    if (!staff) {
      return res.status(404).json({ message: 'Staff not found!' });
    }
    res.status(200).json(staff);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get staff by name
router.get('/getByName', async (req, res) => {
  try {
    const { firstName, lastName } = req.query;
    const staff = await Staff.find({
      firstName: new RegExp(firstName, 'i'),
      lastName: new RegExp(lastName, 'i')
    });
    res.status(200).json(staff);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update staff details
router.put('/update/:id', async (req, res) => {
  try {
    const staff = await Staff.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!staff) {
      return res.status(404).json({ message: 'Staff not found!' });
    }
    res.status(200).json({ message: 'Staff details updated successfully!', staff });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete staff
router.delete('/delete/:id', async (req, res) => {
  try {
    const staff = await Staff.findByIdAndDelete(req.params.id);
    if (!staff) {
      return res.status(404).json({ message: 'Staff not found!' });
    }
    res.status(200).json({ message: 'Staff deleted successfully!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
