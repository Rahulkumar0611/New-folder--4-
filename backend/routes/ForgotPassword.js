const express = require('express');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const Admin = require('../models/Admin');
const router = express.Router();
require('dotenv').config(); // Load environment variables

// POST: Request Password Reset (with OTP)
router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;

  try {
    // Check if the admin exists
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    // Generate an OTP
    const { otp, hashedOTP } = Admin.generatePasswordResetOTP();

    // Set the hashed OTP and expiration in the database
    admin.resetPasswordToken = hashedOTP;
    admin.resetPasswordExpires = Date.now() + 3600000; // 1 hour expiration
    await admin.save();

    // Send the OTP via email (Nodemailer setup)
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USER, // Fetch email from .env
        pass: process.env.EMAIL_PASS, // Fetch email password from .env
      },
    });

    const mailOptions = {
      to: admin.email,
      from: process.env.EMAIL_USER, // Use the same email as the sender
      subject: 'Password Reset Request (OTP)',
      text: `You requested a password reset. Please use the following OTP to reset your password:\n\n
             OTP: ${otp}\n\n
             This OTP will expire in 1 hour.\n\n
             If you did not request this, please ignore this email.`,
    };

    transporter.sendMail(mailOptions, (err) => {
      if (err) {
        console.error('Error sending email:', err);
        return res.status(500).json({ message: 'Error sending email' });
      }
      res.json({ message: 'OTP sent to email' });
    });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST: Reset Password (using OTP)
router.post('/reset-password', async (req, res) => {
  const { otp, newPassword } = req.body;

  try {
    // Hash the OTP (as stored in the database)
    const hashedOTP = crypto.createHash('sha256').update(otp).digest('hex');

    // Find the admin by the hashed OTP and check if the OTP has expired
    const admin = await Admin.findOne({
      resetPasswordToken: hashedOTP,
      resetPasswordExpires: { $gt: Date.now() }, // Ensure OTP hasn't expired
    });

    if (!admin) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    // Set the new password
    admin.password = newPassword;
    admin.resetPasswordToken = undefined;
    admin.resetPasswordExpires = undefined;

    // Save the updated admin record
    await admin.save();

    res.json({ message: 'Password successfully updated' });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
