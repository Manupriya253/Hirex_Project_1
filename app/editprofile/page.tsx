"use client";

import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import Link from "next/link";
import { useLogout } from "../utills/handelLogout"; // Adjust path if needed
import "./profileUpdate.css";

interface FormDataType {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  idNumber: string;
  birthday: string;
  gender: string;
  country: string;
  workingFor: string;
  emergencyName: string;
  emergencyRelationship: string;
  emergencyContact: string;
  bankAccountName: string;
  bankName: string;
  bankBranch: string;
  bankAccountNumber: string;
  [key: string]: string; // Index signature for dynamic assignment
}

interface PasswordType {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface AssetType {
  assetName: string;
}

const ProfileUpdate = () => {
  const logout = useLogout();
  const defaultImage = "https://via.placeholder.com/150";
  const [passwordError, setPasswordError] = useState("");
  const [passwordValid, setPasswordValid] = useState(false);
  const [profileImage, setProfileImage] = useState<string>(defaultImage);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [assignedAssets, setAssignedAssets] = useState<AssetType[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [showUpdateConfirm, setShowUpdateConfirm] = useState(false);
  const [pendingUpdateFormData, setPendingUpdateFormData] = useState<FormData | null>(null);
  const [pendingPasswordChange, setPendingPasswordChange] = useState<{
  currentPassword: string;
  newPassword: string;
  } | null>(null);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  
  const [activeSection, setActiveSection] = useState<"home" | "account" | "password">("account");

  const [formData, setFormData] = useState<FormDataType>({
    
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
    bankAccountNumber: "",
  });

  const [passwordData, setPasswordData] = useState<PasswordType>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("employeeToken");
      if (!token) return;

      try {
        const res = await axios.get("http://localhost:5000/api/employees/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const sanitizedData: FormDataType = { ...formData };
        for (const key in res.data) {
          sanitizedData[key] = res.data[key] || "";
        }

        setFormData(sanitizedData);
        setProfileImage(
          res.data.profileImage
            ? `http://localhost:5000/uploads/${res.data.profileImage}`
            : defaultImage
        );
      } catch (err) {
        console.error("Error fetching profile:", err);
        alert("Failed to load profile. Please try again.");
      }
    };

    fetchProfile();
  }, []);

  useEffect(() => {
    const fetchAssignedAssets = async () => {
      const token = localStorage.getItem("employeeToken");
      if (!token) {
        setError("No authorization token found");
        return;
      }

      try {
        const assetRes = await axios.get("http://localhost:5000/api/employees/assigned", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setAssignedAssets(assetRes.data);
      } catch (err) {
        console.error("Error fetching assigned assets:", err);
        setError("Failed to fetch assigned assets");
      }
    };

    fetchAssignedAssets();
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);

      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setProfileImage(event.target.result.toString());
        }
      };
      reader.readAsDataURL(file);
    }
  };

const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  const token = localStorage.getItem("employeeToken");
  if (!token) return;

  const cleanedFormData = new FormData();

  Object.entries(formData).forEach(([key, value]) => {
    if (value.trim() !== "") {
      if (key === "birthday") {
        // ✅ Remove any time part if present
        const formattedBirthday = value.includes("T") ? value.split("T")[0] : value;
        cleanedFormData.append("birthday", formattedBirthday);
      } else {
        cleanedFormData.append(key, value.trim());
      }
    }
  });

  if (imageFile) {
    cleanedFormData.append("profileImage", imageFile);
  }

  setPendingUpdateFormData(cleanedFormData);
  setShowUpdateConfirm(true);
};


  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;
  setPasswordData({ ...passwordData, [name]: value });

  if (name === "newPassword") {
    const isValid = isValidPassword(value);
   setPasswordError(
    isValid
      ? ""
      : "Password must be at least 8 characters long.\n" +
        "It must contain at least one lowercase letter.\n" +
        "It must contain at least one uppercase letter and one number."
  );

  }
};


  const isValidPassword = (password: string): boolean => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return passwordRegex.test(password);
  };

const handleChangePasswordSubmit = (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  if (passwordData.newPassword !== passwordData.confirmPassword) {
    alert("New passwords do not match!");
    return;
  }
  if (!isValidPassword(passwordData.newPassword)) {
    setPasswordError("Password must meet the required criteria.");
    setPasswordValid(false);
    return;
  }


  setPendingPasswordChange({
    currentPassword: passwordData.currentPassword,
    newPassword: passwordData.newPassword,
  });
  setShowPasswordConfirm(true); // Show modal
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
             <Link href= "/taskmangepage">  
            <span className="nav-icon" style={{ color: "#4f46e5" }}>🏠</span>
              Home
            </Link> 

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
           <li onClick={logout} style={{ cursor: "pointer" }}>
              <span className="nav-icon">🚪</span> Logout
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
                    value={formData.firstName || ""}
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
                    value={formData.lastName || ""}
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
                    value={formData.email || ""}
                    readOnly
                    placeholder="Email address"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone number</label>
                  <input 
                    type="tel" 
                    id="phone"
                    name="phone"
                    value={formData.phone || ""}
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
                    value={formData.address || ""}
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
                    value={formData.idNumber || ""}
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
                  value={formData.birthday ? formData.birthday.split("T")[0] : ""}
                  onChange={handleInputChange}
                />
                </div>
                <div className="form-group">
                  <label htmlFor="gender">Gender</label>
                  <select
                    id="gender"
                    name="gender"
                    value={formData.gender|| ""}
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
                    value={formData.country || ""}
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
                    value={formData.workingFor || ""}
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

              <div className="assigned-assets-section">
                
                <h3 className="assets-title">🧾 Assigned Assets</h3>
                {/* Notice for employees */}
                  
                <div className="mt-8">
                  <div className="asset-notice p-3 rounded-md bg-yellow-50 border border-yellow-200 text-yellow-800 text-sm">
                    <strong>Notice:</strong> If you believe an assigned item has not been delivered to you, please contact the admin team promptly for assistance.
                  </div>
                </div>
                <div className="mt-8">
                  {assignedAssets.length > 0 ? (
                    <div className="assets-card">
                      <table className="assets-table">
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Asset Name</th>
                          </tr>
                        </thead>
                        <tbody>
                          {assignedAssets.map((asset, index) => (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>{asset.assetName}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="no-assets-msg">🚫 No assets assigned to you yet.</div>
                  )}
                </div>          
              </div>


              <button type="submit" className="save-button">Save Changes</button>
            </form>
          </>
          ) : (
          <>
            <h2>Change Password</h2>
            <br />
            <form className="profile-form" onSubmit={handleChangePasswordSubmit}>
              <div className="form-group">
                <label htmlFor="currentPassword">Current Password</label>
                <input
                type="password"
                id="currentPassword"
                name="currentPassword"
                value={passwordData.currentPassword}
                onChange={handlePasswordChange}
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
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
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
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  placeholder="Confirm new password"
                  required
                />
              </div>
                <div
                  className={`text-sm mt-1 ${passwordValid ? "text-green-600" : "text-red-600"}`}
                >
                  {passwordError && (
                    <ul className="error-message">
                      {passwordError.split("\n").map((line, index) => (
                        <li key={index}>{line}</li>
                      ))}
                    </ul>
                  )}
                </div>
              <button type="submit" className="save-button">Change Password</button>
            </form>
          </>
        )}
      </div>

     {showPasswordConfirm && (
      <div className="modal-overlay">
        <div className="modal-box">
          <h3>Are you sure you want to change your password?</h3>
          <div className="modal-actions">
            <button
              className="confirm-btn"
              onClick={async () => {
                setShowPasswordConfirm(false);
                if (!pendingPasswordChange) return;

                try {
                  const token = localStorage.getItem("employeeToken");
                  const res = await axios.put(
                    "http://localhost:5000/api/employees/change-password",
                    {
                      currentPassword: pendingPasswordChange.currentPassword,
                      newPassword: pendingPasswordChange.newPassword,
                    },
                    {
                      headers: { Authorization: `Bearer ${token}` },
                    }
                  );
                  alert(res.data.message || "Password changed successfully!");
                  setPasswordData({
                    currentPassword: "",
                    newPassword: "",
                    confirmPassword: "",
                  });
                  setPendingPasswordChange(null);
                } catch (err: any) {
                  console.error("Password update error:", err.response?.data || err.message);
                  alert(err.response?.data?.error || "Password change failed");
                }
              }}
            >
              Yes, Change
            </button>
            <button
              className="cancel-btn"
              onClick={() => {
                setShowPasswordConfirm(false);
                setPendingPasswordChange(null); // Clean up if canceled
              }}
            >
              Cancel
            </button>
          </div>
      </div>
  </div>
)}

  {showUpdateConfirm && (
    <div className="modal-overlay">
      <div className="modal-box">
        <h3 className="modal-title">Confirm Profile Update</h3>
        <p className="modal-message">
          Are you sure you want to update your account information?
        </p>
        <div className="modal-actions">
          <button
            className="confirm-btn"
            onClick={async () => {
              if (!pendingUpdateFormData) return;

              try {
                const token = localStorage.getItem("employeeToken");
                await axios.put("http://localhost:5000/api/employees/me", pendingUpdateFormData, {
                  headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                  },
                });
                alert("Profile updated successfully!");
              } catch (err: any) {
                console.error("Update error:", err.response?.data || err.message);
                alert("Failed to update profile. Please try again.");
              } finally {
                setShowUpdateConfirm(false);
                setPendingUpdateFormData(null);
              }
            }}
          >
            Yes, Update
          </button>
          <button
            className="cancel-btn"
            onClick={() => {
              setShowUpdateConfirm(false);
              setPendingUpdateFormData(null);
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )}

</div>
    
  );
}

export default ProfileUpdate;