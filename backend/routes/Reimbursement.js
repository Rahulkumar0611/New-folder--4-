const express = require('express');
const router = express.Router();
const Reimbursement = require('../models/Reimbursement'); 
router.post('/register', async (req, res) => {
  try {
    const {
      staffcode, 
      staffname, 
      location, 
      department, 
      expensetype, 
      remarks, 
      requesteddate,
      requestedamount, 
      approvedamount, 
      rejectedamount, 
      statusofapproval, 
      paid, 
      paiddate
    } = req.body;

    const newReimbursement = new Reimbursement({
      staffcode, 
      staffname, 
      location, 
      department, 
      expensetype, 
      remarks, 
      requesteddate,
      requestedamount, 
      approvedamount, 
      rejectedamount, 
      statusofapproval, 
      paid, 
      paiddate
    });

    await newReimbursement.save();
    res.status(201).json({ message: 'Reimbursement Details Added' });
  } catch (error) {
    res.status(500).json({ message: 'Error Adding Reimbursement Details', error });
  }
});
router.get('/allrecords', async (req, res) => {
    try {
      const reimbursements = await Reimbursement.find(); // Fetch all records
      res.status(200).json(reimbursements);
    } catch (error) {
      res.status(500).json({ message: 'Error Fetching Reimbursement Details', error });
    }
  });
module.exports = router; 
