import React, { useState, useEffect } from 'react';
import "../style/studentdetails.css";
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import StudentDetailsModal from './StudentDetailsModal';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';

const StaffDetails = () => {
  const [staff, setStaff] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false); // State for dropdown visibility

  // Fetch the staff data
  useEffect(() => {
    axios
      .get(`http://localhost:5000/staff/all`)
      .then((res) => {
        setStaff(res.data);
      })
      .catch((err) => {
        console.error('Error fetching staff data:', err);
      });
  }, []);

  // Filter staff based on search query
  const filteredStaff = staff.filter(staff =>
    staff._id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    staff.firstName.toLowerCase().includes(searchQuery.toLowerCase()) || // Corrected casing
    (staff.phone && staff.phone.toString().includes(searchQuery)) // Corrected casing
  );

  const handleViewClick = (staff) => {
    setSelectedStaff(staff);
  };

  const handleCloseModal = () => {
    setSelectedStaff(null);
  };

  return (
    <div id='header1'>
      <h1 className="title">Staff Details</h1>
      <input
        type="text"
        placeholder="Search staff By ID, Name, Phone..."
        id='searchbar'
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button id='search' type="submit">
        <SearchIcon /> Search 
      </button>

      {/* Dropdown for Add Staff */}
      <div className="dropdown">
        <button onClick={() => setDropdownOpen(!dropdownOpen)} className="add-staff-button">
          <AddIcon /> Add Staff
        </button>
        {dropdownOpen && (
          <div className="dropdown-content">
            <Link to="addstaff" className="dropdown-item">Individual Registration</Link>
            <Link to="bulkjoinees" className="dropdown-item">Bulk joinees</Link>
          </div>
        )}
      </div>

      <div className="table-container">
        <table className="staff-table">
          <thead id='tableheader'>
            <tr>
              <th>ID</th>
              <th id='th2'>First Name</th>
              <th id='th4'>Phone</th>
              <th id='th5'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStaff.map((staff) => (
              <tr key={staff._id}>
                <td>{staff._id}</td>
                <td>{staff.firstName}</td> {/* Corrected casing */}
                <td>{staff.phone}</td> {/* Corrected casing */}
                <td>
                  <button onClick={() => handleViewClick(staff)} className="view-button">
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {selectedStaff && (
          <StudentDetailsModal
            staff={selectedStaff}
            onClose={handleCloseModal}
          />
        )}
      </div>
    </div>
  );
};

export default StaffDetails;
