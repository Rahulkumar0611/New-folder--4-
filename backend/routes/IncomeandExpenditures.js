const express = require('express')
const router = express.Router();
const incomeandExpenditure = require('../models/IncomeandExpenditures')


router.post('/save', async (req, res) => {
    try {
        const { date, description, IncomeAmount, PaymentAmount, BalanceAmount } = req.body
        const newEntry = new incomeandExpenditure({
            date,
            description,
            IncomeAmount,
            PaymentAmount,
            BalanceAmount
        });


        await newEntry.save();


        res.status(201).json({
            message: "Income and expenditure data saved successfully",
            data: newEntry
        });
    } catch (error) {

        res.status(500).json({
            message: "Error saving income and expenditure data",
            error: error.message
        });
    }
});
router.get('/get', async (req, res) => {
    try {

        const entries = await incomeandExpenditure.find();


        res.status(200).json({
            message: "Income and expenditure data fetched successfully",
            data: entries
        });
    } catch (error) {

        res.status(500).json({
            message: "Error fetching income and expenditure data",
            error: error.message
        });
    }
});
// Bulk entry for income and expenditure
router.post('/bulk-upload', async (req, res) => {
    try {
      const entries = req.body; // Expecting an array of entries
  
      // Use insertMany for bulk insertion
      await incomeandExpenditure.insertMany(entries);
  
      res.status(201).json({ message: 'Entries Added Successfully', data: entries });
    } catch (error) {
      console.error('Error adding entries:', error); // Log the error
      res.status(500).json({ message: 'Error Adding Entries', error });
    }
  });
  
  

module.exports = router;
