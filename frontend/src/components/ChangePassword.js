import React, { useState , } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    try {
      const response = await axios.post(`http://localhost:5000/auth/change-password`, {
        oldPassword,
        newPassword,
        repeatPassword,
      });

      // Display success message
      alert(response.data.message);
      navigate("/")
      setError(''); // Clear any previous error message
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred. Please try again.');
      setMessage(''); // Clear any previous success message
    }
  };

  return (
    <div>
      <h2>Change Password</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Old Password:</label>
          <input
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>New Password:</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Confirm Password:</label>
          <input
            type="password"
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Change Password</button>
      </form>
      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default ChangePassword;
