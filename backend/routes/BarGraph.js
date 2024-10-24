const express = require('express');
const router = express.Router();
const Student = require('../models/Student'); 
const Staff = require('../models/Staff');
const Payments = require('../models/Payment');

// Combined endpoint for fetching data for bar graphs
router.get('/barGraphData', async (req, res) => {
  const { category } = req.query;

  try {
    if (category === 'Student') {
      // Aggregating the number of students by class
      const studentData = await Student.aggregate([
        {
          $group: {
            _id: "$class", // Grouping by class field
            count: { $sum: 1 }, // Counting the number of students per class
          },
        },
        { $sort: { _id: 1 } } // Sorting by class
      ]);

      // Formatting the data for the frontend
      const labels = studentData.map(item => `Class ${item._id}`);
      const counts = studentData.map(item => item.count);

      res.json({ labels, counts });

    } else if (category === 'Staff') {
      // Aggregating the number of staff by department
      const staffData = await Staff.aggregate([
        {
          $group: {
            _id: "$department", // Grouping by department field
            count: { $sum: 1 }, // Counting the number of staff in each department
          },
        },
        { $sort: { _id: 1 } } // Sorting by department
      ]);

      // Formatting the data for the frontend
      const labels = staffData.map(item => item._id); // Department names
      const counts = staffData.map(item => item.count); // Staff counts

      res.json({ labels, counts });

    } else if (category === 'Payments') {
      // Aggregating the total payments per month
      const paymentData = await Payments.aggregate([
        {
          $group: {
            _id: { $month: "$paymentDate" }, // Grouping by month from payment date
            totalRevenue: { $sum: "$amountPaid" }, // Summing up the amount paid
          },
        },
        { $sort: { "_id": 1 } } // Sorting by month
      ]);

      // Formatting the data for the frontend
      const labels = paymentData.map(item => {
        const months = [
          'January', 'February', 'March', 'April', 'May', 'June', 
          'July', 'August', 'September', 'October', 'November', 'December'
        ];
        return months[item._id - 1]; // Converting month number to month name
      });
      const revenue = paymentData.map(item => item.totalRevenue);

      res.json({ labels, revenue });

    } else {
      res.status(400).json({ message: 'Invalid category specified' });
    }

  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ message: 'Error fetching data' });
  }
});

module.exports = router;
