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
        <div className='PersonalDiv'>
          <div className="groupforstaff">
            <label htmlFor="id" className="label">ID</label>
            <input
              type="text"
              value={id}
              onChange={(e) => setId(e.target.value)}
              className="inputforstaff"
              id="id"
              placeholder="Enter ID"
              required
            />
          </div>

          <div className="groupforstaff">
            <label htmlFor="firstName" className="label">First Name</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="inputforstaff"
              id="firstName"
              placeholder="First Name"
              required
            />
          </div>

          <div className="groupforstaff">
            <label htmlFor="lastName" className="label">Last Name</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="inputforstaff"
              id="lastName"
              placeholder="Last Name"
              required
            />
          </div>

          <div className="groupforstaff">
            <label htmlFor="email" className="label">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="inputforstaff"
              id="email"
              placeholder="Email"
              required
            />
          </div>

          <div className="groupforstaff">
            <label htmlFor="phone" className="label">Phone</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="inputforstaff"
              id="phone"
              placeholder="Phone"
              required
            />
          </div>

          <div className="groupforstaff">
            <label htmlFor="alternatePhone" className="label">Alternate Phone</label>
            <input
              type="tel"
              value={alternatePhone}
              onChange={(e) => setAlternatePhone(e.target.value)}
              className="inputforstaff"
              id="alternatePhone"
              placeholder="Alternate Phone"
            />
          </div>

          <div className="groupforstaff">
            <label htmlFor="department" className="label">Department</label>
            <input
              type="text"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="inputforstaff"
              placeholder="Department"
              required
            />
          </div>

          <div className="groupforstaff">
            <label htmlFor="address" className="label">Address</label>
            <input
              type="text"
              value={address.street}
              onChange={(e) => setAddress({ ...address, street: e.target.value })}
              id="address"
              className="inputforstaff"
              placeholder="Street"
              required
            />
            <input
              type="text"
              value={address.city}
              onChange={(e) => setAddress({ ...address, city: e.target.value })}
              placeholder="City"
              className="inputforstaff"
              required
            />
            <input
              type="text"
              value={address.state}
              onChange={(e) => setAddress({ ...address, state: e.target.value })}
              placeholder="State"
              className="inputforstaff"
              required
            />
            <input
              type="text"
              value={address.zipCode}
              onChange={(e) => setAddress({ ...address, zipCode: e.target.value })}
              placeholder="Zip Code"
              className="inputforstaff"
              required
            />
          </div>
        </div>
      )}

      {currentSection === 2 && (
        <div>
          <h3>Official Details</h3>
          {/* Form Fields for Official Details */}
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
          {/* Form Fields for Other Info */}
        </div>
      )}
      {currentSection === 6 && (
        <div>
          <h3>Salary Details</h3>
          {/* Form Fields for Salary Details */}
        </div>
      )}

      <button onClick={handlePrevious} disabled={currentSection === 1}>
        Previous
      </button>
      <button onClick={handleNext} disabled={currentSection === 6}>
        Next
      </button>
    </div>
  );
};

export default CreateEmployee;
