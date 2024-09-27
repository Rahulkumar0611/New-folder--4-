import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/SuperAdminDashboard.css'

const SuperAdminDashboard = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleCreateAdmin = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setMessage('Admin created successfully!');
      setEmail(''); // Clear the input
    }, 2000);
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <a className='navbarBrand' href="#">Super Admin Panel</a>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a className="navLink nav-link" href="#">Dashboard</a>
            </li>
            <li className="nav-item">
              <a className="navLink nav-link" href="#">Settings</a>
            </li>
            <li className="nav-item">
              <a className="navLink nav-link" href="#">Logout</a>
            </li>
          </ul>
        </div>
      </nav>

      <div className='superAdminDashboard'>
        
        <div className='optionsContainer'>
          <h2>Manage Admins</h2>
          <form onSubmit={handleCreateAdmin} className='form'>
            <label htmlFor="email" className='label'>Admin Email:</label>
            <input 
              type="email" 
              id="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              className='input' 
              required 
            />
            <button type="submit" className='button673' disabled={loading}>
              {loading ? 'Creating...' : 'Create Admin'}
            </button>
          </form>
          {message && <p className='message'>{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
