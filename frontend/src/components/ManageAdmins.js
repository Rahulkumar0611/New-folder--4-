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
    canBulkAdmission: true,
    canManageStudents: true,
    canChangePassword: true,
    canBulkJoinees: true,
    canManageStaff: true,
  });

  // Fetch admins from the server on component mount
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
        await axios.put(`http://localhost:5000/superadmin/admins/${adminId}/permissions`, permissions);
        setMessage('Permissions updated successfully!');
      } else {
        // Optionally handle case where adminId is not set
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
      {message && <p className="message">{message}</p>}

      <h3>Admin List</h3>
      {admins.length > 0 ? (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Email</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {admins.map((admin) => (
              <tr key={admin._id}>
                <td>{admin.email}</td>
                <td>{admin.status}</td>
                <td>
                  <button
                    className="button673"
                    onClick={() => toggleAdminStatus(admin._id, admin.status)}
                  >
                    {admin.status === 'active' ? 'Deactivate' : 'Activate'}
                  </button>
                  <button
                    className="button673"
                    onClick={() => {
                      setPermissions({ ...permissions, adminId: admin._id });
                      handlePermissionsChange(admin._id);
                    }}
                  >
                    Manage Permissions
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No admins to display</p>
      )}

      <h3>Manage Permissions</h3>
      <form onSubmit={(e) => { e.preventDefault(); handlePermissionsChange(permissions.adminId); }}>
        <input
          type="text"
          name="adminId"
          value={permissions.adminId}
          readOnly
        />
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
        {/* Add more permission checkboxes as needed */}
        <button type="submit" className="button673">Save Permissions</button>
      </form>
    </div>
  );
};

export default ManageAdmins;
