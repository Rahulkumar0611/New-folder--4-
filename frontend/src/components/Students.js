import React, { useState, useEffect } from 'react';
import "../style/studentdetails.css"
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import StudentDetailsModal from './StudentDetailsModal';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';

const Students = () => {
  const [students, setStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false); // State for dropdown visibility

  // Fetch the student data
  useEffect(() => {
    axios
      .get(`http://localhost:5000/auth/getStudent`)
      .then((res) => {
        setStudents(res.data);
      })
      .catch((err) => {
        console.error('Error fetching student data:', err);
      });
  }, []);

  // Filter students based on search query
  const filteredStudents = students.filter(student =>
    student._id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.Firstname.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.Class.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (student.Phone && student.Phone.toString().includes(searchQuery))
  );

  const handleViewClick = (student) => {
    localStorage.setItem('selectedStudent', JSON.stringify(student));
    setSelectedStudent(student);
  };

  const handleCloseModal = () => {
    setSelectedStudent(null);
  };


  return (
    <div id='header131'>
      <h1 className="title988">Student Details</h1>
      <input
        type="text"
        placeholder="Search Student By ID, Name, Class, Phone..."
        id='searchbar'
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button id='search' type="submit">
        <SearchIcon /> Search 
      </button>

      {/* Dropdown for Add Student */}
      <div className="dropdown">
        <button onClick={() => setDropdownOpen(!dropdownOpen)} className="add-student-button">
          <AddIcon /> Add Student
        </button>
        {dropdownOpen && (
          <div className="dropdown-content">
            <Link to="addstudent" className="dropdown-item">Individual Registration</Link>
            <Link to="bulkadmission" className="dropdown-item">Bulk Admission</Link>
          </div>
        )}
      </div>



      <div className="table-container">
        <table className="student-table">
          <thead id='tableheader'>
            <tr>
              <th>ID</th>
              <th id='th2'>Name</th>
              <th>Class</th>
              <th id='th4'>Phone</th>
              <th id='th5'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student) => (
              <tr key={student._id}>
                <td>{student._id}</td>
                <td>{student.Firstname}</td>
                <td>{student.Class}</td>
                <td>{student.Phone}</td>
                <td>
                  <button onClick={() => handleViewClick(student)} className="view-button56">
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {selectedStudent && (
          <StudentDetailsModal
            student={selectedStudent}
            onClose={handleCloseModal}
          />
        )}

        </div>
      </div>
  
  );
};

export default Students;
