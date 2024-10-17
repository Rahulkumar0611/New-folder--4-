const mongoose= require('mongoose')

const incomeandExpenditureSchema= new mongoose.Schema({
  date:{type:String, required:true},
  description:{type:String,required:true},
  IncomeAmount:{type:Number,required:true},
  PaymentAmount:{type:Number,required:true},
  BalanceAmount:{type:Number,required:true}

})
module.exports=mongoose.model('IncomeandExpenditures',incomeandExpenditureSchema)