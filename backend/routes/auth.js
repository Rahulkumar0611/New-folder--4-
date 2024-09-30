const express = require('express');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const emailConfig = require('../config/email'); 
const Admin = require('../models/Admin');
const Payment = require('../models/Payment');
const Student = require('../models/Student');
const CourseFee = require('../models/CourseFee');

const transporter = nodemailer.createTransport(emailConfig);



// const sendMail = require('../utils/mailer'); // Mailer utility

const router = express.Router();

router.post('/login', async (req, res) => {
  try {
    const { email, password, role } = req.body; // Get role from request body

    if (!email || !password || !role) {
      return res.status(400).json({ error: 'Email, password, and role are required' });
    }

    if (role === 'superadmin') {
      // Hardcoded Super Admin credentials
      const superAdminEmail = 'superadmin@example.com';
      const superAdminPassword = 'superadminpassword'; // Replace with your actual password

      if (email === superAdminEmail && password === superAdminPassword) {
        // Return Super Admin data
        
        return res.status(200).json({
          message: 'Super Admin login successful',
          user: {
            email: superAdminEmail,
            role: 'superadmin'
          }
        });
      } else {
        return res.status(401).json({ error: 'Invalid Super Admin credentials' });
      }
    }

    // Find user by email for Admin login
    const user = await Admin.findOne({ email });
    if (!user) {
      console.log('User not found:', email);
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Compare the provided password with the hashed password stored in the database
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      console.log('Password mismatch for user:', email);
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Return Admin user data on successful login
    res.status(200).json({
      message: 'Admin login successful',
      user: {
        email: user.email,
        role: 'admin'
      }
    });
  } catch (error) {
    console.error('Error during login:', error.message || error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// create Student data
router.post('/addStudent', async (req, res) => {
  try {
    const { _id, Firstname, Middlename,Lastname, Class, Section, Fathersname, Mothersname, Phone, AlternatePhone, Address } = req.body;

    const newStudent = new Student({ _id, Firstname, Middlename,Lastname, Class, Section, Fathersname, Mothersname, Phone, AlternatePhone, Address })
    await newStudent.save();

    res.status(201).json({ message: 'Student Added' });
  } catch (error) {
    res.status(500).json({ message: 'Error Adding Student', error });
  }
});
// for bulk import
router.post('/addStudentbulk', async (req, res) => {
  try {
    const students = req.body; // Expecting an array of students

    // Use insertMany for bulk insertion
    await Student.insertMany(students);

    res.status(201).json({ message: 'Students Added Successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error Adding Students', error });
  }
});
// get all student data
router.get('/getStudent', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// Update Student Api
router.put('/updateStudent', async (req, res) => {
  try {
    const { id } = req.query; // Get student ID from query parameters
    const updatedDetails = req.body; // Get updated data from request body

    // Find the student by ID and update with new details
    const student = await Student.findOneAndUpdate({ Id: id }, updatedDetails, { new: true, runValidators: true });

    // Check if student exists
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Return updated student data
    res.json({ message: 'Student updated successfully', student });
  } catch (error) {
    // Handle errors
    console.error('Error updating student:', error);
    res.status(400).json({ message: 'Error updating student', error });
  }
});
// find Student by id
router.get('/findById', async (req, res) => {
  try {
    // Extracting the ID from the query object
    const studentId = req.query.Id; // Use the exact case as in the URL parameter
    if (!studentId) {
      return res.status(400).json({ message: 'ID parameter is required' });
    }

    // Use the correct format: req.query.Id to get the ID value
    const student = await Student.findById(studentId);

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.json(student);
  } catch (error) {
    console.error('Error fetching student:', error); // Log the error for debugging
    res.status(500).json({ message: error.message });
  }
});
router.get('/findByName', async (req, res) => {
  try {
    // Log query parameters for debugging
    // console.log('Received query:', req.query);
    const studentName = req.query.name;

    // Validate that the name parameter is a string
    if (typeof studentName !== 'string') {
      return res.status(400).json({ message: 'Invalid name parameter' });
    }

    // Query for students by name
    const students = await Student.find({ name: studentName });

    if (students.length === 0) {
      return res.status(404).json({ message: 'No students found with that name' });
    }

    res.json(students);
  } catch (error) {
    console.error('Error fetching students:', error); // Log error details
    res.status(500).json({ message: error.message });
  }
});


//Delete Student Data
router.delete('/deleteStudent', async (req, res) => {
  try {
    const { _id } = req.query; // Get student ID from URL parameters

    // Find the student by ID and delete
    const student = await Student.findOneAndDelete({ Id: _id });

    // Check if student exists
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Return success message
    res.json({ message: 'Student deleted successfully' });
  } catch (error) {
    // Handle errors
    console.error('Error deleting student:', error);
    res.status(400).json({ message: 'Error deleting student', error });
  }
})


// Create Admin and Send Email with Credentials

router.post('/create-admin', async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  try {
    // Use the Admin model's method to generate an initial password
    const initialPassword = Admin.generateInitialPassword();
    console.log('Generated Password:', initialPassword);

    // Create the admin with the initial password (will be hashed automatically)
    const newAdmin = new Admin({ email, password: initialPassword });
    await newAdmin.save();

    // Send credentials via email
    const mailOptions = {
      from: process.env.EMAIL_USER, // Ensure this is correctly set in your environment variables
      to: email,
      subject: 'Welcome to the School-Billing System',
      text: `Welcome! Here are your login credentials:\n\nEmail: ${email}\nPassword: ${initialPassword}\n\nPlease log in and change your password as soon as possible.`,
    };
    

    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully.');

    res.status(201).json({ message: 'Admin created', initialPassword }); // Include the initial password in the response for testing (be cautious with this in production)
  } catch (error) {
    console.error('Error creating admin:', error);
    res.status(500).json({ message: 'Error creating admin', error: error.message || error });
  }
});


// Change Password Route
router.post('/change-password', async (req, res) => {
  const { oldPassword, newPassword, repeatPassword } = req.body; // Only require old and new passwords

  // Check if all required fields are provided
  if (!oldPassword || !newPassword || !repeatPassword) {
    return res.status(400).json({ message: 'Old password, new password, and repeated password are required' });
  }

  // Check if new password and repeated password match
  if (newPassword !== repeatPassword) {
    return res.status(400).json({ message: 'New password and repeated password do not match' });
  }

  try {
    // Assuming you have a way to get the admin (e.g., from the session)
    const admin = await Admin.findOne({ /* criteria to find logged in admin */ });

    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    // Check if the old password is correct
    const isOldPasswordCorrect = await bcrypt.compare(oldPassword, admin.password);

    if (!isOldPasswordCorrect) {
      return res.status(400).json({ message: 'Old password is incorrect' });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the admin's password in the database
    const updateResult = await Admin.updateOne({ email: admin.email }, { password: hashedPassword });

    // Check if the update was successful
    if (updateResult.modifiedCount === 0) {
      return res.status(500).json({ message: 'Failed to update password. Please try again.' });
    }

    // Send confirmation email
    const mailOptions = {
      from: process.env.EMAIL_USER, // Your email
      to: admin.email, // Admin's email
      subject: 'Password Changed Successfully',
      text: 'Your password has been changed successfully.',
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log('Error sending email: ', error);
      }
      console.log('Email sent: ' + info.response);
    });

    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Error updating password:', error);
    res.status(500).json({ message: 'Error updating password', error: error.message || 'An unexpected error occurred.' });
  }
});

// Course Details
router.post('/addCourseFee', async (req, res) => {
  try {
    const { Class, fees } = req.body;

    // Validate that fees array is not empty
    if (!fees || fees.length === 0) {
      return res.status(400).json({ error: 'At least one fee type is required.' });
    }

    // Create the new CourseFee document
    const newCourseFee = new CourseFee({
      Class,
      fees,
    });

    // Save the CourseFee document to the database
    await newCourseFee.save();

    res.status(201).json({ message: 'Course Fee details added successfully', newCourseFee });
  } catch (error) {
    console.error('Error adding course fee:', error);
    res.status(400).json({ error: 'Failed to add course fee.' });
  }

});
router.get('/findByClass', async (req, res) => {
  try {
    const studentClass = req.query.class;

    if (!studentClass) {
      return res.status(400).json({ message: 'Class parameter is required' });
    }

    const courseFees = await CourseFee.findOne({ class: studentClass });

    if (!courseFees) {
      return res.status(404).json({ message: 'No course fees found for this class' });
    }

    res.json(courseFees);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});




module.exports = router;
