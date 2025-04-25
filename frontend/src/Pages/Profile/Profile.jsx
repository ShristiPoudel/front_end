import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/config";
import { useAuth } from '../../context/AuthContext';
import "./Profile.css";
import { Link } from 'react-router-dom';

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  const [website, setWebsite] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate("/login"); // Redirect to login if not authenticated
      return;
    }

    api.get("/user/profile/", 
      { headers: { Authorization: `Token ${token}`} })
      .then((response) => {
        setUser(response.data);
        setBio(response.data.bio || "");
        setLocation(response.data.location || "");
        setWebsite(response.data.website || "");
        setLoading(false);
        if (response.data.avatar) {
          setPreview(response.data.avatar);
        }
      })
      .catch(() => {
        setLoading(false);
        navigate("/login"); // Redirect if API request fails
      });
  }, [navigate]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file)); // Preview the selected image
    }
  };

  const handleUpload = () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append('avatar', selectedFile);

    const token = localStorage.getItem('authToken');
    api.post("/user/upload-avatar/", formData, {
      headers: {
        Authorization: `Token ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((response) => {
      setUser({ ...user, avatar: response.data.avatar }); // Update the user's avatar
      setPreview(response.data.avatar); // Update the preview
    })
    .catch((error) => {
      console.error("Error uploading image:", error);
    });
  };

  const handleSave = () => {
    const token = localStorage.getItem('authToken');
    api.patch("/user/profile/", 
      { bio, location, website }, 
      { headers: { Authorization: `Token ${token}`} })
      .then((response) => {
        setUser({ ...user, ...response.data }); // Update user data
        alert("Profile updated successfully!");
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
      });
  };

  if (loading) {
    return <p className="loading-message">Loading...</p>;
  }

  if (!user) {
    return <p className="error-message">Failed to load profile.</p>;
  }

  return (
    <div className="profile-container">
      {/* Avatar Section */}
      <div className="profile-avatar-container">
        <img
          src={preview || "default-avatar.png"}
          alt="User Avatar"
          className="profile-avatar"
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="profile-avatar-upload"
        />
        <button onClick={handleUpload} className="upload-btn">
          Upload Image
        </button>
      </div>

      {/* Profile Information Section */}
      <h2 className="profile-name">{user.name}</h2>
      <p className="profile-email">{user.email}</p>
      <p className="profile-role">Role: {user.role}</p>

      {/* Input Fields Section */}
      <div className="profile-input-group">
        <label>Bio</label>
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="Enter your bio"
        />
      </div>

      <div className="profile-input-group">
        <label>Location</label>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter your location"
        />
      </div>

      <div className="profile-input-group">
        <label>Website</label>
        <input
          type="text"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          placeholder="Enter your website"
        />
      </div>

      {/* Save Button */}
      <button onClick={handleSave} className="save-btn">
        Save Changes
      </button>

      {/* Event Buttons Section */}
      {user.role === "organizer" && (
        <div className="event-buttons">
          <Link to="/organizer-dashboard/create-events" className="event-btn">+</Link>  
          <Link to="/organizer-dashboard/manage-events" className="event-btn">+</Link>  
        </div>
      )}
    </div>
  );
}