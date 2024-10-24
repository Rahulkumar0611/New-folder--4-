import React, { useState, useEffect } from 'react';
import "../style/studentdetails.css";
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import SearchIcon from '@mui/icons-material/Search';
import { Link, useNavigate } from 'react-router-dom';

const Students = () => {
  const [students, setStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false); // State for dropdown visibility
  const navigate = useNavigate(); 

  // Fetch the student data
  useEffect(() => {
    axios
      .get(`http://localhost:5000/auth/getStudent`)
      .then((res) => {
        console.log(res.data); // Log the response to check the structure
        setStudents(res.data);
      })
      .catch((err) => {
        console.error('Error fetching student data:', err);
      });
  }, []);

  // Filter students based on search query, now including 'section'
  const filteredStudents = students.filter(student =>
    student &&
    student._id &&
    student.studentName && 
    student.class && 
    student.section && (
      student._id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.studentName.toLowerCase().includes(searchQuery.toLowerCase()) || 
      student.class.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.section.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (student.phone && student.phone.toString().includes(searchQuery))
    )
  );

  const handleViewEdit = (studentId) => {
    localStorage.setItem('selectedStudent', JSON.stringify(students));
    navigate(`/viewandedit`); 
  };

  return (
    <div id='header131'>
      <h1 className="title988">Student Details</h1>
      <input
        type="text"
        placeholder="Search Student By ID, Name, Class, Section, Phone..."
        id='searchbar'
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button id='search' type="submit">
        <SearchIcon /> Search 
      </button>

      {/* Dropdown for Add Student */}
      <div className="dropdown">
        <button onClick={() => setDropdownOpen(!dropdownOpen)} id='btnstudent' className="add-student-button">
          <AddIcon /> Add Student
        </button>
        {dropdownOpen && (
          <div className="dropdown-content">
            <Link to="/addstudent" className="dropdown-item">Individual Registration</Link>
            <Link to="/bulkadmission" className="dropdown-item">Bulk Admission</Link>
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
              <th id='th4'>Section</th>
              <th id='th5'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student) => (
              <tr key={student._id}>
                <td>{student._id}</td>
                <td>{student.studentName || 'N/A'}</td> {/* Adjusted to use studentName */}
                <td>{student.class || 'N/A'}</td> {/* Adjusted to use class */}
                <td>{student.section || 'N/A'}</td> {/* Adjusted to use section */}
                <td>
                  <button className="view-button56" onClick={() => handleViewEdit(student._id)}>
                    View / Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Students;
