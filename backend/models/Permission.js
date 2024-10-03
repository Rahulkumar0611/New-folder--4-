const mongoose = require('mongoose');

const PermissionSchema = new mongoose.Schema({
  adminId: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' },
  canViewDashboard: { type: Boolean, default: true },
  canManagePayments: { type: Boolean, default: true },
  canViewReports: { type: Boolean, default: true },
  canViewStudents: { type: Boolean, default: true },
  canViewStaff: { type: Boolean, default: true },
  canViewIncomeExpenditures: { type: Boolean, default: true },
  canViewCourseFee: { type: Boolean, default: true },
  canViewSettings: { type: Boolean, default: true },
  canManageReimbursementDetails: { type: Boolean, default: true },
  canAddStudent: { type: Boolean, default: true },
  canUpdateStudent: { type: Boolean, default: true },
  canBulkAdmission: { type: Boolean, default: true },
  canAddStaff: { type: Boolean, default: true },
  canBulkStaff: { type: Boolean, default: true },
  canViewStaffDetails: { type: Boolean, default: true },
  canChangePassword: { type: Boolean, default: true },
  // Add more permissions as needed
});

module.exports = mongoose.model('Permission', PermissionSchema);
