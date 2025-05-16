import React, { useEffect, useState } from 'react';
import { GoHeart, GoHeartFill } from 'react-icons/go';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import api from '../../api/config';
import './EventCard.css';
import { useInterest } from '../../context/InterestContext';

const EventCard = ({ event, onClick }) => {
  const { user, isLoggedIn } = useAuth();
  const { markInterested, unmarkInterested, isInterested } = useInterest();
  const [interestCount, setInterestCount] = useState(event.interest_count || 0);
  const [interested, setInterested] = useState(false);

  
  const navigate = useNavigate();
  const userRole = user?.role;
  const isOrganizer = user?.email === event.user;

  // Sync local state with global context
  useEffect(() => {
    setInterested(isInterested(event.id));
  }, [event.id, isInterested]);

  // Fetch interest from server to stay accurate
  useEffect(() => {
    const fetchInterest = async () => {
      if (!isLoggedIn) return;

      const token = localStorage.getItem('authToken');
      if (!token) return;

      try {
        const headers = { Authorization: `Token ${token}` };
        const res = await api.get(`/events/${event.id}/interest/`, { headers });
        setInterested(res.data.interested);
        setInterestCount(res.data.interest_count);

        // Sync global state
        if (res.data.interested) {
          markInterested(event.id);
        } else {
          unmarkInterested(event.id);
        }
      } catch (error) {
        console.error('Error fetching interest:', error);
      }
    };

    fetchInterest();
  }, [event.id, isLoggedIn]);

  const handleBuyTicketClick = (e) => {
    e.stopPropagation();

    if (!isLoggedIn) {
      toast.error('Please log in to buy a ticket');
      setTimeout(() => navigate('/login'), 1500);
      return;
    }

    if (userRole === 'organizer' && !isOrganizer) {
      toast.error('Login as Attendee');
      return;
    }

    navigate(`/explore/${event.id}`);
  };

  const handleFavoriteClick = async (e) => {
    e.stopPropagation();

    if (!isLoggedIn) {
      toast.error('Please log in to show interest');
      navigate('/login');
      return;
    }

    if (userRole !== 'attendee') {
      toast.error('Login as Attendee to show interest');
      return;
    }

    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      const headers = { Authorization: `Token ${token}` };
      const res = await api.post(`/events/${event.id}/interest/`, {}, { headers });

      setInterested(res.data.interested);
      setInterestCount(res.data.interest_count);

      if (res.data.interested) {
        markInterested(event.id);
      } else {
        unmarkInterested(event.id);
      }

    } catch (error) {
      console.error('Error updating interest:', error);
      toast.error('Failed to update interest');
    }
  };

  return (
    <div className="event-card" onClick={() => onClick && onClick(event)}>
      {userRole === 'attendee' && (
        <div className="favorite-btn-container">
          <button className="favorite-btn" onClick={handleFavoriteClick}>
            {interested ? <GoHeartFill color="red" /> : <GoHeart />}
          </button>
          {interestCount > 0 && <span className="interest-count">{interestCount}</span>}
        </div>
      )}

      <img src={event?.image} alt={event?.title || 'Event Image'} />
      <p style={{ fontWeight: 'bold' }}>{event?.title || 'Untitled Event'}</p>

      <div className="event-category">
        Category: {Array.isArray(event.category) ? event.category.map(cat => cat.name).join(', ') : 'N/A'}
      </div>

      <div className="time-date">
        <div className="event-date">Date: {event?.event_dates || 'TBD'}</div>
        <div className="event-time">Time: {event?.time_start || 'TBD'}</div>
      </div>

      <div className="price">
        Start from:
        <div className="rs">NPR {event?.common_price ?? '0'}</div>
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
