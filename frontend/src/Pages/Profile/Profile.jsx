import React, { useState, useEffect } from 'react';
import './Profile.css';
import api from '../../api/config';
import { useNavigate } from 'react-router-dom';
import EventCard from '../../Components/EventCard/EventCard';
import { BsPlusLg } from "react-icons/bs";
import { IoIosSettings } from "react-icons/io";
import { FaPlus } from "react-icons/fa";





const Profile = () => {
  const [user, setUser] = useState(null);
  const [myEvents, setMyEvents] = useState([]);
  const [bar, setBar] = useState("My Events");
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function getProfile() {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          navigate('/login');
          return;
        }

        const headers = {
          Authorization: `Token ${token}`,
        };

        const profileResponse = await api.get('/user/profile/', { headers });
        setUser(profileResponse.data);

        const eventResponse = await api.get('/events/', { headers });
        setMyEvents(eventResponse.data);
      } catch (error) {
        console.error("Error fetching profile", error);
        if (error.response?.status === 401) {
          localStorage.removeItem('authToken');
          navigate('/login');
        }
      }
    }
    getProfile();
  }, [navigate]);


  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file)); // Show preview immediately
  
      // Prepare and upload the image immediately
      const formData = new FormData();
      formData.append('avatar', file);
  
      const token = localStorage.getItem('authToken');
      api.post("/user/upload-avatar/", formData, {
        headers: {
          Authorization: `Token ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        setUser((prevUser) => ({ ...prevUser, avatar: response.data.avatar }));
        setPreview(response.data.avatar);
        setSelectedFile(null); // clear the file after upload
      })
      .catch((error) => {
        console.error("Error uploading image:", error);
      });
    }
  };
  

  
  
     

  
  if (!user) return <p className="loading-message">Loading profile...</p>;

  return (
    <div className="profile-wrapper">

      <div className="profile-section">
      <div className="profile-photo">
  <label className="avatar-upload-label">
    <img
      src={preview || user.avatar || "/default-avatar.png"}
      alt="User Avatar"
      className="profile-avatar"
    />
    <input
      type="file"
      accept="image/*"
      onChange={handleFileChange}
      className="avatar-input"
    />
  </label>
  {/* {selectedFile && (
    <button className="upload-btn" onClick={handleUpload}>
      Upload
    </button>
  )} */}
</div>



      <div className="profile-info">
        <div className="profile-header">
          <h2>{user.name}</h2>
          <div className="class">
          <button 
         onClick={() => navigate('/edit-profile')}
          >Edit Profile

          </button>
          <div className="settings">
          < IoIosSettings className='settings-icon' />
          </div> 
          </div>
        </div>
        <p className="profile-role">{user.role}</p>
      </div>
      </div>
        <ul className='my-bar'>
          <li onClick={()=>setBar("My Events")}>My Events{bar==="My Events" && <hr/>}</li>
          <li onClick={()=>setBar("Tickets Sold")}>Tickets Sold {bar==="Tickets Sold" && <hr/>}</li>
          {/* <li onClick={()=>setBar("Notifications")}>Notifications{bar==="Notifications" && <hr/>}</li> */}
        </ul>
        <div className="my-events-list">
        {myEvents.length === 0 ? (
          <p>No events created yet.</p>
        ) : (
          <div className="template-design">
            {myEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onClick={() => navigate(`/explore/${event.id}`)}
                onFavorite={() => {}}
                onBuyTicket={() => {}}
              />
            ))}

             <button
    className="create-event-button"
    onClick={() => navigate('/organizer-dashboard/create-events')}
  >
    <BsPlusLg className="plus-icon" />
    {/* <span className="add-label">New</span> */}
  </button>
          </div>
        )}
      </div>
   

    </div>
  );
};

export default Profile;
