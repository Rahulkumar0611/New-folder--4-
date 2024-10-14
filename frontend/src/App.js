import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage'; 
import Dashboard from './components/Dashboard';
import Students from './components/Students';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import SuperAdminDashboard from './components/SuperAdminDashboard';
import Protect from './components/Protect';
import AddStudent from './components/AddStudent';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage/>} />
          <Route path="/dashboard/*" element={<Protect Child={Dashboard} requiredRole="admin" />} />
          <Route path="/students/*" element={<Protect Child={Students} requiredRole="admin" />} />
          <Route path="/forgot-password" element={<ForgotPassword />} /> 
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/superAdmindashboard/*" element={<Protect Child={SuperAdminDashboard} requiredRole="superadmin" />} />
          <Route path="/addstudent" element={<AddStudent />} />
          
        </Routes>
        
      </Router>
    </div>
  );
}

export default App;
