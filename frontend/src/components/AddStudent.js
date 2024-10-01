import React, { useState } from 'react';
import "../style/addstudent.css";
import axios from 'axios';


const AddStudent = () => {
  const [_id, setid] = useState("");
  const [Firstname, setfirstname] = useState("");
  const [Middlename, setMiddlename] = useState("");
  const [Lastname, setlastname] = useState("");
  const [Class, setclass] = useState("");
  const [Section, setSection] = useState("");
  const [Fathersname, setfathersname] = useState("");
  const [Mothersname, setmothersname] = useState("");
  const [Phone, setphone] = useState("");
  const [AlternatePhone, setalternatephone] = useState("");
  const [Address, setaddress] = useState("");
  const [AadhaarNumber, setAadhaarNumber] = useState("")
  const [Gender, setGender] = useState("")

  const addStudent = (e) => {
    const data = { _id, Firstname, Middlename, Lastname, Class, Section, Fathersname, Mothersname, Phone, AlternatePhone, AadhaarNumber, Gender, Address };

    e.preventDefault();
    axios
      .post(`http://localhost:5000/auth/addStudent`, data)
      .then((res) => {
        console.log('API Response:', res);
        console.log('Response Data:', res.data);

        // Check if the response contains the student data
        if (res.data) {
          alert("Student added successfully");
        } else {
          console.error("Invalid response structure");
          alert("Failed to add student.");
        }
      })
      .catch((err) => {
        console.error("Error adding student:", err); // Log the error
        alert("Invalid Input");
      });
  };

  return (
    <div className="container131">
      <form onSubmit={addStudent} className="form">
        <h1 className="title737">Student Registration Form</h1>

        <div className="group">
          <label htmlFor="id" className="label">ID</label>
          <input
            type="number"
            value={_id}
            onChange={(e) => setid(e.target.value)}
            className="input121"
            id="id"
            placeholder="Enter ID"
            required
          />
        </div>

        <div className="group">
          <label htmlFor="firstname" className="label">First name</label>
          <input
            type="text"
            onChange={(e) => setfirstname(e.target.value)}
            value={Firstname}
            className="input121"
            id="firstname"
            placeholder="First name"

          />
        </div>

        <div className="group">
          <label htmlFor="middlename" className="label">Middle name</label>
          <input
            type="text"
            onChange={(e) => setMiddlename(e.target.value)}
            value={Middlename}
            className="input121"
            id="middlename"
            placeholder="Middle name"

          />
        </div>



        <div className="group">
          <label htmlFor="lastname" className="label">Last name</label>
          <input
            type="text"
            value={Lastname}
            onChange={(e) => setlastname(e.target.value)}
            className="input121"
            id="lastname"
            placeholder="Last name"
            required
          />
        </div>

        <div className="group">
          <label htmlFor="class" className="label">Class</label>
          <input
            type="text"
            value={Class}
            onChange={(e) => setclass(e.target.value)}
            className="input121"
            id="class"
            placeholder="Enter Class"
            required
          />
        </div>

        <div className="group">
          <label htmlFor="Section" className="label">Section</label>
          <input
            type="text"
            value={Section}
            onChange={(e) => setSection(e.target.value)}
            className="input121"
            id="Section"
            placeholder="Enter Section"
            required
          />
        </div>

        <div className="group">
          <label htmlFor="fathersname" className="label">Father's name</label>
          <input
            type="text"
            value={Fathersname}
            onChange={(e) => setfathersname(e.target.value)}
            className="input121"
            id="fathersname"
            placeholder="Father's name"
            required
          />
        </div>

        <div className="group">
          <label htmlFor="mothersname" className="label">Mother's name</label>
          <input
            type="text"
            value={Mothersname}
            onChange={(e) => setmothersname(e.target.value)}
            className="input121"
            id="mothersname"
            placeholder="Mother's name"
            required
          />
        </div>

        <div className="group">
          <label htmlFor="phone" className="label">Phone</label>
          <input
            type="tel"
            value={Phone}
            onChange={(e) => setphone(e.target.value)}
            className="input121"
            id="phone"
            placeholder="Phone"
          />
        </div>

        <div className="group">
          <label htmlFor="alternatePhone" className="label">Alternate Phone</label>
          <input
            type="tel"
            value={AlternatePhone}
            onChange={(e) => setalternatephone(e.target.value)}
            className="input121"
            id="alternatePhone"
            placeholder="Alternate Phone"
          />
        </div>
        <div className="group">
          <label htmlFor="aadhaarnumber" className="label">Aadhaar Number</label>
          <input
            type="tel"
            value={AadhaarNumber}
            onChange={(e) => setAadhaarNumber(e.target.value)}
            className="input121"
            id="aadhaarnumber"
            placeholder="Aadhaar Number"
          />
        </div>
        <div className="group">
          <label htmlFor="Gender">Gender:</label>
          <select id="Gender" value={Gender}  required>
            <option value="" disabled>Select Gender</option> 
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="group">
          <label htmlFor="address" className="label">Address</label>
          <input
            type="text"
            value={Address}
            onChange={(e) => setaddress(e.target.value)}

            id="address"
            placeholder="1234 Main St"
          />
        </div>

        <button type="submit" className="button">
          Save Student
        </button>
      </form>
    </div>
  );
};

export default AddStudent;
