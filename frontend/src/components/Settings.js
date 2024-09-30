import React, { useState } from 'react';
import axios from 'axios';

const Settings = ({ updateSchoolSettings }) => {
  const [schoolName, setSchoolName] = useState('');
  const [address, setAddress] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [schoolYear, setSchoolYear] = useState('');
  const [logo, setLogo] = useState(null); // for file uploads
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');

  // Function to handle the form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Create form data to send with axios
    const formData = new FormData();
    formData.append('schoolName', schoolName);
    formData.append('address', address);
    formData.append('contactInfo', contactInfo);
    formData.append('schoolYear', schoolYear);
    formData.append('description', description);

    if (logo) {
      formData.append('logo', logo);
    }

    try {
      const response = await axios.post('http://localhost:5000/settings/update', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response);
      
      setMessage(response.data.message);
      updateSchoolSettings(schoolName, logo); // Update the school name in the dashboard
    } catch (error) {
      setMessage('Failed to update settings: ' + error.message);
    }
  };

  // File upload handler
  const handleLogoChange = (e) => {
    setLogo(e.target.files[0]);
  };

  return (
    <div>
      <h2>School Settings</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div style={{ display: 'flex', gap: '20px' }}>
          <div>
            <label htmlFor="schoolName">School Name</label>
            <input
              type="text"
              id="schoolName"
              value={schoolName}
              onChange={(e) => setSchoolName(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="contactInfo">Contact Info</label>
            <input
              type="text"
              id="contactInfo"
              value={contactInfo}
              onChange={(e) => setContactInfo(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="schoolYear">School Year</label>
            <input
              type="text"
              id="schoolYear"
              value={schoolYear}
              onChange={(e) => setSchoolYear(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
        </div>

        <div>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        <div>
          <label htmlFor="logo">School Logo</label>
          <input type="file" id="logo" onChange={handleLogoChange} />
        </div>

        <button type="submit">Update Settings</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
};

export default Settings;
