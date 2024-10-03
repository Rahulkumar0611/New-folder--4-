const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth'); 
const paymentRoutes=require('./routes/Payment.js')
const reportsroute=require('./routes/reports.js')
const forgotpasswordroute=require('./routes/ForgotPassword.js')
const settingroute=require('./routes/Settings.js')
const Reimbursementroute=require('./routes/Reimbursement.js');
const staffroute=require('./routes/Staff.js');
const superadminroute=require('./routes/SuperAdmin.js');
const Permissionroute=require('./routes/Permission.js')
// require('dotenv').config();


const app = express();
app.use(cors());
app.use(express.json());


app.use('/auth', authRoutes); 
app.use('/payments',paymentRoutes)
app.use('/reports',reportsroute)
app.use('/password',forgotpasswordroute)
app.use('/settings',settingroute)
app.use('/reimbursement',Reimbursementroute)
app.use('/staff',staffroute)
app.use('/superadmin',superadminroute)
app.use('/permission',Permissionroute)

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/schoolBilling',)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
