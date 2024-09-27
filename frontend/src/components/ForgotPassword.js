import React, { useState } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../style/ForgotPassword.module.css'; // Your CSS module
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleForgotPassword = (e) => {
    e.preventDefault();

    // Request OTP instead of token
    axios.post('http://localhost:5000/password/forgot-password', { email })
      .then((res) => {
        alert("Password reset OTP sent to your email");
        navigate('/reset-password'); // Redirect to reset password page
      })
      .catch((err) => {
        setMessage("Error: " + (err.response?.data?.message || "Unable to send reset OTP"));
      });
  };

  return (
    <div className={styles.ForgotPassword}>
      <Form onSubmit={handleForgotPassword}>
        <h4>Forgot Password</h4>
        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        <button type="submit" className={styles.btn}>Request OTP</button>
      </Form>
      {message && <p className={styles.message}>{message}</p>}
    </div>
  );
};

export default ForgotPassword;
