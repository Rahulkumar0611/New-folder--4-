const express=require('express')
const router=express.Router();
const Admin=require('../models/Admin');

router.get('/admins', async(req,res)=>{
    try{
        const admins=await Admin.find();
        res.status(200).json({admins});
    }catch(error){
         console.error(error);
         res.status(500).json({ message: 'Error fetching admins', error });
    }
})
module.exports=router;