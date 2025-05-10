import React, { useState, useEffect } from 'react';
import './Profile.css';
import api from '../../api/config';
import { useNavigate } from 'react-router-dom';
import EventCard from '../../Components/EventCard/EventCard';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [myEvents, setMyEvents] = useState([]);
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

        // Fetch user profile
        const profileResponse = await api.get('/user/profile/', { headers });
        setUser(profileResponse.data);

        // Fetch only events created by this user (filtered by backend)
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

  if (!user) return <p className="loading-message">Loading profile...</p>;

  return (
    <div className="profile-wrapper">
      <div className="profile-photo">
        <img src={user.avatar || "/default-avatar.png"} alt="Profile" />
      </div>

      <div className="profile-info">
        <div className="profile-header">
          <h2>{user.name}</h2>
          <button>Edit Profile</button>
        </div>
        <p className="profile-role">Role: {user.role}</p>
      </div>

      <div className="my-events">
        <h3>My Events</h3>
        {myEvents.length === 0 ? (
          <p>No events created yet.</p>
        ) : (
          <div className="template-design">
            {myEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onClick={() => navigate('/explore', { state: { events: event } })}
                onFavorite={() => {}}
                onBuyTicket={() => {}}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
