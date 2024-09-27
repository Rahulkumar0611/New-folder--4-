import React, { useState } from 'react';
import "../style/ReimbursementDetails.css"
import axios from 'axios';

const AddReimbursementDetails = () => {
  const [staffcode, setStaffcode] = useState("");
  const [staffname, setStaffname] = useState("");
  const [location, setLocation] = useState("");
  const [department, setDepartment] = useState("");
  const [expensetype, setExpensetype] = useState("");
  const [remarks, setRemarks] = useState("");
  const [requesteddate, setRequesteddate] = useState("");
  const [requestedamount, setRequestedamount] = useState("");
  const [approvedamount, setApprovedamount] = useState("");
  const [rejectedamount, setRejectedamount] = useState("");
  const [statusofapproval, setStatusofapproval] = useState("");
  const [paid, setPaid] = useState("");
  const [paiddate, setPaiddate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const reimbursementData = {
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
    };
    // For now, just log the data to the console. Later, you can integrate an API call.
    console.log(reimbursementData);
  };
  const data = { staffcode,staffname,location , department,expensetype,remarks,   requesteddate, requestedamount, approvedamount,rejectedamount,statusofapproval,paid,paiddate};


  const StaffSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:5000/reimbursement/register`, data)
      .then((res) => {
        alert("Form Submitted Successfully");
        console.log(res);
      })
      .catch((err) => {
        alert("Invalid Input");
        console.log(err);
      });
  };




  return (
    <div className='ReimbursementDetails-main'>
      <h2>Enter Reimbursement Details</h2>
      <form onSubmit={StaffSubmit}  className="ReimbursementDetails-form">
        <div className='ReimbursementDetails-container'>
          <label>Staff Code: </label>
          <input type="text" value={staffcode} onChange={(e) => setStaffcode(e.target.value)} />
        </div>
        <div>
          <label>Staff Name: </label>
          <input type="text" value={staffname} onChange={(e) => setStaffname(e.target.value)} />
        </div>
        <div>
          <label>Location: </label>
          <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
        </div>
        <div>
          <label>Department: </label>
          <input type="text" value={department} onChange={(e) => setDepartment(e.target.value)} />
        </div>
        <div>
          <label>Expense Type: </label>
          <input type="text" value={expensetype} onChange={(e) => setExpensetype(e.target.value)} />
        </div>
        <div>
          <label>Remarks: </label>
          <input type="text" value={remarks} onChange={(e) => setRemarks(e.target.value)} />
        </div>
        <div>
          <label>Requested Date: </label>
          <input type="date" value={requesteddate} onChange={(e) => setRequesteddate(e.target.value)} />
        </div>
        <div>
          <label>Requested Amount: </label>
          <input type="number" value={requestedamount} onChange={(e) => setRequestedamount(e.target.value)} />
        </div>
        <div>
          <label>Approved Amount: </label>
          <input type="number" value={approvedamount} onChange={(e) => setApprovedamount(e.target.value)} />
        </div>
        <div>
          <label>Rejected Amount: </label>
          <input type="number" value={rejectedamount} onChange={(e) => setRejectedamount(e.target.value)} />
        </div>
        <div>
          <label>Status of Approval: </label>
          <input type="text" value={statusofapproval} onChange={(e) => setStatusofapproval(e.target.value)} />
        </div>
        <div>
          <label>Paid: </label>
          <input type="text" value={paid} onChange={(e) => setPaid(e.target.value)} />
        </div>
        <div>
          <label>Paid Date: </label>
          <input type="date" value={paiddate} onChange={(e) => setPaiddate(e.target.value)} />
        </div>
        <button  type="submit">Save</button>
      </form>
    </div>
  );
};

export default AddReimbursementDetails;
