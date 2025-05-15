import React, { useEffect, useState } from 'react';
import { GoHeart, GoHeartFill } from 'react-icons/go';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import api from '../../api/config';
import './EventCard.css';

const EventCard = ({ event, onClick }) => {
  const { user, isLoggedIn } = useAuth();
  const [interested, setInterested] = useState(false);
  const [interestCount, setInterestCount] = useState(event.interest_count || 0);  
  const navigate = useNavigate();

  const userRole = user?.role;
  const isOrganizer = user?.email === event.user;

  const handleBuyTicketClick = (e) => {
    e.stopPropagation();

    if (!isLoggedIn) {
      toast.error('Please log in to buy a ticket');
      setTimeout(() => {
        navigate('/login');
      }, 1500);
      return;
    }

    if (userRole === 'organizer' && !isOrganizer) {
      toast.error('Login as Attendee');
    } else {
      navigate(`/explore/${event.id}`);
    }
  };

  const handleFavoriteClick = async (e) => {
    e.stopPropagation();
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate('/login');
      return;
    }
  
    try {
      const headers = {
        Authorization: `Token ${token}`,
      };
  
      
      const res = await api.post(`/events/${event.id}/interest/`, {}, { headers });
  
      setInterested(res.data.interested);
      setInterestCount(res.data.interest_count);
    } catch (error) {
      console.error('Error updating interest:', error);
      toast.error('Failed to update interest');
    }
  };
  

  return (
    <div className="event-card" onClick={() => onClick && onClick(event)}>
    
      <div className="favorite-btn-container">
  <button className="favorite-btn" onClick={handleFavoriteClick}>
    {interested ? <GoHeartFill color="red" /> : <GoHeart />}
  </button>
  <span className="interest-count">{interestCount}</span>
</div>


  

      <img src={event.image} alt={event.title} />
      <p style={{ fontWeight: 'bold' }}>{event.title}</p>
      <div className="event-category">
        Category: {event.category.map(cat => cat.name).join(', ')}
      </div>

      <div className="time-date">
        <div className="event-date">Date: {event.event_dates}</div>
        <div className="event-time">Time: {event.time_start}</div>
      </div>

      <div className="price">
        Start from:
        <div className='rs'>NPR {event.common_price}</div>
      </div>

      {!isOrganizer && (
        <div className="buy-ticket-btn-container">
          <button
            className="buy-ticket-btn"
            onClick={handleBuyTicketClick}
            disabled={isOrganizer}
          >
            Buy Ticket
          </button>
        </div>
      )}
    </div>
  );
};

export default EventCard;
