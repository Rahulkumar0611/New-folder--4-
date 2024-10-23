import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage'; 
import Dashboard from './components/Dashboard';
import Students from './components/Students';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import SuperAdminDashboard from './components/SuperAdminDashboard';
import Protect from './components/Protect';
import AddIndividualStudent from './components/AddIndividualStudent';
import IndividualEntry from './components/IndividualEntry';
import BulkEntry from './components/BulkEntry';
import StudentDetailsModal from './components/StudentDetailsModal';
import Addstaff from './components/Addstaff';

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
          <Route path="/addstudent" element={<AddIndividualStudent />} />
          <Route path="/viewandedit" element={<StudentDetailsModal />} />
          <Route path="/individual" element={<IndividualEntry/>}/>
          <Route path="/bulk" element={<BulkEntry/>}/>
          <Route path="/addstaff" element={<Addstaff />} />
        </Routes>
        
      </Router>
    </div>
  );
}

export default App;
