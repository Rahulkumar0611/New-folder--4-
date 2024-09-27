import React, { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import AddIcon from '@mui/icons-material/Add';
import "../style/StaffManagement.css"


const StaffManagement = () => {
  const [reimbursementData, setReimbursementData] = useState([]);

  // Callback to update reimbursement data after form submission
  const handleReimbursementSubmit = (data) => {
    setReimbursementData(prevData => [...prevData, data]);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:5000/reimbursement/allrecords`)
      .then((res) => {
        setReimbursementData(res.data);
      })
      .catch((err) => {
        console.error('Error fetching staff data:', err);
      });
  }, []);

  return (
    <div className='ReimbursementDetails-table-main'>
      <h3>Reimbursement Details</h3>
      
<Link id="add-ReimbursementDetails-link" to="/Dashboard/AddReimbursementDetails">
  <AddIcon /> Add Reimbursement
</Link>


      
      {/* <ReimbursementDetails onSubmit={handleReimbursementSubmit} /> */}
      
      {reimbursementData.length > 0 && (
        <div className="ReimbursementDetails-table">
          
          <table border="1">
            <thead>
              <tr>
                <th>Staff Code</th>
                <th>Staff Name</th>
                <th>Location</th>
                <th>Department</th>
                <th>Expense Type</th>
                <th>Remarks</th>
                <th id='th5'>Actions</th>
                {/* <th>Requested Date</th>
                <th>Requested Amount</th>
                <th>Approved Amount</th>
                <th>Rejected Amount</th>
                <th>Status of Approval</th>
                <th>Paid</th>
                <th>Paid Date</th> */}
              </tr>
            </thead>
            <tbody>
              {reimbursementData.map((data, index) => (
                <tr key={index}>
                  <td>{data.staffcode}</td>
                  <td>{data.staffname}</td>
                  <td>{data.location}</td>
                  <td>{data.department}</td>
                  <td>{data.expensetype}</td>
                  <td>{data.remarks}</td>
                  <td>
                  <button  className="view-button">
                    View
                  </button>
                </td>
                  {/* <td>{data.requesteddate}</td>
                  <td>{data.requestedamount}</td>
                  <td>{data.approvedamount}</td>
                  <td>{data.rejectedamount}</td>
                  <td>{data.statusofapproval}</td>
                  <td>{data.paid}</td>
                  <td>{data.paiddate}</td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default StaffManagement;
