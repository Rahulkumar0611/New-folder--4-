import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../style/SuperAdminDashboard.module.css'; // Import CSS module

const SuperAdminDashboard = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleCreateAdmin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await axios.post('http://localhost:5000/auth/create-admin', { email });
      setMessage(`Admin created successfully! Initial password: ${response.data.initialPassword}`);
    } catch (error) {
      setMessage(`Error creating admin: ${error.response?.data?.message || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Top Navbar */}
      <nav className={`navbar navbar-expand-lg ${styles.navbar}`}>
        <div className="container-fluid">
          <a className={styles.navbarBrand} href="#">Super Admin Panel</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className={`${styles.navLink} nav-link`} href="#">Dashboard</a>
              </li>
              <li className="nav-item">
                <a className={`${styles.navLink} nav-link`} href="#">Settings</a>
              </li>
              <li className="nav-item">
                <a className={`${styles.navLink} nav-link`} href="#">Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Dashboard Content */}
      <div className={styles.superAdminDashboard}>
        <h1 className={styles.heading}>SUPER ADMIN Dashboard</h1>
        <div className={styles.optionsContainer}>
          <h2>Manage Admins</h2>
          <form onSubmit={handleCreateAdmin} className={styles.form}>
            <label htmlFor="email" className={styles.label}>Admin Email:</label>
            <input 
              type="email" 
              id="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              className={styles.input} 
              required 
            />
            <button type="submit" className={styles.button} disabled={loading}>
              {loading ? 'Creating...' : 'Create Admin'}
            </button>
          </form>
          {message && <p className={styles.message}>{message}</p>}
        </div>

        <div className={styles.otherOptions}>
          <h2>Other Super Admin Options</h2>
          <ul>
            <li><button className={styles.optionButton}>View All Admins</button></li>
            <li><button className={styles.optionButton}>Manage Permissions</button></li>
            <li><button className={styles.optionButton}>System Settings</button></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
