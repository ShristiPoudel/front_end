import React, { useState, useEffect } from 'react';
import './Profile.css';
import api from '../../api/config';
import { useNavigate } from 'react-router-dom';
import EventCard from '../../Components/EventCard/EventCard';
import { BsPlusLg } from "react-icons/bs";
import { IoIosSettings } from "react-icons/io";
import { FaTicketAlt, FaChartBar, FaCalendarAlt, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { useInterest } from '../../context/InterestContext'; // import your InterestContext hook

const Profile = () => {
  const [user, setUser] = useState(null);
  const [myEvents, setMyEvents] = useState([]);
  const [ticketStats, setTicketStats] = useState({});
  const [publicEvents, setPublicEvents] = useState([]); // for attendee favorite filtering
  const [favorites, setFavorites] = useState([]);
  const [bar, setBar] = useState("My Events");
  const [barAttendee, setBarAttendee] = useState("My Favourites");
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();
  const { isInterested } = useInterest();

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
        setPreview(profileResponse.data.image);

        if (profileResponse.data.role === "organizer") {
          // Organizer: fetch their events
          const eventResponse = await api.get('/events/', { headers });
          setMyEvents(eventResponse.data);

          // Fetch ticket stats for each event
          const stats = {};
          for (const event of eventResponse.data) {
            try {
              const statResponse = await api.get(`/events/${event.id}/ticket-stats/`, { headers });
              stats[event.id] = statResponse.data;
            } catch (err) {
              console.warn(`Stats not found for event ID ${event.id}`);
            }
          }
          setTicketStats(stats);

        } else if (profileResponse.data.role === "attendee") {
          // Attendee: fetch all public events for filtering favorites
          const publicEventsResponse = await api.get('/events/public-events/', { headers });
          setPublicEvents(publicEventsResponse.data);

          // Filter favorites using isInterested from context
          const favEvents = publicEventsResponse.data.filter(event => isInterested(event.id));
          setFavorites(favEvents);
        }

      } catch (error) {
        console.error("Error fetching profile", error);
        if (error.response?.status === 401) {
          localStorage.removeItem('authToken');
          navigate('/login');
        }
      }
    }

    getProfile();
  }, [navigate, isInterested]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
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
              src={preview || "/default-avatar.png"}
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
        </div>

        <div className="profile-info">
          <div className="profile-header">
            <h2>{user.name}</h2>
            <div className="class">
              <button onClick={() => navigate('/edit-profile')}>Edit Profile</button>
              <div className="settings">
                <IoIosSettings className='settings-icon' />
              </div>
            </div>
          </div>
          <p className="profile-role">{user.role}</p>
          {user.bio && <p className="profile-bio">{user.bio}</p>}
        </div>
      </div>

      <ul className='my-bar'>
        {user.role === "organizer" && (
          <>
            <li onClick={() => setBar("My Events")}>My Events{bar === "My Events" && <hr />}</li>
            <li onClick={() => setBar("Ticket Stats")}>Ticket Stats{bar === "Ticket Stats" && <hr />}</li>
          </>
        )}

        {user.role === "attendee" && (
          <li onClick={() => setBarAttendee("My Favourites")}>My Favourites{barAttendee === "My Favourites" && <hr />}</li>
        )}
      </ul>

      {bar === "My Events" && user.role === "organizer" && (
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
              </button>
            </div>
          )}
        </div>
      )}

      {bar === "Ticket Stats" && user.role === "organizer" && (
        <div className="ticket-stats-section">
          {myEvents.length === 0 ? (
            <p>No events found for ticket stats.</p>
          ) : (
            <div className="ticket-stats-list">
              {myEvents.map((event) => {
                const stats = ticketStats[event.id];
                return (
                  <div key={event.id} className="ticket-stat-card">
                    <h3><FaChartBar className="icon" /> {event.title}</h3>
                    {stats ? (
                      <div className="ticket-details">
                        <p><FaCalendarAlt className="icon" /> <strong>Venue Capacity:</strong> {stats.venue_capacity}</p>
                        <p><FaTicketAlt className="icon" /> <strong>VIP Tickets Sold:</strong> {stats.vip_tickets_sold}</p>
                        <p><FaTicketAlt className="icon" /> <strong>Common Tickets Sold:</strong> {stats.common_tickets_sold}</p>
                        <p><FaCheckCircle className="icon success" /> <strong>Total Sold:</strong> {stats.total_tickets_sold}</p>
                        <p><FaTimesCircle className="icon danger" /> <strong>Remaining:</strong> {stats.remaining_tickets}</p>
                      </div>
                    ) : (
                      <p>Stats not available.</p>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {bar === "Favorites" && user.role === "attendee" && (
        <div className="favorites-list">
          {favorites.length === 0 ? (
            <p>You have not marked any events as favorite yet.</p>
          ) : (
            <div className="template-design">
              {favorites.map(event => (
                <EventCard
                  key={event.id}
                  event={event}
                  onClick={() => navigate(`/explore/${event.id}`)}
                />
              ))}
            </div>
          )}
        </div>
      )}

    </div>
  );
};

export default Profile;
