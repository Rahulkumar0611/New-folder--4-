import React, { useState, useEffect } from 'react';
import axios from 'axios';



const ManageAdmins = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [admins, setAdmins] = useState([]);
  const [permissions, setPermissions] = useState({
    adminId: '',
    canViewDashboard: true,
    canManagePayments: true,
    canViewReports: true,
    canViewStudents: true,
    canViewStaff: true,
    canViewIncomeExpenditures: true,
    canViewCourseFee: true,
    canViewSettings: true,
    canManageReimbursementDetails: true,
    canAddStudent: true,
    canUpdateStudent: true,
    canBulkAdmission: true,
    canAddStaff: true,
    canViewStaffDetails: true,
    canChangePassword: true,
  });

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await axios.get('http://localhost:5000/superadmin/admins');
        if (response.data && response.data.admins) {
          setAdmins(response.data.admins);
        } else {
          setAdmins([]);
          setMessage('No admins found');
        }
      } catch (error) {
        console.error('Error fetching admins:', error);
        setMessage('Error fetching admins');
      }
    };
    fetchAdmins();
  }, []);

  const handleCreateAdmin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/auth/create-admin', { email });
      setMessage('Admin created successfully!');
      setEmail(''); // Clear input
      if (response.data && response.data.admin) {
        setAdmins((prev) => [...prev, response.data.admin]); // Add the newly created admin to the list
      }
    } catch (error) {
      console.error('Error creating admin:', error);
      setMessage('Error creating admin');
    } finally {
      setLoading(false);
    }
  };

  const toggleAdminStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === 'inactive' ? 'active' : 'inactive';

    try {
      await axios.put(`http://localhost:5000/superadmin/admins/${id}`, { status: newStatus });

      setAdmins((prevAdmins) =>
        prevAdmins.map((admin) =>
          admin._id === id ? { ...admin, status: newStatus } : admin
        )
      );
      setMessage(`Admin ${newStatus === 'active' ? 'activated' : 'deactivated'} successfully!`);
    } catch (error) {
      console.error('Error toggling admin status:', error);
      setMessage('Error toggling admin status');
    }
  };

  const handlePermissionsChange = async (adminId) => {
    try {
      if (adminId) {
        await axios.put(`http://localhost:5000/permission/${adminId}`, permissions);
        setMessage('Permissions updated successfully!');
      } else {
        setMessage('Please select an admin to update permissions.');
      }
    } catch (error) {
      console.error('Error updating permissions:', error);
      setMessage('Error updating permissions');
    }
  };

  const handleInputChange = (e) => {
    const { name, type, checked } = e.target;
    setPermissions({
      ...permissions,
      [name]: type === 'checkbox' ? checked : permissions[name],
    });
  };

  return (
    <div>
      <h2>Manage Admins</h2>

      <form onSubmit={handleCreateAdmin} className="form">
        <label htmlFor="email" className="label">Admin Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input"
          required
        />
        <button type="submit" className="button673" disabled={loading}>
          {loading ? 'Creating...' : 'Create Admin'}
        </button>
      </form>

      {message && <p>{message}</p>}

      <h3>Admin List</h3>
      <ul>
        {admins.map((admin) => (
          <li key={admin._id}>
            {admin.email} - {admin.status}
            <button onClick={() => toggleAdminStatus(admin._id, admin.status)}>
              {admin.status === 'inactive' ? 'Activate' : 'Deactivate'}
            </button>
          </li>
        ))}
      </ul>

      <h3>Update Admin Permissions</h3>
      <div>
        <label>Admin ID:</label>
        <select onChange={(e) => setPermissions({ ...permissions, adminId: e.target.value })}>
          <option value="">Select an Admin</option>
          {admins.map((admin) => (
            <option key={admin._id} value={admin._id}>
              {admin.email}
            </option>
          ))}
        </select>

        {/* Render checkboxes for all permissions */}
        <label>
          <input
            type="checkbox"
            name="canViewDashboard"
            checked={permissions.canViewDashboard}
            onChange={handleInputChange}
          />
          Can View Dashboard
        </label>
        <label>
          <input
            type="checkbox"
            name="canManagePayments"
            checked={permissions.canManagePayments}
            onChange={handleInputChange}
          />
          Can Manage Payments
        </label>
        <label>
          <input
            type="checkbox"
            name="canViewReports"
            checked={permissions.canViewReports}
            onChange={handleInputChange}
          />
          Can View Reports
        </label>
        <label>
          <input
            type="checkbox"
            name="canViewStudents"
            checked={permissions.canViewStudents}
            onChange={handleInputChange}
          />
          Can View Students
        </label>
        <label>
          <input
            type="checkbox"
            name="canViewStaff"
            checked={permissions.canViewStaff}
            onChange={handleInputChange}
          />
          Can View Staff
        </label>
        <label>
          <input
            type="checkbox"
            name="canViewIncomeExpenditures"
            checked={permissions.canViewIncomeExpenditures}
            onChange={handleInputChange}
          />
          Can View Income & Expenditures
        </label>
        <label>
          <input
            type="checkbox"
            name="canViewCourseFee"
            checked={permissions.canViewCourseFee}
            onChange={handleInputChange}
          />
          Can View Course Fee
        </label>
        <label>
          <input
            type="checkbox"
            name="canViewSettings"
            checked={permissions.canViewSettings}
            onChange={handleInputChange}
          />
          Can View Settings
        </label>
        <label>
          <input
            type="checkbox"
            name="canManageReimbursementDetails"
            checked={permissions.canManageReimbursementDetails}
            onChange={handleInputChange}
          />
          Can Manage Reimbursement Details
        </label>
        <label>
          <input
            type="checkbox"
            name="canAddStudent"
            checked={permissions.canAddStudent}
            onChange={handleInputChange}
          />
          Can Add Student
        </label>
        <label>
          <input
            type="checkbox"
            name="canUpdateStudent"
            checked={permissions.canUpdateStudent}
            onChange={handleInputChange}
          />
          Can Update Student
        </label>
        <label>
          <input
            type="checkbox"
            name="canBulkAdmission"
            checked={permissions.canBulkAdmission}
            onChange={handleInputChange}
          />
          Can Perform Bulk Admission
        </label>
        <label>
          <input
            type="checkbox"
            name="canAddStaff"
            checked={permissions.canAddStaff}
            onChange={handleInputChange}
          />
          Can Add Staff
        </label>
        <label>
          <input
            type="checkbox"
            name="canViewStaffDetails"
            checked={permissions.canViewStaffDetails}
            onChange={handleInputChange}
          />
          Can View Staff Details
        </label>
        <label>
          <input
            type="checkbox"
            name="canChangePassword"
            checked={permissions.canChangePassword}
            onChange={handleInputChange}
          />
          Can Change Password
        </label>

        <button onClick={() => handlePermissionsChange(permissions.adminId)}>
          Update Permissions
        </button>
      </div>
    </div>
  );
};

export default ManageAdmins;
