import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/SuperAdminDashboard.css';
import ManageAdmins from './ManageAdmins'; // Import the new component

const SuperAdminDashboard = () => {
  const [view, setView] = useState('manageAdmins'); // Default view to 'manageAdmins'

  const handleNavigation = (section) => {
    setView(section);
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <a className="navbarBrand" href="#">Super Admin Panel</a>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a className="navLink nav-link" onClick={() => handleNavigation('dashboard')}>Dashboard</a>
            </li>
            <li className="nav-item">
              <a className="navLink nav-link" onClick={() => handleNavigation('manageAdmins')}>Manage Admins</a>
            </li>
            <li className="nav-item">
              <a className="navLink nav-link" onClick={() => handleNavigation('systemSettings')}>System Settings</a>
            </li>
            <li className="nav-item">
              <a className="navLink nav-link" onClick={() => handleNavigation('logs')}>View Logs</a>
            </li>
            <li className="nav-item">
              <a className="navLink nav-link" href="#">Logout</a>
            </li>
          </ul>
        </div>
      </nav>

      <div className="superAdminDashboard">
        <div className="optionsContainer">
          {/* Render different sections based on the current view */}
          {view === 'dashboard' && (
            <div className="section">
              <h2>Dashboard Overview</h2>
              <p>Welcome, Super Admin! Here's an overview of the system.</p>
              <ul>
                <li>Total Admins: 5</li>
                <li>Total Users: 150</li>
                <li>System Uptime: 99.99%</li>
              </ul>
            </div>
          )}

          {view === 'manageAdmins' && <ManageAdmins />} {/* Render the new ManageAdmins component */}

          {view === 'systemSettings' && (
            <div className="section">
              <h2>System Settings</h2>
              <p>Modify critical system settings here.</p>
              <button className="button673">Backup System Data</button>
              <button className="button673">Reset System</button>
              <button className="button673">Update Configuration</button>
            </div>
          )}

          {view === 'logs' && (
            <div className="section">
              <h2>System Logs</h2>
              <p>Review recent activities and error logs.</p>
              <ul>
                <li>09/30/2024 - Admin login failed for user admin@example.com</li>
                <li>09/29/2024 - System backup completed successfully</li>
                <li>09/28/2024 - New admin created: admin2@example.com</li>
              </ul>
              <button className="button673">Export Logs</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
