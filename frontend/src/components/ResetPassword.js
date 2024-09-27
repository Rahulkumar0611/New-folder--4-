import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../style/ResetPassword.module.css'; // Your CSS module

const ResetPassword = () => {
  const [otp, setOtp] = useState("");  // Changed token to OTP
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleResetPassword = (e) => {
    e.preventDefault();

    // Use OTP instead of token for password reset
    axios.post('http://localhost:5000/password/reset-password', { otp, newPassword })
      .then((res) => {
        alert("Password successfully updated");
        navigate('/');  // Redirect to login page after reset
      })
      .catch((err) => {
        setMessage("Error: " + (err.response?.data?.message || "Unable to reset password"));
      });
  };

  return (
    <div className={styles.ResetPassword}>
      <Form onSubmit={handleResetPassword}>
        <h2>Reset Password</h2>
        <Form.Group controlId="formOtp">
          <Form.Label>OTP</Form.Label> {/* Changed label to OTP */}
          <Form.Control
            type="text"
            placeholder="Enter the OTP sent to your email"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}  // Use OTP input
            required
          />
        </Form.Group>
        <Form.Group controlId="formPassword">
          <Form.Label>New Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter your new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </Form.Group>
        <button type="submit" className={styles.btn}>Reset Password</button>
      </Form>
      {message && <p className={styles.message}>{message}</p>}
    </div>
  );
};

export default ResetPassword;
