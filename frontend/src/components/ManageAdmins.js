import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageAdmins = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [admins, setAdmins] = useState([]);

  // Fetch admins from the server on component mount
  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await axios.get('http://localhost:5000/superadmin/admins');
        if (response.data && response.data.admins) {
          setAdmins(response.data.admins); // Ensure admins data is available
        } else {
          setAdmins([]); // Set an empty array if no admins are returned
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
    // The status will only be set to inactive when explicitly deactivated
    const newStatus = currentStatus === 'inactive' ? 'active' : 'inactive';
  
    try {
      // Update the admin's status on the backend
      await axios.put(`http://localhost:5000/superadmin/admins/${id}`, { status: newStatus });
  
      // Update the local state to reflect the new status
      setAdmins((prevAdmins) =>
        prevAdmins.map((admin) =>
          admin._id === id ? { ...admin, status: newStatus } : admin
        )
      );
  
      // Set the success message
      setMessage(`Admin ${newStatus === 'active' ? 'activated' : 'deactivated'} successfully!`);
    } catch (error) {
      console.error('Error toggling admin status:', error);
      setMessage('Error toggling admin status');
    }
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No admins to display</p>
      )}
    </div>
  );
};

export default ManageAdmins;
