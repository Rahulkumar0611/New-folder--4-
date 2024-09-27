const express = require('express');
const router = express.Router();
const Payment = require('../models/Payment');  // Your updated Payment model

// Get payments report by date range
router.get('/payments', async (req, res) => {
    try {
        const { startDate, endDate, class: studentClass } = req.query;

        let query = {};

        // Filter by date range if provided
        if (startDate && endDate) {
            query.paymentDate = {
                $gte: new Date(startDate),
                $lte: new Date(endDate)
            };
        }

        // Filter by class if provided
        if (studentClass) {
            query.class = studentClass;
        }

        // Fetch payment data
        const payments = await Payment.find(query);

        // Calculate total amount paid and total balance
        const totalPaid = payments.reduce((sum, payment) => sum + payment.amountPaid, 0);
        const totalBalance = payments.reduce((sum, payment) => sum + payment.balanceAmount, 0);

        res.json({ payments, totalPaid, totalBalance });
    } catch (error) {
        res.status(500).json({ message: 'Error generating report', error });
    }
});

module.exports = router;
