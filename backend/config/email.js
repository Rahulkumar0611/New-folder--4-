require('dotenv').config();

module.exports = {
  service: 'gmail', // Using Gmail as the service provider
  auth: {
    user: process.env.EMAIL_USER, // Your Gmail address
    pass: process.env.EMAIL_PASS, // Your app-specific password or email password
  },
  host: 'smtp.gmail.com',
  port: 587, // Use 465 if you want to use SSL
  secure: false, // Set to true if using SSL (port 465)
  tls: {
    rejectUnauthorized: false // Use this only if necessary; typically for self-signed certificates
  }
};
