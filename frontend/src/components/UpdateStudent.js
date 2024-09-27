import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const UpdateStudent = () => {
  const { id } = useParams();
  const [student, setStudent] = useState({
    Firstname: '',
    Middlename: '',
    Lastname: '',
    Class: '',
    Section: '',
    Fathersname: '',
    Mothersname: '',
    Phone: '',
    AlternatePhone: '',
    Address: ''
  });
  const [printedDetails, setPrintedDetails] = useState('');

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:5000/auth/findById`, { params: { Id: id } })
        .then((res) => {
          setStudent(res.data);
        })
        .catch((err) => {
          console.log("Error fetching student details:", err);
        });
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/auth/updateStudent/${id}`, student)
      .then((res) => {
        alert("Student details updated successfully!");
        printDetails();
      })
      .catch((err) => {
        alert("Error updating student details.");
        console.log(err);
      });
  };

  const handleChange = (e) => {
    setStudent({
      ...student,
      [e.target.name]: e.target.value,
    });
  };

  const printDetails = () => {
    const details = `
      First Name: ${student.Firstname}
      Middle Name: ${student.Middlename}
      Last Name: ${student.Lastname}
      Class: ${student.Class}
      Section: ${student.Section}
      Father's Name: ${student.Fathersname}
      Mother's Name: ${student.Mothersname}
      Phone: ${student.Phone}
      Alternate Phone: ${student.AlternatePhone}
      Address: ${student.Address}
    `;
    setPrintedDetails(details);
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="form">
        <h1>Update Student Details</h1>

        {/* Form Fields */}
        {Object.keys(student).map((key) => (
          <div className="group" key={key}>
            <label htmlFor={key.toLowerCase()} className="label">{key.replace(/([A-Z])/g, ' $1').trim()}</label>
            <input
              type={key.includes("Phone") ? "tel" : "text"}
              name={key}
              value={student[key]}
              onChange={handleChange}
              className="input121"
              placeholder={key.replace(/([A-Z])/g, ' $1').trim()}
            />
          </div>
        ))}

        <button type="submit" className="button">Update Student</button>
      </form>

      {/* Printed Details */}
      <div className="printed-details">
        <h2>Student Details:</h2>
        <pre>{printedDetails}</pre>
      </div>
    </div>
  );
};

export default UpdateStudent;
