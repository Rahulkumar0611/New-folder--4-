import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../style/LandingPage.module.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';


const LandingPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("admin");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const verifyAdmin = (e) => {
    e.preventDefault();

    if (role === "superadmin") {
      const superAdminEmail = "yakshitechsolutions@gmail.com";
      const superAdminPassword = "superadminpassword"; // Replace with your actual password

      if (email === superAdminEmail && password === superAdminPassword) {
        alert("Super Admin login successful");
        const superAdminData = { email: superAdminEmail, role: "superadmin" };
        localStorage.setItem("superAdmin", JSON.stringify(superAdminData));
        navigate('/superAdmindashboard');
      } else {
        alert("Invalid Super Admin credentials");
      }
      
    } else {
      // Admin login via API
      axios.post('http://localhost:5000/auth/login', { email, password, role })
        .then((res) => {
          if (res.data && res.data.user) {
            localStorage.setItem("Admin", JSON.stringify(res.data.user));
            alert("Login successful");
            navigate('/dashboard');
          } else {
            alert(res.data.error || "Invalid credentials");
          }
        })
        .catch((err) => {
          console.error(err.response?.data?.error || err.message);
          alert(err.response?.data?.error || "An error occurred during login");
        });
    }
  };

  return (
    <div className={styles.AdminLogin}>
      <Form id='landingform'  onSubmit={verifyAdmin}>
        <h6>Please enter your details</h6>
        <h1 className={styles.heading}>Welcome Back</h1>
        
        <Form.Group className={styles.formGroup} controlId="formGroupEmail">
          <Form.Label className={styles.formLabel}>Email Address</Form.Label>
          <Form.Control
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email address"
            className={styles.formControl}
          />
        </Form.Group>

        <Form.Group className={styles.formGroup} controlId="formGroupPassword">
          <Form.Label className={styles.formLabel}>Password</Form.Label>
          <div className={styles.inputContainer}>
            <Form.Control
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              className={styles.formControl}
            />
            <button
              type="button"
              className={styles.eyeButton}
              onClick={togglePasswordVisibility}
            >
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </button>
          </div>
        </Form.Group>

        <Form.Group className={styles.formGroup} controlId="formRoleSelect">
          <Form.Label className={styles.formLabel}>Login as</Form.Label>
          <Form.Control
            as="select"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className={styles.formControl}
          >
            <option className='optionalue1' value="admin">Admin</option>
            <option className='optionalue1' value="superadmin">Super Admin</option>
          </Form.Control>
        </Form.Group>

        <div className={styles.btnWrapper}>
          <button type="submit" className={styles.btn}>Sign In</button>
        </div>
        <footer className={styles.footer}>
        <p>Forgot your password? <Link to="/forgot-password">Reset it here</Link></p>
      </footer>
      </Form>
      
    </div>
  );
};

export default LandingPage;
