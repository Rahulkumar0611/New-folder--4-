import "../style/AddIndividualstudent.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddIndividualStudent = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id: "",
    studentName: "",
    dob: "",
    address: "",
    class: "",
    section: "",
    city: "",
    state: "",
    gender: "",
    email: "",
    phone: "",
    aadhar: "",
    emergencyNumber: "",
  });
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  const handleImageClick = () => {
    navigate("/dashboard/students");
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file)); // Preview the image
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can submit the image file along with formData to the server here
    console.log("Form Submitted:", formData);
    console.log("Selected Image:", image);
  };

  return (
    <div>
      <div className="main">
        <h5>Create Student</h5>
        <img
          src="https://img.icons8.com/?size=100&id=13903&format=png&color=000000"
          onClick={handleImageClick}
          alt="Student icon"
        />
      </div>
      <div className="content">
        <form onSubmit={handleSubmit} className="student-form">
          <div className="form-column">
            <div className="form-group">
              <label>ID</label>
              <input type="text" name="id" value={formData.id} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Student Name</label>
              <input type="text" name="studentName" value={formData.studentName} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Date of Birth</label>
              <input type="date" name="dob" value={formData.dob} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Address</label>
              <input type="text" name="address" value={formData.address} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Class</label>
              <input type="text" name="class" value={formData.class} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Section</label>
              <input type="text" name="section" value={formData.section} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>City</label>
              <input type="text" name="city" value={formData.city} onChange={handleChange} />
            </div>
          </div>

          <div className="form-column">
            <div className="form-group">
              <label>State</label>
              <input type="text" name="state" value={formData.state} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Gender</label>
              <select name="gender" value={formData.gender} onChange={handleChange}>
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="form-group">
              <label>Email Address</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Phone No</label>
              <input type="tel" name="phone" value={formData.phone} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Aadhar No</label>
              <input type="text" name="aadhar" value={formData.aadhar} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Emergency Number</label>
              <input type="tel" name="emergencyNumber" value={formData.emergencyNumber} onChange={handleChange} />
            </div>
            <div className="form-Button">
              <button type="submit">Save</button>
            </div>
          </div>

          <div className="form-column">
            <label>Select Image</label>
            <div className="imagedivj">
              {/* Preview the selected image */}
              {imagePreview && <img src={imagePreview} alt="Selected student" />}
            </div>
            <input type="file" onChange={handleImageChange} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddIndividualStudent;
