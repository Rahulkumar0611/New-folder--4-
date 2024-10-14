import "../style/addstudent.css";
import { useState } from "react";

const AddStudent = () => {
  const [formData, setFormData] = useState({
    id: "",
    studentName: "",
    dob: "",
    address: "",
    city: "",
    state: "",
    taxStatus: "",
    gender: "",
    email: "",
    phone: "",
    aadhar: "",
    emergencyNumber: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
  };

  return (
    <div className="addstudent-container">
      <nav className="addstudent-navbar">
        <div className="addstudent-logo">Logo</div>
        <div className="addstudent-navbar-links">
          <a href="/">Home</a>
          <a href="/dashboard">Dashboard</a>
          <a href="/students">Students</a>
        </div>
      </nav>

      <div className="studentdiv">
        <h2>Create Student</h2>
        <form onSubmit={handleSubmit} className="student-form">
          {/* Form fields */}
        </form>
      </div>
    </div>
  );
};

export default AddStudent;
