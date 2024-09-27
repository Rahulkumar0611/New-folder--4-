const mongoose = require('mongoose');

const ReimbursementSchema= new mongoose.Schema ({
    staffcode: {
        type: String,
        required: true,
      },
      staffname:{
        type:String,
        required:true
      },
      location:{
        type:String,
        required:true,
      },
      department:{
        type:String,
        required:true
      },
      expensetype:{
        type:String,
        required:true
      },
      remarks:{
        type:String,
        required:true
      },
      requesteddate:{
        type:Date,
        required:true
      },
      requestedamount:{
         type:Number,
         required:true
      },
      approvedamount:{
        type:Number,
        required:true
      },
      rejectedamount:{
        type:Number,
        required:true
      },
      statusofapproval:{
        type:String,
        required:true
      },
      paid:{
        type:Boolean,
        required:true
      },
      paiddate:{
        type:Date,
        required:true
      }
})
module.exports = mongoose.model('reimbursement', ReimbursementSchema);
