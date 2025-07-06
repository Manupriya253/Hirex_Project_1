import { useState } from 'react';
import './profileUpdate.css';

function ProfileUpdate() {
  const defaultImage = "https://via.placeholder.com/150";
  const [profileImage, setProfileImage] = useState(defaultImage);
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
    idNumber: "",
    birthday: "",
    gender: "",
    country: "",
    workingFor: "",
    emergencyName: "",
    emergencyRelationship: "",
    emergencyContact: "",
    bankAccountName: "",
    bankName: "",
    bankBranch: "",
    bankAccountNumber: ""
  });
  const [activeSection, setActiveSection] = useState('account'); // 'account' or 'password'

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfileImage(event.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div className="profile-container">
      <div className="sidebar">
        <div className="profile-header">
          <div className="profile-title">Profile</div>
          <div className="profile-image-container">
            <div className="circle-frame">
              {profileImage !== defaultImage ? (
                <img
                  className="profile-pic"
                  src={profileImage}
                  alt="Profile"
                />
              ) : (
                <span className="profile-placeholder-icon">
                  <svg width="48" height="48" fill="#bbb" viewBox="0 0 24 24">
                    <circle cx="12" cy="13" r="3.2" />
                    <path d="M20 6h-2.586l-1.707-1.707A.997.997 0 0 0 15 4h-6c-.265 0-.52.105-.707.293L6.586 6H4c-1.103 0-2 .897-2 2v10c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V8c0-1.103-.897-2-2-2zm0 12H4V8h4.05l1.414-1.414A.997.997 0 0 1 10 6h4c.265 0 .52.105.707.293L15.95 8H20v10z"/>
                  </svg>
                </span>
              )}
              <label className="image-upload-label" title="Click to change profile picture">
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleImageChange}
                  className="image-upload-input"
                  aria-label="Upload Profile Picture"
                />
                <span className="upload-icon">
                  <svg width="24" height="24" fill="white" viewBox="0 0 24 24">
                    <circle cx="12" cy="13" r="3.2" />
                    <path d="M20 6h-2.586l-1.707-1.707A.997.997 0 0 0 15 4h-6c-.265 0-.52.105-.707.293L6.586 6H4c-1.103 0-2 .897-2 2v10c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V8c0-1.103-.897-2-2-2zm0 12H4V8h4.05l1.414-1.414A.997.997 0 0 1 10 6h4c.265 0 .52.105.707.293L15.95 8H20v10z"/>
                  </svg>
                </span>
              </label>
            </div>
          </div>
        </div>
        <nav>
          <ul>
            <li
              className={activeSection === 'home' ? 'active' : ''}
              onClick={() => {
                // Home button does not change the section
                // You can add navigation logic here if needed
              }}
            >
              <span className="nav-icon" style={{ color: "#4f46e5" }}>🏠</span>
              Home
            </li>
            <li
              className={activeSection === 'account' ? 'active' : ''}
              onClick={() => setActiveSection('account')}
            >
              <span className="nav-icon">👤</span>
              Account Details
            </li>
            <li
              className={activeSection === 'password' ? 'active' : ''}
              onClick={() => setActiveSection('password')}
            >
              <span className="nav-icon">🔒</span>
              Change Password
            </li>
            <li>
              <span className="nav-icon">🚪</span>
              Logout
            </li>
          </ul>
        </nav>
      </div>

      <div className="settings-panel">
        {activeSection === 'account' ? (
          <>
            <h2>Account Settings</h2>
            <br />
            <form className="profile-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="firstName">First name</label>
                  <input 
                    type="text" 
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="First name"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">Last name</label>
                  <input 
                    type="text" 
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Last name"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="email">Email address</label>
                  <input 
                    type="email" 
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Email address"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone number</label>
                  <input 
                    type="tel" 
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Enter phone number"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="address">Address</label>
                  <input 
                    type="text" 
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Enter address"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="idNumber">NIC Number</label>
                  <input 
                    type="text" 
                    id="idNumber"
                    name="idNumber"
                    value={formData.idNumber}
                    onChange={handleInputChange}
                    placeholder="Enter ID number"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="birthday">Birthday</label>
                  <input 
                    type="date" 
                    id="birthday"
                    name="birthday"
                    value={formData.birthday}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="gender">Gender</label>
                  <select
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                  >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                    <option value="prefer_not_say">Prefer not to say</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="country">Country</label>
                  <input
                    type="text"
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    placeholder="Enter country"
                  />
                </div>
                <div className="form-group"></div> {/* Empty for alignment */}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="workingFor">Working For</label>
                  <select
                    id="workingFor"
                    name="workingFor"
                    value={formData.workingFor}
                    onChange={handleInputChange}
                  >
                    <option value="">Select organization</option>
                    <option value="ASA">ASA</option>
                    <option value="Care Talent">Care Talent</option>
                  </select>
                </div>
                <div className="form-group"></div>
              </div>

              {/* Emergency Contact Details */}
              <h3 style={{marginTop: "40px"}}>Emergency Contact Details</h3>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="emergencyName">Name of the Emergency Contact Person</label>
                  <input
                    type="text"
                    id="emergencyName"
                    name="emergencyName"
                    value={formData.emergencyName || ""}
                    onChange={handleInputChange}
                    placeholder="Enter name"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="emergencyRelationship">Relationship</label>
                  <input
                    type="text"
                    id="emergencyRelationship"
                    name="emergencyRelationship"
                    value={formData.emergencyRelationship || ""}
                    onChange={handleInputChange}
                    placeholder="Enter relationship"
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="emergencyContact">Contact Number</label>
                  <input
                    type="tel"
                    id="emergencyContact"
                    name="emergencyContact"
                    value={formData.emergencyContact || ""}
                    onChange={handleInputChange}
                    placeholder="Enter contact number"
                  />
                </div>
                <div className="form-group"></div>
              </div>

              {/* Bank Details */}
              <h3 style={{marginTop: "40px"}}>Bank Details</h3>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="bankAccountName">Bank Account Name</label>
                  <input
                    type="text"
                    id="bankAccountName"
                    name="bankAccountName"
                    value={formData.bankAccountName || ""}
                    onChange={handleInputChange}
                    placeholder="Enter account name"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="bankName">Bank Name</label>
                  <input
                    type="text"
                    id="bankName"
                    name="bankName"
                    value={formData.bankName || ""}
                    onChange={handleInputChange}
                    placeholder="Enter bank name"
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="bankBranch">Branch</label>
                  <input
                    type="text"
                    id="bankBranch"
                    name="bankBranch"
                    value={formData.bankBranch || ""}
                    onChange={handleInputChange}
                    placeholder="Enter branch"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="bankAccountNumber">Account Number</label>
                  <input
                    type="text"
                    id="bankAccountNumber"
                    name="bankAccountNumber"
                    value={formData.bankAccountNumber || ""}
                    onChange={handleInputChange}
                    placeholder="Enter account number"
                  />
                </div>
              </div>

              <button type="submit" className="save-button">Save Changes</button>
            </form>
          </>
        ) : (
          <>
            <h2>Change Password</h2>
            <br />
            <form className="profile-form" onSubmit={(e) => {
              e.preventDefault();
              // handle password change logic here
            }}>
              <div className="form-group">
                <label htmlFor="currentPassword">Current Password</label>
                <input
                  type="password"
                  id="currentPassword"
                  name="currentPassword"
                  placeholder="Enter current password"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="newPassword">New Password</label>
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  placeholder="Enter new password"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm New Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Confirm new password"
                  required
                />
              </div>
              <button type="submit" className="save-button">Change Password</button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default ProfileUpdate;
