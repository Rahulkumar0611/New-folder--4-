// routes/permissionsRoutes.js
const express = require('express');
const mongoose = require('mongoose');
const Permission = require('../models/Permission');

const router = express.Router();

// Create permissions
router.post('/', async (req, res) => {
  try {
    const permission = new Permission(req.body);
    await permission.save();
    res.status(201).json(permission);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get permissions by adminId
router.get('/:adminId', async (req, res) => {
  try {
    const permissions = await Permission.findOne({ adminId: req.params.adminId });
    if (!permissions) return res.status(404).json({ message: 'Permissions not found' });
    res.status(200).json(permissions);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update permissions by adminId
router.put('/:adminId', async (req, res) => {
  try {
    const permissions = await Permission.findOneAndUpdate(
      { adminId: req.params.adminId },
      req.body,
      { new: true, runValidators: true }
    );
    if (!permissions) return res.status(404).json({ message: 'Permissions not found' });
    res.status(200).json(permissions);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete permissions by adminId
router.delete('/:adminId', async (req, res) => {
  try {
    const permissions = await Permission.findOneAndDelete({ adminId: req.params.adminId });
    if (!permissions) return res.status(404).json({ message: 'Permissions not found' });
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
