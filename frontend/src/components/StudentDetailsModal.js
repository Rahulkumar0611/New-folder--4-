import React from 'react';
import '../style/studentdetailsmodal.css'; // Optional: Modal CSS
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const StudentDetailsModal = ({ student, onClose }) => {
  const navigate = useNavigate();

  // Handle update (can redirect to another page or open an inline form)
  const handleUpdate = () => {
    // Redirect to an update page (or you can toggle an edit form here)
    console.log("Update student:", student.id);
    navigate(`/dashboard/students/UpdateStudent/${student._id}`);
    // For example: redirect to update form page using history.push('/updateStudent/'+student._id)
  };
//    navigate(`/dashboard/students/UpdateStudent/${student._id}`);

  // Handle delete (send delete request to API)
  const handleDelete= (studentId) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
    axios
      .delete(`http://localhost:5000/auth/deleteStudent`, {
        params: {
          id: studentId, // Pass the student ID in the request parameters
        },
      })
      .then((res) => {
        alert("Student deleted successfully!");
        onClose(); // Close the modal
      })
      .catch((err) => {
        alert("Error deleting student.");
        console.log(err);
      });
  }};
  

  return (
    <div className="modal1">
      <div className="modal-content1">
        <span className="close-button" onClick={onClose}>&times;</span>
        
        <h1>Student Details for {student.Firstname}</h1>
      <p>ID: {student._id}</p>
      <p>Name: {student.Firstname}</p>
      <p>Class: {student.Class}</p>
      <p>Phone: {student.Phone}</p>
        {/* Buttons for Update, Delete, and Close */}
        <div className="modal-actions">
          <button onClick={handleUpdate} className="update-button">Update</button>
          <button onClick={handleDelete} className="delete-button">Delete</button>
          <button onClick={onClose} className="close-button">X</button>
        </div>
      </div>
    </div>
  );
};

export default StudentDetailsModal;
