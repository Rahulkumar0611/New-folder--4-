const express=require('express')
const router=express.Router();
const Admin=require('../models/Admin');

router.get('/adminss', async(req,res)=>{
    try{
        const admins=await Admin.find();
        res.status(200).json({admins});
    }catch(error){
         console.error(error);
         res.status(500).json({ message: 'Error fetching admins', error });
    }
})

// Update admin status by ID
router.put('/admins/:id', async (req, res) => {
  const { id } = req.params; // Admin ID from the request URL
  const { status } = req.query; // New status from the query parameter

  try {
    // Ensure that the status parameter is provided
    if (!status) {
      return res.status(400).json({ message: 'Status query parameter is required' });
    }

    // Find the admin by ID and update the status
    const admin = await Admin.findByIdAndUpdate(id, { status }, { new: true });

    // If no admin is found, return a 404 error
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    // Return the updated admin data
    res.status(200).json({ message: 'Admin status updated successfully', admin });
  } catch (error) {
    console.error('Error updating admin status:', error);
    res.status(500).json({ message: 'Error updating admin status', error });
  }
});


module.exports = router;

module.exports=router;