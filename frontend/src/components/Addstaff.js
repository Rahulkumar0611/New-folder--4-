import React, { useState } from 'react';
import "../style/addstaff.css";
import axios from 'axios';

const Addstaff = () => {
  const [_id, setId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [alternatePhone, setAlternatePhone] = useState("");
  const [role, setRole] = useState("teacher"); // Default role
  const [department, setDepartment] = useState("");
  const [address, setAddress] = useState({
    street: "",
    city: "",
    state: "",
    zipCode: ""
  });
  const [dateOfJoining] = useState(new Date()); // Default to current date

  const addStaff = (e) => {
    e.preventDefault();

    const data = {
      _id,
      firstName,
      lastName,
      email,
      phone,
      alternatePhone,
      role,
      department,
      address,
      dateOfJoining
    };

    axios
      .post(`http://localhost:5000/staff/add`, data)
      .then((res) => {
        console.log('API Response:', res);
        console.log('Response Data:', res.data);
        if (res.data && res.data.staff) {
          window.localStorage.setItem("staff", JSON.stringify(res.data.staff));
        } else {
          console.error("Invalid response structure");
        }
        alert("Staff Added Successfully");
      })
      .catch((err) => {
        console.error(err); // Log the error
        alert("Invalid Input");
      });
  };

  return (
    <div className="containerforstaff">
      <form onSubmit={addStaff} className="formforstaff">
        <h1 className="titleforstaff">Staff Registration Form</h1>

        <div className="groupforstaff">
          <label htmlFor="id" className="label">ID</label>
          <input
            type="text"
            value={_id}
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
            onChange={(e) => setFirstName(e.target.value)}
            value={firstName}
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
            id="department"
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

        <button type="submit" className="buttonforstaff">
          Save Staff
        </button>
      </form>
    </div>
  );
};

export default Addstaff;
