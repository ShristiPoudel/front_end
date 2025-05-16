import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from '../../api/config';
import { useNavigate } from 'react-router-dom';
import "./EditProfile.css";

const EditProfile = () => {
  const [profileData, setProfileData] = useState({
    name: "",
    bio: "",
    image: null,
  });

  const [previewImage, setPreviewImage] = useState(null);
  const navigate = useNavigate();

  // Fetch existing profile data on mount
  useEffect(() => {
    async function fetchProfile() {
      try {
        const token = localStorage.getItem('authToken');
        const headers = {
          Authorization: `Token ${token}`,
        };

        const res = await api.get('/user/profile/', { headers });
        const data = res.data;

        setProfileData({
          name: data.name || "",
          bio: data.bio || "",
          image: null,
        });

        if (data.imgae) {
          setPreviewImage(data.image);
        }
      } catch (err) {
        console.error("Failed to fetch profile", err);
        toast.error("Failed to load profile.");
      }
    }

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      const file = files[0];
      setProfileData({ ...profileData, image: file });
      setPreviewImage(URL.createObjectURL(file));
    } else {
      setProfileData({ ...profileData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", profileData.name);
    formData.append("bio", profileData.bio);
    if (profileData.image) {
      formData.append("image", profileData.image);
    }

    try {
      const token = localStorage.getItem('authToken');
      const headers = {
        Authorization: `Token ${token}`,
        "Content-Type": "multipart/form-data",
      };

      // You can also use PATCH here if your backend supports partial updates
      await api.patch("/user/profile/", formData, { headers });

      toast.success("Profile updated successfully!");
      setTimeout(() => {
        navigate("/profile");
      }, 2000);
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile. Please try again.");
    }
  };

  return (
    <div className="profile-container">
      <h1>Edit Profile</h1>
      <form className="edit-profile-fields" onSubmit={handleSubmit}>
        <div className="profile-group">
          <label htmlFor="image">Upload Photo:</label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleChange}
          />
          {previewImage && (
            <img
              src={previewImage}
              alt="Profile Preview"
              className="image-preview"
            />
          )}
        </div>

        <div className="profile-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Change your name"
            value={profileData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="profile-group">
          <label htmlFor="bio">Bio:</label>
          <textarea
            id="bio"
            name="bio"
            placeholder="Change your bio"
            rows="5"
            value={profileData.bio}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="submit-btn">Save Changes</button>
      </form>

      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default EditProfile;