import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../style/AddIndividualstudent.css";

const AddIndividualStudent = () => {
  const navigate = useNavigate();

  // Declare states for all input fields
  const [_id, setid] = useState("");
  const [studentName, setstudentName] = useState("");
  const [dob, setdob] = useState("");
  const [address, setAddress] = useState("");
  const [studentClass, setStudentClass] = useState(""); // 'studentClass' matches backend field "class"
  const [section, setsection] = useState("");
  const [city, setcity] = useState("");
  const [state, setstate] = useState("");
  const [gender, setgender] = useState("");
  const [email, setemail] = useState("");
  const [phone, setphone] = useState("");
  const [aadhaarNumber, setaadhaarNumber] = useState("");
  const [emergencyNumber, setemergencyNumber] = useState("");

  const addStudent = (e) => {
    e.preventDefault();

    // Ensure all required fields are passed as per the backend
    const data = {
      _id,
      studentName,
      dob,
      address,
      city,
      state,
      class: studentClass, // Correct field name for "class"
      section,
      gender,
      email,
      phone,
      aadhaarNumber,
      emergencyNumber
    };

    // API call to submit the form data
    axios
      .post(`http://localhost:5000/auth/addStudent`, data) // Ensure the endpoint matches backend
      .then((res) => {
        console.log("API Response:", res);
        alert("Form Submitted Successfully");
        navigate("/dashboard/students"); // Redirect to student list after success
      })
      .catch((err) => {
        console.error("Error response:", err.response);
        if (err.response && err.response.data && err.response.data.message) {
          alert(`Error: ${err.response.data.message}`);
        } else {
          alert("Invalid Input or Bad Request");
        }
      });
  };

  // Handle image click to navigate back to the student list
  const handleImageClick = () => {
    navigate("/dashboard/students");
  };

  return (
    <div>
      <div className="main">
        <h5>Create Student</h5>
        <img
          src="https://img.icons8.com/?size=100&id=13903&format=png&color=000000"
          onClick={handleImageClick}
          alt="Student icon"
        />
      </div>
      <div className="content">
        <form onSubmit={addStudent} className="student-form">
          <div className="form-column">
            <div className="form-group">
              <label>ID</label>
              <input type="text" name="id" value={_id} onChange={(e) => setid(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Student Name</label>
              <input
                type="text"
                name="studentName"
                value={studentName}
                onChange={(e) => setstudentName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Date of Birth</label>
              <input
                type="date"
                name="dob"
                value={dob}
                onChange={(e) => setdob(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Address</label>
              <input
                type="text"
                name="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Class</label>
              <input
                type="text"
                name="class"
                value={studentClass} // Matching "class" field with backend
                onChange={(e) => setStudentClass(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Section</label>
              <input
                type="text"
                name="section"
                value={section}
                onChange={(e) => setsection(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>City</label>
              <input
                type="text"
                name="city"
                value={city}
                onChange={(e) => setcity(e.target.value)}
              />
            </div>
          </div>

          <div className="form-column">
            <div className="form-group">
              <label>State</label>
              <input
                type="text"
                name="state"
                value={state}
                onChange={(e) => setstate(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Gender</label>
              <select name="gender" value={gender} onChange={(e) => setgender(e.target.value)}>
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setemail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Phone No</label>
              <input
                type="tel"
                name="phone"
                value={phone}
                onChange={(e) => setphone(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Aadhaar No</label>
              <input
                type="text"
                name="aadhaarNumber"
                value={aadhaarNumber}
                onChange={(e) => setaadhaarNumber(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Emergency Number</label>
              <input
                type="tel"
                name="emergencyNumber"
                value={emergencyNumber}
                onChange={(e) => setemergencyNumber(e.target.value)}
              />
            </div>
            <div className="form-Button">
              <button type="submit">Save</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddIndividualStudent;
