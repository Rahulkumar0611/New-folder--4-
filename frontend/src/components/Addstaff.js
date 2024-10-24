import React, { useState } from 'react';
import "../style/addstaff.css";
import { useNavigate } from "react-router-dom";

const CreateEmployee = () => {
  const navigate = useNavigate();
  const [currentSection, setCurrentSection] = useState(1);

  // State variables for form fields
  const [id, setId] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [alternatePhone, setAlternatePhone] = useState('');
  const [department, setDepartment] = useState('');
  const [address, setAddress] = useState({
    street: '',
    city: '',
    state: '',
    zipCode: ''
  });

  const handleNext = () => {
    if (currentSection < 6) {
      setCurrentSection(currentSection + 1);
    }
  };

  const handlePrevious = () => {
    if (currentSection > 1) {
      setCurrentSection(currentSection - 1);
    }
  };

  const handleImageClick = () => {
    navigate("/dashboard/staff");
  };

  return (
    <div className='staffmain'>
      <div className='staffheading'>
        <h4>Create Employee</h4>
        <img
          src="https://img.icons8.com/?size=100&id=13903&format=png&color=000000"
          onClick={handleImageClick}
          alt="Student icon"
        />
      </div>

      <div className="tabs">
        <button className={currentSection === 1 ? 'active' : ''}>Personal Details</button>
        <button className={currentSection === 2 ? 'active' : ''}>Official Details</button>
        <button className={currentSection === 3 ? 'active' : ''}>PF and ESI</button>
        <button className={currentSection === 4 ? 'active' : ''}>Leave Details</button>
        <button className={currentSection === 5 ? 'active' : ''}>Other Info</button>
        <button className={currentSection === 6 ? 'active' : ''}>Salary Details</button>
      </div>

      {currentSection === 1 && (
        <div>

          <div class="detail-container">
            <div className='div1Details'>
              <div class="form-detail">
                <label for="address1">Id</label>
                <input type="text" id="address1" name="address1" />
              </div>
              <div class="form-detail">
                <label for="phone">Phone</label>
                <input type="text" id="phone" name="phone" />
              </div>
              <div class="form-detail">
                <label for="address2">Emergency Number</label>
                <input type="text" id="address2" name="address2" />
              </div>
              <div class="form-detail">
                <label for="mobile">City</label>
                <input type="text" id="mobile" name="mobile" />
              </div>
              <div class="form-detail">
                <label for="mobile">Address</label>
                <input type="text" id="mobile" name="mobile" />
              </div>

            </div>
            <div>
              <div class="form-detail">
                <label for="city">Personal email address</label>
                <input type="text" id="city" name="city" />
              </div>
              <div class="form-detail">
                <label for="email">PAN No</label>
                <input type="email" id="email" name="email" />
              </div>
              <div class="form-detail">
                <label for="state">Aadhar No</label>
                <input type="email" id="email" name="email" />
              </div>
              <div class="form-detail">
                <label for="marital-status">Marital Status:</label>
                <select id="marital-status" name="maritalStatus">
                  <option value="single">Single</option>
                  <option value="married">Married</option>
                  <option value="divorced">Divorced</option>
                </select>
              </div>

              <div class="form-detail">
                <label for="bloodGroup">Blood Group:</label>
                <select id="bloodGroup" name="bloodGroup">
                  <option value="" disabled selected>-- Select --</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="A1+">A1+</option>
                  <option value="A1-">A1-</option>
                  <option value="A2+">A2+</option>
                  <option value="A2-">A2-</option>
                  <option value="A1B+">A1B+</option>
                  <option value="A1B-">A1B-</option>
                  <option value="A2B+">A2B+</option>
                  <option value="A2B-">A2B-</option>
                  <option value="RH+">RH+</option>
                  <option value="RH-">RH-</option>
                </select>

              </div>


            </div>

          </div>

        </div>

      )}

      {currentSection === 2 && (
       
       <div>

       <div class="detail-container">
         <div className='div1Details'>
           <div class="form-detail">
             <label for="address1">Joining Date</label>
             <input type="date" id="address1" name="address1" />
           </div>
           <div class="form-detail">
             <label for="phone">Confirmation Period</label>
             <input type="text" id="phone" name="phone" />
           </div>
           <div class="form-detail">
           <label for="jobType">Job Type:</label>
<select id="jobType" name="jobType">
    <option value="" disabled selected>-- Select --</option>
    <option value="Probation">Probation</option>
    <option value="Permanent">Permanent</option>
    <option value="Contract">Contract</option>
    <option value="Consultant">Consultant</option>
    <option value="Pensioner">Pensioner</option>
    <option value="Family Pensioner">Family Pensioner</option>
</select>
           </div>
           <div class="form-detail">
             <label for="mobile">Department</label>
             <input type="text" id="mobile" name="mobile" />
           </div>
           <div class="form-detail">
             <label for="mobile">Designation</label>
             <input type="text" id="mobile" name="mobile" />
           </div>
           <div class="form-detail">
             <label for="mobile">Resignation date</label>
             <input type="date" id="mobile" name="mobile" />
           </div>

         </div>
         <div>
           <div class="form-detail">
             <label for="city">Location</label>
             <input type="text" id="city" name="city" />
           </div>
           <div class="form-detail">
             <label for="email">Staff Salary bank Account</label>
             <select id="bloodGroup" name="bloodGroup">
             <option value="">ICICI Bank</option></select>
           </div>
           <div class="form-detail">
             <label for="state">IFSC code</label>
             <input type="email" id="email" name="email" />
           </div>
           <div class="form-detail">
             <label for="marital-status">Pay salary from</label>
             <select id="bloodGroup" name="bloodGroup">
             <option value="">ICICI Bank</option></select>
           </div>

           <div class="form-detail">
             <label for="bloodGroup">Salary Payment mode</label>
             <select id="bloodGroup" name="bloodGroup">
               
              
               <option value="">Bank Transfer</option>
               <option value="">Cheque</option>
               <option value="">Cash</option>
             </select>

           </div>

<div class="form-detail">
             <label for="mobile">Last working date</label>
             <input type="date" id="mobile" name="mobile" />
           </div>

         </div>

       </div>

     </div>
      )}
      {currentSection === 3 && (
        <div>
          <h3>PF and ESI</h3>
          {/* Form Fields for PF and ESI */}
        </div>
      )}
      {currentSection === 4 && (
        <div>
          <h3>Leave Details</h3>
          {/* Form Fields for Leave Details */}
        </div>
      )}
      {currentSection === 5 && (
        <div>
          <h3>Other Info</h3>
          <div class="other-detail">
             <label for="bloodGroup">Please Select</label>
             <select id="bloodGroup" name="bloodGroup">
               
              
               <option value="">guardian</option>
               <option value="">Husband Name</option>
               <option value="">Wife Name</option>
              
             </select>
             <input type="text" id="city" name="city" />
           </div>
        </div>
      )}
      {currentSection === 6 && (
        <div>
          <h3>Salary Details</h3>
          {/* Form Fields for Salary Details */}
        </div>
      )}
      <div className='btndetail'>
        <button onClick={handlePrevious} disabled={currentSection === 1}>
          Previous
        </button>
        <button onClick={handleNext} disabled={currentSection === 6}>
          Next
        </button>
      </div>
    </div>
  );
};

export default CreateEmployee;
