import React, { useState, useRef, useEffect } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import style from '../style/Dashboard.module.css';
import Students from './Students'; 
import Payments from './Payments';
import PaymentReports from './PaymentReports';
import StudentDetailsModal from './StudentDetailsModal';
import CourseFee from './CourseFee';
import Dashboard1 from './Dashboard1';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import Settings from './Settings';
import AddReimbursementDetails from './AddReimbursementDetails';
import UpdateStudent from './UpdateStudent';
import StaffManagement from './StaffManagement';
import BulkAdmission from './BulkAdmission';
import StaffDetails from './StaffDetails';
import StaffBulk from './StaffBulk';
import Addstaff from './Addstaff';
import IncomeAndExpenditure from './IncomeAndExpenditure';
import ViewStaff from './ViewStaff';
import ChangePassword from './ChangePassword';

const Dashboard = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [schoolName, setSchoolName] = useState("School Name"); 
  const [logo, setLogo] = useState(null);
  const navigate = useNavigate();
  const menuRef = useRef(null); // Create a ref for the menu

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    localStorage.clear();
    alert('Logged out');
    setIsMenuOpen(false);
    navigate("/");    
  };

  const handleChangePassword = () => {
    navigate("change-password");
  };

  const updateSchoolSettings = (name, logoFile) => {
    setSchoolName(name);
    setLogo(URL.createObjectURL(logoFile));
  };

  // Close menu when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    // Add event listener
    document.addEventListener('mousedown', handleClickOutside);

    // Cleanup event listener on unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={style.dashboardContainer}>
      {/* Top Navbar */}
      <div className={style.topNavbar}>
        <div className={style.title}>
          {schoolName}
        </div>
        
        <div className={style.logoContainer}>
          {logo && <img src={logo} alt="School Logo" className={style.logoImage} />}
        </div>

        <div className={style.settings} ref={menuRef}>
          <button onClick={toggleMenu} className={style.settingsButton}>
            <AccountBoxIcon/>
          </button>
          {isMenuOpen && (
            <div className={style.menu}>
              <button onClick={handleLogout}>Logout</button>
              <button onClick={handleChangePassword}>Change Password</button>
            </div>
          )}
        </div>
      </div>

      {/* Sidebar */}
      <div className={style.sidebar}>
        <ul>
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/dashboard/settings">Settings</Link></li>
          <li><Link to="/dashboard/students">Student Details</Link></li>
          <li><Link to="/dashboard/staff">Staff Info</Link></li>
          <li><Link to="/dashboard/payments">Payment Details</Link></li>
          <li><Link to="/dashboard/incomeandexpenditures"> Expenditures</Link></li>
          <li><Link to="/dashboard/CourseFee">Course Fee Details</Link></li>
          <li><Link to="/dashboard/reports">Reports</Link></li>
          <li><Link to="/dashboard/reimbursementdetails">Reimbursement </Link></li>
        </ul>
      </div>

      {/* Main Content Area */}
      <div className={style.mainContent}>
        <Routes>
          <Route path="/" element={<Dashboard1 />} />
          <Route path="/settings" element={<Settings updateSchoolSettings={updateSchoolSettings} />} />
          <Route path="students" element={<Students />} />
          <Route path="payments" element={<Payments />} />
          <Route path="reports" element={<PaymentReports />} />
          <Route path="staff" element={<StaffDetails/>}/>
          <Route path="incomeandexpenditures" element={<IncomeAndExpenditure/>}/>
          {/* <Route path="/students/addstudent" element={<AddStudent />} /> */}
          {/* <Route path="students/viewstudent" element={<StudentDetailsModal />} /> */}
          <Route path="CourseFee" element={<CourseFee />} />
          <Route path="reimbursementdetails/" element={<StaffManagement />} />
          <Route path="AddReimbursementDetails" element={<AddReimbursementDetails />} />
          <Route path="/dashboard/students/UpdateStudent/:id" element={<UpdateStudent />} />
          <Route path="/students/bulkadmission" element={<BulkAdmission/>}/>
          <Route path="/staff/bulkjoinees" element={<StaffBulk/>}/>
          <Route path="/staff/addstaff" element={<Addstaff/>}/>
          <Route path="/staff/viewstaff" element={<ViewStaff/>}/>
          <Route path="change-password" element={<ChangePassword/>}/>
          <Route path="/viewandedit/:studentId" element={<StudentDetailsModal />} />
          <Route path="/student" element={<Students />}/>
         

        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
